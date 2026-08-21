import { LightningElement, api, wire } from 'lwc';
import { getContent } from 'experience/cmsDeliveryApi';
import siteId from '@salesforce/site/Id';

export default class Navbar extends LightningElement {
    menuOpen = false;
    activeSection = '';

    rawResumeUrl;
    resumeFileName = 'Resume.pdf';

    showResumeModal = false;
    isLoadingPdf = false;

    @wire(getContent, {
        channelOrSiteId: siteId,
        contentKeyOrId: 'MCPEM3BZKW4NHA7A3JBWF5FKJIXY'
    })
    wiredContent({ data }) {
        if (!data) {
            return;
        }

        const media = data?.contentBody?.['sfdc_cms:media'];

        if (!media) {
            return;
        }

        const cmsUrl = media.url;

        if (cmsUrl) {
            const normalizedCmsUrl = cmsUrl.includes('/sfsites/c/')
                ? cmsUrl
                : cmsUrl.replace(
                    '/cms/delivery/media/',
                    '/sfsites/c/cms/delivery/media/'
                );

            this.rawResumeUrl = normalizedCmsUrl.startsWith('http')
                ? normalizedCmsUrl
                : `${window.location.origin}${normalizedCmsUrl}`;
        }

        const title = media.title || media.name;

        if (title) {
            this.resumeFileName = title
                .toLowerCase()
                .endsWith('.pdf')
                ? title
                : `${title}.pdf`;
        }
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
        this.menuOpen = false;
    }

    @api
    setActiveSection(section) {
        this.activeSection = this.normalizeSection(section);
    }

    normalizeSection(section) {
        if (!section) {
            return '';
        }

        return String(section)
            .trim()
            .toLowerCase()
            .replace(/-\d+$/, '');
    }

    get navLinksClass() {
        return this.menuOpen
            ? 'nav-links active'
            : 'nav-links';
    }

    get hamburgerClass() {
        return this.menuOpen
            ? 'hamburger active'
            : 'hamburger';
    }

    get aboutClass() {
        return this.activeSection === 'about'
            ? 'nav-link active'
            : 'nav-link';
    }

    get skillsClass() {
        return this.activeSection === 'skills'
            ? 'nav-link active'
            : 'nav-link';
    }

    get projectsClass() {
        return this.activeSection === 'projects'
            ? 'nav-link active'
            : 'nav-link';
    }

    get experienceClass() {
        return this.activeSection === 'experience'
            ? 'nav-link active'
            : 'nav-link';
    }

    get certificationsClass() {
        return this.activeSection === 'certifications'
            ? 'nav-link active'
            : 'nav-link';
    }

    get contactClass() {
        return this.activeSection === 'contact'
            ? 'nav-link active'
            : 'nav-link';
    }

    handleNavigation(event) {
        this.closeMenu();

        const section = this.normalizeSection(
            event.currentTarget.dataset.section
        );

        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    section
                },
                bubbles: true,
                composed: true
            })
        );
    }

    openResume(event) {
        event?.preventDefault();

        if (!this.rawResumeUrl) {
            return;
        }

        this.closeMenu();
        this.showResumeModal = true;
        this.isLoadingPdf = true;

        window.addEventListener('keydown', this.handleEscape);
    }

    handleIframeLoad() {
        this.isLoadingPdf = false;
    }

    closeResumeModal() {
        this.showResumeModal = false;
        window.removeEventListener('keydown', this.handleEscape);
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    handleEscape = (event) => {
        if (event.key === 'Escape') {
            this.closeResumeModal();
        }
    };

    disconnectedCallback() {
        window.removeEventListener(
            'keydown',
            this.handleEscape
        );
    }
}