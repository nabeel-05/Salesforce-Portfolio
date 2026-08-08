import { LightningElement } from 'lwc';

export default class Skills extends LightningElement {
    skills = [
        {
            name: 'Salesforce Development',
            icon: '☁️',
            description: 'Building scalable backend logic, queries, and reactive user interfaces on the platform.',
            tools: [
                'Apex (Triggers, Batch, Queueable)',
                'LWC',
                'SOQL/SOSL',
                'Async Apex'
            ]
        },
        {
            name: 'Declarative & Security',
            icon: '🔐',
            description: 'Designing low-code automated workflows and secure, role-based data architectures.',
            tools: [
                'Flow Builder',
                'Validation Rules',
                'Approval Processes',
                'Profiles',
                'Permission Sets',
                'OWD',
                'Sharing Rules'
            ]
        },
        {
            name: 'Integrations & Portals',
            icon: '🔗',
            description: 'Connecting external systems via APIs and creating public-facing Experience Cloud portals.',
            tools: [
                'REST/SOAP Integration',
                'Experience Cloud',
                'Data Loader',
                'Postman'
            ]
        },
        {
            name: 'AI & Methodologies',
            icon: '🤖',
            description: 'Implementing autonomous AI solutions, trust layers, and structured engineering practices.',
            tools: [
                'Agentforce',
                'Einstein Trust Layer',
                'Prompt Engineering',
                'Agile/Scrum',
                'Software Engineering Principles'
            ]
        },
        {
            name: 'Programming & Core CS',
            icon: '💻',
            description: 'Strong foundation in multi-paradigm software development, web standards, and computer science.',
            tools: [
                'Python',
                'C',
                'C++',
                'JavaScript (ES6+)',
                'HTML5/CSS3',
                'OOPs'
            ]
        },
        {
            name: 'Platform Tools & DevOps',
            icon: '🛠️',
            description: 'Using modern version control, source-driven development pipelines, and IDEs.',
            tools: [
                'Git',
                'GitHub',
                'Salesforce DX (SFDX)',
                'VS Code'
            ]
        }
    ];
}