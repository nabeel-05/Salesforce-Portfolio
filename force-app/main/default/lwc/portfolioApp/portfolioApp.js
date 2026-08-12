import { LightningElement } from 'lwc';

export default class PortfolioApp extends LightningElement {
    observer;

    connectedCallback() {
        this.template.addEventListener('click', event => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) {
                return;
            }

            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            event.preventDefault();

            let componentSelector = '';
            if (targetId === '#about') {
                componentSelector = 'c-about';
            } else if (targetId === '#skills') {
                componentSelector = 'c-skills';
            } else if (targetId === '#projects') {
                componentSelector = 'c-projects';
            } else if (targetId === '#certifications') {
                componentSelector = 'c-certifications';
            } else if (targetId === '#experience') {
                componentSelector = 'c-timeline';
            } else if (targetId === '#contact') {
                componentSelector = 'c-contact';
            } else if (targetId === '#home') {
                componentSelector = 'c-hero';
            }

            const targetComponent = this.template.querySelector(componentSelector);
            if (targetComponent) {
                targetComponent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

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
}