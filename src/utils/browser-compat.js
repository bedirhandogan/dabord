import bcd from '@mdn/browser-compat-data'

/**
 * Return the object containing the browser and property state
 * @param {string} group - Group name in browser compatibility.
 * @param {string} feature - Feature name in browser compatibility data.
 * @returns {Object} - Object containing browser support status.
 */
export const getBrowserSupportList = (group, feature) => {
    const block = bcd.css[group][feature].__compat.support

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
            version_desktop: getVersion(block.chrome),
            version_mobile: getVersion(block.chrome_android)
        },
        edge: {
            version_desktop: getVersion(block.edge)
        },
        firefox: {
            version_desktop: getVersion(block.firefox),
            version_mobile: getVersion(block.firefox_android)
        },
        opera: {
            version_desktop: getVersion(block.opera),
            version_mobile: getVersion(block.opera_android)
        },
        safari: {
            version_desktop: getVersion(block.safari),
            version_mobile: getVersion(block.safari_ios)
        },
        samsung_internet: {
            version_mobile: getVersion(block.samsunginternet_android)
        },
        webview: {
            version_mobile: getVersion(block.webview_android)
        }
    }
}

/**
 * Return the URL of the property's MDN web document.
 * @param {string} group - Group name in browser compatibility.
 * @param {string} feature - Feature name in browser compatibility data.
 * @returns {string} - The URL of the MDN web document.
 */
export const getFeatureReferenceURL = (group, feature) => {
    return bcd.css[group][feature].__compat.mdn_url
}
