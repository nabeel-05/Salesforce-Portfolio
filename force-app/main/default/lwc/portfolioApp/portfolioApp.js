import { LightningElement } from 'lwc';

export default class PortfolioApp extends LightningElement {
    observer;

    

    renderedCallback() {
        if (this.observer) {
            return;
        }
        this.setupSectionObserver();
    }

    setupSectionObserver() {
        const sections = this.template.querySelectorAll(
            'c-about, c-skills, c-projects, c-certifications, c-timeline, c-contact'
        );

        if (!sections.length) {
            return;
        }

        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let id = entry.target.localName.replace('c-', '');
                        
                        if (id === 'timeline') {
                            id = 'experience';
                        }

                        const navbar = this.template.querySelector('c-navbar');
                        if (navbar && typeof navbar.setActiveSection === 'function') {
                            navbar.setActiveSection(id);
                        }
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-10% 0px -40% 0px'
            }
        );

        sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    handleNavigation(event) {
    const sectionMap = {
        about: 'c-about',
        skills: 'c-skills',
        projects: 'c-projects',
        certifications: 'c-certifications',
        experience: 'c-timeline',
        contact: 'c-contact'
    };

    const targetSelector = sectionMap[event.detail.section];

    if (!targetSelector) {
        return;
    }

    const targetComponent = this.template.querySelector(targetSelector);

    if (targetComponent) {
        targetComponent.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
}