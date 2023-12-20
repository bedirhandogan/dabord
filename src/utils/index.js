import bcd from '@mdn/browser-compat-data'
import testers from '@/components/testers'

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

const copyCodeSnippetAndNotify = (targetObject) => {
    targetObject.isCopied = true
    navigator.clipboard.writeText(targetObject.code)

    setTimeout(() => (targetObject.isCopied = false), 500)
}

const flatObject = (object) => {
    return Object.assign({}, ...Object.values(object))
}

const getObjectLength = (object) => {
    return Object.keys(object).length
}

export { getSupportList, getReferenceURL, copyCodeSnippetAndNotify, flatObject, getObjectLength }
