import React from 'react'

export default function TodaysDate() {
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    
    return ( 
        <>
            {monthNames[d.getMonth()]} {d.getDate()}, {d.getFullYear()}
        </>
  )
}
