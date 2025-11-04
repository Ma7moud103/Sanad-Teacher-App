


import React from 'react'
import { Link } from 'react-router-dom'
import icon from "../../Assets/sanadSVG/singleRoute.svg"
import { ReactSVG } from 'react-svg'

export default function Navigation({ to }) {
    return (
        <Link to={to} className="cursor-pointer w-3 h-3 ">
            {/* <img className="w-full" src={icon} alt="CourseLogo" /> */}
            <ReactSVG src={icon} />
        </Link>
    )
}
