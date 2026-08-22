import { LightningElement, api, wire } from 'lwc';
import { getContent } from 'experience/cmsDeliveryApi';
import siteId from '@salesforce/site/Id';
import PDFJS_VIEWER from '@salesforce/resourceUrl/pdfjsViewer';

const RESUME_KEY = 'MCAHJANR2AJ5BGVJERYYQUATY4PA';

export default class Navbar extends LightningElement {
    menuOpen = false;
    activeSection = '';

    resumeFileName = 'Resume.pdf';
    rawResumeUrl;
    pdfViewerUrl = PDFJS_VIEWER + '/web/viewer.html';

    showResumeModal = false;
    isLoadingPdf = false;
    viewerReady = false;
    pdfBase64 = null;

    @wire(getContent, {
        channelOrSiteId: siteId,
        contentKeyOrId: RESUME_KEY
    })
    wiredContent({ data }) {
        if (!data) return;

        const media = data?.contentBody?.['sfdc_cms:media'];
        const title = media?.title || media?.name || data?.title;
        if (title) {
            this.resumeFileName = title.toLowerCase().endsWith('.pdf')
                ? title
                : `${title}.pdf`;
        }

        // Build the URL manually using the same pattern as your working PNG.
        // The wire adapter often returns the internal site name instead of the public path.
        const sitePrefix = window.location.pathname.split('/').filter(Boolean)[0] || '';
        this.rawResumeUrl = `${window.location.origin}/${sitePrefix}/sfsites/c/cms/delivery/media/${RESUME_KEY}`;
    }

    connectedCallback() {
        window.addEventListener('message', this.handleViewerMessage);
    }

    disconnectedCallback() {
        window.removeEventListener('message', this.handleViewerMessage);
        window.removeEventListener('keydown', this.handleEscape);
    }

    handleViewerMessage = (event) => {
        if (event.origin !== window.location.origin) return;
        if (!event.data || typeof event.data !== 'object') return;

        if (event.data.type === 'pdf-viewer-ready') {
            this.viewerReady = true;
            this.sendPdfToViewer();
        }
    };

    async openResume(event) {
        event?.preventDefault();
        if (!this.rawResumeUrl) return;

        this.closeMenu();
        this.showResumeModal = true;
        this.isLoadingPdf = true;
        this.viewerReady = false;
        this.pdfBase64 = null;

        try {
            const response = await fetch(this.rawResumeUrl, {
                method: 'GET',
                credentials: 'same-origin',
                headers: { Accept: 'application/pdf,*/*' }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            this.pdfBase64 = await this.blobToBase64(blob);
            this.sendPdfToViewer();
        } catch (err) {
            console.error('PDF fetch failed:', err);
            this.isLoadingPdf = false;
            window.open(this.rawResumeUrl, '_blank');
            this.showResumeModal = false;
        }

        window.addEventListener('keydown', this.handleEscape);
    }

    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    sendPdfToViewer() {
        if (!this.pdfBase64 || !this.viewerReady) return;

        const iframe = this.template.querySelector('.document-frame');
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage(
                { type: 'load-pdf', data: this.pdfBase64 },
                window.location.origin
            );
            this.isLoadingPdf = false;
        }
    }

    closeResumeModal() {
        this.showResumeModal = false;
        this.pdfBase64 = null;
        this.viewerReady = false;
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
        if (!section) return '';
        return String(section).trim().toLowerCase().replace(/-\d+$/, '');
    }

    get navLinksClass() {
        return this.menuOpen ? 'nav-links active' : 'nav-links';
    }

    get hamburgerClass() {
        return this.menuOpen ? 'hamburger active' : 'hamburger';
    }

    get aboutClass() {
        return this.activeSection === 'about' ? 'nav-link active' : 'nav-link';
    }

    get skillsClass() {
        return this.activeSection === 'skills' ? 'nav-link active' : 'nav-link';
    }

    get projectsClass() {
        return this.activeSection === 'projects' ? 'nav-link active' : 'nav-link';
    }

    get experienceClass() {
        return this.activeSection === 'experience' ? 'nav-link active' : 'nav-link';
    }

    get certificationsClass() {
        return this.activeSection === 'certifications'
            ? 'nav-link active'
            : 'nav-link';
    }

    get contactClass() {
        return this.activeSection === 'contact' ? 'nav-link active' : 'nav-link';
    }

    handleNavigation(event) {
        this.closeMenu();
        const section = this.normalizeSection(
            event.currentTarget.dataset.section
        );
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { section },
                bubbles: true,
                composed: true
            })
        );
    }
    
handleLogoClick(event) {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    this.closeMenu();
}
}