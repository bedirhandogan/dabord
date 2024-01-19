/**
 * Give coordinates on a specific axis.
 * @param {Event} event - Event for mouse or touch gesture.
 * @param {string} axis - The coordinate axis to rotate.
 * @returns {number} - The coordinate value on the specified axis.
 */
export const getCrossPlatformCoordinate = (event, axis) => {
    if (event.touches === undefined) {
        return {
            x: event.clientX,
            y: event.clientY
        }[axis]
    }

    return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
    }[axis]
}
