import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TrainingCalendar=(props)=> {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
    }

    const event = trainings.map((e, index) => {
          return {
              title: e.activity, 
              start: moment(e.date).toDate(), 
              end: moment(e.date).add(e.duration, "m").toDate(), 
              allDay: false
            }

              /* Event {
                    title: string,
                    start: Date,
                    end: Date,
                    allDay?: boolean
                    resource?: any,
                }*/
    });
    
    const localizer = momentLocalizer(moment)

    const CalendarWithEvents= ()=> (
        <div>
          <Calendar
            localizer={localizer}
            events={event}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500}}
          />
        </div>
      );

    return (
    <div>
        <CalendarWithEvents />
    </div>
    )
    
}

export default TrainingCalendar;