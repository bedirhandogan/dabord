import bcd from '@mdn/browser-compat-data'

const getSupportList = (group, property) => {
    const support = bcd.css[group][property].__compat.support

    return {
        chrome: {
            version_desktop: support.chrome.version_added,
            version_mobile: support.chrome_android.version_added
        },
        edge: {
            version_desktop: support.edge.version_added
        },
        firefox: {
            version_desktop: support.firefox.version_added,
            version_mobile: support.firefox_android.version_added
        },
        opera: {
            version_desktop: support.opera.version_added,
            version_mobile: support.opera_android.version_added
        },
        safari: {
            version_desktop: support.safari.version_added,
            version_mobile: support.safari_ios.version_added
        },
        samsung_internet: {
            version_mobile: support.samsunginternet_android.version_added
        },
        webview: {
            version_mobile: support.webview_android.version_added
        }
    }
}

const getReferenceURL = (group, property) => {
    const url = bcd.css[group][property].__compat.mdn_url

    return url
}

export { getSupportList, getReferenceURL }
