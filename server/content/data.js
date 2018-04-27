module.exports = [
    {
        _id: "5a01809eefef172e54fb10cd",
        name: "Home",
        alias: "home",
        url: "/",
        createdBy: "System",
        unitType: "5a017a9e83dd7214c8661648",
        partial: null,
        template: "master",
        isHome: true,
        published: true,
        children: [
            "5a0181a26602223bd865660c",
            "5a01836b79194430c8f98806",
            "5a01884e905c9938fc6f011b",
        ],
        content: {
            default: {
                title: "Your Favorite Source of Free Bootstrap Themes",
                subTitle: "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
                link: "#about",
                linkText: "Find Out More"
            }
        }
    },
    {
        _id: "5a0181a26602223bd865660c",
        name: "About",
        alias: "about",
        url: "/about",
        createdBy: "System",
        unitType: "5a017a9e83dd7214c8661648",
        partial: "about",
        template: "master",
        isHome: false,
        parent: "5a01809eefef172e54fb10cd",
        published: false,
        accessible: true,
        content: {
            default: {
                title: "We've got what you need!",
                subTitle: "Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!",
                link: "#services",
                linkText: "Get Started!"
            }
        }
    },
    {
        _id: "5a01836b79194430c8f98806",
        name: "Services",
        alias: "services",
        url: "/services",
        createdBy: "System",
        unitType: "5a017a9e83dd7214c8661648",
        partial: "services",
        template: "master",
        isHome: false,
        parent: "5a01809eefef172e54fb10cd",
        children: [
            "5a01851a8c32cb0f28743b50",
            "5a01859a73651028d88370f1",
            "5a01865f9ab1c136a80fb6e9",
            "5a018702ae30463a68797893"
        ],
        published: false,
        accessible: true,
        content: {
            default: {
                title: "At Your Service"
            }
        }
    },
    {
        _id: "5a01851a8c32cb0f28743b50",
        name: "Templates",
        alias: "templates",
        url: "/services/templates",
        createdBy: "System",
        unitType: "5a017b9883dd7214c866164a",
        partial: "services",
        template: "master",
        isHome: false,
        parent: "5a01836b79194430c8f98806",
        nav: false,
        published: false,
        accessible: true,
        content: {
            default: {
                icon: "fa-diamond",
                text: "Sturdy Templates",
                subText: "Our templates are updated regularly so they don't break."
            }
        }
    },
    {
        _id: "5a01859a73651028d88370f1",
        name: "Ship",
        alias: "ship",
        url: "/services/ship",
        createdBy: "System",
        unitType: "5a017b9883dd7214c866164a",
        partial: "services",
        template: "master",
        isHome: false,
        parent: "5a01836b79194430c8f98806",
        nav: false,
        accessible: true,
        published: false,
        content: {
            default: {
                icon: "fa-paper-plane",
                text: "Ready to Ship",
                subText: "You can use this theme as is, or you can make changes!"
            }
        }
    },
    {
        _id: "5a01865f9ab1c136a80fb6e9",
        name: "Up to Date",
        alias: "upToDate",
        url: "/services/uptodate",
        createdBy: "System",
        unitType: "5a017b9883dd7214c866164a",
        partial: "services",
        template: "master",
        isHome: false,
        parent: "5a01836b79194430c8f98806",
        nav: false,
        accessible: true,
        published: false,
        content: {
            default: {
                icon: "fa-newspaper-o",
                text: "Up to Date",
                subText: "We update dependencies to keep things fresh."
            }
        }
    },
    {
        _id: "5a018702ae30463a68797893",
        name: "Made With Love",
        alias: "madeWithLove",
        url: "/services/madewithlove",
        createdBy: "System",
        unitType: "5a017b9883dd7214c866164a",
        partial: "services",
        template: "master",
        isHome: false,
        parent: "5a01836b79194430c8f98806",
        nav: false,
        accessible: true,
        published: false,
        content: {
            default: {
                icon: "fa-heart",
                text: "Made with Love",
                subText: "You have to make your websites with love these days!"
            }
        }
    },
    {
        _id: "5a01884e905c9938fc6f011b",
        name: "Contact",
        alias: "contact",
        url: "/contact",
        createdBy: "System",
        unitType: "5a017a9e83dd7214c8661648",
        partial: "contact",
        template: "master",
        isHome: false,
        parent: "5a01809eefef172e54fb10cd",
        children: [
            "5a0189329f69783b4035f0fc",
            "5a0189b52f70e724104dab89"
        ],
        published: false,
        accessible: true,
        content: {
            default: {
                title: "Let's Get In Touch!",
                subtitle: "Ready to start your next project with us? That's great! Give us a call or send us an email and we will get back to you as soon as possible!"
            }
        }
    },
    {
        _id: "5a0189329f69783b4035f0fc",
        name: "Phone",
        alias: "phone",
        url: "/contact/phone",
        createdBy: "System",
        unitType: "5a017b9883dd7214c866164a",
        partial: "contact",
        template: "master",
        isHome: false,
        nav: false,
        parent: "5a01884e905c9938fc6f011b",
        published: false,
        accessible: true,
        content: {
            default: {
                icon: "fa-phone",
                text: "123-456-6789"
            }
        }
    },
    {
        _id: "5a0189b52f70e724104dab89",
        name: "Email",
        alias: "email",
        url: "/contact/email",
        createdBy: "System",
        unitType: "5a017b9883dd7214c866164a",
        partial: "contact",
        template: "master",
        isHome: false,
        nav: false,
        parent: "5a01884e905c9938fc6f011b",
        published: false,
        accessible: true,
        content: {
            default: {
                icon: "fa-envelope-o",
                text: "feedback@startbootstrap.com"
            }
        }
    }
]