import React, { useContext } from 'react'
import edit from "../Assets/sanadSVG/penGray.svg"
import profile from "../Assets/sanadSVG/bigUserProfile.svg"
import { ReactSVG } from 'react-svg'
import { useTranslation } from 'react-i18next'
import { ApisContext } from '../Context/ApisContext'
import { MainContext } from '../Context/MainContext'
import { Helmet } from 'react-helmet'
import { BASUE_IMAGES } from '../Soursre'

function Setting() {
    const [t] = useTranslation()
    const { userDetails, Role, fetchTutorKeyForTa } = useContext(ApisContext)
    const { Toggler, setToggler } = useContext(MainContext)


    return (

        <>
            <Helmet>
                <title>Settings</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />

            </Helmet>
            <section className='flex flex-col w-full p-6 bg-white lg:p-12 rounded-xl gap-y-8 lg:flex-row lg:justify-between lg:gap-x-4'>

                <div className="flex items-start justify-center w-full h-full profile lg:w-1/6 ">
                    {userDetails?.profileImage !== "" ?
                        <span className=''>
                            <img className='w-[200px] h-[200px] lg:w-[100px] lg:h-[100px] rounded-full transition-all duration-500  hover:drop-shadow-main overflow-hidden' src={`${BASUE_IMAGES}${userDetails?.profileImage}`} alt="profileImage" />
                        </span>

                        : <ReactSVG src={profile} />}
                </div>

                <div className="flex flex-col w-full lg:w-3/6 gap-y-3">
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="fullname" className='text-xs font-semibold text-mainColor'>
                            {t("register.fullName")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            placeholder={t("register.fullName")}
                            readOnly
                            defaultValue={userDetails?.fullname ? userDetails?.fullname : t("register.fullName")}
                        />
                    </div>
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="main" className='text-xs font-semibold text-mainColor'>
                            {t("register.email")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            readOnly
                            defaultValue={userDetails?.email ? userDetails?.email : t("register.email")}
                        />
                    </div>
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="" className='flex items-center justify-between w-full '>
                            <span className='text-xs font-semibold text-mainColor'>
                                {t("register.password")}
                            </span>
                            <span
                                onClick={() => setToggler({ ...Toggler, changePass: true })}
                                className='cursor-pointer me-4'>
                                <ReactSVG src={edit} />
                            </span>
                        </label>
                        <input type="password"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={t("register.password")}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="" className='text-xs font-semibold text-mainColor'>
                            {t("register.gender")}

                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.gender ? userDetails?.gender === "M" ? t("register.m") : userDetails?.gender === "F" && t("register.f") : t("register.gender")}
                            readOnly

                        />
                    </div>
                </div>


                <div className="flex flex-col w-full lg:w-3/6 gap-y-3">
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="" className='text-xs font-semibold text-mainColor'>
                            {t("homepage.studentCode")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.code ? userDetails?.code : t("homepage.studentCode")}
                            readOnly
                        />
                    </div>
                    {Role === 4 &&
                        <div className="flex flex-col w-full name gap-y-2">
                            <label htmlFor="" className='text-xs font-semibold text-mainColor'>
                                {t("homepage.tutorKey")}
                            </label>
                            <input type="text"
                                className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                                defaultValue={fetchTutorKeyForTa.data?.tAData?.tutorKey}
                                readOnly
                            />
                        </div>
                    }
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="" className='text-xs font-semibold text-mainColor'>
                            {t("register.phoneNumber")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.phoneNumber ? userDetails?.phoneNumber : t("register.phoneNumber")}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="" className='text-xs font-semibold text-mainColor '>
                            {t("register.city")}


                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.city ? userDetails?.city : t("register.city")}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col w-full name gap-y-2">
                        <label htmlFor="" className='text-xs font-semibold text-mainColor'>
                            {t("register.governorate")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.governorate ? userDetails?.governorate : t("register.governorate")}
                            readOnly
                        />
                    </div>
                </div>



            </section>
        </>
    )
}

export default Setting