import { types } from "../types/types";
// {
//     id: new Date().getTime(),
//     title: 'birthday chief',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     user: {
//         _id: '123',
//         name: 'gaston'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map((events) => events.id === action.payload.id ? action.payload : events)
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter((events) => events.id !== state.activeEvent.id),
                activeEvent: null
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }
}