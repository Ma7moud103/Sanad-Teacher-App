import React, { useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import downarrow from '../../Assets/sanadSVG/downArrow.svg';
import filterIcon from '../../Assets/sanadSVG/filterIcon.svg';
import { Disclosure, DisclosureButton, DisclosurePanel, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { MainContext } from '../../Context/MainContext';
import { ApisContext } from '../../Context/ApisContext';
import { useTranslation } from 'react-i18next';
import Post from '../../Components/Skeletons/Post';
import avatar from "../../Assets/sanadSVG/imgUser2.svg"
import hexToRgba from 'hex-to-rgba';
import { SvgsContext } from '../../Context/SvgsContext';
import SmallPosts from '../../Components/Skeletons/SmallPosts';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import x from "../../Assets/sanadSVG/Multiply.svg"
import Down from "../../Assets/sanadSVG/downArrow.svg"
import CourseImage from '../../Components/CourseImage/CourseImage';
import examImage from "../../Assets/sanadSVG/examSVG.svg"

function SingleExamTable() {
    const [t, i18n] = useTranslation()
    const { Toggler, setToggler, } = useContext(MainContext);
    const { fetchExamQuestions, examQCurrentPage, setexamQCurrentPage, tens, setperiorety, setdeletedQExam,
        perioreties, periorety, Day, Time } = useContext(ApisContext)

    const { smallDeletIcon, leftArrow, } = useContext(SvgsContext)
    const cachedSelectedExam = JSON.parse(sessionStorage.getItem("selectedExam"))


    const currentTime = dayjs();
    const startTime = dayjs(cachedSelectedExam.startTime);
    const endTime = dayjs(cachedSelectedExam.endTime);



    // this is single exam in the exams and in the singleCourse FOR BOTH




    const itemsPerPage = 6;
    const handlePageChange = (newPage) => {
        setexamQCurrentPage(newPage);

    };
    const [totalItems, settotalItems] = useState(0)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== examQCurrentPage) {
            handlePageChange(newPage);
        }
    };

    const displayRange = 1;
    const pagesToShow = [];
    const startPage = Math.max(examQCurrentPage - displayRange, 1);
    const endPage = Math.min(examQCurrentPage + displayRange, totalPages);

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
        settotalItems(fetchExamQuestions?.data?.metadata?.totalDocs)
    }, [fetchExamQuestions, examQCurrentPage])


    function getExamClasses(startTime, endTime) {
        const now = dayjs();
        const start = dayjs(startTime);
        const end = dayjs(endTime);

        if (start.isAfter(now) && end.isAfter(now)) {
            return "bg-bg_orange  ";
        } else if (start.isBefore(now) && end.isAfter(now)) {
            return "bg-bg_green t ";
        } else if (start.isBefore(now) && end.isBefore(now)) {
            return "  bg-bg_gray";
        } else {
            return "";
        }
    }


    const { pathname } = useLocation()

    // < h3 className = "text-lg font-bold text-center whitespace-nowrap sm:text-xl text-mainColor sm:text-start" >
    //     { pathname.includes("exam") ? null : `${t("exam.qBank")}  -  ${fetchCoure.data?.courseData?.name}` }

    // 		</ > 



    return (
        <div className='transition-all rounded-2xl'>

            {fetchExamQuestions.isFetched ? <div className="flex flex-col justify-center w-full gap-4 header lg:items-center rounded-xl ">


                <div className="p-4 bg-white courseDetails lg:w-full lg:flex lg:items-center lg:justify-between rounded-2xl">
                    <div className="flex items-center justify-center courseData gap-x-2">

                        <CourseImage courseName={cachedSelectedExam?.courseData?.name} w={26} h={26} />
                        <div>
                            <h4 className='font-bold text-mainColor'>{cachedSelectedExam?.courseData?.name}</h4>
                            <p className='text-sm font-bold text-textGray'>
                                {i18n.language === 'ar'
                                    ? `${t("SingleCourse.gradeLevel")} ${cachedSelectedExam?.courseData?.grade?.nameAr}`
                                    : i18n.language === 'en' &&
                                    `${t("SingleCourse.gradeLevel")} ${cachedSelectedExam?.courseData?.grade?.nameEn}`}
                            </p>
                        </div>
                    </div>

                    <div className='hidden lg:flex lg:flex-col lg:gap-y-3'>
                        <h3 className="hidden font-bold examTitle lg:block ">
                            {cachedSelectedExam?.title}
                        </h3>
                        <p className='w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light'>  {tens.includes(cachedSelectedExam?.durationInMinutes) ? ` ${cachedSelectedExam?.durationInMinutes} ${t("exam.minutes")}` : ` ${cachedSelectedExam?.durationInMinutes} ${t("exam.minute")}`} </p>




                    </div>
                    <div className="hidden examT lg:flex lg:flex-col lg:gap-y-1 ">
                        <div className='flex items-center w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light gap-x-1'>
                            <p className='text-xs font-bold '>
                                {Time(cachedSelectedExam?.startTime)}
                            </p>
                            :
                            <p className='text-xs font-bold '>
                                {Time(cachedSelectedExam?.endTime)}
                            </p>
                        </div>
                        <p className='w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light'>
                            {cachedSelectedExam?.totalQuestions > 0 ?
                                tens.includes(cachedSelectedExam?.totalQuestions)
                                    ? `${cachedSelectedExam?.totalQuestions} ${t('exam.questions')}`
                                    : `${cachedSelectedExam?.totalQuestions} ${t(
                                        'exam.question'
                                    )}` : t("homepage.nothing")}
                        </p>
                        <p className='w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light'>
                            {tens.includes(cachedSelectedExam?.expectedMark)
                                ? `${cachedSelectedExam?.expectedMark} ${t('exam.Grades')}`
                                : `${cachedSelectedExam?.expectedMark} ${t('exam.oneGrade')}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full p-4 bg-white rounded-xl lg:hidden">

                    <div className='grid w-full grid-cols-2 gap-2 sm:grid-cols-3'>

                        <p className='w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light '>   {tens.includes(cachedSelectedExam?.durationInMinutes) ? ` ${cachedSelectedExam?.durationInMinutes} ${t("exam.minutes")}` : ` ${cachedSelectedExam?.durationInMinutes} ${t("exam.minute")}`}

                        </p>

                        <p className='w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light'>
                            {cachedSelectedExam?.totalQuestions > 0 ?
                                tens.includes(cachedSelectedExam?.totalQuestions)
                                    ? `${cachedSelectedExam?.totalQuestions} ${t('exam.questions')}`
                                    : `${cachedSelectedExam?.totalQuestions} ${t(
                                        'exam.question'
                                    )}` : t("homepage.nothing")}
                        </p>
                        <p
                            className={`text-xs w-full text-center  font-bold px-2 py-1 rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light text-white  `}
                        >
                            {cachedSelectedExam?.type === "online" ? t("exam.Online") : cachedSelectedExam?.type === "offline" && t("exam.Offline")}
                        </p>
                        <p className='w-full px-2 py-1 text-xs font-bold text-center text-white rounded-md sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light'>
                            {tens.includes(cachedSelectedExam?.expectedMark)
                                ? `${cachedSelectedExam?.expectedMark} ${t('exam.Grades')}`
                                : `${cachedSelectedExam?.expectedMark} ${t('exam.oneGrade')}`}
                        </p>
                        <div className="flex items-center justify-center w-full col-span-2 px-2 py-1 text-xs font-bold text-white rounded-md examT sm:rounded-lg bg-gradient-to-tr from-secondMainColor to-blue_light gap-x-1 ">
                            <p className='text-xs font-bold '>
                                {Time(cachedSelectedExam?.startTime)}
                            </p>
                            :   <p className='text-xs font-bold '>
                                {Time(cachedSelectedExam?.endTime)}
                            </p>

                        </div>
                    </div>





                </div>

                <div className={`examDetails lg:hidden p-4 rounded-xl  bg-white    shadow-sm  `}>

                    <h1 className='font-bold text-center text-mainColor'>{cachedSelectedExam?.title}</h1>
                </div>

                <div className="flex items-center w-full filter lg:justify-end gap-x-2">
                    <div className="w-full lg:w-[300px]">
                        <Listbox
                            value={periorety}
                            onChange={(e) => {
                                console.log(e)
                                setperiorety(e)

                                setexamQCurrentPage(1)
                            }}
                        >
                            {({ open }) => (
                                <div className="relative ">
                                    <ListboxButton
                                        className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   text-mainColor border-input_border border-[1px]          sm:py-3 sm:px-2 text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
                                    >
                                        <div className="flex items-center ps-2 sm:p-0 gap-x-2">
                                            <span className="hidden sm:block">
                                                {' '}
                                                <ReactSVG src={filterIcon} />
                                            </span>

                                            <span className={`block truncate font-bold text-sm text-mainColor   `}>
                                                {periorety ? periorety?.name : t("exam.choise")}
                                            </span>
                                        </div>

                                        <ReactSVG src={downarrow} />
                                    </ListboxButton>

                                    <ListboxOptions className="absolute z-20 w-full py-1 mt-12 overflow-y-scroll text-base bg-white rounded-md shadow max-h-40 scrollbar-thin focus:outline-none sm:text-sm ">
                                        {perioreties.filter((item) => item.value !== periorety?.value)?.map((person, personIdx) => (

                                            <ListboxOption
                                                key={personIdx}
                                                className={({ active }) =>
                                                    ` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor  '}`}
                                                value={person} >
                                                {({ searchBySesion }) => (
                                                    <span className={`block truncate text-xs ${searchBySesion ? 'font-medium' : 'font-normal'}`}>
                                                        {person?.name}
                                                    </span>
                                                )}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            )}
                        </Listbox>
                    </div>



                </div>

            </div> :
                <div className='w-full p-3 bg-white rounded-xl'><Post /></div>}






            {fetchExamQuestions.isFetched ?
                <>

                    {fetchExamQuestions.data?.data?.length > 0 ?

                        <div className={`  flex flex-col   gap-6  grid lg:grid-cols-2 2xl:grid-cols-3 overflow-hidden    border-gray-200 my-10 w-full    `}>
                            {fetchExamQuestions.data?.data?.map((item, i) => (
                                <article key={item?._id} className=" bg-white relative  rounded-[42px]      flex flex-col items-start  transition-all"

                                >

                                    <div className="w-full examEmage">
                                        {item?.profileImage === undefined || item?.profileImage === "" ?
                                            <img className='w-full' src={examImage} alt='examImage' /> :
                                            <img className='w-full' src={item?.profileImage} alt='examImage' />}
                                    </div>


                                    <div className='p-4 '>
                                        <div className="flex items-center justify-between w-full text-xs gap-x-4 lg:w-auto lg:justify-normal">
                                            <span className="rounded-md px-3 py-1.5  bg-bg_mainLight  text-secondMainColor">{`${t("homepage.session")} ${item?.sessionNumber}`}</span>

                                            <h5 className={`${item?.priority === "H" ? "bg-bg_red text-text_res " : item?.priority === "L" ? "text-text_green bg-bg_green" : item?.priority === "M" && "bg-bg_orange text-text_orange"}  relative z-10 rounded-md  px-3 py-1.5 font-medium hover:bg-gray-100`}

                                            >
                                                {item?.priority === "H" ? t("exam.hard") : item?.priority === "L" ? t("exam.easy") : item?.priority === "M" && t("exam.normal")}
                                            </h5>

                                        </div>
                                        <div className="relative group">

                                            <h4 className='my-2 text-sm font-bold leading-6 text-textColor__2'>

                                                {item?.title} ?

                                            </h4>
                                            <div className="flex flex-wrap items-center justify-start w-full gap-2 mb-2 ">
                                                {item?.topicData?.length > 0 &&
                                                    item?.topicData?.map((topic, i) => {
                                                        return (
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    color: topic?.color ? topic?.color : "#023E8AB2",
                                                                    backgroundColor: topic?.color ? hexToRgba(topic?.color, '0.2') : "#DDE9FF",
                                                                }}
                                                                className={` flex justify-center text-xs items-center rounded-md px-4 py-1  text-center `}
                                                            >
                                                                {topic?.name}
                                                            </span>
                                                        );
                                                    })}
                                            </div>

                                            <p className='text-xs font-bold'>{t("homepage.theAnswer")}</p>

                                            <h6 className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
                                                {item?.
                                                    options
                                                    ?.map((item, i) => {

                                                        return <div key={i}
                                                            className={`   relative  leading-6 text-sm  rounded-md py-1 flex items-start  gap-x-2  ${item?.isCorrect ? "text-mainColor font-extrabold" : " font-medium "} `}
                                                        >



                                                            <div className={`w-[18px] h-[18px] border-textGray border  flex items-center justify-center rounded-md mt-1 ${item?.isCorrect ? "bg-mainColor " : "bg-white"}`}>
                                                                <span className='w-[6px] h-[6px] bg-white rounded-full '></span>
                                                            </div>


                                                            <span className='w-[97%] '>
                                                                {item?.option}
                                                            </span>


                                                        </div>

                                                    })}

                                            </h6>
                                        </div>
                                        <div className='flex items-center justify-between w-full p-2 rounded-xl'>
                                            <div className='flex flex-col'>
                                                <div>
                                                    <p className='font-bold text-2xs sm:text-xs text-mainColor '>{t("exam.questionUse")} : {item?.exams?.length}</p>
                                                    {/* <p className='font-bold text-2xs sm:text-xs text-mainColor '>{t("exam.questionMark")} : {item?.mark}</p> */}
                                                </div>
                                            </div>


                                            {
                                                startTime.isAfter(currentTime) && endTime.isAfter(currentTime) && <span className='cursor-pointer '
                                                    onClick={() => {
                                                        setdeletedQExam(item?._id)
                                                        setToggler({ ...Toggler, deletQFromE: true })
                                                    }}
                                                >
                                                    {smallDeletIcon()}

                                                </span>
                                            }
                                        </div>
                                    </div>


                                </article>

                            ))}

                        </div>

                        : <p className='w-full py-2 my-10 text-base text-center bg-white rounded-xl'>{t("homepage.nothing")}</p>}




                    {/* paginatoin */}
                    {fetchExamQuestions.data?.data?.length > 0 &&
                        <div className="flex items-center justify-center gap-y-4">
                            {fetchExamQuestions?.data?.data?.length > 0 &&
                                <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
                                    <button
                                        onClick={() => handleClick(examQCurrentPage - 1)}
                                        // onClick={() => setexamQCurrentPage((old) => {
                                        //     Math.max(old - 1, 1)
                                        // })}
                                        className={`${examQCurrentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                            } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                        disabled={examQCurrentPage === 1}
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
                                                ? examQCurrentPage === page
                                                    ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                                    : "bg-transparent text-[#293241] hover:bg-slate-100"
                                                : "text-[#293241]"
                                                } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleClick(examQCurrentPage + 1)}
                                        className={`${examQCurrentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : "cursor-pointer"
                                            }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                        disabled={examQCurrentPage === totalPages || fetchExamQuestions.isPlaceholderData}

                                    >
                                        &gt;
                                    </button>
                                </div>
                            }
                        </div>}
                </>
                : <div className='flex flex-col mt-4 gap-y-mainGap'>
                    <SmallPosts />
                </div>}






        </div>
    );
}

export default SingleExamTable;




// <div className={`smallScreen flex flex-col rounded-2xl gap-5 lg:hidden mt-12  `}>
//     {
//         fetchExamQuestions.isFetched ?
//             fetchExamQuestions.data?.data?.length > 0 ?
//                 fetchExamQuestions.data?.data?.map((item, i) => (

//                     <Disclosure key={item?._id} >
//                         {({ open }) => (
//                             <div className=''>


//                                 <div className={`topicsAndSessions w-full relative flex items-center mb-2 gap-x-2 `}>
//                                     <span className="rounded-md px-3 py-1.5 bg-secondMainColor text-xs sm:text-sm  text-white">{`${t("homepage.session")} ${item?.sessionNumber}`}</span>

//                                     <h5 className={`${item?.priority === "H" ? "bg-bg_red text-text_res " : item?.priority === "L" ? "text-text_green bg-bg_green" : item?.priority === "M" && "bg-bg_orange text-text_orange"}  relative z-10 rounded-md  px-3 py-1.5 font-medium hover:bg-gray-100 text-xs sm:text-sm`}

//                                     >
//                                         {item?.priority === "H" ? t("exam.hard") : item?.priority === "L" ? t("exam.easy") : item?.priority === "M" && t("exam.normal")}
//                                     </h5>


//                                     {/* {item?.topicData?.length > 0 &&
// 													item?.topicData?.map((topic, i) => {
// 														return (
// 															<span
// 																key={i}
// 																style={{
// 																	color: topic?.color ? topic?.color : "#023E8AB2",
// 																	backgroundColor: topic?.color ? hexToRgba(topic?.color, '0.2') : "#DDE9FF",
// 																}}
// 																className={` flex justify-center text-xs items-center rounded-md px-4 py-1  text-center `}
// 															>
// 																{topic?.name}
// 															</span>
// 														);
// 													})} */}
//                                 </div>
//                                 <DisclosureButton
//                                     className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                                         }`}
//                                 >

//                                     <h4 className="font-bold text-textColor__2">
//                                         {item?.title}
//                                     </h4>
//                                     <div
//                                         className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
//                                     >

//                                         {open ? <ReactSVG src={Down} /> : leftArrow()}
//                                     </div>
//                                 </DisclosureButton>


//                                 <DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-start rounded-b-2xl gap-6 ">
//                                     {item?.options?.map((option, i) => {
//                                         return (
//                                             <div className={`flex  relative items-center gap-x-2 text-sm   ${option?.isCorrect && "text-green "} font-bold`} key={i}>
//                                                 <span className='absolute w-1 h-1 bg-black -start-3'></span>
//                                                 {option?.option}
//                                             </div>
//                                         )
//                                     })}






//                                     {
//                                         startTime.isAfter(currentTime) && endTime.isAfter(currentTime) && <div className='flex justify-end w-full'> <span className='cursor-pointer '
//                                             onClick={() => {
//                                                 setdeletedQExam(item?._id)
//                                                 setToggler({ ...Toggler, deletQFromE: true })
//                                             }}
//                                         >
//                                             {/* <ReactSVG src={x} /> */}
//                                             {smallDeletIcon()}

//                                         </span>    </div>
//                                     }

//                                 </DisclosurePanel>

//                             </div>
//                         )}
//                     </Disclosure>



//                 )) : <p className="p-2 my-2 font-bold text-center bg-white rounded-xl text-mainColor w-ful">{t("homepage.nothing")}</p>
//             : <SmallPosts />






//     }


//     {fetchExamQuestions.data?.data?.length > 0 &&
//         <div className="flex items-center justify-center gap-y-4">
//             {fetchExamQuestions?.data?.data?.length > 0 &&
//                 <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                     <button
//                         onClick={() => handleClick(examQCurrentPage - 1)}
//                         // onClick={() => setexamQCurrentPage((old) => {
//                         //     Math.max(old - 1, 1)
//                         // })}
//                         className={`${examQCurrentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                             } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                         disabled={examQCurrentPage === 1}
//                     >
//                         &lt;
//                     </button>

//                     {pagesToShow.map((page, index) => (
//                         <button
//                             key={index}
//                             onClick={() => {
//                                 if (typeof page === "number") {
//                                     handleClick(page);
//                                 }
//                             }}
//                             className={`${typeof page === "number"
//                                 ? examQCurrentPage === page
//                                     ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                                     : "bg-transparent text-[#293241] hover:bg-slate-100"
//                                 : "text-[#293241]"
//                                 } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                         >
//                             {page}
//                         </button>
//                     ))}
//                     <button
//                         onClick={() => handleClick(examQCurrentPage + 1)}
//                         className={`${examQCurrentPage === totalPages
//                             ? "opacity-50 cursor-not-allowed"
//                             : "cursor-pointer"
//                             }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                         disabled={examQCurrentPage === totalPages || fetchExamQuestions.isPlaceholderData}

//                     >
//                         &gt;
//                     </button>
//                 </div>
//             }
//         </div>}
// </div>
