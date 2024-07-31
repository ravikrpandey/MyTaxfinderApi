module.exports = {
    perUserTypeMenu: [
        {
            role: 'Data Manager',
            menu: [
                {
                    title: 'Profile Update', link: '/client-user', icon: 'profile'
                },
                {
                    title: 'Configuration Management', icon: 'config-manage',
                    list: [
                        { title: 'Feed Setup', link: '/client-user/config-manage/feed-setup', icon: 'feed-setup', },
                        { title: 'User Setup', link: '/client-user/config-manage/user-setup', icon: 'user-setup', },
                        { title: 'Collaboration Group', link: '/client-user/config-manage/collaboration-group', icon: 'collab-group', },
                    ]
                },
                { title: 'Dashboard', icon: 'dashboard' },
                {
                    title: 'Support', icon: 'support',
                    list: [
                        { title: 'FAQ', link: '/client-user/support/faq', icon: 'faq' },
                        { title: 'Need Help?', link: '/client-user/support/need-help', icon: 'need-help' },
                        { title: 'Contact US', link: '/client-user/support/contact-us', icon: 'contact-us' },
                        { title: 'Testimonials', link: '/client-user/support/testimonials', icon: 'testimonials' },
                    ]
                },
            ]
        },
        {
            role: 'Power User',
            menu: [
                { title: 'Profile Update', link: '/client-user', icon: 'profile' },
                {
                    title: 'Configuration Management', icon: 'config-manage',
                    list: [
                        { title: 'Feed Setup view', link: '/client-user/config-manage/feed-setup/list-feed', icon: 'feed-setup', },
                        { title: 'User Setup view', link: '/client-user/config-manage/user-setup/list-user', icon: 'user-setup', },
                        { title: 'Collaboration Group', link: '/client-user/config-manage/collaboration-group', icon: 'collab-group', },
                        { title: 'Goals & Threshold Setup', link: '/client-user/config-manage/goals-and-threshold-setup', icon: 'collab-group', },
                        { title: 'Predictive & Prescriptive Analytics', link: '/client-user/config-manage/predictive-and-prescriptive-analytics', icon: 'collab-group', },
                        { title: 'Alerts & Notification Setup', link: '/client-user/config-manage/alerts-and-notification-setup', icon: 'collab-group', },
                    ]
                },
                { title: 'Dashboard', icon: 'dashboard' },
                {
                    title: 'Support', icon: 'support',
                    list: [
                        { title: 'FAQ', link: '/client-user/support/faq', icon: 'faq' },
                        { title: 'Need Help?', link: '/client-user/support/need-help', icon: 'need-help' },
                        { title: 'Contact US', link: '/client-user/support/contact-us', icon: 'contact-us' },
                        { title: 'Testimonials', link: '/client-user/support/testimonials', icon: 'testimonials' },
                    ]
                },]
        },
        {
            role: 'Executive',
            menu: [
                { title: 'Profile Update', link: '/client-user', icon: 'profile' },
                {
                    title: 'Configuration Management', icon: 'config-manage',
                    list: [
                        { title: 'Feed Setup view', link: '/client-user/config-manage/feed-setup/list-feed', icon: 'feed-setup' },
                        { title: 'User Setup view', link: '/client-user/config-manage/feed-setup/list-user', icon: 'user-setup', },
                        { title: 'Collaboration Group', link: '/client-user/config-manage/collaboration-group', icon: 'collab-group', },
                        { title: 'Goals & Threshold view', link: '/client-user/config-manage/goals-and-threshold-view', icon: 'collab-group', },
                        { title: 'Predictive & Prescriptive Analytics', link: '/client-user/config-manage/predictive-and-prescriptive-analytics', icon: 'collab-group', },
                        { title: 'Compare Industry', link: '/client-user/config-manage/compare-industry', icon: 'collab-group', },
                    ]
                },
                { title: 'Dashboard', icon: 'dashboard' },
                {
                    title: 'Support', icon: 'support',
                    list: [
                        { title: 'FAQ', link: '/client-user/support/faq', icon: 'faq' },
                        { title: 'Need Help?', link: '/client-user/support/need-help', icon: 'need-help' },
                        { title: 'Contact US', link: '/client-user/support/contact-us', icon: 'contact-us' },
                        { title: 'Testimonials', link: '/client-user/support/testimonials', icon: 'testimonials' },
                    ]
                },
            ]
        },
        {
            role: 'Consumer',
            menu: [
                { title: 'Profile Update', link: '/client-user', icon: 'profile' },
                {
                    title: 'Configuration Management', icon: 'config-manage',
                    list: [
                        { title: 'Feed Setup view', link: '/client-user/config-manage/feed-setup/list-feed', icon: 'feed-setup', },
                        { title: 'Collaboration Group', link: '/client-user/config-manage/collaboration-group', icon: 'collab-group', },
                    ]
                },
                { title: 'Dashboard', icon: 'dashboard' },
                {
                    title: 'Support', icon: 'support',
                    list: [
                        { title: 'FAQ', link: '/client-user/support/faq', icon: 'faq' },
                        { title: 'Need Help?', link: '/client-user/support/need-help', icon: 'need-help' },
                        { title: 'Contact US', link: '/client-user/support/contact-us', icon: 'contact-us' },
                        { title: 'Testimonials', link: '/client-user/support/testimonials', icon: 'testimonials' },
                    ]
                },
            ]
        }
    ]
}