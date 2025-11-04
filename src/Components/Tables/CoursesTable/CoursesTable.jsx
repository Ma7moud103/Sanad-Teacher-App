import React, { useContext, useMemo, useRef, useState } from "react";
import search from "../../../Assets/sanadSVG/Search Icon.svg";
import avatar from "../../../Assets/sanadSVG/courseSmallAvatar.svg";
import Down from "../../../Assets/sanadSVG/downArrow.svg";
import { useTranslation } from "react-i18next";
import Pagination from "../../Pagination/Pagination";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ApisContext } from "../../../Context/ApisContext";
import Navigation from "../../../CustomHooks/LinkTo/Navigation";
import { ReactSVG } from "react-svg";
import LargePosts from "../../Skeletons/LargePosts";
import { SvgsContext } from "../../../Context/SvgsContext";
import SmallPosts from "../../Skeletons/SmallPosts";
import alert from "../../../Assets/sanadSVG/addAlert.svg"
import { MainContext } from "../../../Context/MainContext";
import CourseImage from "../../CourseImage/CourseImage";

function CoursesTable() {


  const { TeacherCourses, fetchTutorCourse, tens, coursesData, Role } = useContext(ApisContext)
  const { leftArrow, smallCourseAvatar, addCourseAlert, handleCourse } = useContext(SvgsContext)
  const { Toggler, setToggler,
    setselectedCourseForAlerts, handleUserName } = useContext(MainContext)
  const itemsPerPage = 5;
  const path = window.location.pathname

  const inputSearchBig = useRef()







  const [t, i18n] = useTranslation();

  let [inputSearch, setinputSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteration = useMemo(() => {
    if (!inputSearch) return TeacherCourses || []; // Return all courses if inputSearch is empty, or an empty array if TeacherCourses is undefined

    const searchTerm = inputSearch.toLowerCase();

    const filter = TeacherCourses?.filter((item) => {
      const courseName = item?.courseData?.name?.toLowerCase() || "";
      const gradeName = i18n.language === "ar"
        ? item?.courseData?.grade?.nameAr?.toLowerCase()
        : i18n.language === "en"
          ? item?.courseData?.grade?.nameEn?.toLowerCase()
          : "";

      return courseName?.includes(searchTerm) || gradeName?.includes(searchTerm);
    }) || [];

    return filter;

  }, [inputSearch, TeacherCourses, i18n.language]);


  // Calculate the start and end indexes for the current page

  const startIndex = (currentPage - 1) * itemsPerPage;

  const dataToDisplay = inputSearch ? filteration : TeacherCourses;


  const endIndex = Math.min(startIndex + itemsPerPage, dataToDisplay?.length);

  const visibleData2 = dataToDisplay?.length > 0
    ? dataToDisplay?.slice()?.slice(startIndex, endIndex)
    : [];


  const filterData = coursesData?.filter((item) => item?.role === Role && item?.path === path)



  return (
    <div className={`w-full lg:bg-white rounded-lg flex flex-col lg:px-6 py-6 gap-6  `}>

      <div className="relative flex items-center justify-between header">

        <div className="flex flex-col gap-3 headerSmallScreen">
          <p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
            {filterData[0]?.path === "/" ? t("homepage.bankLog") : t("homepage.coursesLog")}
          </p>






        </div>

        <div className={`headerLargescreen hidden cursor-pointer  h-12 w-80 bg-white lg:bg-[#F4F7FE] rounded-full lg:flex justify-start p-6 items-center text-textColor__2  `}
          onClick={() => inputSearchBig.current.focus()} >
          <ReactSVG src={search} />
          <input

            placeholder={t("homeBoxes.search")}
            value={inputSearch}
            ref={inputSearchBig}
            onChange={(e) => {
              setinputSearch(e.target.value)
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "none"
            }}
            className={"bg-inherit  w-full text-mainColor font-bold placeholder:font-semibold   border-none rounded-sm"} type="search" />

        </div>







      </div>



      <div className={`largeScreen hidden  lg:table`}>
        <div className=" t-head">

          <div className="p-6 border border-[#E1E1E1] bg-[#F4F7FE]   rounded-2xl rounded-b-none  flex ">

            {filterData[0]?.labels?.map((item, i) => {
              return (
                <p key={i} className={`text-start text-sm text-textGray w-1/${filterData[0]?.labels?.length}`}>
                  {i18n.language === "ar" ? item?.ar : i18n.language === "en" && item?.en}
                </p>
              )
            })}




          </div>

        </div>

        <div>



          {
            fetchTutorCourse.isFetched ?
              filteration?.length > 0 ?


                visibleData2?.map((item, i) => {
                  const isLastItem = i === visibleData2?.length - 1;
                  // const uppy = index % 2 === 0

                  return (
                    <div key={i} className={`relative   border-[#E1E1E1] border border-t-0 ${isLastItem && "   rounded-b-xl"}  `}
                    >
                      <>


                        {filterData[0]?.role === 3 && filterData[0]?.path === "/" &&
                          <Link
                            className={`py-3 cursor-pointer px-4 w-full relative   flex items-center justify-between `} to={`/courses/${item?._id}/bank`}>
                            <div className={`flex w-1/4  gap-2  text-start  items-center`}>

                              {/* {smallCourseAvatar(24, 37)} */}


                              <CourseImage w={24} h={24} courseName={item?.courseData?.name} />


                              <div className="flex flex-col">
                                <p className="flex items-center justify-start gap-2 text-xs font-bold text-mainColor">

                                  {handleUserName(item?.courseData?.name, 3)}
                                </p>
                                <p className="text-xs text-start text-textGray text-nowrap">
                                  {i18n.language === "ar" ? item?.courseData?.grade?.nameAr : item?.courseData?.grade?.nameEn}
                                </p>
                              </div>
                            </div>

                            <p className={`font-semibold text-sm w-1/4 text-textGray  text-start `}>

                              {

                                filterData[0]?.role === 3 && filterData[0]?.path === "/" &&
                                  item?.totalStudents !== undefined ? tens.includes(item?.totalStudents) ? `${item?.totalStudents} ${t("SingleCourse.students")}` : `${item?.totalStudents} ${t("SingleCourse.student")}` : t("homepage.nothing")
                              }
                            </p>

                            <p className={`font-semibold text-sm text-textGray w-1/4 text-start`}>



                              {item?.totalTAs > 0 ? tens.includes(item?.totalTAs) ? `${item?.totalTAs} ${t("homepage.assistants")}` : `${item?.totalTAs} ${t("homepage.assistant")}` : t("homepage.nothing")}


                            </p>



                            {/* 
                            <p className={`font-semibold text-sm text-textGray w-1/4 text-start`}>


                              {item?.centers?.length > 0 ? tens.includes(item?.centers?.length) ? `${item?.centers?.length} ${t("SingleCourse.center")}` : `${item?.centers?.length} ${t("SingleCourse.center1")}` : t("homepage.nothing")}

                            </p> */}

                            <p className="w-1/4 text-sm font-semibold text-textGray text-start">
                              {item?.totalExams > 0 ? tens.includes(item?.totalExams) ? `${item?.totalExams} ${t("homepage.exams")}` : `${item?.totalExams} ${t("homepage.exam")}` : t("homepage.nothing")}
                            </p>



                          </Link>


                        }

                        {filterData[0]?.role === 3 && filterData[0]?.path === "/courses" &&
                          <Link
                            className={`py-3 cursor-pointer px-4 w-full relative   flex items-center justify-between `} to={`/courses/${item?._id}`}>
                            <div className={`flex w-1/5  text-start gap-2 items-center`}>

                              {/* {smallCourseAvatar(24, 37)} */}
                              <CourseImage w={24} h={24} courseName={item?.courseData?.name} />

                              <div className="flex flex-col">

                                <p className="flex items-center justify-start gap-2 text-sm font-bold text-mainColor">
                                  {handleUserName(item?.courseData?.name, 3)}

                                </p>
                                <p className="text-xs text-start text-textGray text-nowrap">
                                  {i18n.language === "ar" ? item?.courseData?.grade?.nameAr : item?.courseData?.grade?.nameEn}
                                </p>
                              </div>
                            </div>



                            <p className={`font-semibold text-sm w-1/5 text-textGray ps-3  text-start `}>

                              {filterData[0]?.role === 3 && filterData[0]?.path === "/courses" &&
                                item?.term === "1" ? t("coursesTable.first") : item?.term === "2" ? t("coursesTable.second") : item?.term === "3" ? t("coursesTable.third") : item?.term === "0" && t("coursesTable.zero")

                              }
                            </p>

                            <p className={`font-semibold text-sm text-textGray w-1/5 text-start`}>




                              {item?.totalTAs > 0 ? tens.includes(item?.totalTAs) ? `${item?.totalTAs} ${t("homepage.assistants")}` : `${item?.totalTAs} ${t("homepage.assistant")}` : t("homepage.nothing")}


                            </p>




                            <p className={`font-semibold text-sm text-textGray w-1/5 text-start`}>




                              {item?.totalSessions > 0 ? tens.includes(item?.totalSessions) ? `${item?.totalSessions} ${t("SingleCourse.Sessions")}` : `${item?.totalSessions} ${t("SingleCourse.session")}` : t("homepage.nothing")}


                            </p>



                            <p className={`font-semibold text-sm text-textGray w-1/5 text-start`}>

                              {item?.totalTopics > 0 ? tens.includes(item?.totalTopics) ? `${item?.totalTopics} ${t("SingleCourse.topics")}` : `${item?.totalTopics} ${t("SingleCourse.topic")}` : t("homepage.nothing")}
                            </p>



                            {/* <p className={`font-semibold text-sm text-textGray w-1/5 text-start`}>


                              {item?.centers?.length > 0 ? tens.includes(item?.centers?.length) ? `${item?.centers?.length} ${t("SingleCourse.center")}` : `${item?.centers?.length} ${t("SingleCourse.center1")}` : t("homepage.nothing")}

                            </p> */}


                          </Link>
                        }


                        {filterData[0]?.role === 4 && filterData[0]?.path === "/" &&
                          <Link
                            className={`py-3 cursor-pointer px-4 w-full relative   flex items-center justify-between `} to={`/courses/${item?._id}/bank`}>
                            <div className={`flex w-1/3  text-start gap-2 items-center`}>
                              {/* <img className="max-w-12 max-h-12" src={avatar} alt="" /> */}
                              {/* <ReactSVG src={avatar} /> */}
                              <CourseImage w={24} h={24} courseName={item?.courseData?.name} />

                              <div className="flex flex-col">
                                <p className="flex items-center justify-start gap-2 text-sm font-bold text-mainColor">
                                  {handleUserName(item?.courseData?.name, 3)}

                                </p>
                                <p className="text-xs text-start text-textGray text-nowrap">
                                  {i18n.language === "ar" ? item?.courseData?.grade?.nameAr : item?.courseData?.grade?.nameEn}
                                </p>
                              </div>
                            </div>

                            <p className={`font-semibold text-sm w-1/3 text-textGray  text-start `}>

                              {

                                item?.tutor?.fullname
                              }
                            </p>


                            <p className={`font-semibold text-sm w-1/3 text-textGray  text-start `}>

                              {


                                item?.totalStudents !== undefined ? tens.includes(item?.totalStudents) ? `${item?.totalStudents} ${t("SingleCourse.students")}` : `${item?.totalStudents} ${t("SingleCourse.student")}` : t("homepage.nothing")
                              }
                            </p>










                            {/* 
                            <p className={`font-semibold text-sm text-textGray w-1/4 text-start`}>


                              {item?.centers?.length > 0 ? tens.includes(item?.centers?.length) ? `${item?.centers?.length} ${t("SingleCourse.center")}` : `${item?.centers?.length} ${t("SingleCourse.center1")}` : t("homepage.nothing")}

                            </p> */}
                          </Link>
                        }



                        {filterData[0]?.role === 4 && filterData[0]?.path === "/courses" &&
                          <Link
                            className={`py-3 cursor-pointer px-4 w-full relative   flex items-center justify-between `} to={`/courses/${item?._id}`}>
                            <div className={`flex w-1/4  text-start gap-2 items-center`}>
                              {/* <ReactSVG src={avatar} /> */}
                              <CourseImage w={24} h={24} courseName={item?.courseData?.name} />

                              <div className="flex flex-col">
                                <p className="flex items-center justify-start gap-2 text-sm font-bold text-mainColor">
                                  {handleUserName(item?.courseData?.name, 3)}

                                </p>
                                <p className="text-xs text-start text-textGray text-nowrap">
                                  {i18n.language === "ar" ? item?.courseData?.grade?.nameAr : item?.courseData?.grade?.nameEn}
                                </p>
                              </div>
                            </div>

                            <p className={`font-semibold text-sm w-1/4 text-textGray ps-3  text-start `}>

                              {item?.tutor?.fullname}
                            </p>






                            <p className={`font-semibold text-sm text-textGray w-1/4 text-start`}>




                              {item?.totalSessions > 0 ? tens.includes(item?.totalSessions) ? `${item?.totalSessions} ${t("SingleCourse.Sessions")}` : `${item?.totalSessions} ${t("SingleCourse.session")}` : t("homepage.nothing")}


                            </p>



                            <p className={`font-semibold text-sm text-textGray w-1/4 text-start`}>

                              {item?.totalTopics > 0 ? tens.includes(item?.totalTopics) ? `${item?.totalTopics} ${t("SingleCourse.topics")}` : `${item?.totalTopics} ${t("SingleCourse.topic")}` : t("homepage.nothing")}
                            </p>



                            {/* <p className={`font-semibold text-sm text-textGray w-1/5 text-start`}>


                              {item?.centers?.length > 0 ? tens.includes(item?.centers?.length) ? `${item?.centers?.length} ${t("SingleCourse.center")}` : `${item?.centers?.length} ${t("SingleCourse.center1")}` : t("homepage.nothing")}

                            </p> */}


                          </Link>
                        }




                      </>

                      <button type="button" className="absolute top-[50%] translate-y-[-50%] z-20 end-6"
                        onClick={() => {
                          setToggler({ ...Toggler, addAlert: true })
                          setselectedCourseForAlerts(item)
                        }}>
                        {addCourseAlert()}
                      </button>
                    </div>
                  )
                })
                :
                <p className="p-2 my-2 font-bold text-center  rounded-xl text-mainColor">{t("coursesTable.noCourses")}</p>

              : <LargePosts />
          }


        </div>
        {
          filteration?.length > 0 &&
          <Pagination
            totalItems={filteration?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        }



      </div>


      {/* uncomment this part if you have the data then loop in it to display the data*/}
      <div className={`smallScreen md:mt-2 flex flex-col rounded-2xl gap-5 lg:hidden  `}>



        {
          fetchTutorCourse.isFetched ?
            filteration?.length > 0 ?
              visibleData2?.map((item, i) => (

                <Disclosure key={item?._id} >
                  {({ open }) => (
                    <div>
                      <DisclosureButton
                        className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
                          }`}
                      >
                        <div className="flex items-center gap-2 text-start">
                          {/* <ReactSVG src={avatar} /> */}
                          <CourseImage w={26} h={26} courseName={item?.courseData?.name} />


                          <div className="flex flex-col">
                            <div className="flex items-center justify-start gap-2 font-bold text-mainColor">
                              {handleUserName(item?.courseData?.name, 3)}

                              {filterData[0]?.role === 3 && filterData[0]?.path === "/" && <Navigation to={`/courses/${item?._id}/bank`} />}
                              {filterData[0]?.role === 3 && filterData[0]?.path === "/courses" && <Navigation to={`/courses/${item?._id}`} />}
                              {filterData[0]?.role === 4 && filterData[0]?.path === "/" && <Navigation to={`/courses/${item?._id}/bank`} />}
                              {filterData[0]?.role === 4 && filterData[0]?.path === "/courses" && <Navigation to={`/courses/${item?._id}`} />}


                            </div>
                            <p className="text-xs sm:text-sm"> {i18n.language === "ar" ? item?.courseData?.grade?.nameAr : i18n.language === "en" && item?.courseData?.grade?.nameEn}</p>
                          </div>

                        </div>
                        <div
                          className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
                        >
                          {/* <img src={open ? Down : left} alt="" /> */}
                          {open ? <ReactSVG src={Down} /> : leftArrow()}
                        </div>
                      </DisclosureButton>


                      <DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                        <div className="flex items-center justify-between w-full  nameOfTeacher">

                          <p className="text-sm font-semibold text-center  text-textGray">
                            {t("coursesTable.term")}
                          </p>

                          <p className="text-sm font-semibold text-center text-textGray">

                            {
                              item?.term === "1" ? t("coursesTable.first") : item?.term === "2" ? t("coursesTable.second") : item?.term === "3" ? t("coursesTable.third") : item?.term === "0" && t("coursesTable.zero")

                            }
                          </p>

                        </div>



                        <div className="flex items-center justify-between w-full numOfCenters">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("homepage.examsName")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">

                            {item?.totalExams > 0 ? tens.includes(item?.totalExams) ? `${item?.totalExams} ${t("homepage.exams")}` : `${item?.totalExams} ${t("homepage.exam")}` : t("homepage.nothing")}

                          </p>
                        </div>


                        {Role === 3 && <div className="flex items-center justify-between w-full numOfCenters">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("homepage.assistantNum")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">


                            {item?.totalTAs > 0 ? tens.includes(item?.totalTAs) ? `${item?.totalTAs} ${t("homepage.assistants")}` : `${item?.totalTAs} ${t("homepage.assistant")}` : t("homepage.nothing")}

                          </p>
                        </div>}


                        <div className="flex items-center justify-between w-full numOfCenters">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("homepage.studentsNum")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">

                            {
                              item?.totalStudents !== undefined ? tens.includes(item?.totalStudents) ? `${item?.totalStudents} ${t("SingleCourse.students")}` : `${item?.totalStudents} ${t("SingleCourse.student")}` : t("homepage.nothing")}

                          </p>
                        </div>


                        {Role === 4 && <div className="flex items-center justify-between w-full numberOFStudents">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("coursesTable.teacherName")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">
                            {/* {totalTAs !== undefined ? totalTAs >= 9 ? `${totalTAs} ${t("homepage.assistants")}` : totalTAs == 0 ? `${t("homepage.no")}` : `${totalTAs} ${t("homepage.assistant")}` : t("homepage.no")} */}

                            {item?.tutor?.fullname}

                          </p>
                        </div>}


                        <div className="flex items-center justify-between w-full numOfGroups">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("coursesTable.sessionsNum")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">
                            {/* {totalSessions >= 9 ? `${totalSessions} ${t("SingleCourse.Sessions")}` : totalSessions == 0 ? t`${t("homepage.no")}` : `${totalSessions} ${t("SingleCourse.session")}`} */}

                            {item?.totalSessions > 0 ? tens.includes(item?.totalSessions) ? `${item?.totalSessions} ${t("SingleCourse.Sessions")}` : `${item?.totalSessions} ${t("SingleCourse.session")}` : t("homepage.nothing")}

                          </p>
                        </div>
                        <div className="flex items-center justify-between w-full numOfCenters">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("coursesTable.topicsNum")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">
                            {/* {totalTopics >= 9 ? `${totalTopics} ${t("SingleCourse.topics")}` : totalTopics == 0 ? `${t("homepage.no")}` : `${totalTopics} ${t("SingleCourse.topic")}`} */}

                            {item?.totalTopics > 0 ? tens.includes(item?.totalTopics) ? `${item?.totalTopics} ${t("SingleCourse.topics")}` : `${item?.totalTopics} ${t("SingleCourse.topic")}` : t("homepage.nothing")}

                          </p>
                        </div>

                        {/* 
                        
                        <div className="flex items-center justify-between w-full numOfCenters">
                          <p className="text-sm font-semibold text-center text-textGray">
                            {t("coursesTable.centersNum")}
                          </p>
                          <p className="text-sm font-semibold text-center text-textGray">

 


                            {item?.centers?.length > 0 ?
                              tens.includes(item?.centers?.length) ? `${item?.centers?.length} ${t("SingleCourse.center1")}` : `${item?.centers?.length} ${t("SingleCourse.center")}` : t("homepage.nothing")
                            }

                          </p>
                        </div> */}



                        <span className="flex justify-end w-full cursor-pointer"
                          onClick={() => {
                            setToggler({ ...Toggler, addAlert: true })
                            setselectedCourseForAlerts(item)

                          }}>
                          {/* {addCourseAlert()} */}
                          <ReactSVG src={alert} />
                        </span>
                      </DisclosurePanel>

                    </div>
                  )}
                </Disclosure>



              )) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor w-ful">{t("coursesTable.noCourses")}</p>
            : <SmallPosts />






        }


        {
          filteration?.length > 0 &&
          <Pagination
            totalItems={filteration?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />}

      </div>
    </div>);
}

export default React.memo(CoursesTable)

