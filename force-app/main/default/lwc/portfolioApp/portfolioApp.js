import { LightningElement } from 'lwc';

const SECTIONS = [
    { selector: 'c-about', name: 'about' },
    { selector: 'c-skills', name: 'skills' },
    { selector: 'c-projects', name: 'projects' },
    { selector: 'c-certifications', name: 'certifications' },
    { selector: 'c-timeline', name: 'experience' },
    { selector: 'c-contact', name: 'contact' }
];

const NAVBAR_OFFSET = 90;

// How far below the fixed navbar the "active line" sits. Whichever
// section occupies this line is the one that gets highlighted.
const MARKER_OFFSET = NAVBAR_OFFSET + 20;

// How close (in px) window.scrollY needs to land to our computed
// destination before a click-triggered scroll counts as "arrived".
const ARRIVAL_EPSILON = 2;

// Safety ceiling so a click-navigation lock can never get stuck (e.g.
// backgrounded tab throttling rAF, or a page too short to reach the
// computed target exactly).
const MAX_SETTLE_WAIT_MS = 3000;

export default class PortfolioApp extends LightningElement {
    sections = [];
    activeSection = '';

    initialized = false;
    observer;
    resizeHandler;
    isProgrammaticScroll = false;
    navigationFrame;
    intersectingSections = new Map();

    renderedCallback() {
        if (this.initialized) {
            return;
        }

        this.sections = SECTIONS
            .map(({ selector, name }) => ({
                name,
                element: this.template.querySelector(selector)
            }))
            .filter(({ element }) => element);

        if (!this.sections.length) {
            return;
        }

        this.initialized = true;

        this.setupObserver();

        // rootMargin below is computed from viewport height, so the
        // observer needs rebuilding whenever the viewport resizes.
        this.resizeHandler = () => this.setupObserver();
        window.addEventListener('resize', this.resizeHandler, { passive: true });
    }

    setupObserver() {
        if (!('IntersectionObserver' in window)) {
            // Extremely rare in practice - fall back to just marking
            // the first section active once, rather than building a
            // whole second detection system for a near-nonexistent case.
            if (this.sections.length) {
                this.setActiveSection(this.sections[0].name);
            }
            return;
        }

        if (this.observer) {
            this.observer.disconnect();
        }

        /*
         * Shrink the area IntersectionObserver checks against down to a
         * thin horizontal line sitting just below the fixed navbar.
         * Whichever section crosses that line is "active".
         *
         * The key benefit over a manual scroll-listener + getBoundingClientRect
         * approach: IntersectionObserver re-fires whenever the observed
         * geometry changes for ANY reason - real scrolling, a resize, or
         * an unrelated CSS transition (like c-scroll-reveal's fade/slide-in)
         * finishing. So if a section's reveal transform is still settling
         * the instant we check, this doesn't get stuck on a stale read the
         * way a one-off getBoundingClientRect() call could - the observer
         * simply fires again on its own once the transform finishes.
         */
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const bottomMargin = Math.max(0, viewportHeight - MARKER_OFFSET - 1);

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: `-${MARKER_OFFSET}px 0px -${bottomMargin}px 0px`,
                threshold: 0
            }
        );

        this.sections.forEach(({ element }) => this.observer.observe(element));
    }

    handleIntersection(entries) {
        /*
         * IntersectionObserver only reports entries whose status just
         * changed - not every observed target every time. So we persist
         * state per-section here rather than trusting a single batch to
         * reflect the full current picture.
         */
        entries.forEach((entry) => {
            this.intersectingSections.set(entry.target, entry.isIntersecting);
        });

        // Muted during a click-triggered scroll so the underline doesn't
        // flicker through every section the viewport passes on the way
        // to the target.
        if (this.isProgrammaticScroll) {
            return;
        }

        this.recomputeActiveFromIntersections();
    }

    recomputeActiveFromIntersections() {
        // Walk sections in document order and keep the LAST one
        // currently intersecting the marker line - if none are
        // intersecting (e.g. still up in the hero, above "about"),
        // that means nothing should be underlined.
        let winnerElement = null;

        for (const { element } of this.sections) {
            if (this.intersectingSections.get(element)) {
                winnerElement = element;
            }
        }

        if (!winnerElement) {
            this.clearActiveSection();
            return;
        }

        const match = this.sections.find(({ element }) => element === winnerElement);

        if (match) {
            this.setActiveSection(match.name);
        }
    }

    clearActiveSection() {
        if (this.activeSection === '') {
            return;
        }

        this.activeSection = '';

        const navbar = this.template.querySelector('c-navbar');

        if (navbar) {
            navbar.setActiveSection('');
        }
    }

    setActiveSection(section) {
        if (!section || section === this.activeSection) {
            return;
        }

        this.activeSection = section;

        const navbar = this.template.querySelector('c-navbar');

        if (navbar) {
            navbar.setActiveSection(section);
        }
    }

    handleNavigation(event) {
        const section = event.detail?.section;

        if (!section) {
            return;
        }

        const target = this.sections.find((item) => item.name === section);

        if (!target) {
            return;
        }

        /*
         * Show the clicked section as active immediately, and mute the
         * observer while we scroll so the underline doesn't flash
         * through intermediate sections during the animation.
         */
        this.isProgrammaticScroll = true;
        this.setActiveSection(section);

        this.cancelNavigationWatch();

        const rectBefore = target.element.getBoundingClientRect();
        const targetScrollY = window.scrollY + rectBefore.top;

        target.element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        this.watchScrollArrival(targetScrollY);
    }

    watchScrollArrival(targetScrollY) {
        const startTime = performance.now();

        const check = () => {
            const currentY = window.scrollY;
            const distance = Math.abs(currentY - targetScrollY);
            const timedOut = performance.now() - startTime > MAX_SETTLE_WAIT_MS;
            const atBottom =
                window.innerHeight + currentY >= document.documentElement.scrollHeight - 1;

            if (distance <= ARRIVAL_EPSILON || timedOut || atBottom) {
                this.navigationFrame = null;

                /*
                 * Just hand control back to the observer - no manual
                 * recompute. If a reveal transition is still finishing
                 * for this section, the observer will fire again on its
                 * own once that settles, so nothing can get permanently
                 * stuck on a stale read.
                 */
                this.isProgrammaticScroll = false;
                return;
            }

            this.navigationFrame = requestAnimationFrame(check);
        };

        this.navigationFrame = requestAnimationFrame(check);
    }

    cancelNavigationWatch() {
        if (this.navigationFrame) {
            cancelAnimationFrame(this.navigationFrame);
            this.navigationFrame = null;
        }
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        this.cancelNavigationWatch();
    }
}