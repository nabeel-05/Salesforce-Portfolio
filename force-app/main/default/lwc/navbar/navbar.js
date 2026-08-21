import { LightningElement, api, wire } from 'lwc';
import { getContent } from 'experience/cmsDeliveryApi';
import siteId from '@salesforce/site/Id';
import getResumeBase64 from '@salesforce/apex/ResumePdfController.getResumeBase64';
import PDFJS_VIEWER_BASE from '@salesforce/resourceUrl/pdfjsViewer';

export default class Navbar extends LightningElement {
    menuOpen = false;
    activeSection = '';

    rawResumeUrl;
    resumeFileName = 'Resume.pdf';

    showResumeModal = false;
    isLoadingPdf = false;
    pdfError = false;
    documentBase64;
    viewerReady = false;

    get pdfViewerUrl() {
        return `${PDFJS_VIEWER_BASE}/web/viewer.html`;
    }

    connectedCallback() {
        window.addEventListener('message', this.handlePdfViewerMessage);
    }

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
            this.rawResumeUrl = cmsUrl.startsWith('http')
                ? cmsUrl
                : `${window.location.origin}${cmsUrl}`;
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

    async openResume(event) {
        event?.preventDefault();

        if (!this.rawResumeUrl) {
            return;
        }

        this.closeMenu();

        this.showResumeModal = true;
        this.isLoadingPdf = true;
        this.pdfError = false;
        this.viewerReady = false;

        window.addEventListener('keydown', this.handleEscape);

        if (this.documentBase64) {
            // Data already fetched from a previous open — wait for the
            // freshly-rendered iframe's ready message to deliver it.
            return;
        }

        try {
            this.documentBase64 = await getResumeBase64({
                resumeUrl: this.rawResumeUrl
            });

            if (!this.documentBase64) {
                throw new Error('Resume PDF data was empty.');
            }

            this.tryDeliverPdf();
        } catch (error) {
            console.error(
                'Resume load failed:',
                error?.body?.message || error?.message || error
            );
            this.isLoadingPdf = false;
            this.pdfError = true;
        }
    }

    handlePdfViewerMessage = (event) => {
        const iframe = this.template.querySelector(
            '[data-id="pdf-frame"]'
        );

        if (!iframe || event.source !== iframe.contentWindow) {
            return;
        }

        let iframeOrigin;

        try {
            iframeOrigin = new URL(
                iframe.src,
                window.location.origin
            ).origin;
        } catch {
            return;
        }

        if (event.origin !== iframeOrigin) {
            return;
        }

        if (event.data?.type !== 'pdf-viewer-ready') {
            return;
        }

        this.viewerReady = true;
        this.tryDeliverPdf();
    };

    tryDeliverPdf() {
        // Either side (the iframe or the Apex callout) may still be in
        // flight - that's not an error, just not ready to deliver yet.
        if (!this.viewerReady || !this.documentBase64) {
            return;
        }

        const iframe = this.template.querySelector(
            '[data-id="pdf-frame"]'
        );

        if (!iframe) {
            return;
        }

        let iframeOrigin;

        try {
            iframeOrigin = new URL(
                iframe.src,
                window.location.origin
            ).origin;
        } catch {
            this.isLoadingPdf = false;
            this.pdfError = true;
            return;
        }

        const cleanBase64 = this.documentBase64
            .replace(/^data:application\/pdf;base64,/, '')
            .replace(/\s/g, '');

        try {
            iframe.contentWindow.postMessage(
                {
                    type: 'load-pdf',
                    data: cleanBase64
                },
                iframeOrigin
            );

            this.isLoadingPdf = false;
        } catch {
            this.isLoadingPdf = false;
            this.pdfError = true;
        }
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
            'message',
            this.handlePdfViewerMessage
        );

        window.removeEventListener(
            'keydown',
            this.handleEscape
        );
    }
}