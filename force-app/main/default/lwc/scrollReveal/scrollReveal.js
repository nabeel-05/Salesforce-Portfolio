import { LightningElement } from 'lwc';

export default class ScrollReveal extends LightningElement {
    observer;

    renderedCallback() {
        const revealElements = this.template.querySelectorAll('.reveal');

        if (!revealElements.length) {
            return;
        }

        // Automatically assign staggered delays to grid items for a fluid wave effect
        revealElements.forEach((el, index) => {
            const delay = (index % 4) * 0.12; // Cascading delay per item in a row
            el.style.transitionDelay = `${delay}s`;
        });

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('active'));
            return;
        }

        if (this.observer) {
            return;
        }

        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
                        entry.target.classList.add('active');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        revealElements.forEach(element => {
            this.observer.observe(element);
            
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('active');
                this.observer.unobserve(element);
            }
        });
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}