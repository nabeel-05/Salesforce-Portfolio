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
        return this.activeSection === 'about' ? 'active' : '';
    }

    get skillsClass() {
        return this.activeSection === 'skills' ? 'active' : '';
    }

    get projectsClass() {
        return this.activeSection === 'projects' ? 'active' : '';
    }

    get experienceClass() {
        return this.activeSection === 'experience' ? 'active' : '';
    }

    get contactClass() {
        return this.activeSection === 'contact' ? 'active' : '';
    }
}