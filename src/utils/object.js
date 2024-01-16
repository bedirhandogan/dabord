export const flatObject = (object) => {
    return Object.assign({}, ...Object.values(object))
}

export const getObjectLength = (object) => {
    return Object.keys(object).length
}

export const getCoordinateOnAxis = (event, axis) => {
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
