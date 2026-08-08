import { LightningElement } from 'lwc';

export default class Projects extends LightningElement {

    projects = [
        {
            id: 'career-page',
            category: 'Salesforce • Experience Cloud',
            title: 'Candidate Career Page',
            description: 'Public recruitment portal built with Experience Cloud, LWC and Apex, featuring job listings, candidate applications and resume uploads.',
            technologies: [
                'Experience Cloud',
                'LWC',
                'Apex',
                'SFDX',
                'ContentVersion'
            ],
            github: 'https://github.com/nabeel-05/Candidate-Career-Page',
            demo: ''
        },

        {
            id: 'onboarding',
            category: 'Salesforce • Automation',
            title: 'Employee Onboarding System',
            description: 'Automated HR onboarding workflows using Record-Triggered Flows, custom objects and role-based security.',
            technologies: [
                'Flow Builder',
                'Custom Objects',
                'Permission Sets',
                'FLS',
                'Security'
            ],
            github: '',
            demo: ''
        },

        {
            id: 'case-management',
            category: 'Salesforce • Integration',
            title: 'Case Management REST Integration',
            description: 'Integrated Salesforce case data with an external REST API using asynchronous Apex callouts and a bulkified trigger framework.',
            technologies: [
                'Apex REST',
                'HTTP Callouts',
                'Triggers',
                'Async Apex',
                'Unit Testing'
            ],
            github: '',
            demo: ''
        },

        {
            id: 'agentforce',
            category: 'Salesforce • AI',
            title: 'AI-Powered Agentforce Service Agent',
            description: 'Configured an autonomous Agentforce service agent with grounded responses, topics and actions using the Einstein Trust Layer.',
            technologies: [
                'Agentforce',
                'Einstein Trust Layer',
                'AI',
                'Prompt Engineering'
            ],
            github: '',
            demo: ''
        }
    ];
}