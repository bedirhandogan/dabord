import bcd from '@mdn/browser-compat-data'

export const getSupportList = (group, property) => {
    const support = bcd.css[group][property].__compat.support

    const removeCharacter = (value) => {
        const pattern = /\d+(\.\d+)?/

        if (typeof value === 'string') {
            return parseFloat(value.match(pattern))
        }

        return value
    }

    return {
        chrome: {
            version_desktop: removeCharacter(support.chrome.version_added),
            version_mobile: removeCharacter(support.chrome_android.version_added)
        },
        edge: {
            version_desktop: removeCharacter(support.edge.version_added)
        },
        firefox: {
            version_desktop: removeCharacter(support.firefox.version_added),
            version_mobile: removeCharacter(support.firefox_android.version_added)
        },
        opera: {
            version_desktop: removeCharacter(support.opera.version_added),
            version_mobile: removeCharacter(support.opera_android.version_added)
        },
        safari: {
            version_desktop: removeCharacter(support.safari.version_added),
            version_mobile: removeCharacter(support.safari_ios.version_added)
        },
        samsung_internet: {
            version_mobile: removeCharacter(support.samsunginternet_android.version_added)
        },
        webview: {
            version_mobile: removeCharacter(support.webview_android.version_added)
        }
    }
}

export const getReferenceURL = (group, property) => {
    return bcd.css[group][property].__compat.mdn_url
}

export const copyCodeSnippetAndNotify = (targetObject) => {
    targetObject.isCopied = true
    navigator.clipboard.writeText(targetObject.code)

    setTimeout(() => (targetObject.isCopied = false), 500)
}
