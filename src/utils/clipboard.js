/**
 * Copy code snippet and notify user.
 * @param {Object} instance - Vue component instance for notification
 */
const copyCodeSnippetAndNotify = async (instance) => {
    const MILLISECONDS = 500

    try {
        await navigator.clipboard.writeText(instance.code)

        instance.isCopied = true
        setTimeout(() => (instance.isCopied = false), MILLISECONDS)
    } catch (error) {
        console.error('An error occurred:', error)
    }
}

export default copyCodeSnippetAndNotify
