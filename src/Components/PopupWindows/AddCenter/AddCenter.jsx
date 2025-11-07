import React, { useContext, useState, Fragment, useEffect, useMemo } from "react";
import x from "../../../Assets/sanadSVG/Multiply.svg";
import arrow from "../../../Assets/sanadSVG/downArrow.svg";

import centerIcon from "../../../Assets/sanadSVG/addGroup.svg";
import { MainContext } from "../../../Context/MainContext";
import { useTranslation } from "react-i18next";
import { Transition, Listbox, Dialog, DialogPanel, DialogTitle, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ApisContext } from "../../../Context/ApisContext";
import { ReactSVG } from "react-svg";
import Post from "../../Skeletons/Post";
import marker from "../../../Assets/sanadSVG/checked.svg"
import { useFormik } from "formik";
import * as Yup from 'yup'
import CourseImage from "../../CourseImage/CourseImage";
import { SvgsContext } from "../../../Context/SvgsContext";

export default function AddCenter() {
  const { Toggler, setToggler } = useContext(MainContext)
  const { TeacherCourses, center, tens, centerCode, setcenterCode, centerLoading, conferm, setConferm, selectedCourseId, setselectedCourseId, addCenterLoading, AddCenter, getCenterByid } = useContext(ApisContext)
  const [selectedCourse, setselectedCourse] = useState([])

  const { smallDeletIcon } = useContext(SvgsContext)



  const [dropDownMenu, setDropDownMenu] = useState(false);
  function toggleDropDownMenu() {
    setDropDownMenu((dropDownMenu) => !dropDownMenu);
  }
  let [t, i18n] = useTranslation();





  function del(i) {
    let newarr = selectedCourse.filter((item) => item !== i)
    setselectedCourse(newarr)


    setselectedCourseId(prev =>
      prev.filter((item) => item !== i?._id)
    )
  }






  // const handleSubmitForm1 = (e) => {
  //   e.preventDefault()
  //   getCenterByid()

  // }

  // const regex = /^C[0-9]{5}$/

  // const isValid = useMemo(() => {
  //   if (centerCode === "" || selectedCourse.length === 0 || selectedCourseId === 0 || !regex.test(centerCode)) {
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }, [centerCode, selectedCourse, selectedCourseId])


  const handleSubmitForm2 = (e) => {
    e.preventDefault()
    AddCenter(setcenterCode,
      setselectedCourse,
      setselectedCourseId,
    )

  }



  const formikCenterCode = useFormik({
    initialValues: {
      centerCode: ""
    },
    validationSchema: Yup.object({
      centerCode: Yup.string().required(t("homepage.requiredField")).matches(/^C[0-9]{5}$/, t("homepage.centerCodeReg"))
    }),
    onSubmit: async (values, { resetForm }) => {
      getCenterByid(values, resetForm)


    }
  })

  useEffect(() => {

    if (!Toggler.addCenter) {
      setcenterCode("")
      setselectedCourse([])
      setselectedCourseId([])
      setConferm(false)
      formikCenterCode.resetForm()

    }



  }, [Toggler.addCenter])

  function close() {
    formikCenterCode.resetForm()
    setcenterCode("")
    setselectedCourse([])
    setselectedCourseId([])
    setToggler({ ...Toggler, addCenter: false });
    setConferm(false)
  }


  return (
    <>
      <Dialog
        open={Toggler.addCenter}
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
                onClick={() => setToggler({ ...Toggler, addCenter: false })}
              >
                <ReactSVG src={x} />
              </button>
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-mainColor"
              >

                {
                  !conferm ? (
                    <div className="flex flex-col items-center justify-between rounded-t gap-y-1">

                      <ReactSVG src={centerIcon} />
                      <div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
                        <h3 className="text-xl md:text-3xl font-black text-[#023E8A]">
                          {t("PopUps.add")} {t("PopUps.center")}
                        </h3>
                        {/* <p className="text-[#4E5556] text-sm md:lg">
                          {t("PopUps.centerText")}
                        </p> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-between rounded-t gap-y-1">

                      <div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
                        <h3 className="text-xl md:text-3xl font-black text-[#023E8A]">
                          {/* {t("PopupWindows.confirm")} {t("PopUps.add")} {t("PopUps.center")} */}
                          {`${t("PopupWindows.confirm")} ${t("PopUps.add")} ${t("PopUps.center")}`}
                        </h3>
                        {/* <p className="text-[#4E5556] text-sm md:lg">
                          {t("PopUps.centerText")}
                        </p> */}
                      </div>
                    </div>
                  )
                }

              </DialogTitle>

              <form onSubmit={formikCenterCode.handleSubmit} className="flex flex-col gap-1 2xl:gap-4 gap-y-3">


                <div className={`${conferm ? "hidden" : "flex"} center_Code  flex-col w-full gap-y-1`}>
                  <label
                    htmlFor="centerCode"
                    className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
                  >
                    {t("PopUps.centerCode")}
                  </label>
                  {formikCenterCode.errors.centerCode && formikCenterCode.touched.centerCode && <p className="text-err text-xs">{formikCenterCode.errors.centerCode}</p>}
                  <input
                    placeholder="12345678"
                    className={` py-2 sm:py-3 px-6
                             placeholder:text-textGray
                        
                           outline-none border-[1px]  focus:outline-none text-start rounded-xl text-mainColor text-sm  font-semibold ${formikCenterCode.errors.centerCode && formikCenterCode.touched.centerCode ? "border-err" : " border-[#E6E9EA] "}  placeholder:text-start`}
                    type="text"
                    id="centerCode"
                    onBlur={formikCenterCode.handleBlur}
                    name="centerCode"
                    value={formikCenterCode.values.centerCode}
                    onChange={formikCenterCode.handleChange}
                  />
                </div>



                <div className={`${conferm ? "hidden" : "block"} w-full courses`}>
                  <label
                    htmlFor="tutorCoursesId"
                    className={`text-[#023E8A] w-full flex items-center gap-x-1 text-sm`}
                  >
                    {`${t('exam.choise')} ${t("homepage.course")}`}

                    <span className='text-xs'>{t("exam.multi")}</span>
                  </label>
                  <Listbox

                    // name={`tutorCoursesId[1]`}
                    onChange={(e) => {
                      let x = e.map(item => {
                        return item?._id
                      })
                      setselectedCourseId(x)


                      // console.log(x)
                      // formik.setFieldValue("tutorCoursesId", x)
                      setselectedCourse(e)
                    }}

                    value={selectedCourse}
                    multiple>

                    {/* ${formik.errors.tutorCoursesId ? "border-[1px] border-solid border-red-400 text-red-400" : "text-mainColor border-none"}  */}

                    <div className="relative mt-1">
                      <ListboxButton id="tutorCoursesId" className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}>

                        {selectedCourse.length > 0 ? (
                          tens.includes(selectedCourse.length) ? (
                            `${selectedCourse.length} ${t('exam.choises')}`
                          ) : (
                            `${selectedCourse.length} ${t('exam.oneChoise')}`
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
                          {TeacherCourses.map((person, personIdx) => (
                            <ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
                              `cursor-default select-none relative py-2 pe-10 ps-4  flex items-center justify-between  ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
                            }  >

                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block text-sm truncate ${selected ? 'font-medium' : 'font-normal'
                                      }`}
                                  >

                                    {i18n.language === "ar" ? `${person?.courseData?.name} - ${person?.courseData.grade?.nameAr}` : i18n.language === "en" && `${person?.courseData?.name} - ${person?.courseData.grade?.nameAr}`
                                    }
                                  </span>
                                  <div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected ? "bg-mainColor" : "text-textColor__2"}   rounded-md`}>
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



                <div className={`${conferm ? "hidden" : "flex"} formBtns flex-row gap-x-3 justify-center items-center `}>
                  <button
                    type="submit"
                    disabled={!(formikCenterCode.isValid && formikCenterCode.dirty)}

                    className={`${!(formikCenterCode.isValid && formikCenterCode.dirty) ? "bg-secondMainColor" : "bg-mainColor"} text-white rounded-2xl px-10 sm:py-3 py-2 w-full md:w-1/2  sm:text-lg`}
                  >

                    {centerLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                    ></div> : t("PopUps.add")}



                  </button>
                  <button
                    type="button"
                    onClick={() => setToggler({ ...Toggler, addCenter: false })}
                    className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg"
                  >
                    {t("homepage.back")}
                  </button>
                </div>






              </form>




              <form onSubmit={handleSubmitForm2} className={`${conferm ? "flex" : "hidden"}  flex-col gap-4`}>

                {!centerLoading ? <div className="flex flex-col gap-2">

                  <p>{t("homepage.centerName")}</p>
                  <div className="bg-white flex justify-between items-center py-4 px-6 shadow rounded-xl">
                    <p className="text-secondMainColor  font-extrabold">
                      {center.name}
                    </p>
                    <p className="text-[#9CA3AF]  font-semibold">
                      {center.code}
                    </p>
                  </div>


                </div> : <div className="p-2 bg-white rounded-xl my-2"><Post /></div>}

                <div className="flex flex-col gap-3">
                  <p>{t("dashboard.courses")}</p>
                  <div className="flex flex-col gap-2">

                    {selectedCourse.length > 0 ? selectedCourse.map((item, i) => {
                      return (
                        <div key={i} className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
                          <div className="flex w-1/2 justify-start items-center gap-2">

                            <CourseImage courseName={item.courseData?.name} w={22} h={22} />

                            <div className="flex flex-col">
                              <p className="text-secondMainColor  text-sm font-extrabold">
                                {item.courseData?.name}
                              </p>
                              <p className="text-textGray text-xs ">
                                {i18n.language === "ar" ? item.courseData?.grade?.nameAr : i18n.language === "en" && item.courseData?.grade?.nameEn}
                              </p>
                            </div>
                          </div>
                          <p className="text-textGray text-xs sm:text-sm">
                            {item?.term === "0" && ` ${t("coursesTable.zero")}`}

                            {item?.term === "1" && `${t("coursesTable.term")}  ${t("coursesTable.first")}`}
                            {item?.term === "2" && `${t("coursesTable.term")}  ${t("coursesTable.second")}`}
                            {item?.term === "3" && `${t("coursesTable.term")}  ${t("coursesTable.third")}`}
                          </p>
                          <span onClick={() => {
                            // selectedCourse.splice(i, 1)
                            del(item)
                          }} className="cursor-pointer">
                            {smallDeletIcon()}
                          </span>
                        </div>
                      )
                    }) : <p className="font-bold text-mainColor text-center w-full p-3 bg-white rounded-xl ">{t("homepage.noCourses")}</p>
                    }


                  </div>
                </div>



                <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center ">
                  <button
                    disabled={selectedCourse.length === 0 || selectedCourseId === 0}

                    type="submit"
                    className={`${selectedCourse.length === 0 || selectedCourseId === 0 ? "bg-secondMainColor" : " bg-mainColor"} text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl`}
                  >



                    {addCenterLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                    ></div> : t("PopupWindows.confirm")}

                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // setConferm(false)
                      if (!conferm) {
                        setToggler({ ...Toggler, addCenter: false })
                      } else {
                        setConferm(prev => !prev)
                      }
                    }}
                    className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl"
                  >
                    {t("homepage.back")}
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








{/*body*/ }

