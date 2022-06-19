import React, { useState } from 'react'

export default function ProgressBar(props) {
    const [percentage, setPercentage] = useState(0);
    setPercentage((props.now / props.total) * 100)
    return (        
        console.log(percentage)
    )
}
