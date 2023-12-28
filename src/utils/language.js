const changeLocalLanguage = (value, targetObject) => {
    if (localStorage.getItem('language')) {
        localStorage.setItem('language', value)
        targetObject.locale = value
    }
}

export default changeLocalLanguage
