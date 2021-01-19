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
            {
                title: 'Architecture',
                children: [
                    '/content/architecture/ddd',
                    '/content/architecture/rest',
                    '/content/architecture/microservices/',
                    '/content/architecture/eda',
                    '/content/architecture/architecting-applications-for-kubernetes',
                    '/content/architecture/12-factors',
                    '/content/architecture/object-calisthenics'
                ]
            },
            {
                title: 'Java Backend',
                children: [
                    '/content/java-backend/',
                    '/content/java-backend/datetime',
                    '/content/java-backend/logging',
                    '/content/java-backend/dto',
                    '/content/java-backend/force-not-null',
                    '/content/java-backend/wf-engine'
                ]
            },
            {
                title: 'Frontend',
                children: [
                    '/content/frontend/js-frameworks/javascript-frameworks-seo-challenges',
                    '/content/frontend/css/css-best-practices',
                    '/content/frontend/js-frameworks/angular-code-guidelines',
                    '/content/frontend/architecture/spa-applications-architecture',
                    '/content/frontend/architecture/micro-frontends'
                ]
            },
            {
                title: 'Database',
                children: [
                    '/content/database/',
                ]
            },
            {
                title: 'API',
                children: [
                    '/content/api/general-guidelines',
                    '/content/api/naming',
                    '/content/api/resources',
                    '/content/api/request-response',
                    '/content/api/http',
                    '/content/api/json-guidelines',
                    '/content/api/foundations',
                ]
            },
            {
                title: 'Testing',
                children: [
                    '/content/testing/backend',
                    '/content/testing/frontend'
                ]
            },
            {
                title: 'Git',
                children: [
                    '/content/git/tbd',
                    '/content/git/commit-message-guidelines'
                ]
            },
            {
                title: 'IAM',
                children: [
                    '/content/iam/basics'
                ]
            },
            {
                title: 'Kubernetes',
                children: [
                    '/content/kubernetes/requests-limits',
                    '/content/kubernetes/storage'
                ]
            }
        ],
        repo: 'https://github.com/stakater/developer-handbook',
        editLinks: true,
        editLinkText: 'Help us improve this page!'
    }
}
