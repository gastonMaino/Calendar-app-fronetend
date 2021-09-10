import React from 'react';

export const CalendarEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <div>
            <p>{title} - <span>{user.name}</span> </p>
        </div>
    )
}
