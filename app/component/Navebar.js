"use client"
import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Navebar = () => {
    const date = new Date();

    let day = date.getDate();
    const [dropDown, setDropDown] = useState(true);
    const dropDownHandler = () => {
        if (dropDown === true) {
            setDropDown(false)
        }
        else {
            setDropDown(true)
        }
    }

    return (
        <div className=' hidden sm:block sm:w-2/5 lg:w-1/5  mr-6 mt-2'>
            <div className='flex items-center border-b-[#DADCE0] border-b-2 sm:lg lg:text-2xl  p-4 gap-2 '>
                <i class="fi fi-br-menu-burger " ></i>
             
              
            </div>
            <div>

                <div className=''>
                    <FullCalendar
                        height="60vh"
                        plugins={[
                            dayGridPlugin,
                        ]}
                        headerToolbar={{
                            left: "title",
                            center: "prev,next",
                            right: "",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navebar