import React, { useContext, useEffect, useState } from 'react';

import Down from '../../Assets/sanadSVG/downArrow.svg';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { ApisContext } from '../../Context/ApisContext';

import { ReactSVG } from 'react-svg';
import LargePosts from '../../Components/Skeletons/LargePosts';
import { SvgsContext } from '../../Context/SvgsContext';
import SmallPosts from '../../Components/Skeletons/SmallPosts';
import addgrade from '../../Assets/sanadSVG/sGrade.svg';
function StudentsOfflineExam() {
    const [t] = useTranslation();
    const cachedSelectedExam = JSON.parse(sessionStorage.getItem("selectedExam"))


    const {

        tens,
        fetchStudents,

        studentsCurrentPage,
        setstudentsCurrentPage,

    } = useContext(ApisContext);
    const { leftArrow } = useContext(SvgsContext);
    const { Toggler, setToggler, setselectedStudent } = useContext(MainContext);






    const itemsPerPage = 5;
    const handlePageChange = (newPage) => {
        setstudentsCurrentPage(newPage);

    };
    const [totalItems, settotalItems] = useState(0)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== studentsCurrentPage) {
            handlePageChange(newPage);
        }
    };

    const displayRange = 1;
    const pagesToShow = [];
    const startPage = Math.max(studentsCurrentPage - displayRange, 1);
    const endPage = Math.min(studentsCurrentPage + displayRange, totalPages);

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
        settotalItems(fetchStudents?.data?.metadata?.totalDocs)

    }, [fetchStudents, studentsCurrentPage])








    return (
        <div className="w-full lg:bg-white rounded-lg flex flex-col lg:px-6 py-6 gap-6">
            <div className="header flex flex-col  lg:flex-row  justify-between items-center relative gap-y-3">
                <div className="headerSmallScreen flex items-center justify-between w-full lg:flex-col lg:items-start gap-3">
                    <p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
                        {t('exam.students')}
                    </p>

                </div>

            </div>

            <div className="largeScreen hidden lg:block">
                <div className="bg-[#F4F7FE] t-head overflow-hidden py-6 px-4 flex items-center rounded-t-2xl border-[#E1E1E1] border ">
                    <p className={`text-start text-sm text-textGray w-1/3 `}>
                        {t('homepage.studentName')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-1/3 `}>
                        {t('homepage.studentNumber')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-1/3 `}>
                        {t('exam.cardCode')}
                    </p>
                    <p className={`text-start text-sm text-textGray w-1/3 `}>
                        {t('homepage.studentsGrade')}
                    </p>




                </div>

                <div>
                    {fetchStudents.isFetched ? (
                        fetchStudents?.data?.data?.length > 0 ? (
                            fetchStudents?.data?.data?.map((item, index) => {
                                const lastEle = fetchStudents?.data?.data?.length - 1
                                return (
                                    <div className="relative" key={item?._id}>
                                        <div
                                            className={`py-5  px-4 w-full relative border-[#E1E1E1] border-[1px] border-t-0  flex items-center  ${lastEle === index && "rounded-b-xl"}`}                                    >


                                            <p
                                                className={`font-semibold text-sm w-1/4 text-textGray  text-start  `}
                                            >
                                                {item?.student?.fullname}
                                            </p>

                                            <p
                                                className={`font-semibold text-sm w-1/4 text-textGray  text-start `}
                                            >
                                                {item?.student?.phoneNumber}
                                            </p>

                                            <p
                                                className={`font-semibold text-sm w-1/4 text-textGray  text-start `}
                                            >
                                                {item?.cardCode}
                                            </p>

                                            <p
                                                className={`font-semibold text-sm w-1/4 text-textGray  text-start `}
                                            >
                                                {item?.grade ? tens.includes(item?.grade) ? `${item?.grade} ${t("homepage.grades")}` : `${item?.grade} ${t("homepage.grade")}` : t("homepage.nothing")}
                                            </p>



                                        </div>
                                        {cachedSelectedExam?.type === "offline" && <div
                                            className="absolute  p-2  end-3 top-[50%] translate-y-[-50%] flex items-center gap-x-3"
                                            onClick={(e) => {
                                                setselectedStudent(item)
                                                e.stopPropagation();
                                                // setselectedStduent(item)
                                                setToggler({ ...Toggler, adddGrade: true });
                                            }}
                                        >
                                            <span className="cursor-pointer">
                                                <ReactSVG src={addgrade} />
                                            </span>
                                        </div>}



                                    </div>
                                )
                            })
                        ) : (
                            <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor">
                                {t('homepage.nothing')}
                            </p>
                        )
                    ) : (
                        <LargePosts />
                    )}
                </div>
                {fetchStudents.data?.data?.length > 0 &&
                    <div className="flex items-center justify-center gap-y-4 mt-4">
                        {fetchStudents?.data?.data?.length > 0 &&
                            <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
                                <button
                                    onClick={() => handleClick(studentsCurrentPage - 1)}
                                    // onClick={() => setstudentsCurrentPage((old) => {
                                    //     Math.max(old - 1, 1)
                                    // })}
                                    className={`${studentsCurrentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                        } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                    disabled={studentsCurrentPage === 1}
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
                                            ? studentsCurrentPage === page
                                                ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                                : "bg-transparent text-[#293241] hover:bg-slate-100"
                                            : "text-[#293241]"
                                            } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleClick(studentsCurrentPage + 1)}
                                    className={`${studentsCurrentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                        }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                    disabled={studentsCurrentPage === totalPages || fetchStudents.isPlaceholderData}

                                >
                                    &gt;
                                </button>
                            </div>
                        }
                    </div>}
            </div>

            {/* uncomment this part if you have the data then loop in it to display the data*/}
            <div className="smallScreen lg:mt-2 flex flex-col rounded-2xl gap-5 lg:hidden">
                {fetchStudents.isFetched ? (
                    fetchStudents?.data?.data?.length > 0 ? (
                        fetchStudents?.data?.data?.map(
                            (item, i) => (
                                <Disclosure key={item?._id}>
                                    {({ open }) => (
                                        <div>
                                            <DisclosureButton
                                                className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
                                                    }`}
                                            >
                                                <h4 className='font-bold text-mainColor '>
                                                    {item?.student?.fullname}
                                                </h4>
                                                {open ? <ReactSVG src={Down} /> : leftArrow()}

                                            </DisclosureButton>

                                            <DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                                                <div className=" nameOfTeacher flex justify-between items-center w-full">
                                                    <p className=" font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('homepage.studentNumber')}
                                                    </p>

                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {item?.student?.phoneNumber}
                                                    </p>
                                                </div>

                                                <div className=" nameOfTeacher flex justify-between items-center w-full">
                                                    <p className=" font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('homepage.studentsGrade')}
                                                    </p>

                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {item?.grade ? tens.includes(item?.grade) ? `${item?.grade} ${t("homepage.grades")}` : `${item?.grade} ${t("homepage.grade")}` : t("homepage.nothing")}                                                    </p>
                                                </div>



                                                <div className="numOfCenters flex justify-between items-center w-full">
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {t('exam.cardCode')}
                                                    </p>
                                                    <p className="font-semibold text-xs sm:text-sm text-textGray text-center">
                                                        {item?.cardCode}
                                                    </p>
                                                </div>




                                                {cachedSelectedExam?.type === "offline" && <div className="flex w-full justify-end items-center gap-x-3">
                                                    <span
                                                        className="cursor-pointer "
                                                        onClick={() => {
                                                            // setselectedStduent(item)
                                                            setselectedStudent(item)
                                                            setToggler({ ...Toggler, adddGrade: true })
                                                        }
                                                        }
                                                    >
                                                        <ReactSVG src={addgrade} />
                                                    </span>
                                                </div>}
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

                {fetchStudents.data?.data?.length > 0 &&
                    <div className="flex items-center justify-center gap-y-4">
                        {fetchStudents?.data?.data?.length > 0 &&
                            <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
                                <button
                                    onClick={() => handleClick(studentsCurrentPage - 1)}
                                    // onClick={() => setstudentsCurrentPage((old) => {
                                    //     Math.max(old - 1, 1)
                                    // })}
                                    className={`${studentsCurrentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                        } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                    disabled={studentsCurrentPage === 1}
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
                                            ? studentsCurrentPage === page
                                                ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                                : "bg-transparent text-[#293241] hover:bg-slate-100"
                                            : "text-[#293241]"
                                            } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleClick(studentsCurrentPage + 1)}
                                    className={`${studentsCurrentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                        }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                    disabled={studentsCurrentPage === totalPages || fetchStudents.isPlaceholderData}

                                >
                                    &gt;
                                </button>
                            </div>}
                    </div>}
            </div>
        </div>
    );
}

export default React.memo(StudentsOfflineExam);
