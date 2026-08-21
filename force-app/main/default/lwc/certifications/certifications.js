import { LightningElement } from 'lwc';

const CERTIFICATE_URL =
    'https://cloudignited.my.site.com/portfolio/sfsites/c/cms/delivery/media/MCIHPYBUAKXNBH7I3DDJUWLRGYL4';

export default class Certifications extends LightningElement {
    showCertificate = false;
    isLoadingImage = true;

    get certificateUrl() {
        return CERTIFICATE_URL;
    }

    get imageClass() {
        return this.isLoadingImage
            ? 'certificate-image is-hidden'
            : 'certificate-image';
    }

    handleViewCertificate() {
        this.isLoadingImage = true;
        this.showCertificate = true;
    }

    handleImageLoad() {
        this.isLoadingImage = false;
    }

    handleBack() {
        this.showCertificate = false;
    }
}