import React, { useContext, useState, Fragment, useEffect } from "react";
import x from "../../../Assets/sanadSVG/Multiply.svg";
import arrow from "../../../Assets/sanadSVG/downArrow.svg";
import avatar from "../../../Assets/sanadSVG/courseSmallAvatar.svg";
import centerIcon from "../../../Assets/sanadSVG/addGroup.svg";
import { MainContext } from "../../../Context/MainContext";
import { useTranslation } from "react-i18next";
import { Transition, Listbox, Dialog, DialogPanel, DialogTitle, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import axios from "axios";
import { ApisContext } from "../../../Context/ApisContext";
import * as Yup from "yup"
import { useFormik } from "formik";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../Soursre";
import marker from "../../../Assets/sanadSVG/checked.svg"
import CourseImage from "../../CourseImage/CourseImage";
const PostSession = function () {
    const { Toggler, setToggler, ErorrMessage } = useContext(MainContext)
    const { tens, headers, Topics, fetchCoure, sethandleAddSession } = useContext(ApisContext)





    const [dropDownMenu, setDropDownMenu] = useState(false);
    function toggleDropDownMenu() {
        setDropDownMenu((dropDownMenu) => !dropDownMenu);
    }
    let [t, i18n] = useTranslation();






    // function del(i) {
    //     let newarr = selectedCourse.filter((item) => item !== i)
    //     setselectedCourse(newarr)
    //     let x = selectedCourseId.filter(item => item !== i._id)
    //     // formik.values.tutorCoursesId = x

    //     setselectedCourseId(prev =>
    //         prev.filter((item) => item !== i?._id)
    //     )
    // }





    const [selectedTopic, setselectedTopic] = useState([])

    const { id } = useParams()
    const sessionTypes = [
        { name: t("homepage.session"), value: "session" },
        { name: t("homepage.exam"), value: "offlineExam" },
        { name: t("homepage.revision"), value: "revision" },
    ]

    const [selectedSessionType, setselectedSessionType] = useState("")


    const [loading, setloading] = useState(false)
    const SessionForm = useFormik({
        initialValues: {
            name: "",
            topicsId: "",
            type: "",

        },
        validationSchema: Yup.object({
            type: Yup.string().required(),

            name: Yup.string().required(),
            topicsId: Yup.array()
                .of(Yup.string().required('Each TA must be a valid string'))
                .min(1, 'At least one TA is required')
                .required('TAs is required'),
        }),
        onSubmit: async (values, { resetForm }) => {



            try {
                setloading(true)
                let res = await axios.post(`${BASE_URL}tutor-courses/${id}/sessions`, values, { headers: headers })
                if (res.data.status === "success" || res.status === 201 || res.status === 200) {
                    ErorrMessage(t("Errors.successSession"), "success")
                    sethandleAddSession(prev => !prev)
                    setToggler({ ...Toggler, addSession: false });
                    setselectedTopic([])
                    setselectedSessionType("")
                    resetForm()
                }
            } catch (error) {
                console.log(error)
                ErorrMessage(t("Errors.main"), "error")

            }
            finally {
                setloading(false)

            }
        }
    })
    function close() {
        setToggler({ ...Toggler, addSession: false });
        setselectedTopic([])
        setselectedSessionType("")
        SessionForm.resetForm()
    }


    useEffect(() => {
        if (Toggler.addSession === false) {
            setselectedTopic([])
            setselectedSessionType("")
            SessionForm.resetForm()
        }
    }, [Toggler.addSession])


    return (
        <>
            <Dialog
                open={Toggler.addSession}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex min-h-full b items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full sm:w-[550px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-3 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, addSession: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-mainColor"
                            >

                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    {/* <span className="w-16 h-16 bg-[#F0F6FFB2] rounded-full flex justify-center items-center"> */}
                                    {/* <img className="w-8 max-w-full" src={centerIcon} alt="" /> */}
                                    <ReactSVG src={centerIcon} />
                                    {/* </span> */}
                                    <div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
                                        <h3 className="text-xl md:text-3xl font-black text-[#023E8A]">
                                            {t("PopUps.add") + " " + t("SingleCourse.session")}
                                        </h3>

                                    </div>
                                </div>

                            </DialogTitle>

                            <form onSubmit={SessionForm.handleSubmit} className="flex flex-col gap-3 2xl:gap-4">
                                <div className="session-name flex flex-col gap-y-1 sm:gap-y-2">
                                    <label

                                        htmlFor="name"
                                        className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
                                    >
                                        {t("PopUps.sessionName")}
                                    </label>
                                    <div className="flex justify-between items-center gap-1 w-full">
                                        <input
                                            value={SessionForm.values.name}
                                            placeholder={t("PopUps.session01")}
                                            className={`w-full py-3 px-6  text-sm text-mainColor
                     placeholder:text-textGray
                     border-[#E6E9EA]
                     outline-none focus:outline-none text-start border-[1px] rounded-xl   placeholder:text-start`}
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={SessionForm.handleChange}
                                        />
                                    </div>
                                </div>


                                <div className="row flex w-full flex-col gap-y-3  items-center  ">


                                    <div className={` w-full type flex flex-col gap-y-1 sm:gap-y-2 `}>
                                        <label
                                            htmlFor="type"
                                            className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
                                        >
                                            {t('homepage.sessionType')}
                                        </label>
                                        <Listbox

                                            onChange={(ele) => {
                                                SessionForm.setFieldValue('type', ele.value);
                                                setselectedSessionType(ele.name)
                                            }}
                                        >
                                            <div className="relative ">
                                                <ListboxButton
                                                    id="type"
                                                    onBlur={SessionForm.handleBlur}
                                                    className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}
                                                >


                                                    <span
                                                        className={`block truncate ${SessionForm.values.type != '' && selectedSessionType !== ''
                                                            ? 'text-mainColor font-thin'
                                                            : 'text-textGray'
                                                            }`}
                                                    >
                                                        {
                                                            selectedSessionType
                                                                ? selectedSessionType
                                                                : t('exam.choise')
                                                        }


                                                    </span>

                                                    <ReactSVG src={arrow} />
                                                </ListboxButton>

                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <ListboxOptions
                                                        className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
                                                    >
                                                        {sessionTypes.map((person, personIdx) => (
                                                            <ListboxOption
                                                                key={personIdx}
                                                                className={({ active }) =>
                                                                    ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                                                                        ? 'bg-mainColor text-white'
                                                                        : 'text-mainColor'
                                                                    }`
                                                                }
                                                                value={person}
                                                            >
                                                                {({ selectedSessionType }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block truncate text-sm ${selectedSessionType
                                                                                ? 'font-medium'
                                                                                : 'font-normal'
                                                                                }`}
                                                                        >
                                                                            {person.name}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </ListboxOption>
                                                        ))}
                                                    </ListboxOptions>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                        {/* {formik.errors.term && (
											<p className="text-red-400 py-1">{formik.errors.term}</p>
										)} */}
                                    </div>



                                    <div className={`w-full    topics flex flex-col gap-y-1 sm:gap-y-2`}>
                                        <label
                                            htmlFor="topicsId"
                                            className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
                                        >
                                            {t("windows.topic")}  -  <span className="text-[13px]">{t("windows.topic2")} </span>
                                        </label>
                                        <Listbox

                                            // name={`tutorCoursesId[1]`}
                                            onChange={(e) => {
                                                let x = e.map(item => {
                                                    return item?._id
                                                })
                                                // setselects(x)
                                                SessionForm.setFieldValue("topicsId", x)

                                                // formik.setFieldValue("tutorCoursesId", x)
                                                setselectedTopic(e)
                                            }}

                                            value={selectedTopic}
                                            multiple>

                                            {/* ${formik.errors.tutorCoursesId ? "border-[1px] border-solid border-red-400 text-red-400" : "text-mainColor border-none"}  */}

                                            <div className="relative mt-1">
                                                <ListboxButton id="tutorCoursesId" className={` w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                        text-mainColor font-semibold            flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}>

                                                    {selectedTopic.length > 0 ? (
                                                        tens.includes(selectedTopic.length) ? (
                                                            `${selectedTopic.length} ${t('exam.choises')}`
                                                        ) : (
                                                            `${selectedTopic.length} ${t('exam.oneChoise')}`
                                                        )
                                                    ) : (
                                                        <span className="text-textGray ">{t('exam.choise')}</span>
                                                    )}

                                                    <ReactSVG src={arrow} />

                                                </ListboxButton>

                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <ListboxOptions className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                                                        {Topics.map((person, personIdx) => (
                                                            <ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
                                                                `cursor-default select-none relative py-2 w-full flex items-center justify-between   px-4   ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
                                                            }  >

                                                                {({ selected }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block text-sm truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}
                                                                        >
                                                                            {person?.name}
                                                                        </span>
                                                                        <div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected && "bg-mainColor"}   rounded-md`}>
                                                                            {selected &&
                                                                                <ReactSVG src={marker} />
                                                                            }
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </ListboxOption>
                                                        ))}
                                                    </ListboxOptions>
                                                </Transition>
                                            </div>
                                        </Listbox>


                                    </div>


                                </div>








                                <div className="course-name flex flex-col gap-y-1 sm:gap-y-2">
                                    <label
                                        htmlFor="courseName"
                                        className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
                                    >
                                        {t("homepage.courseName")}
                                    </label>
                                    <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
                                        <div className="flex w-2/3 justify-start items-center gap-3">
                                            <CourseImage courseName={fetchCoure.data?.courseData?.name} h={24} w={24} />


                                            <div className="flex flex-col">
                                                <p className="text-secondMainColor  font-extrabold">
                                                    {fetchCoure.data?.courseData.name}
                                                </p>
                                                <p className="text-[#9CA3AF] text-xs">
                                                    {i18n.language === "ar" ? fetchCoure.data?.courseData?.grade?.nameAr : i18n.language === "en" && fetchCoure.data?.courseData?.grade?.nameEn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-1/3 justify-center items-center text-xs sm:text-sm">
                                            {fetchCoure.data?.term === "0" && ` ${t("coursesTable.zero")}`}

                                            {fetchCoure.data?.term === "1" && `${t("coursesTable.term")}  ${t("coursesTable.first")}`}
                                            {fetchCoure.data?.term === "2" && `${t("coursesTable.term")}  ${t("coursesTable.second")}`}
                                            {fetchCoure.data?.term === "3" && `${t("coursesTable.term")}  ${t("coursesTable.third")}`}                                        </div>
                                    </div>
                                </div>
                                <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
                                    <button
                                        type="submit"
                                        disabled={!(SessionForm.isValid && SessionForm.dirty)}
                                        className={` ${!(SessionForm.isValid && SessionForm.dirty) ? "bg-secondMainColor" : "bg-mainColor"} text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg`}
                                    >

                                        {loading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                        ></div> : t('PopUps.add')}





                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setToggler({ ...Toggler, addSession: false })}
                                        className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg"
                                    >
                                        {t('homepage.back')}
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog >
        </>
    );
}



export default PostSession






{/*body*/ }

