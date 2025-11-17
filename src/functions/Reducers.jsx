export function indexReducer(currentIndex, action) {
    switch(action.type) {
        case 'NEXT_IMAGE': {
            return (currentIndex + 1) % action.length;
        }

        case 'PREV_IMAGE': {
            return (currentIndex - 1 + action.length) % action.length;
        }

        case 'MATCH_INDEX': {
            return action.index;
        }

        default:
            return currentIndex;
    }
}