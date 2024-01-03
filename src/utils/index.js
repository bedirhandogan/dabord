import bcd from '@mdn/browser-compat-data'

export const getSupportList = (group, property) => {
    const support = bcd.css[group][property].__compat.support

    const getVersion = (value) => {
        const pattern = /\d+(\.\d+)?/

        if (Array.isArray(value)) {
            return value[0].version_added.match(pattern)[0]
        }

        if (typeof value === 'object' && typeof value.version_added === 'string') {
            return value.version_added.match(pattern)[0]
        }

        return value.version_added
    }

    return {
        chrome: {
            version_desktop: getVersion(support.chrome),
            version_mobile: getVersion(support.chrome_android)
        },
        edge: {
            version_desktop: getVersion(support.edge)
        },
        firefox: {
            version_desktop: getVersion(support.firefox),
            version_mobile: getVersion(support.firefox_android)
        },
        opera: {
            version_desktop: getVersion(support.opera),
            version_mobile: getVersion(support.opera_android)
        },
        safari: {
            version_desktop: getVersion(support.safari),
            version_mobile: getVersion(support.safari_ios)
        },
        samsung_internet: {
            version_mobile: getVersion(support.samsunginternet_android)
        },
        webview: {
            version_mobile: getVersion(support.webview_android)
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
