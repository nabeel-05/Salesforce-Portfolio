import { LightningElement } from 'lwc';

export default class Projects extends LightningElement {
    projects = [
    {
        id: 'salesforce-smart-scheduler',
        category: 'Salesforce • React & Apex',
        title: 'Salesforce Smart Scheduler',
        description: 'Dynamic scheduling platform with a React frontend and Salesforce backend for appointment management, availability tracking, conflict prevention, and Google Calendar synchronization.',
        technologies: [
            'React',
            'Apex',
            'REST API',
            'Google Calendar API'
        ],
        github: 'YOUR_GITHUB_LINK',
        demo: 'YOUR_LIVE_DEMO_LINK'
    },
    {
        id: 'salesforce-dynamic-form-builder',
        category: 'Salesforce • LWC',
        title: 'Salesforce Dynamic Form Builder',
        description: 'Metadata-driven form platform for creating dynamic, multi-step application forms with conditional rendering, branching logic, runtime validation, and reusable LWC components.',
        technologies: [
            'LWC',
            'Apex',
            'Experience Cloud'
        ],
        github: 'https://github.com/nabeel-05/Salesforce-Dynamic-Form-Builder',
        demo: 'https://cloudignited.my.site.com/form/'
    }
];
}