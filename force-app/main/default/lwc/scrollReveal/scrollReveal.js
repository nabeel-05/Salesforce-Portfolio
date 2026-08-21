import { LightningElement, api } from 'lwc';

const STAGGER_STEP = 0.08;
const STAGGER_CAP = 4;
const VISIBILITY_THRESHOLD = 0.12;

export default class ScrollReveal extends LightningElement {
    @api delayIndex = 0;

    _initialized = false;
    _revealEl;
    _observer;
    _resizeObserver;
    _scrollHandler;
    _resizeHandler;
    _rafId;
    _isChecking = false;

    renderedCallback() {
        if (this._initialized) {
            return;
        }

        this._initialized = true;

        requestAnimationFrame(() => {
            this.setup();
        });
    }

    setup() {
        const element = this.template.querySelector('.reveal');

        if (!element) {
            return;
        }

        this._revealEl = element;

        const index = Number(this.delayIndex) || 0;
        const variant = index % 4;
        const delay = (index % STAGGER_CAP) * STAGGER_STEP;

        element.dataset.variant = variant;
        element.style.setProperty('--reveal-delay', `${delay}s`);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.reveal();
            return;
        }

        this.setupIntersectionObserver();
        this.setupFallbackListeners();

        this.checkVisibility();
    }

    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            return;
        }

        try {
            this._observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    const visible =
                        entry.isIntersecting &&
                        entry.intersectionRatio >= VISIBILITY_THRESHOLD;

                    if (visible) {
                        this.reveal();
                    } else {
                        this.hide();
                    }
                },
                {
                    root: null,
                    rootMargin: '0px 0px -8% 0px',
                    threshold: [0, VISIBILITY_THRESHOLD]
                }
            );

            this._observer.observe(this._revealEl);
        } catch (error) {
            this._observer = undefined;
        }
    }

    setupFallbackListeners() {
        this._scrollHandler = () => this.scheduleVisibilityCheck();
        this._resizeHandler = () => this.scheduleVisibilityCheck();

        window.addEventListener('scroll', this._scrollHandler, {
            passive: true
        });

        window.addEventListener('resize', this._resizeHandler, {
            passive: true
        });

        if ('ResizeObserver' in window) {
            this._resizeObserver = new ResizeObserver(() => {
                this.scheduleVisibilityCheck();
            });

            this._resizeObserver.observe(this._revealEl);
        }
    }

    scheduleVisibilityCheck() {
        if (this._rafId) {
            return;
        }

        this._rafId = requestAnimationFrame(() => {
            this._rafId = undefined;
            this.checkVisibility();
        });
    }

    checkVisibility() {
        if (!this._revealEl || this._isChecking) {
            return;
        }

        this._isChecking = true;

        const rect = this._revealEl.getBoundingClientRect();
        const viewportHeight =
            window.innerHeight ||
            document.documentElement.clientHeight;

        const visibleHeight = Math.min(
            rect.bottom,
            viewportHeight
        ) - Math.max(rect.top, 0);

        const intersectionHeight = Math.max(0, visibleHeight);

        const isVisible =
            intersectionHeight >= rect.height * VISIBILITY_THRESHOLD ||
            (rect.top >= 0 && rect.top <= viewportHeight * 0.92);

        this._isChecking = false;

        if (isVisible) {
            this.reveal();
        } else {
            this.hide();
        }
    }

    reveal() {
        if (!this._revealEl) {
            return;
        }
        this._revealEl.classList.add('active');
    }

    hide() {
        if (!this._revealEl) {
            return;
        }
        this._revealEl.classList.remove('active');
    }

    cleanup() {
        if (this._observer) {
            this._observer.disconnect();
            this._observer = undefined;
        }

        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }

        if (this._scrollHandler) {
            window.removeEventListener('scroll', this._scrollHandler);
            this._scrollHandler = undefined;
        }

        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
            this._resizeHandler = undefined;
        }

        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = undefined;
        }
    }

    disconnectedCallback() {
        this.cleanup();
    }
}