export const SideBarData = [
    {
        key: 1,
        parentTitle: "",
        child: {
            childTitle: "Home",
            path: '/'
        }
    },
    {
        key: 2,
        parentTitle: "Image",
        child: [{
            childKey: 21,
            childTitle: "Add Image",
            path: '/addimage'
        },
        {
            childKey: 22,
            childTitle: "Image List",
            path: '/'
        }]
    },
    {
        key: 3,
        parentTitle: "Video",
        child: [{
            childKey: 31,
            childTitle: "Add Video",
            path: '/addvideo'
        },
        {

            childKey: 32,
            childTitle: "Video List",
            path: '/'
        }]
    },
    {
        key: 4,
        parentTitle: "Text",
        child: [{
            childKey: 41,
            childTitle: "Add Text",
            path: '/addtext'
        },
        {
            childKey: 42,
            childTitle: "Text List",
            path: '/'
        }]
    },
    {
        key: 5,
        parentTitle: "",
        child: {
            childTitle: "Notification",
            path: '/'
        }
    },
]