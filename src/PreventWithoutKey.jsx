import React, { useContext } from 'react'
// import { ApisContext } from '../Context/ApisContext'
import Cookies from 'universal-cookie'
import UseTutorKey from './UseTutorKey'
import { ApisContext } from './Context/ApisContext'

export default function PreventWithoutKey({ children }) {
    const { fetchTutorKeyForTa } = useContext(ApisContext)


    const userDetails = new Cookies().get("userDetails")

    // console.log(userDetails)
    // console.log(Role)

    if ((userDetails?.role === "3") || (userDetails?.role === "4" && fetchTutorKeyForTa.data?.tAData?.totalTutors > 0)) {

        return children
    } else if (userDetails?.role === "4" && fetchTutorKeyForTa.data?.tAData?.totalTutors <= 0) {


        return <UseTutorKey />
    }
}

