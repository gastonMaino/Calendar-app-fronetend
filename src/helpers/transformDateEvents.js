import moment from "moment";

export const transformDateEvents = (events = []) => events.map((event) => ({
    ...event,
    end: moment(event.end).toDate(),
    start: moment(event.start).toDate()
}))