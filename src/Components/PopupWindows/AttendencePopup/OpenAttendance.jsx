


import React, {
    useContext,
    useState,

} from 'react';
import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import main from "../../../Assets/sanadSVG/courseSmallAvatar.svg"
import head from '../../../Assets/sanadSVG/confirmDelet.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../Soursre';
import axios from 'axios';
import CourseImage from '../../CourseImage/CourseImage';
export default function OpenAttendance() {
    let [t, i18n] = useTranslation();

    const { Toggler, setToggler, ErorrMessage } = useContext(MainContext);
    const { fetchCoure, headers, selectedSession, tens, sethandleAttendance } = useContext(ApisContext);


    const { id } = useParams()



    function close() {
        setToggler({ ...Toggler, openAttendance: false });
    }


    const [loading, setloading] = useState(false)
    const takeAttendance = async () => {
        try {
            setloading(true)
            if (id && selectedSession && selectedSession._id) {

                const res = await axios.patch(`${BASE_URL}tutor-courses/${id}/sessions/${selectedSession._id}/attendance`, {}, { headers: headers })

                if (res.status === 200 || res.data.status === "success") {
                    ErorrMessage(t("Errors.openAttendance"), "success")
                    setToggler({ ...Toggler, openAttendance: false })
                    sethandleAttendance(prev => !prev)
                }

            }
        } catch (error) {
            console.log(error)
            ErorrMessage(error?.response?.data?.message, "error")


        } finally {
            setloading(false)
        }

    }


    return (
        <>
            <Dialog
                open={Toggler.openAttendance}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex min-h-full b items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-3 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, openAttendance: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-mainColor"
                            >
                                <div className='headers flex flex-col items-center gap-y-2'>

                                    <ReactSVG src={head} />
                                    <h1 className='text-[29px] font-bold text-mainColor '>{t("homepage.openAttendanceHeader")}</h1>
                                    {/* <p className='font-normal text-[16px] text-textColor__2'>{t("homepage.attendenceConfirmp")}</p> */}
                                </div>
                            </DialogTitle>
                            {/* content */}

                            <div className='form my-4'>
                                <form action="" className='flex flex-col gap-y-3'>
                                    <div className='flex flex-col gap-y-2'>
                                        <label className='font-medium text-textColor__2 text-size__14 ' htmlFor="courseName">
                                            {t("homepage.courseName")}
                                        </label>
                                        <div className='w-full flex justify-between items-center px-6 bg-white shadow-[ 0px 0px 19px 0px #00000017] py-3 rounded-[45px] '>
                                            <div className='flex items-center gap-x-2'>

                                                <CourseImage courseName={fetchCoure.data?.courseData?.name} w={22} h={22} />
                                                <div>
                                                    <h4 className='text-[16px] text-mainColor font-bold'>
                                                        {fetchCoure.data?.courseData?.name}
                                                    </h4>
                                                    <p className='text-[11px] text-textColor__2 font-semibold'>
                                                        {i18n.language === "ar" ? fetchCoure.data?.courseData?.grade?.nameAr : i18n.language === "en" && fetchCoure.data?.courseData?.grade?.nameEn}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className='pe-10 font-semibold text-textGray text-size__14'>
                                                {fetchCoure.data?.term === "0" && ` ${t("coursesTable.zero")}`}

                                                {fetchCoure.data?.term === "1" && `${t("coursesTable.term")}  ${t("coursesTable.first")}`}
                                                {fetchCoure.data?.term === "2" && `${t("coursesTable.term")}  ${t("coursesTable.second")}`}
                                                {fetchCoure.data?.term === "3" && `${t("coursesTable.term")}  ${t("coursesTable.third")}`}
                                            </p>

                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-y-2'>
                                        <label className='font-medium text-textColor__2 text-size__14 ' htmlFor="courseName">
                                            {t("PopUps.sessionName")}                                </label>
                                        <div className='w-full flex justify-between items-center px-6 bg-white shadow-[ 0px 0px 19px 0px #00000017] py-3 rounded-[45px] '>

                                            <h4 className='text-sm text-mainColor font-bold truncate'>
                                                {`${selectedSession?.name} (${selectedSession?.sessionNumber})`}
                                                {/* {item ? `${item?.name} - ${t("homepage.sessionNumber")} (${item?.sessionNumber})` : `${t("exam.choise")} ${t("homepage.session")}`} */}



                                            </h4>

                                            <div className='flex flex-col flex-nowrap items-center'>
                                                <h5 className='text-xs text-textColor__2 font-bold '>{t("homepage.studentAttendedNum")}</h5>
                                                <p className=' font-semibold text-textGray text-xs '>
                                                    {selectedSession?.studentAttendedNum ?
                                                        tens.includes(selectedSession?.studentAttendedNum) ? `${selectedSession?.studentAttendedNum} ${t("SingleCourse.students")}` : `${selectedSession?.studentAttendedNum} ${t("SingleCourse.student")}`
                                                        : t("homepage.nothing")}

                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4 px-4">
                                <button
                                    type='button'

                                    disabled={!(id && selectedSession?._id)}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        takeAttendance()
                                    }}
                                    className={`${id && selectedSession?._id ? "bg-mainColor" : "bg-secondMainColor"} text-white rounded-2xl px-10 py-2 w-full md:w-1/2 text-xl`}>
                                    {loading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                    ></div> : t('exam.confirm')}

                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setToggler({ ...Toggler, openAttendance: false })
                                    }}
                                    className="bg-transparent text-secondMainColor rounded-2xl px-10 py-2 w-full md:w-1/2 text-xl"
                                >
                                    {t("homepage.back")}
                                </button>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}


