import React, {
	useContext,
	useState,
	Fragment,
	useEffect,
	useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from '@headlessui/react';
import { useFormik } from 'formik';
import marker from "../../../Assets/sanadSVG/checked.svg"

import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import examIcon from '../../../Assets/sanadSVG/online.svg';
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import * as Yup from 'yup';
import { SvgsContext } from '../../../Context/SvgsContext';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import CourseImage from '../../CourseImage/CourseImage';

export default function OnlineExam() {
	const currentDay = dayjs();
	const { id } = useParams()
	let [t, i18n] = useTranslation();
	const { Toggler, setToggler } = useContext(MainContext);
	const { smallCourseAvatar } = useContext(SvgsContext);
	const { fetchTopicsForCourse, selectedTopicsExam, setselectedTopicsExam,
		selectedCourse, setselectedCourse, TeacherCourses, tens, fetchSpcificSessions, addExam, sethandleAddExam, fetchgetAllSessionsForCourse,
		addExamLoading, fetchOfflineExamSessions, addExamOffline, addExamAsTa, addExamOfflineAsTa, fetchCoure, Role, isValidInput } = useContext(ApisContext);

	const examTypes = [
		{ name: t("exam.offlineE"), value: "offline" },
		{ name: t("exam.onlineE"), value: "online" },
	]

	const [selectedExamType, setselectedExamType] = useState(examTypes[1])
	const [selectedSessions, setselectedSessions] = useState([])
	const [startTime, setstartTime] = useState(dayjs().add(6, "minute"));
	const [endTime, setendTime] = useState(dayjs().add(2, 'hour'));

	useEffect(() => {
		setstartTime(dayjs().add(6, "minute"))
		setendTime(dayjs().add(2, 'hour'))
	}, [Toggler.online])
	const [selectedOfflineSession, setselectedOfflineSession] = useState(null)
	const [totalQuestions, settotalQuestions] = useState(0)


	const formik = useFormik({
		initialValues: {
			title: "",
			startTime: startTime?.toISOString(),
			endTime: endTime?.toISOString(),
			topics: selectedTopicsExam,
			sessions: selectedSessions,
			durationInMinutes: "",
			type: selectedExamType.value,
			expectedMark: "",
			offlineSessionId: selectedOfflineSession?._id,
			totalQuestions: totalQuestions
		}
		,
		validationSchema: Yup.object({
			title: Yup.string().required(t("homepage.requiredField")),
			durationInMinutes: Yup.number().required(t("homepage.requiredField")).positive().min(5, t("homepage.durationMin")).max(10800, t("homepage.durationMin")),

			expectedMark: Yup.number().required(t("homepage.requiredField")).positive(),
			startTime: Yup.date()
				.required(t("homepage.requiredField"))
				.test('is-after-now', t("homepage.startTime"), function (value) {
					return dayjs(value).isAfter(dayjs().add(4, 'minute'));
				}),
			endTime: Yup.date()
				.required(t("homepage.requiredField")).test('is-after-startTime', t("homepage.endTime"), function (value) {
					const { startTime } = this.parent; // Access startTime from parent object
					// Ensure endTime is after startTime
					return dayjs(value).isAfter(dayjs(startTime));
				}),


			sessions: Yup.array()
				.of(Yup.string().required(t("homepage.requiredField")))
				.min(1, t("homepage.oneItemAtleast"))
				.required(t("homepage.requiredField")),

			topics: Yup.array()
				.of(Yup.string().required(t("homepage.requiredField")))
				.min(1, t("homepage.oneItemAtleast"))
				.required(t("homepage.requiredField")),

		}),
		onSubmit: async (values, { resetForm }) => {


			if (selectedExamType.value === "online") {

				delete values.offlineSessionId
				delete values.totalQuestions

				if (Role === 3 && id) {
					addExamAsTa(values, resetForm, setselectedSessions, setselectedTopicsExam, setselectedCourse, setstartTime, setendTime, currentDay)
				} else {
					addExam(values, resetForm, setselectedSessions, setselectedTopicsExam, setselectedCourse, setstartTime, setendTime, currentDay)

				}


			} else if (selectedExamType.value === "offline") {
				console.log(values)
				if (Role === 3 && id) {
					addExamOfflineAsTa(values, resetForm, setselectedSessions, setselectedTopicsExam, setselectedCourse, setstartTime, setendTime, currentDay, setselectedOfflineSession, settotalQuestions)
				} else {
					addExamOffline(values, resetForm, setselectedSessions, setselectedTopicsExam, setselectedCourse, setstartTime, setendTime, currentDay, setselectedOfflineSession, settotalQuestions)
				}



			}

		}
	})







	function close() {
		setToggler({ ...Toggler, online: false });
		formik.resetForm();
		setselectedSessions([]);
		setselectedTopicsExam([]);
		setselectedCourse("");
		setstartTime(currentDay);
		setendTime(currentDay);
	}


	useEffect(() => {
		if (Toggler.online === false) {
			formik.resetForm();
			setselectedSessions([]);
			setselectedTopicsExam([]);
			setselectedCourse("");
			setstartTime(currentDay);
			setendTime(currentDay);
		}
	}, [Toggler.online === false])

	// console.log(formik.errors)


	useEffect(() => {
		if (Role === 4 && id) {
			setselectedCourse(fetchCoure.data)
		}
	})


	return (
		<>
			<Dialog
				open={Toggler.online}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full md:w-[80%] lg:w-[70%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-2 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, online: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={examIcon} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t("exam.addExam")}
									</h3>
								</div>
							</DialogTitle>
							<form onSubmit={formik.handleSubmit} className="flex flex-col  gap-y-2 relative 2xl:gap-y-3 my-2">
								<div className="row1 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">
									<div className="examName flex flex-col gap-y-2 md:w-2/5 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor="title"
										>
											{t('exam.examName')}
										</label>
										{formik.errors.title && formik.touched.title && <p className='text-err text-xs '>{formik.errors.title}</p>}
										<input
											className={`bg-white rounded-xl px-4 py-3   shadow-sm text-xs xl:text-sm text-mainColor font-bold placeholder:text-textGray ${isValidInput(formik.errors.title, formik.touched.title)}`}
											placeholder={t('exam.examName')}
											type="text"
											value={formik.values.title}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											name="title"
											id="title"

										/>
									</div>

									<div className="course flex flex-col gap-y-2 md:w-2/5 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('exam.courseName')}
										</label>

										<Listbox
											value={selectedCourse}
											disabled={selectedTopicsExam?.length > 0 || selectedSessions?.length > 0 || id}
											onChange={(e) => {
												// setselectedCenter(e)
												// sessionStorage.clear()
												// sessionStorage.setItem("centerid", JSON.stringify(e))
												// setvalues({ ...values, selectedCourse: e });
												setselectedCourse(e)
											}}

										>
											{({ open }) => (
												<div className="relative ">
													<ListboxButton
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-start focus:outline-none   `}
													>
														<div className="flex items-center ps-2 sm:p-0 gap-x-2">
															<ReactSVG src={filterIcon} />

															<p
																className={`block truncate text-mainColor font-semibold text-xs `}
															>
																{selectedCourse ? `${selectedCourse?.courseData?.name} - ${i18n.language === "ar" ? selectedCourse?.courseData?.grade?.nameAr : i18n.language === "en" && selectedCourse?.courseData?.grade?.nameEn}` : (
																	<span className="text-textGray">
																		{t('exam.choise')}
																	</span>
																)}
															</p>
														</div>

														<ReactSVG src={downarrow} />
													</ListboxButton>

													<ListboxOptions
														className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-xs xl:text-sm scrollbar-thin shadow  focus:outline-none  "
													>
														{TeacherCourses?.map((person, personIdx) => (
															<ListboxOption
																key={personIdx}
																className={({ active }) =>
																	` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-sm `
																}
																value={person}
															>
																{({ selectedCenter }) => (
																	<div className='flex items-center gap-x-1'>

																		<CourseImage courseName={person?.courseData?.name} w={20} h={20} />
																		<div className=' flex flex-col '>
																			<p
																				className={`block truncate text-mainColor font-semibold text-xs  `}
																			>
																				{person?.courseData?.name}
																			</p>
																			<p className='text-2xs font-semibold text-textGray'>{i18n.language === "ar" ? person?.courseData?.grade?.nameAr : i18n.language === "en" && person?.courseData?.grade?.nameEn}</p>
																		</div>

																	</div>


																)}
															</ListboxOption>
														))}
													</ListboxOptions>
												</div>
											)}
										</Listbox>
									</div>

									<div className="grade flex flex-col gap-y-2 md:w-1/5">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="expectedMark"
										>
											{t('exam.finalGrade')}
										</label>

										{formik.errors.expectedMark && formik.touched.expectedMark && <p className='text-err text-xs  '>{formik.errors.expectedMark}</p>}
										<input
											className={`bg-white rounded-xl px-4 py-3 first-line: shadow-sm text-xs xl:text-sm text-mainColor font-bold placeholder:text-textGray ${isValidInput(formik.errors.expectedMark, formik.touched.expectedMark)}`}
											placeholder={t('exam.finalGrade')}
											type="number"
											name='expectedMark'
											id='expectedMark'
											value={formik.values.expectedMark}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									</div>
								</div>

								<div className="row2 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">
									<div className="startTime flex flex-col gap-y-2 md:w-2/5">
										<label
											htmlFor="startTime"
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
										>
											{t('exam.startTime')}
										</label>
										{formik.errors.startTime && <p className='text-err text-xs  '>{formik.errors.startTime}</p>}
										<div id="revDate" className="w-full">
											<LocalizationProvider dateAdapter={AdapterDayjs}>

												<MobileDateTimePicker
													className="w-full "
													value={startTime}
													// disabled={isError && isError.value === 'start'}
													format="YYYY-MM-DD :hh:mm"
													onChange={(e) => {
														// setvalues({ ...values, startTime: e })
														setstartTime(e)
														formik.setFieldValue("startTime", e.toISOString())

													}
													}
												/>


											</LocalizationProvider>
										</div>
									</div>

									<div className="endTime flex flex-col gap-y-2 md:w-2/5">
										<label
											htmlFor="endTime"
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
										>
											{t('exam.endTime')}
										</label>
										{formik.errors.endTime && <p className='text-err text-xs  '>{formik.errors.endTime}</p>}

										<div id="revDate" className="w-full">
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<MobileDateTimePicker
													className="w-full"
													value={endTime}
													// disabled={isError && isError.value === 'start'}
													format="YYYY-MM-DD :hh:mm"
													onChange={(e) => {
														setendTime(e)
														formik.setFieldValue("endTime", e.toISOString())

													}}
												/>
											</LocalizationProvider>
										</div>
									</div>

									<div className="minuties flex flex-col gap-y-2 md:w-1/5 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor="durationInMinutes"
										>
											{t('exam.timeMin')}
										</label>
										{formik.errors.durationInMinutes && formik.touched.durationInMinutes && <p className='text-err text-xs  '>{formik.errors.durationInMinutes}</p>}

										<input
											className={`bg-white rounded-xl px-4 py-3 shadow-sm text-xs xl:text-sm text-mainColor font-bold placeholder:text-textGray   ${isValidInput(formik.errors.durationInMinutes, formik.touched.durationInMinutes)}`}
											placeholder={t('exam.timeMin')}
											type="number"
											value={formik.values.durationInMinutes}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											name='durationInMinutes'
											id='durationInMinutes'

										/>
									</div>
								</div>


								<div className="row3 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">


									<div className="examType flex flex-col gap-y-2 md:w-2/5 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor="type"
										>
											{t('exam.exmaType')}
										</label>
										<Listbox

											value={selectedExamType}
											onChange={(e) => {
												// setselectedCenter(e)
												// sessionStorage.clear()
												// sessionStorage.setItem("centerid", JSON.stringify(e))
												// setvalues({ ...values, selectedCourse: e });
												setselectedExamType(e)
												formik.setFieldValue("type", e.value)
											}}

										>
											{({ open }) => (
												<div className="relative ">
													<ListboxButton
														id='type'
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-start focus:outline-none   `}
													>
														<div className="flex items-center ps-2 sm:p-0 gap-x-2">
															<ReactSVG src={filterIcon} />

															<p
																className={`block truncate text-mainColor font-semibold text-sm `}
															>
																{selectedExamType.name}
															</p>
														</div>

														<ReactSVG src={downarrow} />
													</ListboxButton>

													<ListboxOptions
														className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>
														{examTypes?.filter((item) => item.value !== selectedExamType.value).map((person, personIdx) => (
															<ListboxOption
																key={personIdx}
																className={({ active }) =>
																	` relative cursor-pointer select-none py-1 sm:py-2 pe-10 pr-4 text-mainColor text-sm `
																}
																value={person}
															>
																{({ selectedExamType }) => (
																	<span
																		className={`block truncate text-xs   ${selectedExamType
																			? 'font-medium'
																			: 'font-normal'
																			}`}
																	>
																		{person.name}
																	</span>
																)}
															</ListboxOption>
														))}
													</ListboxOptions>
												</div>
											)}
										</Listbox>
									</div>
									{selectedExamType.value === "offline" &&
										<div className="offlineSession flex flex-col gap-y-2 md:w-2/5 ">
											<label
												className="text-sm text-secondMainColor font-semibold"
												htmlFor=""
											>
												{t('exam.offlineSession')}
											</label>
											<Listbox
												value={selectedOfflineSession}
												onChange={(e) => {
													// setselectedCenter(e)
													// sessionStorage.clear()
													// sessionStorage.setItem("centerid", JSON.stringify(e))
													// setvalues({ ...values, selectedCourse: e });
													setselectedOfflineSession(e)
													console.log(e)
													formik.setFieldValue("offlineSessionId", e?._id)
												}}
											>
												{({ open }) => (
													<div className="relative ">
														<ListboxButton
															className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3 text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-end focus:outline-none   `}
														>
															<div className="flex items-center ps-2 sm:p-0 gap-x-2">
																<ReactSVG src={filterIcon} />

																<p
																	className={`block truncate text-mainColor font-semibold text-xs xl:text-sm `}
																>
																	{selectedOfflineSession?.name ? selectedOfflineSession?.name : t("exam.choise")}
																</p>
															</div>

															<ReactSVG src={downarrow} />
														</ListboxButton>

														<ListboxOptions
															className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-xs xl:text-sm  scrollbar-thin shadow  focus:outline-none  "
														>
															{fetchOfflineExamSessions.data?.map((person, personIdx) => (
																<ListboxOption
																	key={personIdx}
																	className={({ active, }) =>
																		` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-xs`
																	}
																	value={person}
																>
																	{({ selectedExamType }) => (
																		<span
																			className={`block truncate text-xs  ${selectedExamType
																				? 'font-medium'
																				: 'font-normal'
																				}`}
																		>
																			{person?.name}
																		</span>
																	)}
																</ListboxOption>
															))}
														</ListboxOptions>
													</div>
												)}
											</Listbox>
										</div>}
								</div>

								<div className="header my-2 w-full flex  items-center justify-between">
									<h4> {t('exam.topics')}</h4>
									{/* <button className="p-2 bg-mainColor text-white flex items-center gap-x-2 rounded-lg ">
										<ReactSVG src={add} />
										<span className="text-sm">{t('exam.addQ')}</span>
									</button> */}
								</div>

								<div className="row4 flex flex-col md:flex-row gap-y-3 md:items-center    md:gap-x-2 lg:gap-x-4">
									<div className="topics flex flex-col gap-y-2 md:w-2/5">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="topics"
										>
											{t('PopUps.chooseTopic')} -
											<span className="text-xs  md:text-2xs lg:text-xs">
												{t('PopUps.chooseMultipleTopics')}
											</span>
										</label>
										{formik.errors.topics && formik.touched.topics && <p className='text-err text-xs  '>{formik.errors.topics}</p>}
										<div className="w-full">

											<Listbox
												onChange={(e) => {
													let x = e?.map(item => {
														return item?._id
													})
													setselectedTopicsExam(x)

													formik.setFieldValue("topics", x)

												}}


												multiple
											>
												<div className="relative mt-1">
													<ListboxButton
														onBlur={formik.handleBlur}
														id="topics"
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   text-mainColor border-input_border border-[1px]          sm:py-3  text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
													>



														<span
															className={`block truncate text-sm text-mainColor`}
														>
															{selectedTopicsExam?.length > 0 ? tens.includes(selectedTopicsExam?.length) ? `${selectedTopicsExam?.length} ${t("exam.choises")}` : `${selectedTopicsExam?.length} ${t("exam.oneChoise")}` : t("exam.choise")}
															{/*  : t("exam.wait") */}
														</span>

														<ReactSVG src={downarrow} />

													</ListboxButton>

													<Transition
														as={Fragment}
														leave="transition ease-in duration-100"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<ListboxOptions
															className="absolute scrollbar-thin w-full py-1 mt-12 overflow-y-auto  text-base bg-white rounded-md shadow-lg max-h-28 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
														>
															{fetchTopicsForCourse.data?.length > 0 ? fetchTopicsForCourse.data?.map((person, personIdx) => (
																<ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
																	`cursor-default select-none relative py-2 w-full  px-4 flex items-center justify-between ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
																}  >

																	{({ selected }) => (
																		<>
																			<span
																				className={`block text-xs truncate ${selected ? 'font-medium' : 'font-normal'
																					}`}
																			>

																				{person?.name}
																			</span>
																			<div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected ? "bg-mainColor" : "text-textColor__2"}   rounded-md`}>
																				{selected &&
																					<ReactSVG src={marker} />
																				}
																			</div>
																		</>
																	)}
																</ListboxOption>
															))
																: <span className='text-center w-full p-2 text-xs text-textGray font-bold '>{t("homepage.nothing")}</span>
															}
														</ListboxOptions>
													</Transition>
												</div>
											</Listbox>
										</div>
									</div>

									<div className="sessions flex flex-col gap-y-2 md:w-2/5">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="sessions"
										>
											{t('exam.sessions')} -
											<span className="text-xs md:text-2xs lg:text-xs">
												{t('exam.multi')}
											</span>
										</label>
										{formik.errors.sessions && formik.touched.sessions && <p className='text-err text-xs  '>{formik.errors.sessions}</p>}

										<Listbox

											onChange={(e) => {

												let x = e?.map(item => {
													return item?._id
												})
												setselectedSessions(x)
												formik.setFieldValue("sessions", x)
											}}
											multiple
										>
											{({ open }) => (
												<div className="relative ">
													<ListboxButton
														onBlur={formik.handleBlur}
														id='sessions'
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   text-mainColor border-input_border border-[1px]          sm:py-3  text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
													>
														<div className="flex items-center ps-2 sm:p-0 gap-x-2">
															<ReactSVG src={filterIcon} />


															<span
																className={`block truncate text-sm text-mainColor`}
															>
																{selectedSessions?.length > 0 ? tens.includes(selectedSessions?.length) ? `${selectedSessions?.length} ${t("exam.choises")}` : `${selectedSessions?.length} ${t("exam.oneChoise")}` : t("exam.choise")}
																{/*  : t("exam.wait") */}
															</span>
														</div>

														<ReactSVG src={downarrow} />
													</ListboxButton>

													<ListboxOptions
														className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>
														{fetchgetAllSessionsForCourse.data?.length > 0 ? fetchgetAllSessionsForCourse.data?.map((person, personIdx) => (

															<ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
																`cursor-default select-none relative py-2   px-4 w-full flex items-center justify-between ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
															}  >

																{({ selected }) => (
																	<>
																		<span
																			className={`block text-xs truncate break-all ${selected ? 'font-medium' : 'font-normal'
																				}`}
																		>

																			{/* {person?.name?.split(" ").length > 5 ? `${person?.name.slice(0, 5).join(" ")}...` : person?.name} */}
																			{person?.name}
																		</span>
																		<div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected ? "bg-mainColor" : "text-textColor__2"}   rounded-md`}>
																			{selected &&
																				<ReactSVG src={marker} />
																			}
																		</div>
																	</>
																)}
															</ListboxOption>
														))
															: <span className='text-center w-full p-2 text-xs text-textGray font-bold '>{t("homepage.nothing")}</span>
														}
													</ListboxOptions>
												</div>
											)}
										</Listbox>
									</div>
									{selectedExamType.value === "offline" && <div className="qNums flex flex-col gap-y-2 md:w-1/5">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="totalQuestions"
										>
											{t('exam.qNum')}
										</label>
										<input
											className="bg-white rounded-xl px-4 py-3 border-input_border border-[1px] shadow-sm text-mainColor font-bold placeholder:text-textGray text-xs xl:text-sm"
											placeholder={t('exam.qNum')}
											type="number"
											name='totalQuestions'
											id='totalQuestions'
											value={totalQuestions}
											onChange={e => {
												settotalQuestions(e.target.value)
												formik.setFieldValue("totalQuestions", parseInt(e.target.value))
											}}
										/>
									</div>}


								</div>

								<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.isValid && formik.dirty) ||
											(selectedExamType.value === "offline" && !(selectedSessions && formik.values.totalQuestions))}
										type="submit"
										onClick={() => sethandleAddExam(prev => !prev)}
										className={`text-white  ${!(formik.isValid && formik.dirty) ||
											(selectedExamType.value === "offline" && !(selectedSessions && formik.values.totalQuestions))
											? "bg-secondMainColor"
											: "bg-mainColor"
											}  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									>


										{addExamLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
										></div> : t('homepage.adding')}

									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, online: false };
											});
										}}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg"
									>
										{t('homepage.back')}
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
