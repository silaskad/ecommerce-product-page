export function handleNext(dispatch, length) {
    dispatch({
        type: 'NEXT_IMAGE',
        length
    })
}

export function handlePrev(dispatch, length) {
    dispatch({
        type: 'PREV_IMAGE',
        length
    })
}

export function handleMatch(dispatch, index) {
    dispatch({
        type: 'MATCH_INDEX',
        index
    })
}