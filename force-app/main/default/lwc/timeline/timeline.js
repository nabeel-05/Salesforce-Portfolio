import { LightningElement } from 'lwc';

export default class Timeline extends LightningElement {


    items = [


        {
            id:1,

            icon:'☁️',

            title:'Salesforce Certified AI Associate',

            date:'2026',

            description:
            'Certified Salesforce AI Associate demonstrating knowledge of AI concepts, responsible AI practices, and Salesforce AI capabilities.',

            skills:[
                'Salesforce AI',
                'Einstein',
                'AI Concepts'
            ]
        },


        {
            id:2,

            icon:'🏆',

            title:'Salesforce Certified Administrator',

            date:'2026',

            description:
            'Certified Salesforce Administrator with knowledge of platform configuration, security, automation, and user management.',

            skills:[
                'Security',
                'Flow Builder',
                'Data Management'
            ]
        },


        {
            id:3,

            icon:'🚀',

            title:'Candidate Career Page',

            date:'Salesforce Project',

            description:
            'Developed a public recruitment portal using Experience Cloud, LWC, Apex, and Salesforce DX with optimized candidate workflows.',

            skills:[
                'Experience Cloud',
                'LWC',
                'Apex'
            ]
        },


        {
            id:4,

            icon:'🤖',

            title:'AI-Powered Agentforce Service Agent',

            date:'Salesforce AI Project',

            description:
            'Configured an Agentforce service agent using topics, actions, and Einstein Trust Layer to automate support interactions.',

            skills:[
                'Agentforce',
                'Einstein Trust Layer',
                'Prompt Engineering'
            ]
        }


    ];


}