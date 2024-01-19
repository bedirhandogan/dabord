/**
 * Change language and update local storage.
 * @param {string} value - The language value to change.
 * @param {Object} instance - Instance of Vue component for language changes.
 */
const updateLanguage = (value, instance) => {
    if (localStorage.getItem('language')) {
        localStorage.setItem('language', value)
        instance.locale = value
    }
}

export default updateLanguage
