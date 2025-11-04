import React, { useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';

import { Disclosure, DisclosureButton, DisclosurePanel, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import { ApisContext } from '../../../Context/ApisContext';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatar from "../../../Assets/sanadSVG/imgUser.svg"
import hexToRgba from 'hex-to-rgba';
import { SvgsContext } from '../../../Context/SvgsContext';
import SmallPosts from '../../../Components/Skeletons/SmallPosts';
import Post from '../../../Components/Skeletons/Post';
import Down from "../../../Assets/sanadSVG/downArrow.svg"
import CourseImage from '../../../Components/CourseImage/CourseImage';
import { BASUE_IMAGES } from '../../../Soursre';
import examImage from "../../../Assets/sanadSVG/examSVG.svg"


// this is single exam in the exams page

function SingleExamTable() {
	const [t, i18n] = useTranslation()
	const { Toggler, setToggler, } = useContext(MainContext);
	const { fetchCourseQuestions, fetchCoure, Day, Time, searchBySesion, setsearchBySesion, questionsCoursePage, setquestionsCoursePage, setdeletedQCourse, SessionsToFitler } = useContext(ApisContext)


	const { smallDeletIcon, leftArrow } = useContext(SvgsContext)
	const { pathname } = useLocation()


	const itemsPerPage = 6;
	const handlePageChange = (newPage) => {
		setquestionsCoursePage(newPage);

	};
	const [totalItems, settotalItems] = useState(0)
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== questionsCoursePage) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(questionsCoursePage - displayRange, 1);
	const endPage = Math.min(questionsCoursePage + displayRange, totalPages);

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
		settotalItems(fetchCourseQuestions?.data?.metadata?.totalDocs)
	}, [fetchCourseQuestions, questionsCoursePage])


	// const [openDetails, setOpenDetails] = useState({});
	// const [showTopics, setShowTopics] = useState({});

	// const handleToggle = (id) => {
	// 	setOpenDetails((prevState) => ({
	// 		...prevState,
	// 		[id]: !prevState[id],
	// 	}));
	// 	setShowTopics((prevState) => ({
	// 		...prevState,
	// 		[id]: !prevState[id],
	// 	}));
	// };

	return (
		<div className='transition-all rounded-2xl'>


			{/* {fetchCoure.isFetched && fetchSessions.isFetched && fetchCourseQuestions.isFetched ? <div className="flex flex-col justify-center w-full p-4 bg-white header lg:flex-row lg:items-center rounded-xl gap-y-4"> */}
			{/* <h3 className="hidden text-lg font-bold text-center whitespace-nowrap sm:text-xl text-mainColor sm:text-start">
					{pathname.includes("exam") ? null : fetchCoure.data?.courseData?.name}

				</h3> */}



			<div className="flex flex-col w-full p-4 bg-white courseData gap-y-3 lg:flex-row lg:justify-center rounded-2xl">



				<div className='flex items-center w-full courseData lg:justify-center gap-x-2 '>
					<CourseImage courseName={fetchCoure?.data?.courseData?.name} w={24} h={24} />
					<div>
						<h4 className='font-bold text-mainColor'>{fetchCoure?.data?.courseData?.name}</h4>
						<p className='text-sm font-bold text-textGray'>
							{i18n.language === 'ar'
								? `${t("SingleCourse.gradeLevel")} ${fetchCoure.data?.courseData?.grade?.nameAr}`
								: i18n.language === 'en' &&
								`${t("SingleCourse.gradeLevel")} ${fetchCoure.data?.courseData?.grade?.nameEn}`}
						</p>
					</div>
				</div>

				<div className="flex items-center w-full filter lg:justify-end gap-x-2">
					<div className="w-full lg:w-[300px]">
						<Listbox
							value={searchBySesion}
							onChange={(e) => {

								setsearchBySesion(e)

								setquestionsCoursePage(1)
							}}
						>
							{({ open }) => (
								<div className="relative ">
									<ListboxButton
										className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between text-mainColor border-input_border border-[1px] sm:py-3 sm:px-2 text-sm overflow-hidden     flex cursor-pointer rounded-xl bg-bg_mainLayout text-left focus:outline-none sm:text-sm `}
									>
										<div className="flex w-[90%] items-center ps-2 sm:p-0 gap-x-2">
											<span className="hidden sm:block ">
												<ReactSVG src={filterIcon} />
											</span>

											<span className={`block  truncate font-bold text-sm text-mainColor `}>
												{searchBySesion?.value ? `${searchBySesion?.name} - ${t("homepage.sessionNumber")} ${searchBySesion?.sessionNumber}` : searchBySesion?.name}


											</span>
										</div>

										<span className='w-[10%]'>
											<ReactSVG src={downarrow} />
										</span>
									</ListboxButton>

									<ListboxOptions className="absolute z-40 w-full py-1 mt-12 overflow-y-scroll text-base rounded-md shadow max-h-40 bg-bg_mainLayout scrollbar-thin focus:outline-none sm:text-sm ">
										{SessionsToFitler?.map((person, personIdx) => (

											<ListboxOption
												key={personIdx}
												className={({ active }) =>
													` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor text-size_12 sm:text-sm  '}`}
												value={person} >
												{({ searchBySesion }) => (
													<span className={`block truncate text-xs  ${searchBySesion ? 'font-medium' : 'font-normal'}`}>
														{person?._id ? `${person?.sessionNumber}.  ${person?.name}  ` : person?.name}

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

			</div>







			{fetchCourseQuestions.isFetched ?
				<>
					{/* flex items-center justify-between w-full text-xs gap-x-4 lg:w-auto lg:justify-normal */}

					<div className={` gap-6    grid w-full lg:grid-cols-2  2xl:grid-cols-3    border-gray-200 my-10     `}>
						{fetchCourseQuestions.data?.data?.length > 0 ? fetchCourseQuestions.data?.data?.map((item, i) => (
							<article key={item?._id} className="bg-white relative  w-full    flex flex-col items-start  rounded-[34px] transition-all"

							>

								<div className="w-full examImage ">
									{item?.profileImage === "" || item?.profileImage === undefined ?
										<img className='w-full' src={examImage} alt="examImage" /> :
										<img className='w-full' src={item?.profileImage} alt="examImage" />}
								</div>

								<div className="p-4 ">



									<div className="flex items-center headerQuestion gap-x-2">
										<span className="rounded-md px-3 py-1.5  bg-bg_mainLight  text-secondMainColor text-sm">{`${t("homepage.session")} ${item?.sessionNumber}`}</span>

										<h5 className={`${item?.priority === "H" ? "bg-bg_red text-text_res " : item?.priority === "L" ? "text-text_green bg-bg_green" : item?.priority === "M" && "bg-bg_orange text-text_orange"}  relative z-10 rounded-md text-sm  px-3 py-1.5 font-medium hover:bg-gray-100`}

										>
											{item?.priority === "H" ? t("exam.hard") : item?.priority === "L" ? t("exam.easy") : item?.priority === "M" && t("exam.normal")}
										</h5>
									</div>



									<div className="relative mt-1 group">

										<h4 className='font-bold '>

											{item?.title}

										</h4>

										<div className="flex flex-wrap items-center justify-start w-full gap-2 my-2 topics ">
											{item?.topicData?.length > 0 &&
												item?.topicData?.map((topic, i) => {
													return (
														<span
															key={i}
															style={{
																color: topic?.color ? topic?.color : "#023E8AB2",
																backgroundColor: topic?.color ? hexToRgba(topic?.color, '0.2') : "#DDE9FF",
															}}
															className={` flex justify-center text-xs items-center rounded-md px-4 py-1 text-center `}
														>
															{topic?.name}
														</span>
													);
												})}
										</div>

										<p className='mt-3 text-xs font-bold text-textGray'>{t("homepage.theAnswer")}</p>

										<h6 className="mt-1 text-sm leading-6 text-gray-600 line-clamp-3">
											{item?.
												options
												?.map((item, i) => {

													return <div key={i}
														className={` w-full  relative  leading-6 text-sm  rounded-md py-1 flex items-start  gap-x-2  ${item?.isCorrect ? "text-mainColor font-extrabold" : " font-medium "} `}
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
												<p className='font-bold text-2xs sm:text-xs text-mainColor group-hover:text-white'>{t("exam.questionUse")} : {item?.exams?.length}</p>
												{/* <p className='font-bold text-2xs sm:text-xs text-mainColor group-hover:text-white'>{t("exam.questionMark")} : {item?.mark}</p> */}
											</div>
										</div>
										<span className='cursor-pointer '
											onClick={() => {
												setdeletedQCourse(item?._id)
												setToggler({ ...Toggler, deletQ: true })
											}}
										>
											{/* <ReactSVG src={x} /> */}
											{smallDeletIcon()}
										</span>
									</div>
								</div>


							</article>

						)) : <p className='w-full p-4 text-base text-center bg-white rounded-xl '>{t("exam.noExams")}</p>}

					</div>





					{/* pagination */}
					{fetchCourseQuestions.data?.data?.length > 0 &&
						<div className="flex items-center justify-center gap-y-4">
							{fetchCourseQuestions?.data?.data?.length > 0 &&
								<div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
									<button
										onClick={() => handleClick(questionsCoursePage - 1)}
										// onClick={() => setquestionsCoursePage((old) => {
										// 	Math.max(old - 1, 1)
										// })}
										className={`${questionsCoursePage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
											} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
										disabled={questionsCoursePage === 1}
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
												? questionsCoursePage === page
													? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
													: "bg-transparent text-[#293241] hover:bg-slate-100"
												: "text-[#293241]"
												} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
										>
											{page}
										</button>
									))}
									<button
										onClick={() => handleClick(questionsCoursePage + 1)}
										className={`${questionsCoursePage === totalPages
											? "opacity-50 cursor-not-allowed"
											: "cursor-pointer"
											}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
										disabled={questionsCoursePage === totalPages || fetchCourseQuestions.isPlaceholderData}

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



