export const UPDATE_MESSAGE_SORTING = "UPDATE_MESSAGE_SORTING"
export const DATE_BASED_SORTING = "DATE_BASED_SORTING"
export const VOTE_BASED_SORTING = "VOTE_BASED_SORTING"


export function updateMessageSorting(value){
    return {
        type: UPDATE_MESSAGE_SORTING,
        value
    }
}

