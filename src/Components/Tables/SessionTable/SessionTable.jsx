import React, { useContext, useEffect, useState } from "react";
import session from "../../../Assets/sanadSVG/addSession.svg";
import sort from "../../../Assets/sanadSVG/sort.svg";
import { useTranslation } from "react-i18next";
import Pagination from "../../Pagination/Pagination";
// import SessionItem from "../../SessionItem/SessionItem";
import { MainContext } from "../../../Context/MainContext";
// import axios from "axios";
import Xicon from "../../../Assets/sanadSVG/closeSession.svg"

import { ApisContext } from "../../../Context/ApisContext";
import { Disclosure, DisclosureButton, DisclosurePanel, Switch } from "@headlessui/react";
import Down from "../../../Assets/sanadSVG/downArrow.svg";
import hexToRgba from "hex-to-rgba"
import upload from '../../../Assets/sanadSVG/upload.svg'

import SmallPosts from "../../Skeletons/SmallPosts";
import { SvgsContext } from "../../../Context/SvgsContext"
import LargePosts from "../../Skeletons/LargePosts";
import { ReactSVG } from "react-svg";
import { useErrorBoundary } from "react-error-boundary";
import axios from "axios";
import { BASE_URL } from "../../../Soursre";
import { useParams } from "react-router-dom";


function SessionTable() {
  const { showBoundary } = useErrorBoundary()
  const { id } = useParams()
  let { headers, dataToPaginate, fetchSessions, tens, setselectedSession, sethandleToggleContent } = useContext(ApisContext)
  const { Toggler, setToggler, setsessionTopics,
    setsession, handleUserName, ErorrMessage

  } = useContext(MainContext)


  const { leftArrow, uploadImage } = useContext(SvgsContext)

  const [t] = useTranslation();
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const toggleContent = async (sessionId, isClosed) => {
    // if (sessionId === null) return false;
    try {
      const res = await axios.patch(`${BASE_URL}/tutor-courses/${id}/sessions/${sessionId}/resources`, {}, { headers: headers })

      console.log(res)
      if (res.status === 200 || res.data.status === "success") {


        if (isClosed) {
          ErorrMessage(t("homepage.openContent"), "success")
        } else {
          ErorrMessage(t("homepage.closeContent"), "success")
        }
        sethandleToggleContent(prev => !prev)
      }

    } catch (error) {
      showBoundary(error)
    }
  }





  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, fetchSessions.data?.length);

  const visibleData2 = fetchSessions.data?.slice()?.slice(startIndex, endIndex)




  const [enabled, setEnabled] = useState(false)






  return (
    <>


      <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 pb-4 gap-6 h-auto">
        <div className="header flex justify-between items-center">


          <div className="flex flex-col gap-3 ">
            <p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32   text-mainColor">
              {t("SingleCourse.sessionLog")}
            </p>




            {/* 
            <p className="font-semibold text-size_18 sm:text-size__20 text-textGray xl:hidden">

              {courseDetails?.totalSessions ? tens.includes(courseDetails?.totalSessions) ? `${courseDetails?.totalSessions} ${t("SingleCourse.Sessions")}` : `${courseDetails?.totalSessions} ${t("SingleCourse.session")}` : t("homepage.nothing")}
            </p> */}
          </div>

          {/* Teacher Part */}


          <div
            onClick={() => setToggler({ ...Toggler, addSession: true })}
            className="flex justify-center cursor-pointer items-center  bg-gradient-to-tr from-secondMainColor to-blue_light text-white rounded-lg py-2 px-3 text-center gap-2"
          >
            <ReactSVG src={session} />
            <div className="text-sm ">
              {t("homepage.addSession")}
            </div>
          </div>






        </div>


        <div className="largeScreen hidden xl:table">


          <div className="p-6 bg-[#F4F7FE] border border-[#E1E1E1] rounded-2xl rounded-b-none flex justify-between">


            <p className="text-start text-textGray text-sm w-1/6">
              {t("PopUps.sessionName")}
            </p>

            <p className="text-start text-textGray text-sm w-1/6">
              {t("SingleCourse.sessionNumber")}
            </p>

            <div className="flex gap-1 text-sm w-1/6">
              <ReactSVG src={sort} />
              <p className="text-start text-textGray text-sm">
                {t("homepage.sessionType")}
              </p>
            </div>

            <p className="text-start text-textGray  text-sm w-1/6">
              {t("SingleCourse.topicName")}
            </p>

            <p className="text-start text-textGray  text-sm w-1/6">
              {t("homepage.sessionAttend")}
            </p>
            <p className="text-start text-textGray  text-sm w-1/6">
              {t("homepage.contentType")}
            </p>
            {/* <div className="w-[9%]"></div> */}

          </div>


          <div>

            {
              fetchSessions.isFetched ?
                dataToPaginate?.length > 0 ?
                  visibleData2?.map((item, i) => {

                    const lastEle = visibleData2?.length - 1

                    return (

                      <div className="relative" key={i}>
                        <div

                          className={`py-5  ${lastEle === i && "rounded-b-2xl"}  px-6 w-full border-[#E1E1E1] border-t-0 border  flex items-center justify-between`}>

                          {/* <div className="flex text-start gap-2 w-1/5"> */}

                          <p className="nameLesson font-bold text-mainColor text-start   w-1/6 text-sm">
                            {/* {item?.name?.split(" ")?.slice(0, 3)?.join(" ")} */}
                            {handleUserName(item?.name, 4)}
                          </p>




                          <p className="nameLesson font-bold text-mainColor text-start   w-1/6 text-sm">

                            {`${t("SingleCourse.session")} ${item?.sessionNumber}`}
                          </p>

                          {/* </div> */}
                          <p className="files font-semibold text-textGray text-start  w-1/6 text-sm">

                            {item?.type === "session" ? t("homepage.session") : item?.type === "revision" ? t("homepage.revision") : item?.type === "offlineExam" && t("homepage.exam")}
                          </p>

                          <div className="  flex gap-2 flex-wrap cursor-pointer  font-semibold text-textGray  w-1/6 text-sm text-start"
                            onClick={() => {
                              setToggler({ ...Toggler, topics: true })
                              setsessionTopics(item?.topicData)
                            }}
                          >


                            {tens.includes(item?.topicData?.length)
                              ? `${item?.topicData?.length} ${t(
                                'SingleCourse.topics'
                              )}`
                              : `${item?.topicData?.length} ${t(
                                'SingleCourse.topic'
                              )}`}
                          </div>


                          <div className="w-1/6  ">
                            <Switch
                              onClick={() => {
                                if (!item?.isClosed) {
                                  setToggler({ ...Toggler, attendance: true })
                                }
                                setselectedSession(item)
                              }}
                              checked={!item?.isClosed}
                              onChange={() => setEnabled(!item?.isClosed)}
                              className={`  bg-err  data-[checked]:bg-secondMainColor ${item?.isClosed ? "cursor-auto" : "cursor-pointer"} group z-30 relative flex h-[20px] w-[40px]   rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none `}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute inline-block   top-[50%]  translate-y-[-50%] h-[15px] w-[15px] transform rounded-full bg-white   shadow-lg transition duration-200 ease-in-out ${!item?.isClosed ? '  bg-green-700' : '  bg-gray-300 -translate-x-[18px]'}`}
                              />
                            </Switch>
                          </div>

                          <div className="w-1/6  ">
                            <Switch
                              onClick={() => {
                                toggleContent(item?._id, item?.isContentClosed)
                                // setselectedSession(item)
                              }}
                              checked={!item?.isContentClosed}
                              onChange={() => setEnabled(!item?.isContentClosed)}

                              className={`  bg-err  data-[checked]:bg-secondMainColor   cursor-pointer   group z-30 relative flex h-[20px] w-[40px]   rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none `}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute inline-block   top-[50%]  translate-y-[-50%] h-[15px] w-[15px] transform rounded-full bg-white   shadow-lg transition duration-200 ease-in-out ${!item?.isContentClosed ? '  bg-green-700' : '  bg-gray-300 -translate-x-[18px]'}`}
                              />
                            </Switch>
                          </div>


                        </div>

                        <div className="icons flex justify-between items-center gap-x-4 absolute  top-[50%] translate-y-[-50%] end-6">

                          <div
                            type="button"
                            onClick={() => {
                              // setSwitchOff(false);
                              setToggler({ ...Toggler, upload: true })
                              // sessionStorage.setItem("selectedSession", JSON.stringify(item))
                              setsession(item)

                              // setSingleCoursePopupWindow(true);
                            }}
                            className="flex justify-center items-center cursor-pointer"
                          >
                            {uploadImage(19, 19)}
                          </div>







                          {/* <div
                          type="button"
                          onClick={() => {
                            setSwitchOff(true);
                            setSingleCoursePopupWindow(true);
                          }}
                          className=" flex flex-col justify-center cursor-pointer items-center gap-1 "
                        >
                          <ReactSVG src={dots} />
                        </div> */}

                        </div>

                      </div>



                    )
                  }
                  )

                  : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor">{t("homepage.nothing")}</p>
                :
                <LargePosts />
            }
            {
              dataToPaginate?.length > 0 &&
              <Pagination
                totalItems={dataToPaginate?.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            }





          </div>


        </div>


        {/* uncomment this part if you have the data then loop in it to display the data*/}
        <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
          {fetchSessions.isFetched ?
            dataToPaginate?.length > 0 ?
              visibleData2?.map((item, i) => (
                <div key={i}>
                  <Disclosure >
                    {({ open }) => (
                      <div>
                        <DisclosureButton
                          className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
                            }`}
                        >

                          <div className="flex text-center gap-2 justify-between items-center w-[85%] truncate">

                            <p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
                              {item ? item?.name : `${t("exam.choise")} ${t("homepage.session")}`}
                            </p>
                          </div>

                          {open ? <ReactSVG src={Down} /> : leftArrow()}



                        </DisclosureButton>
                        <DisclosurePanel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                          <div className="flex justify-between items-center w-full">
                            <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  ">
                              {t("homepage.sessionType")}
                            </p>
                            <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
                              {item?.type === "session" ? t("homepage.session") : item?.type === "revision" ? t("homepage.revision") : item?.type === "offlineExam" && t("homepage.exam")}
                            </p>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
                              {t("SingleCourse.topicName")}
                            </p>
                            <div className="flex  gap-2 font-semibold text-textGray flex-wrap justify-end ">
                              {item?.topicData?.length > 0 && item?.topicData?.map((topic, i) => {
                                return (
                                  <span key={topic?._id} style={{ color: topic?.color, backgroundColor: hexToRgba(topic?.color, "0.2") }} className="flex text-size_12  justify-center items-center  rounded-full py-1 px-2 text-xs text-center">
                                    {topic?.name}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
                              {t("homepage.sessionAttend")}
                            </p>
                            <Switch
                              onClick={() => {
                                if (item?.isClosed) {
                                  setToggler({ ...Toggler, openAttendance: true })
                                } else {
                                  setToggler({ ...Toggler, attendance: true })

                                }
                                setselectedSession(item)
                              }}
                              checked={!item?.isClosed}
                              onChange={() => setEnabled(!item?.isClosed)}
                              className={`  bg-err  data-[checked]:bg-secondMainColor group z-30 relative flex h-[20px] w-[40px] cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none `}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute inline-block   top-[50%]  translate-y-[-50%] h-[15px] w-[15px] transform rounded-full bg-white   shadow-lg transition duration-200 ease-in-out ${!item?.isClosed ? '  bg-green-700' : '  bg-gray-300 -translate-x-[18px]'}`}
                              />
                            </Switch>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
                              {t("homepage.contentType")}
                            </p>
                            <Switch
                              onClick={() => {
                                toggleContent(item?._id, item?.isContentClosed)
                                // setselectedSession(item)
                              }}
                              checked={!item?.isContentClosed}
                              onChange={() => setEnabled(!item?.isContentClosed)}
                              className={`  bg-err  data-[checked]:bg-secondMainColor group z-30 relative flex h-[20px] w-[40px] cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none `}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute inline-block   top-[50%]  translate-y-[-50%] h-[15px] w-[15px] transform rounded-full bg-white   shadow-lg transition duration-200 ease-in-out ${!item?.isContentClosed ? '  bg-green-700' : '  bg-gray-300 -translate-x-[18px]'}`}
                              />
                            </Switch>
                          </div>
                          <div className=" w-full flex items-center justify-end gap-x-3">


                            <div
                              onClick={() => {
                                // setSwitchOff(true);
                                setToggler({ ...Toggler, upload: true })
                                // sessionStorage.setItem("selectedSession", JSON.stringify(item))
                                setsession(item)

                                // setSingleCoursePopupWindow(true);
                              }}
                              className="flex flex-col  justify-center items-center gap-[1px] sm:gap-1 cursor-pointer "
                            >
                              <ReactSVG src={upload} />

                            </div>













                            {/* <div
                              onClick={() => {
                                setSwitchOff(true);
                                setSingleCoursePopupWindow(true);
                              }}
                              className="flex flex-col  justify-center items-center gap-[1px] sm:gap-1 cursor-pointer "
                            >
                              <ReactSVG src={dots} />
                            </div> */}
                          </div>
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>
                </div>
              ))
              : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor w-ful bg-white">{t("homepage.nothing")}</p>
            : <SmallPosts />
          }

          {
            dataToPaginate?.length > 0 &&
            <Pagination
              totalItems={dataToPaginate?.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          }


          {/* {showSingleCoursePopupWindow ? <SingleCoursePopupWindow /> : null} */}
          {/* {AttendencePopupW ? <AttendencePopup display={AttendencePopupW} setDisplay={setAttendencePopupW} /> : null} */}




        </div>

      </div >

    </>
  );




}

export default React.memo(SessionTable)
