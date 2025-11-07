import React, { useContext } from 'react'
// import { ApisContext } from '../Context/ApisContext'
import Cookies from 'universal-cookie'
import { useTranslation } from 'react-i18next'
import { MainContext } from './Context/MainContext'
import logo from "./Assets/sanad.svg"
import { ReactSVG } from 'react-svg'
import { ApisContext } from './Context/ApisContext'
import QRCode from 'qrcode.react';


function UseTutorKey() {
    const { fetchTutorKeyForTa } = useContext(ApisContext)

    const { direction, Toggler, setToggler } = useContext(MainContext)
    const [t] = useTranslation()
    const cookie = new Cookies()
    const userDetails = cookie.get("userDetails")
    return (
        <div dir={direction} className="welcome w-full relative    h-full flex items-center justify-center flex-col gap-y-2 ">
            <span className="logo absolute top-0 start-0">
                <ReactSVG src={logo} />
            </span>
            <span onClick={() => setToggler({ ...Toggler, exit: true })} className="logOut cursor-pointer p-2 bg-err text-white rounded-xl absolute top-0 end-0">
                {t("dashboard.checkout")}
            </span>
            <h4 className='text-mainColor font-semibold text-xl'>

                {`${t("homepage.titleP")},  ${userDetails?.fullname}`}
            </h4>
            <h1 className='text-4xl font-bold text-mainColor'>
                {t("Login.welcomeMessage")}
            </h1>

            <div className='my-2 rounded-xl overflow-hidden bg-white inline-block p-1'>
                <QRCode size={256} level='H' includeMargin={true}
                    renderAs="svg" value={fetchTutorKeyForTa.data} />
            </div>
            {userDetails.role === "4" && userDetails?.tAData?.tutors?.length <= 0 && <>
                <p className='sm:flex hidden items-center gap-x-4 text-lg text-secondMainColor'>
                    {t("homepage.centerKey")} : <span className='font-bold'>
                        {fetchTutorKeyForTa.data?.tAData?.tutorKey}
                    </span>
                </p>

                <div className='sm:hidden flex flex-col items-center gap-x-4 text-lg text-secondMainColor'>
                    {t("homepage.centerKey")} : <span className='font-bold text-mainColor'>
                        {fetchTutorKeyForTa.data?.tAData?.tutorKey}
                    </span>
                </div>
            </>}
        </div>
    )
}

export default UseTutorKey