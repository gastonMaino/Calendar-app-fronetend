import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { transformDateEvents } from "../helpers/transformDateEvents";
import { types } from "../types/types";

export const eventStarAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth

        try {
            const resp = await fetchWithToken('events', event, 'POST')
            const body = await resp.json()

            if (body.ok) {
                event.id = body.event.id
                event.user = {
                    _id: uid,
                    name
                }

                dispatch(eventAddNew(event))
            }


        } catch (err) {
            Swal.fire('Error', 'There was an error, try again later', 'error')
        }
    }
}

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events')
            const body = await resp.json()

            const events = transformDateEvents(body.events)

            if (body.ok) {
                dispatch(eventLoaded(events))
            }

        } catch (err) {
            Swal.fire('Error', 'There was an error, try again later', 'error')
        }
    }
}

export const eventStartUpdated = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                dispatch(eventUpdated(event))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }


        } catch (err) {
            Swal.fire('Error', 'There was an error, try again later', 'error')
        }
    }
}

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { id } = getState().calendar.activeEvent

        try {
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json()

            if (body.ok) {
                dispatch(eventDeleted())
            } else {
                Swal.fire('Error', body.msg, 'error')
            }


        } catch (err) {
            Swal.fire('Error', 'There was an error, try again later', 'error')
        }
    }
}

export const eventLogout = () => ({type: types.eventLogout}) 

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,

})

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

const eventDeleted = () => ({
    type: types.eventDeleted
})
