module.exports = {
    title: 'Developer Handbook',
    description: 'Documentation for developers',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }]
    ],
    plugins: [
        [
            '@vuepress/active-header-links',
            '@vuepress/medium-zoom',
            '@vuepress/back-to-top',
            'vuepress-plugin-container'
        ],
    ],
    markdown: {
        lineNumbers: true,
        anchor: { permalink: false },
        // options for markdown-it-toc
        toc: { includeLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    },
    themeConfig: {
        smoothScroll: true,
        sidebar: [
            '/',
            {
                title: 'Architecture',
                children: [
                    '/architecture/ddd',
                    '/architecture/rest',
                    '/architecture/microservices/',
                    '/architecture/eda',
                    '/architecture/architecting-applications-for-kubernetes',
                    '/architecture/12-factors',
                    '/architecture/object-calisthenics'
                ]
            },
            {
                title: 'Java Backend',
                children: [
                    '/java-backend/',
                    '/java-backend/datetime',
                    '/java-backend/logging',
                    '/java-backend/dto',
                    '/java-backend/force-not-null',
                    '/java-backend/wf-engine'
                ]
            },
            {
                title: 'Frontend',
                children: [
                    '/frontend/js-frameworks/javascript-frameworks-seo-challenges',
                    '/frontend/css/css-best-practices',
                    '/frontend/js-frameworks/angular-code-guidelines',
                    '/frontend/architecture/spa-applications-architecture',
                    '/frontend/architecture/micro-frontends'
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
                    '/api/general-guidelines',
                    '/api/naming',
                    '/api/resources',
                    '/api/request-response',
                    '/api/http',
                    '/api/json-guidelines',
                    '/api/foundations',
                ]
            },
            {
                title: 'Testing',
                children: [
                    '/testing/backend',
                    '/testing/frontend'
                ]
            },
            {
                title: 'Git',
                children: [
                    '/git/tbd',
                    '/git/commit-message-guidelines'
                ]
            },
            {
                title: 'IAM',
                children: [
                    '/iam/basics'
                ]
            },
            {
                title: 'Kubernetes',
                children: [
                    '/kubernetes/requests-limits',
                    '/kubernetes/storage'
                ]
            }
        ],
        repo: 'https://github.com/stakater/developer-handbook',
        editLinks: true,
        editLinkText: 'Help us improve this page!'
    }
}
