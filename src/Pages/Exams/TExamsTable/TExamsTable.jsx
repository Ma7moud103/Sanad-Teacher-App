import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import avatar from '../../../Assets/sanadSVG/courseSmallAvatar.svg';
import Down from '../../../Assets/sanadSVG/downArrow.svg';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../../Context/MainContext';
import {
	Disclosure,
	Listbox,
	DisclosurePanel,
	DisclosureButton,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ApisContext } from '../../../Context/ApisContext';


import { ReactSVG } from 'react-svg';

import { SvgsContext } from '../../../Context/SvgsContext';
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import delet from '../../../Assets/sanadSVG/delet.svg';

import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import dayjs from 'dayjs';
import Navigation from '../../../CustomHooks/LinkTo/Navigation';
import LargePosts from '../../../Components/Skeletons/LargePosts';
import SmallPosts from '../../../Components/Skeletons/SmallPosts';
import CourseImage from '../../../Components/CourseImage/CourseImage';
function TExamsTable({ linkTo }) {
	const [t, i18n] = useTranslation();
	const path = window.location.pathname;


	const {
		allCoursesToFilterInExams,
		tens,

		fetchAllExams,
		examsPage,
		setexamsPage,
		filteredCourse,
		setselectedExamInExams,
		setfilteredCourse,
		setselectedExam,
	} = useContext(ApisContext);
	const { Toggler, setToggler, handleUserName } = useContext(MainContext);
	const { leftArrow } = useContext(SvgsContext);






	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setexamsPage(newPage);

	};
	const [totalItems, settotalItems] = useState(0)
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== examsPage) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(examsPage - displayRange, 1);
	const endPage = Math.min(examsPage + displayRange, totalPages);

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
		settotalItems(fetchAllExams?.data?.metadata?.totalDocs)

	}, [fetchAllExams, examsPage])

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




	console.log(fetchAllExams.data)





	return (
		<div className="w-full 2xl:bg-white rounded-lg flex flex-col 2xl:px-6 py-6 gap-6 ">
			<div className="header flex   w-full justify-between items-center relative gap-y-3">

				<div className="headerSmallScreen w-full flex lg:w-1/2 flex-col gap-3">
					<p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
						{t('exam.log')}
					</p>
					{/* <p className="font-semibold  text-size_18 sm:text-size__20 text-textGray lg:hidden">
						{fetchAllExams?.data?.metadata?.totalDocs ? tens.includes(fetchAllExams?.data?.metadata?.totalDocs)
							? `${fetchAllExams?.data?.metadata?.totalDocs} ${t('exam.exams')}`
							: `${fetchAllExams?.data?.metadata?.totalDocs} ${t('exam.exam')}` : t("homepage.nothing")}
					</p> */}
				</div>


				<div className="hidden lg:block lg:w-[300px] filter">
					<Listbox
						value={filteredCourse}
						onChange={(e) => {
							// setselectedCenter(e)
							// sessionStorage.clear()
							// sessionStorage.setItem("centerid", JSON.stringify(e))
							setfilteredCourse(e)
							setexamsPage(1)
						}}
					>
						{({ open }) => (
							<div className="relative ">
								<ListboxButton
									className={`font-semibold hidden md:flex w-full gap-x-3 items-center justify-between   text-mainColor  py-3 px-6  text-sm   
                         cursor-pointer rounded-xl bg-white 2xl:bg-bg_mainLayout text-left focus:outline-none  sm:text-sm `}
								>
									<div className="flex items-center ps-2 sm:p-0 gap-x-2">
										<span className="hidden sm:block">
											<ReactSVG src={filterIcon} />
										</span>

										<span className={`block truncate font-bold text-sm `}>
											{filteredCourse?.courseData ? filteredCourse?.courseData?.name : filteredCourse?.name}
										</span>
									</div>

									<ReactSVG src={downarrow} />
								</ListboxButton>

								<ListboxOptions className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white 2xl:bg-bg_mainLayout py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm ">
									{allCoursesToFilterInExams && allCoursesToFilterInExams?.map((person, personIdx) => (

										<ListboxOption
											key={personIdx}
											className={({ active }) =>
												` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor text-size_12 sm:text-sm  '}`}
											value={person} >
											{({ selected }) =>
											// <span className={`block truncate text-xs   ${selected ? 'font-medium' : 'font-normal'}`}>
											// 	{person?.courseData ? i18n.language === "ar" ? `${person?.courseData?.name} - ${person?.courseData?.grade?.nameAr}` : i18n.language === "en" && `${person?.courseData?.name} - ${person?.courseData?.grade?.nameAr}` :
											// 		person?.name
											// 	}
											// </span>

											{
												return person?.courseData ? <div className='flex items-center gap-x-2'>
													<CourseImage courseName={person?.courseData?.name} w={20} h={20} />
													<div>
														<p className={`block truncate text-xs   ${selected ? 'font-medium' : 'font-normal'}`}>
															{person?.courseData?.name}
														</p>
														<p className={`block truncate text-xs   ${selected ? 'font-medium' : 'font-normal'}`}>

															{i18n.language === "ar" ? person?.grade?.nameAr : person?.grade?.nameEn}
														</p>
													</div>
												</div> : person?.name
											}
											}
										</ListboxOption>
									))}
								</ListboxOptions>
							</div>
						)}
					</Listbox>
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
						{t('homepage.course')}
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
					{fetchAllExams.isFetched ? (
						fetchAllExams.data?.data?.length > 0 ? (
							fetchAllExams.data?.data?.map((item, i) => {
								const last = fetchAllExams.data?.data?.length - 1

								return (
									<div className="relative" key={item?._id}>

										<Link

											onClick={() => {
												setselectedExamInExams(item)
												setselectedExam(item)
												sessionStorage.setItem("selectedExam", JSON.stringify(item));
											}}
											className={`py-5 cursor-pointer px-4 w-full gap-x-1 relative border-[#E1E1E1] border border-t-[0]  flex items-center ${last === i && "rounded-b-2xl"}`}
											to={item?.type === "online" ? `/exams/${item?._id}` : item?.type === "offline" && `/exams/${item?._id}/students`}
										>
											<div className={`flex w-[14.2%]  gap-2   items-center `}>
												{/* <ReactSVG src={avatar} /> */}
												<div className="flex flex-col">
													<p className={`font-bold text-mainColor  ${item?.title?.split(" ")?.length > 3 ? "text-xs" : ""} flex justify-start  items-center gap-2`}>
														{item?.title}
														{/* {handleUserName(item?.title, 3)} */}
													</p>

												</div>
											</div>

											<p
												className={`font-semibold  text-xs w-[14.2%]  text-start `}
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

											<div className='w-[14.2%] flex items-center gap-x-1'>
												<CourseImage courseName={item?.courseData?.name} w={17} h={17} />
												<div>
													<p
														className={`font-semibold text-xs text-textGray  text-start`}
													>

														{handleUserName(item?.courseData?.name, 1)}
													</p>
													<p className="text-xs text-start text-textGray text-nowrap">
														{i18n.language === 'ar'
															? item?.courseData?.grade?.nameAr
															: i18n.language === "en" && item?.courseData?.grade?.nameEn}
													</p>
												</div>
											</div>

											<p
												className={`font-semibold text-xs text-textGray w-[14.2%] text-start`}
											>
												{item?.totalStudents > 0 ?
													tens.includes(item?.totalStudents)
														? `${item?.totalStudents} ${t('SingleCourse.students')}`
														: `${item?.totalStudents} ${t(
															'SingleCourse.student'
														)}` : t("homepage.nothing")}
											</p>

											<p
												className={`font-semibold text-xs text-textGray w-[14.2%] text-start`}
											>
												{item?.totalQuestions > 0 ?
													tens.includes(item?.totalQuestions)
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
				{fetchAllExams.data?.data?.length > 0 &&
					<div className="flex items-center justify-center gap-y-4 my-4">
						{fetchAllExams?.data?.data?.length > 0 &&
							<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
								<button
									onClick={() => handleClick(examsPage - 1)}
									// onClick={() => setexamsPage((old) => {
									// 	Math.max(old - 1, 1)
									// })}
									className={`${examsPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
										} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
									disabled={examsPage === 1}
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
											? examsPage === page
												? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
												: "bg-transparent text-[#293241] hover:bg-slate-100"
											: "text-[#293241]"
											} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => handleClick(examsPage + 1)}
									className={`${examsPage === totalPages
										? "opacity-50 cursor-not-allowed"
										: "cursor-pointer"
										}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
									disabled={examsPage === totalPages || fetchAllExams.isPlaceholderData}

								>
									&gt;
								</button>
							</div>
						}
					</div>}
			</div>

			{/* uncomment this part if you have the data then loop in it to display the data*/}
			<div className="smallScreen md:mt-2 flex flex-col rounded-2xl gap-5 2xl:hidden">
				{fetchAllExams.isFetched ? (
					fetchAllExams.data?.data?.length > 0 ? (
						fetchAllExams.data?.data?.map(
							(item, i
							) => (
								<Disclosure key={i}>
									{({ open }) => (
										<div>
											<DisclosureButton
												className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
													}`}
											>
												<div className="flex text-start gap-2 items-center">
													{/* <ReactSVG src={avatar} /> */}
													<CourseImage courseName={item?.courseData?.name} w={20} h={20} />

													<div className="flex flex-col">
														<div className="font-bold text-mainColor  text-sm sm:text-base flex justify-start items-center gap-2">
															{item?.title}

															<div
																onClick={() => {
																	setselectedExamInExams(item)
																	setselectedExam(item)
																	sessionStorage.setItem("selectedExam", JSON.stringify(item));
																}}

															>


																<Navigation to={item?.type === "online" ? `/exams/${item?._id}` : item?.type === "offline" && `/exams/${item?._id}/students`}
																/>


															</div>
															{/* onClick={() => setselectedExamInExams(item)} */}
														</div>
														<p className="text-2xs sm:text-xs">
															{' '}
															{i18n.language === 'ar'
																? item?.courseData?.grade?.nameAr
																: i18n.language === "en" && item?.courseData?.grade?.nameEn}
														</p>
													</div>
												</div>
												<div
													className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
												>
													{/* <img src={open ? Down : left} alt="" /> */}
													{open ? <ReactSVG src={Down} /> : leftArrow()}
												</div>
												{/* <div className="flex items-center gap-x-3">
													<p className={`px-2 py-1 text-xs sm:text-sm ${getExamClasses(item?.startTime, item?.endTime)} rounded-lg`}>
														{getExamStatus(item?.startTime, item?.endTime)}
													</p>

												</div> */}
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
														{t('homepage.course')}
													</p>

													<p className={` text-mainColor font-bold text-xs sm:text-sm   `}>
														{item?.courseData?.name}
													</p>
												</div>
												<div className=" nameOfTeacher flex justify-between items-center w-full">
													<p className=" font-semibold text-xs sm:text-sm text-textGray text-center">
														{t('exam.type')}
													</p>

													<p className="font-semibold text-xs sm:text-sm text-textGray text-center">
														{item?.type === "online" ? t("exam.Online") : item?.type === "offline" && t("exam.Offline")}

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
														{item?.createdBy?.fullname}

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

				{fetchAllExams.data?.data?.length > 0 &&
					<div className="flex items-center justify-center gap-y-4">
						{fetchAllExams?.data?.data?.length > 0 &&
							<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
								<button
									onClick={() => handleClick(examsPage - 1)}
									// onClick={() => setexamsPage((old) => {
									// 	Math.max(old - 1, 1)
									// })}
									className={`${examsPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
										} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
									disabled={examsPage === 1}
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
											? examsPage === page
												? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
												: "bg-transparent text-[#293241] hover:bg-slate-100"
											: "text-[#293241]"
											} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => handleClick(examsPage + 1)}
									className={`${examsPage === totalPages
										? "opacity-50 cursor-not-allowed"
										: "cursor-pointer"
										}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
									disabled={examsPage === totalPages || fetchAllExams.isPlaceholderData}

								>
									&gt;
								</button>
							</div>}
					</div>}
			</div>
		</div>
	);
}

export default React.memo(TExamsTable);
