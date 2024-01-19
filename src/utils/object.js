/**
 * Flatten all properties inside an object.
 * @param {Object} nestedObject - The object to be flattened.
 * @returns {Object} - Flattened object.
 */
export const flatObject = (nestedObject) => {
    return Object.assign({}, ...Object.values(nestedObject))
}

/**
 * Return the number of properties within the object.
 * @param {Object} object - Object for number of keys.
 * @returns {number} - The number of keys in the object.
 */
export const getObjectLength = (object) => {
    return Object.keys(object).length
}
