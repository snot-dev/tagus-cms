module.exports = [
    {
        _id: "5a017a9e83dd7214c8661648",
        name: "Plain Text",
        alias: "plainText",
        templates: [
                "master",
                "about",
                "services",
                "contact"
        ],
        edited: new Date(),
        created: new Date(),
        createdBy: "System",
        tabs: [
            {
                name: "Default",
                alias: "default",
                fields: [
                    {
                        name: "Title",
                        alias: "title",
                        type: "text",
                        required: true
                    },
                    {
                        name: "Sub Title",
                        alias: "subTitle",
                        type: "text",
                        required: false
                    },
                    {
                        name: "Link",
                        alias: "link",
                        type: "text",
                        required: false
                    },
                    {
                        name: "Link Text",
                        alias: "linkText",
                        type: "text",
                        required: false
                    }
                ]
            }
        ]
    },
    {
        _id: "5a017b9883dd7214c866164a",
        name: "Icon",
        alias: "icon",
        templates: [ 
                "master",
                "services",
                "contact"
        ],
        edited: new Date(),
        created: new Date(),
        createdBy: "System",
        tabs: [
            {
                name: "Default",
                alias: "default",
                fields: [
                    {
                        name: "Icon",
                        alias: "icon",
                        type: "text",
                        required: true
                    },
                    {
                        name: "Text",
                        alias: "text",
                        type: "text",
                        required: true
                    },
                    {
                        name: "Sub Text",
                        alias: "subText",
                        type: "text",
                        required: false
                    }
                ]
            }
        ]
    }
]