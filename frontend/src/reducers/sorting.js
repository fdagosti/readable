
import {DATE_BASED_SORTING, UPDATE_MESSAGE_SORTING} from "../actions/sorting";

const voteSortFunc = (a, b) => a.voteScore < b.voteScore
const dateSortFunc = (a,b) => a.timestamp < b.timestamp

const initialSortingState = {
    value: DATE_BASED_SORTING,
    orderFunction: dateSortFunc
}

export function messageSorting (state = initialSortingState, action) {
    switch (action.type) {
        case UPDATE_MESSAGE_SORTING:
            const {value} = action
            return {value, orderFunction: value === DATE_BASED_SORTING?dateSortFunc:voteSortFunc}
        default :
            return state
    }
}