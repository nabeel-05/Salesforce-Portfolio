import { LightningElement } from 'lwc';

export default class Projects extends LightningElement {
    projects = [
        {
            id: 'candidate-career-page',
            category: 'Salesforce • Experience Cloud',
            title: 'Candidate Career Page',
            description: 'Public recruitment portal featuring master-detail applicant tracking, reactive LWCs for job discovery, resume uploads via lightning-file-upload, automated email verification via Flow, and reCAPTCHA v2 security.',
            technologies: [
                'Experience Cloud',
                'LWC',
                'Apex',
                'Flow Builder',
                'SFDX'
            ],
            github: 'https://github.com/nabeel-05/Candidate-Career-Page',
            demo: 'https://cloudignited.my.site.com/careers/'
        },
        {
            id: 'developer-portfolio',
            category: 'Salesforce • LWC',
            title: 'Salesforce Developer Portfolio',
            description: 'Interactive portfolio built with Experience Cloud and Lightning Web Components to showcase technical projects and career milestones, complete with custom CSS animations and mobile-responsive layout.',
            technologies: [
                'Experience Cloud',
                'LWC',
                'JavaScript (ES6+)',
                'HTML5 / CSS3',
                'SFDX'
            ],
            github: 'https://github.com/nabeel-05/Salesforce-Portfolio',
            demo: 'https://cloudignited.my.site.com/portfolio/'
        },
        // {
        //     id: 'customer-onboarding',
        //     category: 'Salesforce • Apex & LWC',
        //     title: 'Dynamic Customer Onboarding Interface',
        //     description: 'Architected a dynamic onboarding interface using Apex and Lightning Components, increasing operational efficiency by 25% and reducing manual lead conversion errors.',
        //     technologies: [
        //         'LWC',
        //         'Apex',
        //         'Record-Triggered Flow',
        //         'SOQL',
        //         'SLDS'
        //     ],
        //     github: '',
        //     demo: ''
        // },
        // {
        //     id: 'erp-integration-agentforce',
        //     category: 'Salesforce • REST API & AI',
        //     title: 'ERP REST Integration & Agentforce AI',
        //     description: 'Integrated Salesforce with external ERP systems via REST APIs and Async Apex batch jobs for real-time visibility, alongside autonomous Agentforce AI agent workflows grounded in enterprise data.',
        //     technologies: [
        //         'REST API',
        //         'Async Apex',
        //         'Agentforce',
        //         'Einstein Trust Layer',
        //         'Batch Apex'
        //     ],
        //     github: '',
        //     demo: ''
        // }
    ];
}