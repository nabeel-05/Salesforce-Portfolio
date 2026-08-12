import { LightningElement } from 'lwc';

export default class Timeline extends LightningElement {
    items = [
        // {
        //     id: 1,
        //     // icon: '☁️',
        //     title: 'Salesforce Certified AI Associate',
        //     date: '2026',
        //     description: 'Certified Salesforce AI Associate demonstrating knowledge of AI concepts, responsible AI practices, and Salesforce AI capabilities.',
        //     skills: [
        //         'Salesforce AI',
        //         'Einstein',
        //         'AI Concepts'
        //     ]
        // },
        // {
        //     id: 2,
        //     // icon: '🏆',
        //     title: 'Salesforce Certified Administrator',
        //     date: '2026',
        //     description: 'Certified Salesforce Administrator with knowledge of platform configuration, security, automation, and user management.',
        //     skills: [
        //         'Security',
        //         'Flow Builder',
        //         'Data Management'
        //     ]
        // },
        {
            id: 1,
            // icon: '🚀',
            title: 'Salesforce Admin & Developer Intern at Cloud IgnitEd',
            date: 'Salesforce Project',
            description: 'Engineered custom LWC/Apex applications, REST API ERP integrations, and Flow automations, driving a 25% boost in operational efficiency and a 30% reduction in post-release issues.',
            skills: [
                'Experience Cloud',
                'LWC',
                'Apex'
            ]
        },
        {
            id: 2,
            // icon: '🚀',
            title: 'Salesforce Admin & Developer Trainee at Cloud IgnitEd',
            date: 'Feb 2026 - Jul 2026',
            description: 'Mastered full-stack Salesforce development and security architecture, building interactive LWCs, governor-limit-compliant Async Apex backends, and autonomous Agentforce AI workflows.',
            skills: [
                'Experience Cloud',
                'LWC',
                'Apex'
            ]
        },
        // {
        //     id: 4,
        //     // icon: '🤖',
        //     title: 'AI-Powered Agentforce Service Agent',
        //     date: 'Salesforce AI Project',
        //     description: 'Configured an Agentforce service agent using topics, actions, and Einstein Trust Layer to automate support interactions.',
        //     skills: [
        //         'Agentforce',
        //         'Einstein Trust Layer',
        //         'Prompt Engineering'
        //     ]
        // }
    ];
}