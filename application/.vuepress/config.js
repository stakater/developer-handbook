module.exports = {
    title: 'Developer Handbook',

    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }]
    ],

    themeConfig: {
        sidebar: [
            '/',
            {
                title: 'Architecture',
                children: [
                    '/architecture/ddd',
                    '/architecture/rest',
                    '/architecture/microservices/',
                ]
            },
            {
                title: 'Java Backend',
                children: [
                    '/java-backend/',
                    '/java-backend/datetime',
                    '/java-backend/logging',                    
                ]
            },
            {
                title: 'Database',
                children: [
                    '/database/',
                ]
            },
            {
                title: 'API',
                children: [
                    '/api/naming',
                    '/api/resources',
                    '/api/request-response',
                ]
            }
        ],

        repo: 'stakater/developer-handbook',
        editLinks: true,
        editLinkText: 'Help us improve this page!'
    }
}
