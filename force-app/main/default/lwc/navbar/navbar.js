import { LightningElement, api } from 'lwc';

export default class Navbar extends LightningElement {
    menuOpen = false;
    activeSection = '';

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
        this.menuOpen = false;
    }

    @api
    setActiveSection(section) {
        this.activeSection = section;
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

get contactClass() {
    return this.activeSection === 'contact' ? 'nav-link active' : 'nav-link';
}
get certificationsClass() {
    return this.activeSection === 'certifications' ? 'active' : '';
}
    handleNavigation(event) {
    this.closeMenu();

    const section = event.currentTarget.dataset.section;

    this.dispatchEvent(
        new CustomEvent('navigate', {
            detail: { section },
            bubbles: true,
            composed: true
        })
    );

}

}