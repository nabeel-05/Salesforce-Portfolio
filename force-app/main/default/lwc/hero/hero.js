import { LightningElement, track } from 'lwc';

export default class Hero extends LightningElement {
    roles = [
        'Salesforce Admin & Developer',
        'LWC & Apex Specialist',
        'Agentforce & AI Builder',
        'CRM Automation Specialist'
    ];

    @track currentRole = '';
    roleIndex = 0;
    charIndex = 0;
    typingForward = true;
    interval;

    connectedCallback() {
        this.typeEffect();
    }

    typeEffect() {
        const role = this.roles[this.roleIndex];

        this.interval = setInterval(() => {
            if (this.typingForward) {
                this.currentRole = role.substring(0, this.charIndex + 1);
                this.charIndex++;

                if (this.charIndex === role.length) {
                    this.typingForward = false;
                    clearInterval(this.interval);
                    setTimeout(() => {
                        this.typeEffect();
                    }, 1500);
                }
            } else {
                this.currentRole = role.substring(0, this.charIndex - 1);
                this.charIndex--;

                if (this.charIndex === 0) {
                    this.typingForward = true;
                    this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                    clearInterval(this.interval);
                    setTimeout(() => {
                        this.typeEffect();
                    }, 500);
                }
            }
        }, 100);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }
    handleNavigation(event) {
    const section = event.currentTarget.dataset.section;

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
}