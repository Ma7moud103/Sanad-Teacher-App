import React, { useContext, useMemo, useState } from "react";
import sort from "../../Assets/sanadSVG/sort.svg";
import Down from "../../Assets/sanadSVG/downArrow.svg";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination/Pagination";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ApisContext } from "../../Context/ApisContext";
import { MainContext } from "../../Context/MainContext";
import { ReactSVG } from "react-svg";
import { SvgsContext } from "../../Context/SvgsContext";
import SmallPosts from "../Skeletons/SmallPosts";
import LargePosts from "../Skeletons/LargePosts";


export default function CenterCourse() {
    const { Toggler, setToggler } = useContext(MainContext)
    const { fetchCenters, tens } = useContext(ApisContext)
    const { leftArrow } = useContext(SvgsContext)


    const [t] = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    // Calculate the start and end indexes for the current page

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = fetchCenters.data?.length > 0 && Math.min(startIndex + itemsPerPage, fetchCenters.data?.length)
    const visibleData2 = useMemo(() => {
        if (fetchCenters.data?.length > 0) {
            return fetchCenters.data.slice(startIndex, endIndex);
        }
        return [];
    }, [fetchCenters.data, startIndex, endIndex]);




    return (
        <>
            <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 gap-6">

                <div className="header flex justify-between items-center">

                    <div className="headerSmallScreen flex flex-col gap-3">
                        <p className="font-extrabold text-3xl text-mainColor">
                            {t("homepage.centersLog")}
                        </p>


                        {/* <p className="font-semibold text-xl text-textGray xl:hidden">


                            {fetchCenters.data?.length > 0 ? tens.includes(fetchCenters.data?.length) ? ` ${fetchCenters.data?.length}  ${t("homepage.centerss")}` : ` ${fetchCenters.data?.length}  ${t("homepage.centers")}` : t("homepage.nothing")}
                        </p> */}


                    </div>

                    <button
                        onClick={() => {
                            setToggler({ ...Toggler, addCenter: true })
                        }}
                        className="flex justify-center items-center bg-secondMainColor text-white rounded-lg p-2 text-center gap-2">

                        <p className="text-sm sm:text-base">{t("coursesTable.addcenter")}</p>



                    </button>



                </div>



                <div className="largeScreen hidden xl:table">
                    <div className="">

                        <div className="bg-[#F4F7FE] p-6 border border-[#E1E1E1]  rounded-2xl rounded-b-none  flex ">





                            <>
                                <p className="text-start text-sm text-textGray w-[20%]">

                                    {t("homepage.centerName")}
                                </p>

                                <div className="flex  w-[20%]">
                                    <ReactSVG src={sort} />
                                    <p className="text-start text-sm text-textGray ">
                                        {t("homepage.studentsNum")}
                                    </p>
                                </div>

                                <p className="text-start text-sm text-textGray w-[20%]">
                                    {t("homepage.groupsNum")}
                                </p>

                                <p className="text-start text-sm text-textGray w-[20%]">
                                    {t("homepage.coursesNum")}
                                </p>

                                <p className="text-start text-sm text-textGray w-[20%]">
                                    {t("homepage.centerCode")}
                                </p>


                            </>





                        </div>

                    </div>

                    <div>



                        {fetchCenters.isFetched ?
                            fetchCenters.data?.length > 0 ?
                                visibleData2?.map((item, index) => {
                                    const lastIndex = index === visibleData2?.length - 1
                                    return (
                                        <div key={item?._id}

                                            className={`py-5 px-6 w-full relative border-[#E1E1E1] border border-t-0 ${lastIndex && "rounded-b-xl"}  flex items-center justify-between`}>



                                            <p className="font-bold text-mainColor text-sm flex justify-start items-center gap-2 w-[20%]">
                                                {/* {item?.center?.name} */}
                                                {item?.name}

                                            </p>

                                            <p className="font-semibold text-sm text-textGray w-[20%] text-start ">
                                                {item?.totalStudents > 0 ? tens.includes(item?.totalStudents
                                                ) ? ` ${item?.totalStudents
                                                }  ${t("SingleCourse.students")}` : ` ${item?.totalStudents
                                                }  ${t("SingleCourse.student")}` : t("homepage.nothing")}
                                            </p>


                                            <p className="font-semibold text-sm text-textGray w-[20%] text-start">
                                                {item?.groupsCount > 0 ? tens.includes(item?.groupsCount
                                                ) ? ` ${item?.groupsCount
                                                }  ${t("coursesTable.groups")}` : ` ${item?.groupsCount
                                                }  ${t("coursesTable.group")}` : t("homepage.nothing")}
                                            </p>

                                            <p className="font-semibold text-sm text-textGray w-[20%] text-start">
                                                {item?.tutorCoursesCount
                                                    > 0 ? tens.includes(item?.tutorCoursesCount

                                                    ) ? ` ${item?.tutorCoursesCount

                                                    }  ${t("homepage.courses")}` : ` ${item?.tutorCoursesCount

                                                    }  ${t("homepage.course")}` : t("homepage.nothing")}
                                            </p>

                                            <p className="font-semibold text-sm text-textGray w-[20%] text-start">
                                                {item?.code}
                                            </p>


                                            <div className="flex justify-between items-center absolute left-6 text-start">

                                                {/* {open ? <ReactSVG src={Down} /> : <ReactSVG src={left} />} */}
                                            </div>
                                        </div>
                                    )
                                })
                                :

                                <p className="font-bold text-mainColor text-[18px] p-3 ">{t("homepage.nothing")}</p>

                            : <LargePosts />
                        }




                    </div>

                    {/* pagination */}


                    {fetchCenters.data?.length > 0 &&
                        <Pagination
                            totalItems={fetchCenters.data?.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    }



                </div>

                {/* uncomment this part if you have the data then loop in it to display the data*/}
                <div className="smallScreen md:mt-2 flex flex-col rounded-2xl gap-5 xl:hidden">

                    <>
                        {fetchCenters.isFetched ?
                            fetchCenters.data?.length > 0 ?
                                visibleData2
                                    ?.map((item, i) => (
                                        <div key={i}>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton
                                                            className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
                                                                }`}
                                                        >
                                                            <div className="flex text-start gap-2 items-center">
                                                                <p className="text-base sm:text-lg text-mainColor font-bold"> {item?.name}</p>
                                                            </div>
                                                            {open ? <ReactSVG src={Down} /> : leftArrow()}
                                                        </DisclosureButton>

                                                        <DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                                                            <div className=" nameOfTeacher flex justify-between items-center w-full">

                                                                <p className=" font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {t("homepage.studentsNum")}
                                                                </p>

                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {item?.totalStudents > 0 ? tens.includes(item?.totalStudents
                                                                    ) ? ` ${item?.totalStudents
                                                                    }  ${t("SingleCourse.students")}` : ` ${item?.totalStudents
                                                                    }  ${t("SingleCourse.student")}` : t("homepage.nothing")}
                                                                </p>

                                                            </div>

                                                            <div className="numberOFStudents flex justify-between items-center w-full">
                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {t("homepage.groupsNum")}
                                                                </p>
                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {item?.groupsCount > 0 ? tens.includes(item?.groupsCount
                                                                    ) ? ` ${item?.groupsCount
                                                                    }  ${t("coursesTable.groups")}` : ` ${item?.groupsCount
                                                                    }  ${t("coursesTable.group")}` : t("homepage.nothing")}
                                                                </p>
                                                            </div>

                                                            <div className="numOfCenters flex justify-between items-center w-full">
                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {t("homepage.coursesNum")}
                                                                </p>
                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {item?.tutorCoursesCount
                                                                        > 0 ? tens.includes(item?.tutorCoursesCount

                                                                        ) ? ` ${item?.tutorCoursesCount

                                                                        }  ${t("homepage.courses")}` : ` ${item?.tutorCoursesCount

                                                                        }  ${t("homepage.course")}` : t("homepage.nothing")}
                                                                </p>
                                                            </div>
                                                            <div className="numOfCenters flex justify-between items-center w-full">
                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {t("homepage.centerCode")}
                                                                </p>
                                                                <p className="font-semibold  text-sm sm:text-base text-textGray text-center">
                                                                    {item?.code}
                                                                </p>
                                                            </div>
                                                        </DisclosurePanel>

                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>


                                    ))


                                :
                                <p className="font-bold text-mainColor  p-3 bg-white w-full rounded-lg text-center ">{t("homepage.nothing")}</p>
                            : <SmallPosts />
                        }
                    </>



                    {fetchCenters.data?.length > 0 &&
                        <Pagination
                            totalItems={fetchCenters.data?.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />

                    }


                </div>







            </div>




        </>

    );
}

