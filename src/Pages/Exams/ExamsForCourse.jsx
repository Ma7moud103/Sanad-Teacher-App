import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import Down from '../../Assets/sanadSVG/downArrow.svg';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';
import {
    Disclosure,
    DisclosurePanel,
    DisclosureButton,

} from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ApisContext } from '../../Context/ApisContext';
import Navigation from '../../CustomHooks/LinkTo/Navigation';
import { ReactSVG } from 'react-svg';
import { SvgsContext } from '../../Context/SvgsContext';
import delet from '../../Assets/sanadSVG/delet.svg';
import dayjs from 'dayjs';
import LargePosts from '../../Components/Skeletons/LargePosts';
import SmallPosts from '../../Components/Skeletons/SmallPosts';
import leftarrow from "../../Assets/sanadSVG/leftArrow.svg"
function ExamsForCourse() {
    const [t, i18n] = useTranslation();


    const {
        tens,
        fetchAllExamsCourse,
        examsCoursePage,
        setexamsCoursePage,
        setselectedExamInExams,
        setselectedExam,
    } = useContext(ApisContext);
    const { Toggler, setToggler, handleUserName } = useContext(MainContext);
    const { leftArrow } = useContext(SvgsContext);

    // examsCoursePage, setexamsCoursePage, fetchAllExamsCourse, filteredSession, setfilteredSession, fetchSessions







    const itemsPerPage = 5;
    const handlePageChange = (newPage) => {
        setexamsCoursePage(newPage);

    };
    const [totalItems, settotalItems] = useState(0)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== examsCoursePage) {
            handlePageChange(newPage);
        }
    };

    const displayRange = 1;
    const pagesToShow = [];
    const startPage = Math.max(examsCoursePage - displayRange, 1);
    const endPage = Math.min(examsCoursePage + displayRange, totalPages);

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


    useEffect(() => {
        settotalItems(fetchAllExamsCourse?.data?.metadata?.totalDocs)

    }, [fetchAllExamsCourse, examsCoursePage])

    function getExamStatus(startTime, endTime) {
        const now = dayjs();
        const start = dayjs(startTime);
        const end = dayjs(endTime);

        if (start.isAfter(now) && end.isAfter(now)) {
            return t("homepage.comming");
        } else if (start.isBefore(now) && end.isAfter(now)) {
            return t("homepage.onProgress");
        } else if (start.isBefore(now) && end.isBefore(now)) {
            return t("homepage.ended");
        } else {
            return t("homepage.nothing");
        }
    }

    function getExamClasses(startTime, endTime) {
        const now = dayjs();
        const start = dayjs(startTime);
        const end = dayjs(endTime);

        if (start.isAfter(now) && end.isAfter(now)) {
            return "bg-bg_orange text-text_orange";
        } else if (start.isBefore(now) && end.isAfter(now)) {
            return "bg-bg_green text-text_green";
        } else if (start.isBefore(now) && end.isBefore(now)) {
            return "text-textColor__2 bg-bg_gray";
        } else {
            return "";
        }
    }






    return (
        <div className="w-full 2xl:bg-white rounded-lg flex flex-col 2xl:px-6 py-6 gap-6 ">
            <div className="header flex   w-full justify-between items-center relative gap-y-3">

                <div className="headerSmallScreen w-full flex lg:w-1/2 flex-col gap-3">
                    <p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
                        {t('exam.log')}
                    </p>

                </div>



            </div>

            <div className="largeScreen hidden 2xl:block">
                <div className="bg-[#F4F7FE] t-head overflow-hidden py-6 px-4 flex items-center rounded-t-2xl border-[#E1E1E1] border  ">
                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.examName')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.case')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.type')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.time')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.by')}
                    </p>

                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.studentsNum')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.questionsNum')}
                    </p>

                    <p className={`text-start text-sm text-textGray w-[14.2%] `}>
                        {t('exam.avarege')}
                    </p>
                </div>

                <div>
                    {fetchAllExamsCourse.isFetched ? (
                        fetchAllExamsCourse.data?.data?.length > 0 ? (
                            fetchAllExamsCourse.data?.data?.map((item, i) => {
                                // const examStatus = getExamStatus(item?.startTime, item?.endTime);
                                const last = fetchAllExamsCourse.data?.data?.length - 1
                                return (
                                    <div className="relative" key={item?._id}>
                                        <Link
                                            onClick={() => {
                                                setselectedExamInExams(item)
                                                setselectedExam(item)
                                                sessionStorage.setItem("selectedExam", JSON.stringify(item));
                                            }}
                                            className={`py-5 cursor-pointer px-4 w-full gap-x-1 relative border-[#E1E1E1] border border-t-[0]  flex items-center ${last === i && "rounded-b-2xl"}`}
                                            // to={`${item?._id}`}
                                            // id/:examId/students
                                            to={item?.type === "online" ? `${item?._id}` : item?.type === "offline" && `${item?._id}/students`}

                                        >
                                            <div className={`flex w-[14.2%]  gap-2 items-center `}>
                                                {/* <ReactSVG src={avatar} /> */}
                                                <div className="flex flex-col">
                                                    <p className={`font-bold text-mainColor  ${item?.title?.split(" ")?.length > 3 ? "text-xs" : ""} flex justify-start text-center items-center gap-2`}>
                                                        {item?.title}
                                                        {/* {handleUserName(item?.title, 3)} */}
                                                    </p>
                                                    <p className="text-xs text-start text-textGray text-nowrap">
                                                        {i18n.language === 'ar'
                                                            ? item?.courseData?.grade?.nameAr
                                                            : i18n.language === "en" && item?.courseData?.grade?.nameEn}
                                                    </p>
                                                </div>
                                            </div>

                                            <p
                                                className={`font-semibold text-xs w-[14.2%]  text-start `}
                                            >
                                                <span className={`${getExamClasses(item?.startTime, item?.endTime)} text-xs px-1 py-0.5  rounded-lg `}>
                                                    {getExamStatus(item?.startTime, item?.endTime)}
                                                </span>
                                            </p>

                                            <p
                                                className={`font-semibold text-xs w-[14.2%] text-textGray  text-start `}
                                            >
                                                {item?.type === "online" ? t("exam.Online") : item?.type === "offline" && t("exam.Offline")}
                                            </p>

                                            <p
                                                className={`font-semibold text-xs w-[14.2%] text-textGray  text-start `}
                                            >
                                                {tens.includes(item?.durationInMinutes) ? ` ${item?.durationInMinutes} ${t("exam.minutes")}` : ` ${item?.durationInMinutes} ${t("exam.minute")}`}
                                            </p>

                                            <p
                                                className={`font-semibold text-xs text-textGray w-[14.2%] text-start`}
                                            >

                                                {handleUserName(item?.createdBy?.fullname, 1)} <br />
                                                <span className='text-2xs'>
                                                    {item?.createdBy?.code}
                                                </span>
                                            </p>

                                            <p
                                                className={`font-semibold text-xs text-textGray w-[14.2%] text-start`}
                                            >
                                                {item?.totalStudents > 0 ? tens.includes(item?.totalStudents)
                                                    ? `${item?.totalStudents} ${t('SingleCourse.students')}`
                                                    : `${item?.totalStudents} ${t(
                                                        'SingleCourse.student'
                                                    )}` : t("homepage.nothing")}
                                            </p>

                                            <p
                                                className={`font-semibold text-xs text-textGray w-[14.2%] text-start`}
                                            >
                                                {item?.totalQuestions > 0 ? tens.includes(item?.totalQuestions)
                                                    ? `${item?.totalQuestions} ${t('exam.questions')}`
                                                    : `${item?.totalQuestions} ${t(
                                                        'exam.question'
                                                    )}` : t("homepage.nothing")}
                                            </p>

                                            <p
                                                className={`font-semibold text-xs text-textGray w-[14.2%] text-start`}
                                            >
                                                {tens.includes(item?.expectedMark)
                                                    ? `${item?.expectedMark} ${t('exam.Grades')}`
                                                    : `${item?.expectedMark} ${t('exam.oneGrade')}`}
                                            </p>
                                        </Link>
                                        <div
                                            className="absolute  p-2  end-3 top-[50%] translate-y-[-50%] flex items-center gap-x-3"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setselectedExam(item)
                                                sessionStorage.setItem("selectedExam", JSON.stringify(item));

                                                setToggler({ ...Toggler, deletExam: true });
                                            }}
                                        >
                                            <span className="cursor-pointer">
                                                <ReactSVG src={delet} />
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        ) : (
                            <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor">
                                {t('homepage.nothing')}
                            </p>
                        )
                    ) : (
                        <LargePosts />
                    )}
                </div>
                {fetchAllExamsCourse.data?.data?.length > 0 &&
                    <div className="flex items-center justify-center gap-y-4 my-4">
                        {fetchAllExamsCourse?.data?.data?.length > 0 &&
                            <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
                                <button
                                    onClick={() => handleClick(examsCoursePage - 1)}
                                    // onClick={() => setexamsCoursePage((old) => {
                                    //     Math.max(old - 1, 1)
                                    // })}
                                    className={`${examsCoursePage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                        } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                    disabled={examsCoursePage === 1}
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
                                            ? examsCoursePage === page
                                                ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                                : "bg-transparent text-[#293241] hover:bg-slate-100"
                                            : "text-[#293241]"
                                            } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleClick(examsCoursePage + 1)}
                                    className={`${examsCoursePage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                        }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                    disabled={examsCoursePage === totalPages || fetchAllExamsCourse.isPlaceholderData}

                                >
                                    &gt;
                                </button>
                            </div>
                        }
                    </div>}
            </div>

            {/* uncomment this part if you have the data then loop in it to display the data*/}
            <div className="smallScreen md:mt-2 flex flex-col rounded-2xl gap-5 2xl:hidden">
                {fetchAllExamsCourse.isFetched ? (
                    fetchAllExamsCourse.data?.data?.length > 0 ? (
                        fetchAllExamsCourse.data?.data?.map(
                            (item, i
                            ) => (
                                <Disclosure key={i}>
                                    {({ open }) => (
                                        <div>
                                            <DisclosureButton
                                                className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b gap-x-3  flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
                                                    }`}
                                            >
                                                <div className='w-[90%] flex items-center justify-between gap-x-2'>
                                                    <div className="flex text-start gap-2 items-center  ">

                                                        <div className="flex flex-col ">
                                                            <p className=" font-bold text-mainColor  text-sm sm:text-base ">
                                                                {item?.title}

                                                            </p>

                                                            <p className="text-xs   sm:text-sm">

                                                                {i18n.language === 'ar'
                                                                    ? item?.courseData?.grade?.nameAr
                                                                    : i18n.language === "en" && item?.courseData?.grade?.nameEn}

                                                            </p>
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                setselectedExamInExams(item)
                                                                setselectedExam(item)
                                                                sessionStorage.setItem("selectedExam", JSON.stringify(item));
                                                            }}
                                                        >


                                                            <Navigation to={item?.type === "online" ? `${item?._id}` : item?.type === "offline" && `${item?._id}/students`} />

                                                        </div>
                                                    </div>

                                                    <p className={`px-2 py-1 text-xs sm:text-sm ${item?.type === "offline" ? "bg-bg_gray text-textColor__2" : item?.type === "online" && "bg-bg_green text-text_green"} rounded-lg`}>
                                                        {item?.type === "online" ? t("exam.Online") : item?.type === "offline" && t("exam.Offline")}

                                                    </p>
                                                </div>






                                                <div
                                                    className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
                                                >
                                                    {/* <img src={open ? Down : left} alt="" /> */}
                                                    {open ? <ReactSVG src={Down} /> : <ReactSVG src={leftarrow} />}
                                                </div>

                                            </DisclosureButton>

                                            <DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                                                <div className=" nameOfTeacher flex justify-between items-center w-full">
                                                    <p className=" font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.case')}
                                                    </p>


                                                    <p className={`px-2 py-1 text-xs sm:text-sm ${getExamClasses(item?.startTime, item?.endTime)} rounded-lg`}>
                                                        {getExamStatus(item?.startTime, item?.endTime)}
                                                    </p>
                                                </div>
                                                <div className=" nameOfTeacher flex justify-between items-center w-full">
                                                    <p className=" font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.time')}
                                                    </p>

                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {tens.includes(item?.durationInMinutes) ? ` ${item?.durationInMinutes} ${t("exam.minutes")}` : ` ${item?.durationInMinutes} ${t("exam.minute")}`}
                                                    </p>
                                                </div>

                                                <div className="numOfCenters flex justify-between items-center w-full">
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.by')}
                                                    </p>
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">

                                                        {handleUserName(item?.createdBy?.fullname, 2)} <br />
                                                        <span className='text-2xs'>
                                                            {item?.createdBy?.code}
                                                        </span>

                                                    </p>
                                                </div>

                                                <div className="numOfCenters flex justify-between items-center w-full">
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.studentsNum')}
                                                    </p>
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">

                                                        {item?.totalStudents > 0 ? tens.includes(item?.totalStudents)
                                                            ? `${item?.totalStudents} ${t('SingleCourse.students')}`
                                                            : `${item?.totalStudents} ${t(
                                                                'SingleCourse.student'
                                                            )}` : t("homepage.nothing")}
                                                    </p>
                                                </div>
                                                <div className="numOfCenters flex justify-between items-center w-full">
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.questionsNum')}
                                                    </p>
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">

                                                        {item?.totalQuestions > 0 ? tens.includes(item?.totalQuestions)
                                                            ? `${item?.totalQuestions} ${t('exam.questions')}`
                                                            : `${item?.totalQuestions} ${t(
                                                                'exam.question'
                                                            )}` : t("homepage.nothing")}
                                                    </p>
                                                </div>


                                                <div className="numOfCenters flex justify-between items-center w-full">
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.avarege')}
                                                    </p>
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {tens.includes(item?.expectedMark)
                                                            ? `${item?.expectedMark} ${t('exam.Grades')}`
                                                            : `${item?.expectedMark} ${t('exam.oneGrade')}`}
                                                    </p>
                                                </div>

                                                <div className="flex w-full justify-end items-center gap-x-3">
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setselectedExam(item)
                                                            sessionStorage.setItem("selectedExam", JSON.stringify(item));


                                                            setToggler({ ...Toggler, deletExam: true })
                                                        }
                                                        }
                                                    >
                                                        <ReactSVG src={delet} />
                                                    </span>
                                                </div>
                                            </DisclosurePanel>
                                        </div>
                                    )}
                                </Disclosure>
                            )
                        )
                    ) : (
                        <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor w-ful bg-white">
                            {t('homepage.nothing')}
                        </p>
                    )
                ) : (
                    <SmallPosts />
                )}

                {fetchAllExamsCourse.data?.data?.length > 0 &&
                    <div className="flex items-center justify-center gap-y-4">
                        {fetchAllExamsCourse?.data?.data?.length > 0 &&
                            <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
                                <button
                                    onClick={() => handleClick(examsCoursePage - 1)}
                                    // onClick={() => setexamsCoursePage((old) => {
                                    //     Math.max(old - 1, 1)
                                    // })}
                                    className={`${examsCoursePage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                        } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                    disabled={examsCoursePage === 1}
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
                                            ? examsCoursePage === page
                                                ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                                : "bg-transparent text-[#293241] hover:bg-slate-100"
                                            : "text-[#293241]"
                                            } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleClick(examsCoursePage + 1)}
                                    className={`${examsCoursePage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                        }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                    disabled={examsCoursePage === totalPages || fetchAllExamsCourse.isPlaceholderData}

                                >
                                    &gt;
                                </button>
                            </div>}
                    </div>}
            </div>
        </div>
    );
}

export default React.memo(ExamsForCourse);
