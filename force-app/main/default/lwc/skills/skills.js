import { LightningElement } from 'lwc';

export default class Skills extends LightningElement {

    skills = [
        {
            name: 'Programming Languages',
            description: 'Building software solutions across general-purpose and web programming environments.',
            tools: [
                'Java',
                'Python',
                'JavaScript (ES6+)'
            ]
        },

        {
            name: 'Frontend Technologies',
            description: 'Developing responsive, component-based user interfaces using modern web technologies and Salesforce UI frameworks.',
            tools: [
                'React',
                'HTML5',
                'CSS3',
                'Lightning Web Components (LWC)',
                'Salesforce Lightning Design System (SLDS)'
            ]
        },

        {
            name: 'Salesforce Development',
            description: 'Building scalable Salesforce solutions with custom backend logic, data querying, and asynchronous processing.',
            tools: [
                'Apex',
                'Triggers',
                'SOQL',
                'SOSL',
                'Batch Apex',
                'Queueable Apex',
                'Asynchronous Apex'
            ]
        },

        {
            name: 'Salesforce Configuration',
            description: 'Designing configurable Salesforce solutions using declarative automation, data modeling, and platform configuration.',
            tools: [
                'Custom Objects',
                'Object Relationships',
                'Validation Rules',
                'Approval Processes',
                'Flow Builder',
                'Custom Metadata Types'
            ]
        },

        {
            name: 'Security & Access Control',
            description: 'Implementing secure Salesforce architectures with granular data access and permission management.',
            tools: [
                'Profiles',
                'Permission Sets',
                'Organization-Wide Defaults (OWD)',
                'Role Hierarchy',
                'Sharing Rules',
                'CRUD/FLS'
            ]
        },

        {
            name: 'Integrations',
            description: 'Connecting Salesforce with external systems through secure APIs, authentication, and platform integration features.',
            tools: [
                'REST APIs',
                'SOAP APIs',
                'OAuth 2.0',
                'Named Credentials',
                'External Credentials',
                'Google Calendar API'
            ]
        },

        {
            name: 'Tools & Platforms',
            description: 'Using modern Salesforce development, version control, API testing, data management, and deployment tools.',
            tools: [
                'Salesforce DX (SFDX)',
                'Git',
                'GitHub',
                'VS Code',
                'Postman',
                'Data Loader',
                'Experience Cloud'
            ]
        },

        {
            name: 'AI & Automation',
            description: 'Building AI-powered Salesforce experiences and intelligent automation with trusted generative AI capabilities.',
            tools: [
                'Agentforce',
                'Einstein Activity Capture',
                'Einstein Trust Layer',
                'Prompt Engineering'
            ]
        }
    ];
}