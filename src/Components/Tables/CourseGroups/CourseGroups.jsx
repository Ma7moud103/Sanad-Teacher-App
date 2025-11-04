import React, { useContext, useState, memo, Fragment } from 'react'
// import Pagination from '../../Pagination/Pagination'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import sort from '../../../Assets/sanadSVG/sort.svg'
import { ReactSVG } from 'react-svg'
import downarrow from '../../../Assets/sanadSVG/downArrow.svg'
import leftArrow from "../../../Assets/sanadSVG/leftArrow.svg"
import { ApisContext } from '../../../Context/ApisContext'
import LargePosts from '../../Skeletons/LargePosts'
import Pagination from '../../Pagination/Pagination'
import SmallPosts from '../../Skeletons/SmallPosts'

const CourseGroups = () => {


    const [t] = useTranslation();
    const { Time, fetchCourseGroups, tens } = useContext(ApisContext)


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };






    // Calculate the start and end indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, fetchCourseGroups.data?.length);
    const visibleData2 = fetchCourseGroups.data?.slice(startIndex, endIndex);







    return (
        <div className="w-full xl:bg-white rounded-lg flex flex-col xl:p-6  justify-center gap-y-5  mb-8  ">


            <div className="main flex flex-col gap-3">
                <p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32   text-mainColor">
                    {t("TeacherDetails.teacherCourses")}
                </p>
            </div>




            <div className="largeScreen hidden xl:flex flex-col overflow-hidden ">

                <div className="thead border border-[#E1E1E1] bg-[#F4F7FE]   rounded-lg rounded-b-none flex justify-between items-center w-full">

                    <div className="textHeader p-6 py-5 w-full   flex justify-between items-center">
                        <p className="text-start text-sm text-textGray w-1/4">
                            {t("homepage.centerName")}
                        </p>

                        <div className="flex gap-x-2  w-1/4 ">
                            <ReactSVG src={sort} />
                            <p className="text-start  text-sm text-textGray">
                                {t("Logs.educationalStage")}
                            </p>
                        </div>

                        <p className="text-start  text-sm text-textGray w-1/4">
                            {t("Courses.studentsCount")}

                        </p>
                        <p className="text-start  text-sm text-textGray w-1/4">
                            {t("Courses.groupsCount")}

                        </p>
                        {/* <p className="text-start text-textGray w-1/4">
                            {t("Courses.studentsCount")}
                        </p> */}

                    </div>
                </div>


                {!fetchCourseGroups.isFetched ?
                    <LargePosts />

                    : fetchCourseGroups.data?.length > 0 ? fetchCourseGroups.data?.map((item, i) => {
                        return (
                            <Fragment key={i}>
                                <Disclosure >
                                    {({ open }) => (
                                        <div>
                                            <DisclosureButton
                                                className={`content relative w-full border-[#E1E1E1]  border-t-0 border flex items-center p-8 xl:py-4 "
                                    `}
                                            >

                                                <p className="nameLesson font-bold text-mainColor text-start  text-xs xl:text-sm w-1/4">
                                                    {item?._id?.name}
                                                </p>

                                                <p className="nameLesson font-bold text-mainColor text-start text-xs xl:text-sm w-1/4">


                                                    {item?._id?.code}
                                                </p>

                                                {/* </div> */}
                                                <p className="files font-semibold text-xs xl:text-sm text-mainColor text-start w-1/4">




                                                    {item?.studentsCount > 0 ? tens.includes(item?.studentsCount) ? `${item?.studentsCount} ${t("SingleCourse.students")}` : `${item?.studentsCount} ${t("SingleCourse.student")}` : t("homepage.nothing")}
                                                </p>

                                                <p className="files font-semibold text-xs xl:text-sm text-mainColor text-start w-1/4">


                                                    {item && item.count ? tens.includes(item?.count) ? `${item?.count} ${t("homepage.groups")}` : `${item?.count} ${t("homepage.group")}` : null}
                                                </p>

                                                <span className='absolute end-4 top-[50%] translate-y-[-50%]'>
                                                    {open ? <ReactSVG src={downarrow} /> : <ReactSVG src={leftArrow} />}
                                                </span>


                                            </DisclosureButton>
                                            <DisclosurePanel className=" bg-white ">

                                                <div className={`w-full bg-[#F4F7FE] h-auto duration-200`}  >

                                                    <div className="thead border-[1px] border-[#E1E1E1]    flex justify-between items-center w-full">

                                                        <div className="textHeader p-6 py-3 w-full   flex justify-between">
                                                            <p className="text-start text-textGray w-[20%] text-sm">
                                                                {t("homepage.groupNumber")}
                                                            </p>


                                                            <p className="text-start w-[20%] text-sm text-textGray">
                                                                {t("homepage.studentCount")}
                                                            </p>

                                                            <p className="text-start text-textGray  w-[20%] text-sm">
                                                                {t("homepage.day")}
                                                            </p>
                                                            <p className="text-start text-textGray  w-[20%] text-sm">
                                                                {t("homepage.start")}
                                                            </p>
                                                            <p className="text-start text-textGray  w-[20%] text-sm">
                                                                {t("homepage.end")}
                                                            </p>

                                                        </div>
                                                    </div>


                                                    <div className="content  bg-[#F4F7FE]   ">

                                                        {item?.documents?.length > 0 ? item?.documents?.map((data, i) => {

                                                            return <div key={i} className=" p-6 py-3 w-full border-[#E1E1E1] border-[1px]   flex justify-between ">
                                                                <p className="text-start text-mainColor w-[20%] text-sm">
                                                                    {data?.groupNumber && t("homepage.group")} {data?.groupNumber}
                                                                </p>


                                                                <p className="text-start w-[20%] text-sm text-mainColor">
                                                                    {tens.includes(data?.studentsCount) ? `${data?.studentsCount} ${t("SingleCourse.students")}` : `${data?.studentsCount} ${t("SingleCourse.student")}`}
                                                                </p>

                                                                <p className="text-start text-mainColor  w-[20%] text-sm">
                                                                    {data?.dayOfWeek === 6 && `${t(`homepage.saturday`)}`}
                                                                    {data?.dayOfWeek === 0 && `${t(`homepage.sunday`)}`}
                                                                    {data?.dayOfWeek === 1 && `${t(`homepage.monday`)}`}
                                                                    {data?.dayOfWeek === 2 && `${t(`homepage.tuesday`)}`}
                                                                    {data?.dayOfWeek === 3 && `${t(`homepage.wednesday`)}`}
                                                                    {data?.dayOfWeek === 4 && `${t(`homepage.thursday`)}`}
                                                                    {data?.dayOfWeek === 5 && `${t(`homepage.friday`)}`}
                                                                </p>
                                                                <p className="text-start text-mainColor  w-[20%] text-sm">
                                                                    {Time(data?.startTime)}
                                                                </p>
                                                                <p className="text-start text-mainColor  w-[20%] text-sm">
                                                                    {Time(data?.endTime)}
                                                                </p>

                                                            </div>

                                                        }) : <p className=" text-center font-bold  py-3 p-6 border-[#E1E1E1] border-[1px]   text-mainColor bg-inherit ">{t("homepage.nothing")}</p>

                                                        }

                                                    </div>




                                                </div>


                                            </DisclosurePanel>
                                        </div>
                                    )}
                                </Disclosure>
                            </Fragment>
                        )


                    }) : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white ">{t("homepage.nothing")}</p>
                }






                {fetchCourseGroups.data?.length > 0
                    &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        totalItems={fetchCourseGroups.data?.length}
                    />
                }


            </div>





            {/* uncomment this part if you have the data then loop in it to display the data*/}
            <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
                {fetchCourseGroups.isFetched ?
                    fetchCourseGroups.data?.length > 0 ? fetchCourseGroups.data?.map((item, i) => {
                        return (
                            <Disclosure key={i}>
                                {({ open }) => (
                                    <div>
                                        <DisclosureButton
                                            className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
                                                }`}
                                        >
                                            <div className="flex flex-col items-start ">
                                                <p className="font-bold text-mainColor text-sm sm:text-base">{item?._id?.name}</p>
                                                <p className="font-bold text-textGray text-sm">

                                                    {item?._id?.code}
                                                </p>
                                            </div>


                                            {open ? <ReactSVG src={downarrow} /> : <ReactSVG src={leftArrow} />}

                                        </DisclosureButton>
                                        <DisclosurePanel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">

                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center   text-nowrap">
                                                    {t("Courses.groupsCount")}

                                                </p>
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                    {item && item.count ? tens.includes(item?.count) ? `${item?.count} ${t("homepage.groups")}` : `${item?.count} ${t("homepage.group")}` : null}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-semibold text-xs sm:text-sm text-textGray text-center   text-nowrap">
                                                    {t("SingleCourse.numOfSt")}
                                                </p>
                                                <div className="flex text-xs sm:text-sm  gap-2 font-semibold text-textGray flex-wrap justify-end ">
                                                    {item?.studentsCount > 0 ? tens.includes(item?.studentsCount) ? `${item?.studentsCount} ${t("SingleCourse.students")}` : `${item?.studentsCount} ${t("SingleCourse.student")}` : t("homepage.nothing")}
                                                </div>
                                            </div>
                                            <span className='w-full border-b-[#E1E1E1] border-b-[1px]'></span>

                                            {item?.documents?.map((data, i) => {
                                                return <div key={i} className='flex w-full justify-between'>
                                                    <p className="text-start text-mainColor  text-xs">
                                                        {data?.groupNumber && t("homepage.group")} {data?.groupNumber}
                                                    </p>

                                                    <p className="text-start text-mainColor    text-xs">
                                                        {data?.dayOfWeek === 6 && `${t(`homepage.saturday`)}`}
                                                        {data?.dayOfWeek === 0 && `${t(`homepage.sunday`)}`}
                                                        {data?.dayOfWeek === 1 && `${t(`homepage.monday`)}`}
                                                        {data?.dayOfWeek === 2 && `${t(`homepage.tuesday`)}`}
                                                        {data?.dayOfWeek === 3 && `${t(`homepage.wednesday`)}`}
                                                        {data?.dayOfWeek === 4 && `${t(`homepage.thursday`)}`}
                                                        {data?.dayOfWeek === 5 && `${t(`homepage.friday`)}`}
                                                    </p>

                                                    <div className='flex items-center gap-x-2'>
                                                        <p className="text-start text-mainColor   text-xs">
                                                            {Time(data?.startTime)}
                                                        </p>
                                                        <p className="text-start text-mainColor text-xs">
                                                            {Time(data?.endTime)}
                                                        </p>
                                                    </div>
                                                </div>
                                            })}


                                        </DisclosurePanel>
                                    </div>
                                )}
                            </Disclosure>
                        )
                    }) : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white">{t("homepage.nothing")}</p>

                    : <SmallPosts />}


                {fetchCourseGroups.data?.length > 0
                    &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        totalItems={fetchCourseGroups.data?.length}
                    />
                }

            </div>




        </div >
    )
}

export default memo(CourseGroups)