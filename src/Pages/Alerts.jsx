import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { ApisContext } from '../Context/ApisContext';
import filterIcon from "../Assets/sanadSVG/filterIcon.svg"
import { SvgsContext } from '../Context/SvgsContext';
import downarrow from "../Assets/sanadSVG/downArrow.svg"
import { useTranslation } from 'react-i18next';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ReactSVG } from 'react-svg';
import { useErrorBoundary } from 'react-error-boundary';
import profile from "../Assets/sanadSVG/imgUser2.svg"
import axios from 'axios';
import { BASE_URL } from '../Soursre';
import { useQuery } from '@tanstack/react-query';
import CourseImage from '../Components/CourseImage/CourseImage';
import SmallPosts from '../Components/Skeletons/SmallPosts';
import { MainContext } from '../Context/MainContext';
function Alerts() {
    const { showBoundary } = useErrorBoundary()
    const cachedCourse = JSON.parse(
        sessionStorage.getItem("selectedCourseAlert")
    );
    const [t, i18n] = useTranslation()
    const { TeacherCourses, headers, Day, Time, tens } = useContext(ApisContext)
    const { handleUserName } = useContext(MainContext)





    const [currentCourse, setCurrentCourse] = useState(cachedCourse || TeacherCourses[0]);



    const handleCourseChange = (course) => {
        setCurrentCourse(course);
        sessionStorage.setItem("selectedCourseAlert", JSON.stringify(course));
        setcurerntPage(1);
    };



    const [curerntPage, setcurerntPage] = useState(1)
    const itemsPerPage = 6;
    const handlePageChange = (newPage) => {
        setcurerntPage(newPage);

    };
    const [totalItems, settotalItems] = useState(0)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== curerntPage) {
            handlePageChange(newPage);
        }
    };

    const displayRange = 1;
    const pagesToShow = [];
    const startPage = Math.max(curerntPage - displayRange, 1);
    const endPage = Math.min(curerntPage + displayRange, totalPages);

    if (startPage > 2) {
        pagesToShow.push(1);
        if (startPage > 3) {
            pagesToShow.push("...");
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }

    if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) {
            pagesToShow.push("...");
        }
        pagesToShow.push(totalPages);
    }




    const getAlerts = async () => {

        try {
            const res = await axios.get(`${BASE_URL}tutor-courses/${currentCourse?._id}/announcements?limit=6&page=${curerntPage}`, { headers: headers })

            if (res.status === 200 || res.data.status === "success") {
                return res.data
            }

        } catch (error) {
            showBoundary(error)

        }
    }

    const fetchAlerts = useQuery({
        queryKey: ["fetchAlerts", `${currentCourse?._id}`, `${curerntPage}`],
        queryFn: () => getAlerts(),
        enabled: !!headers["auth-token"] && !!currentCourse?._id,
        refetchOnMount: true,
        placeholderData: true,
        keepPreviousData: true,
    })


    // console.log(fetchAlerts.data)


    useEffect(() => {
        settotalItems(fetchAlerts?.data?.metadata?.totalDocs)


    }, [fetchAlerts, curerntPage])






    return (
        <>
            <Helmet>
                <title>announcements</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />


            </Helmet>
            <main className='flex flex-col w-full gap-y-4'>


                <div className='flex flex-col items-center justify-between w-full font-bold lg:flex-row '>
                    <div className='lg:w-full'>
                        <h3 className='text-3xl text-mainColor lg:w-full'>{t("dashboard.alerts")}</h3>
                        <p className='pt-2 text-xl text-textGray lg:w-full'>
                            {fetchAlerts?.data?.metadata?.totalDocs !== undefined ? tens.includes(fetchAlerts?.data?.metadata?.totalDocs) ? `${fetchAlerts?.data?.metadata?.totalDocs} ${t("homepage.alerts")}` : `${fetchAlerts?.data?.metadata?.totalDocs} ${t("homepage.alert")}` : null}
                        </p>

                    </div>



                    {currentCourse !== undefined ? <div className="flex flex-col w-full course gap-y-2 lg:w-3/5 xl:w-3/6 ">
                        <label
                            className="font-semibold text-secondMainColor"
                            htmlFor=""
                        >
                            {t('exam.courseName')}
                        </label>
                        <Listbox
                            value={currentCourse}
                            onChange={handleCourseChange}

                        >
                            {({ open }) => (
                                <div className="relative ">
                                    <ListboxButton
                                        className={`font-semibold w-full px-4 py-2 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]             text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-start focus:outline-none   `}
                                    >
                                        <div className="flex items-center ps-2 sm:p-0 gap-x-2">
                                            <CourseImage courseName={currentCourse?.courseData?.name} w={24} h={24} />

                                            <div className={` flex flex-col gap-y-1`}  >
                                                <h5 className='block text-sm font-bold truncate text-mainColor'>
                                                    {currentCourse?.courseData?.name}
                                                </h5>
                                                <p className='block text-xs font-semibold truncate text-textGray'>
                                                    {i18n.language === "ar" ? currentCourse?.courseData?.grade?.nameAr : i18n.language === "en" && currentCourse?.courseData?.grade?.nameEn}
                                                </p>
                                            </div>
                                        </div>

                                        <ReactSVG src={downarrow} />
                                    </ListboxButton>
                                    {/* .filter((item) => item?.courseData?.name !== currentCourse?.courseData?.name)? */}
                                    <ListboxOptions
                                        className="absolute  mt-[64px] max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-xs xl:text-sm scrollbar-thin shadow  focus:outline-none  "
                                    >
                                        {TeacherCourses?.filter((item) => item?.courseData?.name !== currentCourse?.courseData?.name)?.map((person, personIdx) => (
                                            <ListboxOption
                                                key={personIdx}
                                                className={({ active, }) =>
                                                    ` relative cursor-pointer   select-none py-1 sm:py-2 pl-10 pr-4 ${active && "bg-mainColor text-white"} text-mainColor text-sm transition-all `
                                                }
                                                value={person}
                                            >
                                                {({ selectedCenter, active }) => (
                                                    <div className={`flex items-center gap-x-2 `}>
                                                        {/* <ReactSVG src={courseAvatar} /> */}
                                                        <CourseImage courseName={person?.courseData?.name} w={20} h={20} />
                                                        <div className='flex flex-col gap-y-1'>
                                                            <h5
                                                                className={`block truncate  font-semibold text-xs  `}
                                                            >
                                                                {person?.courseData?.name}
                                                            </h5>
                                                            <p className={`text-xs font-semibold    ${active ? "text-white" : "text-textGray"} transition-all`}>{i18n.language === "ar" ? person?.courseData?.grade?.nameAr : i18n.language === "en" && person?.courseData?.grade?.nameEn}</p>
                                                        </div>

                                                    </div>


                                                )}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            )}
                        </Listbox>
                    </div> : null}
                </div>





                {/* {fetchAlerts.isFetched ? */}
                <>
                    {currentCourse !== undefined ?
                        fetchAlerts.isFetched ?
                            fetchAlerts.data?.data?.length > 0 ?



                                <div className="flex flex-col w-full gap-y-4 ">
                                    {fetchAlerts.data?.data?.map((item, i) => (
                                        <div key={i} className="p-3  w-full transition-all lg:w-[80%] bg-white shadow box rounded-xl hover:scale-[1.02]">
                                            <div className='flex items-center justify-between w-full'>
                                                <div className="flex items-center gap-x-1">
                                                    {item?.createdBy?.profileImage !== "" ? <img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={item?.createdBy?.profileImage} /> :
                                                        <ReactSVG src={profile} />}
                                                    <div>
                                                        <h6 className='font-bold text-mainColor'>

                                                            {handleUserName(item?.createdBy?.fullname, 2)}
                                                        </h6>
                                                        <p className='text-sm font-bold text-textGray '>
                                                            {item?.createdBy?.code}
                                                        </p>
                                                    </div>
                                                </div>


                                                <div className=''>

                                                    <h5 className='text-xs sm:text-base'>
                                                        {Day(item?.createdAt)}
                                                    </h5>
                                                    <h5 className='text-xs sm:text-base'>
                                                        {Time(item?.createdAt)}
                                                    </h5>
                                                </div>
                                            </div>

                                            <div className="flex flex-col w-full my-4 content ">
                                                <h4 className='font-bold lg:text-lg'>
                                                    {item?.title}
                                                </h4>
                                                <p className='mt-2 font-semibold leading-5 text-textColor__2'>
                                                    {item?.description}
                                                </p>
                                            </div>



                                        </div>

                                    ))}

                                </div>





                                : <p className='p-2 text-lg font-bold text-center bg-white text-mainColor rounded-xl '>{t("homepage.nothing")}</p>

                            : <SmallPosts />
                        : <p className='p-2 text-lg font-bold text-center bg-white text-mainColor rounded-xl '>{t("homepage.nothing")}</p>
                    }


                    {/* paginatoin */}
                    {fetchAlerts.data?.data?.length > 0 &&
                        <div className="flex items-center justify-center gap-y-4">
                            {fetchAlerts?.data?.data?.length > 0 &&
                                <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
                                    <button
                                        onClick={() => handleClick(curerntPage - 1)}
                                        // onClick={() => setcurerntPage((old) => {
                                        //     Math.max(old - 1, 1)
                                        // })}
                                        className={`${curerntPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                            } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                        disabled={curerntPage === 1}
                                    >
                                        &lt;
                                    </button>

                                    {pagesToShow.map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (typeof page === "number") {
                                                    handleClick(page);
                                                }
                                            }}
                                            className={`${typeof page === "number"
                                                ? curerntPage === page
                                                    ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                                    : "bg-transparent text-[#293241] hover:bg-slate-100"
                                                : "text-[#293241]"
                                                } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleClick(curerntPage + 1)}
                                        className={`${curerntPage === totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : "cursor-pointer"
                                            }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                        disabled={curerntPage === totalPages || fetchAlerts.isPlaceholderData}

                                    >
                                        &gt;
                                    </button>
                                </div>
                            }
                        </div>}
                </>
                {/* // : <div className='flex flex-col gap-y-mainGap'>
                    //     <SmallPosts />
                    // </div>} */}


            </main>
        </>
    )
}

export default Alerts