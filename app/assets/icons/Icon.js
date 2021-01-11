import Color from "../../config/Color";

const listIcon = {
    searchIcon: {
        type: 'ionicon',
        name: 'search-outline',
        color: 'grey'
    },
    sortIcon: {
        type: 'ionicon',
        name: 'chevron-down-outline',
        size: 16,
        color: Color.orange
    }
}

const detailIcon = {
    copyIcon: {
        type: "ionicon",
        name: "copy-outline",
        size: 14,
        color: Color.orange
    }
}

export {
    listIcon,
    detailIcon
}