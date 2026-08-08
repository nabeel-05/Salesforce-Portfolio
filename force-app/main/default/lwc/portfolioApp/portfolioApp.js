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
                // Dynamically support whichever component tag name exists for experience
                componentSelector = this.template.querySelector('c-experience') ? 'c-experience' : 'c-timeline';
            } else if (targetId === '#contact') {
                componentSelector = 'c-contact';
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
        // Query all possible section tags, covering both c-experience and c-timeline variations
        const sections = this.template.querySelectorAll(
            'c-about, c-skills, c-projects, c-certifications, c-timeline, c-experience, c-contact'
        );

        if (!sections.length) {
            return;
        }

        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let id = entry.target.localName.replace('c-', '');
                        
                        // Map both variants back to 'experience' for navbar matching
                        if (id === 'timeline' || id === 'experience') {
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