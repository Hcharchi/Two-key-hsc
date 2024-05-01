"use client"
import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


const Calendar = () => {
    const [Coordinates, setCoordinates] = useState([]);
    const [formShow, setFormShow] = useState(false)
    const [events, setEvents] = useState([])
    const [meeting, setMeeting] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [start_end, setStart_end] = useState([])
    const date = new Date();

    let day = date.getDate();
    const handleSelect = (info) => {
        // console.log(info)
        const { start, end } = info;
        setStart_end([start, end])
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let start_Data_IN_string = JSON.stringify(start);
        let ending_Data_In_sting = JSON.stringify(end);
        let GatingData_from_ending_string = ending_Data_In_sting.slice(1, 10)
        let GatingData_from_starting_string = start_Data_IN_string.slice(1, 10)
        var d = new Date(GatingData_from_starting_string);
        var dayName = days[d.getDay()];
        console.log(dayName);
        const event = d.toString()
        let event_split = event.split(" ");



        event_split[0] = dayName;
        event_split[4] = GatingData_from_starting_string;
        event_split[5] = "to";
        event_split[6] = GatingData_from_ending_string;
        event_split.splice(7, 8);
        let meeting_time = event_split.join(' ')

        // console.log(meeting_time);

        setMeeting(meeting_time);

        // start_Data_IN_string.toString()

        // const eventNamePrompt = prompt("Enter Event Name");
        // alert('Clicked on: ' + info.dateStr);
        // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        let x = info.jsEvent.pageX;
        if ((x - 700) <= 0) {
            if ((x - 500) <= 0){
                x = x + 670;
            }
            else{
                x = x + 170;
                console.log(x);
            }
            
        }

        setCoordinates([x, info.jsEvent.pageY])

        setFormShow(true);


    };
    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            const eventId = selected.event.id;
            const updatedEvents = events.filter((event) => event.id !== eventId);
            setEvents(updatedEvents);
        }
    };

    const submitHandler = () => {
        if (inputValue.trim().length <= 0) {
            return;
        }
        const newEvent = {
            start: start_end[0],
            end: start_end[1],
            title: inputValue,
            id: new Date().getTime().toString(),
        };
        setEvents([...events, newEvent]);
        console.log("submit");
        setInputValue("");
        setFormShow(false);
    }
    const hideHandler = () => {
        setFormShow(false);
    }
    console.log(inputValue);

    return (

        <div className='w-full sm:w-4/5  mt-3 '>
            <div className='flex w-full items-center justify-center sm:hidden '>
                <img src={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${day}_2x.png`} className=' w-8 sm:w-9 lg:w-12 ml-3' />
                <h1>Calendar</h1>
            </div>
            {formShow && <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]    absolute z-30 w-1/2 lg:w-2/5 overflow-hidden" style={{ top: `${Coordinates[1] - 175}px`, left: `${Coordinates[0] - 670}px` }}>
                <div className='p-5 '>
                    <div className='flex p-2 text-xl text-gray-400 justify-between' >
                        <i class="fi fi-rr-angle-double-small-left"></i>
                        <div className='hover:text-red-500 hover:text-2xl' onClick={hideHandler}><i class="fi fi-ss-cross-small"></i></div>
                    </div>
                    <div className=' w-full flex flex-col items-end'>
                        <form className='w-4/5 p-2'  >
                            <input type="text" placeholder='Add Title ' className='bg-transparent w-full  p-1 sm:text-lg lg:text-xl  outline-none border-b-blue-600 border-b-2  my-2' autoFocus={true}
                                onChange={(e) => setInputValue(e.target.value)} />

                        </form>
                    </div>
                    <div className='flex mx-5 items-center my-2 text-gray-500' >
                        <i class="fi fi-rr-clock-three"></i>
                        <p className='sm:text-sm  lg:text-lg sm:ml-3 lg:ml-5'>{meeting}</p>
                    </div>


                    <div className='flex mx-5 my-2 items-center text-gray-500' >
                        <i class="fi fi-rr-align-left"></i>
                        <p className='sm:text-sm  lg:text-lg sm:ml-3 lg:ml-5'>Add description or attachments</p>
                    </div>

                    <div className='flex justify-end items-center ' onClick={submitHandler}>
                        <p className='hover:text-gray-500 sm:text-base cursor-pointer mx-2  lg:text-xl '>More option</p>
                        <button type='submit' className='text-white mx-2 rounded-lg bg-blue-500 hover:bg-blue-600 p-2 sm:text-base cursor-pointer  lg:text-xl '>Save</button>
                    </div>
                </div>

            </div>}
            <FullCalendar
                height="100vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,

                ]}
                headerToolbar={{
                    left: "today prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                allDaySlot={false}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                nowIndicator={true}
                navLinks
                slotDuration="00:60:00"
                // dateClick={abc}
                eventResizableFromStart={true}
                eventOverlap={true}
                select={handleSelect}
                eventClick={handleEventClick}
                events={events}

                //   eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                    {
                        id: "12315",
                        title: "All-day event",
                        date: "2022-09-14",
                    },
                    {
                        id: "5123",
                        title: "Timed event",
                        date: "2022-09-28",
                    },
                ]}
            />

        </div>
    )
}

export default Calendar