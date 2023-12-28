export const flatObject = (object) => {
    return Object.assign({}, ...Object.values(object))
}

export const getObjectLength = (object) => {
    return Object.keys(object).length
}
