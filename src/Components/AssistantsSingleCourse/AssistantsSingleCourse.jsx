import React, { useContext, useState } from "react";
import assistant from "../../Assets/sanadSVG/addAss.svg";
import sort from "../../Assets/sanadSVG/sort.svg";
import { useTranslation } from "react-i18next";
import del from "../../Assets/sanadSVG/delet.svg"
import profile from "../../Assets/sanadSVG/imgUser.svg"
import { MainContext } from "../../Context/MainContext";
import Pagination from "../Pagination/Pagination";
import { Disclosure } from "@headlessui/react";
import Down from "../../Assets/sanadSVG/downArrow.svg";
import { ApisContext } from "../../Context/ApisContext";
import { ReactSVG } from "react-svg";
import { SvgsContext } from "../../Context/SvgsContext";
import LargePosts from "../Skeletons/LargePosts";
import SmallPosts from "../Skeletons/SmallPosts";
import { BASUE_IMAGES } from "../../Soursre";


function AssistantsSingleCourse() {
    const [t] = useTranslation();
    const { Toggler, setToggler, setdeletedAssistant, handleUserName } = useContext(MainContext);
    const { assistantforEachCourse, courseDetails, fetchAssistants, tens } = useContext(ApisContext)


    const { leftArrow } = useContext(SvgsContext)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };






    // Calculate the start and end indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, assistantforEachCourse?.length);
    const visibleData2 = assistantforEachCourse?.slice(startIndex, endIndex);



    return (
        <>
            <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 gap-6">

                <div className="header flex justify-between items-center">

                    <div className="flex flex-col gap-3">
                        <p className="font-extrabold text-xl sm:text-3xl text-mainColor">
                            {t("homepage.assistantsLog")}

                        </p>

                        {/* <p className="font-semibold text-base sm:text-lg text-textGray xl:hidden">


                            {courseDetails.totalTAs !== undefined ? tens.includes(courseDetails.totalTAs) ? `${courseDetails.totalTAs} ${t("homepage.assistants")}` : `${courseDetails.totalTAs} ${t("homepage.assistant")}` : t("homepage.nothing")}
                        </p> */}
                    </div>

                    <div
                        onClick={() => setToggler({ ...Toggler, assAssToCourse: true })}
                        className="flex justify-center cursor-pointer items-center text-sm  bg-gradient-to-tr from-secondMainColor to-blue_light text-white rounded-lg py-2 px-3 text-center gap-2">
                        <ReactSVG src={assistant} />
                        {t("homepage.addAssistant")}
                    </div>



                </div>



                <div className=" hidden xl:table">
                    <div className="p-6 bg-[#F4F7FE] border border-[#E1E1E1]   rounded-2xl rounded-b-none flex  ">
                        <p className="text-start text-textGray text-sm w-1/4">

                            {t("ass.1")}
                        </p>
                        <div className="flex gap-x-1 text-sm w-1/4">

                            <ReactSVG src={sort} />
                            <p className="text-start text-textGray">

                                {t("ass.2")}
                            </p>
                        </div>
                        <p className="text-start text-textGray text-sm w-1/4">
                            {t("ass.phone")}
                        </p>
                        <p className="text-start text-textGray text-sm w-1/4">
                            {t("homepage.coursesNum")}
                        </p>

                    </div>

                    <div>


                        {fetchAssistants.isFetched ? fetchAssistants.data?.length > 0 ? visibleData2?.map((item, i) => {
                            const lastEle = fetchAssistants.data?.length - 1
                            return (
                                <div key={item?._id} className={`p-4 ${lastEle === i && "rounded-b-2xl"} items-center border relative border-[#E1E1E1] border-t-0  flex `}>


                                    <div className="flex  items-center gap-2 w-1/4">
                                        {item?.profileImage !== "" ?
                                            <span className=''>
                                                <img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
                                            </span>

                                            : <ReactSVG src={profile} />}

                                        <div>
                                            <p className="font-bold text-mainColor text-[16px] "> {item?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}</p>
                                            <p className="text-[11px] text-textGray font-semibold">  {item?.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-start text-textGray w-1/4 text-sm ps-2">{item?.code}</div>
                                    <div className="text-start text-mainColor w-1/4 text-sm">{item?.phoneNumber}</div>
                                    <div className="text-start text-textGray w-1/4 text-sm">
                                        {item?.totalTutorCourses !== undefined ? tens.includes(item?.totalTutorCourses) ? `${item?.totalTutorCourses} ${t("homepage.courses")}` : `${item?.totalTutorCourses} ${t("homepage.course")}` : t("homepage.nothing")}

                                    </div>

                                    <div
                                        onClick={() => {
                                            // deletAssistant(id, item._id, i)
                                            setdeletedAssistant(item?._id)
                                            setToggler({ ...Toggler, deletAssistant: true })
                                        }}
                                        className=" cursor-pointer absolute end-8  top-[50%] translate-y-[-50%] ">
                                        <ReactSVG src={del} />
                                    </div>

                                </div>
                            )
                        }) : <p className="my-2 text-center font-bold rounded-xl p-2 text-mainColor">{t("task.noass")}</p> : <LargePosts />}
                    </div>


                    {assistantforEachCourse?.length > 0 && (
                        <Pagination
                            totalItems={assistantforEachCourse?.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
                {/* uncomment this part if you have the data then loop in it to display the data*/}
                <div className="flex flex-col rounded-2xl gap-5 xl:hidden">
                    {fetchAssistants.isFetched ? fetchAssistants.data?.length > 0 ? visibleData2?.map((item, key) => (
                        <div key={item?._id}>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
                                                }`}
                                        >



                                            <div className="flex gap-x-2 items-center ">
                                                {/* <ReactSVG src={profile} /> */}
                                                {item?.profileImage !== "" ?
                                                    <span className=''>
                                                        <img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
                                                    </span>

                                                    : <ReactSVG src={profile} />}
                                                <div>
                                                    <p className="font-bold text-mainColor text-sm flex justify-start items-center gap-2">
                                                        {/* {item?.fullname} */}
                                                        {handleUserName(item?.fullname, 3)}
                                                    </p>
                                                    <p className=" text-xs sm:text-sm text-textColor__2"> {item?.email} </p>
                                                </div>
                                            </div>


                                            {open ? <ReactSVG src={Down} /> : leftArrow()}






                                        </Disclosure.Button>
                                        <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                    {t("ass.2")}
                                                </p>
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                    {item?.code}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center  ">
                                                    {t("ass.phone")}
                                                </p>

                                                <p className="flex justify-center text-xs sm:text-sm items-center text-mainColor  rounded-full text-center">
                                                    {item?.phoneNumber}
                                                </p>



                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center  ">
                                                    {t("homepage.coursesNum")}

                                                </p>

                                                <p className="flex justify-center text-xs sm:text-sm text-textGray font-semibold items-center  rounded-full text-center">
                                                    {item?.totalTutorCourses !== undefined ? tens.includes(item?.totalTutorCourses) ? `${item?.totalTutorCourses} ${t("homepage.courses")}` : `${item?.totalTutorCourses} ${t("homepage.course")}` : t("homepage.nothing")}
                                                </p>



                                            </div>



                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setdeletedAssistant(item?._id)
                                                    setToggler({ ...Toggler, deletAssistant: true })
                                                }}
                                                className={`icon flex justify-end w-full cursor-pointer`}    >
                                                <ReactSVG src={del} />
                                            </span>

                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>

                        </div>
                    )) : <p className="my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white ">{t("task.noass")}</p> : <SmallPosts />}


                    {assistantforEachCourse?.length > 0 && (
                        <Pagination
                            totalItems={assistantforEachCourse?.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>


        </>
    );
}


export default React.memo(AssistantsSingleCourse)