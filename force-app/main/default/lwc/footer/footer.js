import { LightningElement } from 'lwc';

export default class Footer extends LightningElement {
    get currentYear() {
        return new Date().getFullYear();
    }
}