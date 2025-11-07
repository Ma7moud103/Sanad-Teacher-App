import React, {
    useContext,
    useState,
    Fragment,
    useEffect,
    useCallback,
} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import Cookies from 'universal-cookie';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import warning from '../../../Assets/sanadSVG/groups.svg';
import arrow from "../../../Assets/sanadSVG/downArrow.svg"
import addExam from '../../../Assets/sanadSVG/sGrade.svg';
import * as Yup from 'yup';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import { SvgsContext } from '../../../Context/SvgsContext';
import avatar from '../../../Assets/sanadSVG/courseSmallAvatar.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import SmallPosts from '../../Skeletons/SmallPosts';
import Post from '../../Skeletons/Post';
import { BASE_URL } from '../../../Soursre';
import CourseImage from '../../CourseImage/CourseImage';
export default function AddTopic() {


    let [t, i18n] = useTranslation();
    const { id } = useParams()

    const { headers, fetchCoure,
        settopicLoading,
    } = useContext(ApisContext);

    const { ErorrMessage, Toggler, setToggler } = useContext(MainContext)

    const [color, setColor] = useState("#0c93c1");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const handleChange = (newColor) => {
        console.log(newColor);
        setColor(newColor.hex);
    };


    const handleClose = () => {
        setDisplayColorPicker(false);
    };
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };



    const validation = Yup.object({
        name: Yup.string().required(),
        color: Yup.string().matches(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/).required()
    });


    const [loading, setloading] = useState(false)
    const TopicForm = useFormik({
        initialValues: {
            name: "",
            color: color
        },

        validationSchema: validation,
        onSubmit: async (values, { resetForm }) => {
            console.log(color);
            try {

                setloading(true)
                let res = await axios.post(`${BASE_URL}tutor-courses/${id}/topics`, values, { headers: headers })


                if (res.data.status === "success" || res.status === 201) {
                    ErorrMessage(t("Errors.successTopic"), "success")
                    setToggler({ ...Toggler, addTopic: false })
                    settopicLoading(prev => !prev)

                }

            } catch (error) {

                if (error.response.status == 400) {
                    ErorrMessage(t("Errors.main"), "error")
                }
            } finally {
                setloading(false)
                resetForm()
            }

        }
    })




    function close() {
        setToggler({ ...Toggler, addTopic: false });
    }


    return (
        <>

            <Dialog
                open={Toggler.addTopic}
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
                                onClick={() => setToggler({ ...Toggler, addTopic: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7 mb-2 font-medium text-mainColor"
                            >
                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    <ReactSVG src={warning} />
                                    <h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
                                        {t("PopUps.add") + " " + t("SingleCourse.topic")}
                                    </h3>
                                    {/* <p className="font-normal text-sm sm:text-base text-center">
                                        {t('homepage.assistantP')}
                                    </p> */}
                                </div>
                            </DialogTitle>
                            {/* content */}
                            <>

                                <form onSubmit={TopicForm.handleSubmit} className="Topic flex flex-col justify-between gap-3 2xl:gap-4">
                                    <div className="course-name flex flex-col">
                                        <label
                                            htmlFor="name"
                                            className={`text-[#023E8A] w-full text-start font-semibold  text-sm relative`}
                                        >
                                            {t("SingleCourse.topicName")}
                                        </label>
                                        <div className="flex justify-between items-center gap-x-2 w-full">
                                            <input
                                                placeholder={t("SingleCourse.trigonometry")}
                                                className={` px-6  py-3 text-mainColor font-semibold text-sm
                     placeholder:text-textGray
                     border-[#E6E9EA]
                     outline-none focus:outline-none text-start border-[1px] w-[84.5%] rounded-xl my-3 placeholder:text-start`}
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={TopicForm.values.name}
                                                onChange={TopicForm.handleChange}
                                            />

                                            <div
                                                onClick={handleClick}
                                                style={{ backgroundColor: color }}
                                                className={`cursor-pointer w-[15%] h-[2.5rem] rounded-xl shadow`}
                                            />
                                            {displayColorPicker && (
                                                <div className="absolute ">
                                                    <input
                                                        value={color}
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleClose()
                                                            TopicForm.setFieldValue("color", color)
                                                        }}
                                                        className="fixed top-0 bottom-0 right-0 left-0  "
                                                    />
                                                    <SketchPicker className="z-10 relative py-3" color={color} onChange={handleChange} />
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {fetchCoure.isFetched ? <div className="course-name flex flex-col gap-3">
                                        <label
                                            htmlFor="courseName"
                                            className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
                                        >
                                            {t("homepage.courseName")}
                                        </label>
                                        <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
                                            <div className="flex w-2/3 justify-start items-center gap-3">
                                                <span>

                                                    <CourseImage courseName={fetchCoure.data?.courseData?.name} h={24} w={24} />
                                                </span>
                                                <div className="flex flex-col">
                                                    <p className="text-secondMainColor text-sm  whitespace-nowrap font-extrabold">
                                                        {fetchCoure.data?.courseData?.name}
                                                    </p>
                                                    <p className="text-[#9CA3AF] text-xs">
                                                        {i18n.language === "ar" ? fetchCoure.data?.courseData?.grade?.nameAr : i18n.language === "en" && fetchCoure.data?.courseData?.grade?.nameEn}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex w-1/3 justify-center items-center">
                                                <p className="text-[#9CA3AF] text-sm">
                                                    {fetchCoure.data?.term === "0" && ` ${t("coursesTable.zero")}`}

                                                    {fetchCoure.data?.term === "1" && `${t("coursesTable.term")}  ${t("coursesTable.first")}`}
                                                    {fetchCoure.data?.term === "2" && `${t("coursesTable.term")}  ${t("coursesTable.second")}`}
                                                    {fetchCoure.data?.term === "3" && `${t("coursesTable.term")}  ${t("coursesTable.third")}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div> :
                                        <div className='p-2 bg-white rounded-xl w-full'><Post /></div>}


                                    <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
                                        <button
                                            type="submit"
                                            disabled={!(TopicForm.isValid && TopicForm.dirty)}
                                            className={` ${!(TopicForm.isValid && TopicForm.dirty) ? "bg-secondMainColor" : "bg-mainColor"} text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg`}
                                        >

                                            {loading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                            ></div> : t('PopUps.add')}





                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setToggler({ ...Toggler, addTopic: false })}
                                            className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg"
                                        >
                                            {t('homepage.back')}
                                        </button>
                                    </div>
                                </form>
                            </>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
