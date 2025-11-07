import React, {
	useContext,
	useState,
	Fragment,
	useEffect,

} from 'react';
import courseIcon from '../../../Assets/sanadSVG/addGroup.svg';
import arrow from '../../../Assets/sanadSVG/downArrow.svg';
// import center from '../../../Assets/sanadSVG/aignJustify.svg';
// import right from '../../../Assets/sanadSVG/alignRight.svg';
// import left from '../../../Assets/sanadSVG/alignLeft.svg';
// import italic from '../../../Assets/sanadSVG/textItalic.svg';
// import unerline from '../../../Assets/sanadSVG/textUnderLine.svg';
// import bold from '../../../Assets/sanadSVG/textBold.svg';
import { MainContext } from '../../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import marker from "../../../Assets/sanadSVG/checked.svg"

import {
	Dialog,
	Transition,
	Listbox,
	DialogPanel,
	DialogTitle,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/react';

import { useFormik } from 'formik';
import { ApisContext } from '../../../Context/ApisContext';
import * as Yub from 'yup';
import { ReactSVG } from 'react-svg';

import x from '../../../Assets/sanadSVG/Multiply.svg';
import CourseImage from '../../CourseImage/CourseImage';


// const Fonts = [
// 	{ name: '0.7', type: 'sm' },
// 	{ name: '1', type: 'lg' },
// 	{ name: '1.1', type: 'xl' },
// 	{ name: '1.3', type: '2xl' },
// ];

export default function AddCourse({ alerts, setalerts }) {
	let [t, i18n] = useTranslation();

	const smester = [
		{ name: t("homeRev.first"), value: '1' },
		{ name: t("homeRev.second"), value: '2' },
		{ name: t("homeRev.third"), value: '3' },
	];

	const grade3 = [
		{ name: t('homeRev.highSchool'), value: '0' },
		{ name: t('homeRev.third'), value: '3' },
	];
	const [terms, setterms] = useState(smester);

	const [selectedSmester, setselectedSmester] = useState('');

	const [selectedCourse, setselectedCourse] = useState('');

	let {
		grades,
		tens,

		selectedAssistant,
		setselectedAssistant,
		TeacherAsssistants,
		selectedGrade,
		CoursesGrades,
		// setselectedGradeId,
		selectedGradeId,
		addCourseLoading,
		setselectedGrade,
		AddCourse,
	} = useContext(ApisContext);

	const { ErorrMessage, Toggler, setToggler } = useContext(MainContext);




	function close() {
		setselectedCourse('');
		setselectedGrade('');
		setselectedSmester('');
		setselectedAssistant([]);
		setToggler({ ...Toggler, addCourse: false });
	}





	const formik = useFormik({
		initialValues: {
			gradeId: '',
			courseId: '',
			term: '',
			// description: '',
			tAs: [],
		},
		validationSchema: Yub.object({
			gradeId: Yub.string().required(),
			courseId: Yub.string().required(),
			term: Yub.string().required(),
			// description: Yub.string().required(),
			tAs: Yub.array().of(Yub.string()),
		}),
		onSubmit: async (values, { resetForm }) => {
			console.log(values)
			AddCourse(values, resetForm, setselectedCourse, setselectedGrade, setselectedSmester, setselectedAssistant);







		},
	});


	useEffect(() => {
		(() => {
			if (
				selectedGrade?.nameAr === 'الثالث الثانوي' ||
				selectedGrade?.nameEn === 'secondary 3'
			) {
				setterms(grade3);
				if (selectedSmester) {
					setselectedSmester({ name: t('homeRev.highSchool'), value: '0' })
				}

			} else {
				setterms(smester);
				if (selectedSmester) {
					setselectedSmester({ name: t('homeRev.first'), value: '1' })
				}

			}
		})();
	}, [selectedGrade]);

	useEffect(() => {
		if (Toggler.addCourse === false) {
			setselectedCourse('');
			setselectedGrade('');
			setselectedSmester('');
			setselectedAssistant([]);
		}
	}, [Toggler.addCourse])


	return (
		<>
			<Dialog
				open={Toggler.addCourse}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full sm:w-[550px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, addCourse: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={courseIcon} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('TCourses.addCourse')}
									</h3>
								</div>
							</DialogTitle>
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-3 2xl:gap-4 mt-4"
							>
								<div className="flex flex-col md:flex-row justify-between gap-x-3">
									<div className="md:w-1/2 w-full grades">
										<label
											htmlFor="gradeId"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
										>
											{t('homeBoxes.year')}
										</label>
										<Listbox
											onChange={(ele) => {
												formik.setFieldValue('gradeId', ele._id);
												setselectedGrade(ele)
												setselectedCourse("")
												formik.setFieldValue("courseId", "")
												// console.log(ele )
												// setselectedGradeId(ele._id);
											}}
										>
											<div className="relative mt-1">
												<ListboxButton
													className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm`}
												>
													{/* <span className="absolute top-[50%] translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[30px] h-[30px] rounded-full bg-[#E3EFFF]">
														<img src={arrow} alt="" />
													</span> */}

													<span
														className={`block truncate  text-mainColor font-semibold text-sm `}
													>

														{selectedGrade ? i18n.language === "ar" ? selectedGrade?.nameAr : i18n.language === "en" && selectedGrade?.nameEn : <span className='text-textGray'>{t("exam.choise")}</span>}

													</span>
													<ReactSVG src={arrow} />
												</ListboxButton>

												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<ListboxOptions
														className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
													>
														{grades?.filter((item) => item?.nameAr !== selectedGrade?.nameAr)?.map((person, personIdx) => (
															<ListboxOption
																key={personIdx}
																className={({ active }) =>
																	` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
																		? 'bg-mainColor text-white'
																		: 'text-mainColor'
																	}`
																}
																value={person}
															>
																{({ selectedGrade }) => (
																	<>
																		<span
																			className={`block truncate text-xs ${selectedGrade
																				? 'font-medium'
																				: 'font-normal'
																				}`}
																		>
																			{person.nameAr}
																		</span>
																	</>
																)}
															</ListboxOption>
														))}
													</ListboxOptions>
												</Transition>
											</div>
										</Listbox>

										{/* {formik.errors.gradeId && (
											<p className="text-red-400 py-1">
												{formik.errors.gradeId}
											</p>
										)} */}
									</div>

									<div className="md:w-1/2 w-full term">
										<label
											htmlFor="term"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
										>
											{t('homeBoxes.term')}
										</label>
										<Listbox
											onChange={(ele) => {
												console.log(ele)
												formik.setFieldValue('term', ele.value);
												setselectedSmester(ele);

											}}
										>
											<div className="relative mt-1">
												<ListboxButton
													onBlur={formik.handleBlur}
													className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}
												>


													<span
														className={`block truncate ${selectedSmester
															? 'text-mainColor font-thin'
															: 'text-textGray'
															}`}
													>
														{
															selectedSmester
																? selectedSmester.name
																: t('exam.choise')
														}


													</span>

													<ReactSVG src={arrow} />
												</ListboxButton>

												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<ListboxOptions
														className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
													>
														{terms?.filter((item) => item?.name !== selectedSmester?.name)?.map((person, personIdx) => (
															<ListboxOption
																key={personIdx}
																className={({ active }) =>
																	` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
																		? 'bg-mainColor text-white'
																		: 'text-mainColor'
																	}`
																}
																value={person}
															>
																{({ selectedSemster }) => (
																	<>
																		<span
																			className={`block truncate text-sm ${selectedSemster
																				? 'font-medium'
																				: 'font-normal'
																				}`}
																		>
																			{person.name}
																		</span>
																	</>
																)}
															</ListboxOption>
														))}
													</ListboxOptions>
												</Transition>
											</div>
										</Listbox>
										{/* {formik.errors.term && (
											<p className="text-red-400 py-1">{formik.errors.term}</p>
										)} */}
									</div>
								</div>



								<div className="w-full courses">
									<label
										htmlFor="courseId"
										className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
									>
										{t('homeBoxes.course')}
									</label>
									<Listbox
										onChange={(ele) => {
											formik.setFieldValue('courseId', ele._id);
											setselectedCourse(ele);
											// setselectedCourseId(ele._id);
										}}
									>
										<div className="relative mt-1">
											<ListboxButton
												className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}
											>


												<span
													className={`block truncate text-sm text-mainColor`}
												>
													{selectedCourse ? selectedCourse?.name : <span className='text-textGray'>{t("exam.choise")}</span>}
												</span>
												<ReactSVG src={arrow} />
											</ListboxButton>

											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<ListboxOptions
													className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
												>
													{CoursesGrades.map((person, personIdx) => (
														<ListboxOption
															key={personIdx}
															className={({ active }) =>
																` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
																	? 'bg-mainColor text-white'
																	: 'text-mainColor'
																}`
															}
															value={person}
														>
															{({ selectedCourse }) => (
																<div className='flex items-center gap-x-2'>
																	<CourseImage courseName={person?.name} w={18} h={18} />
																	<span
																		className={`block truncate text-xs  ${selectedCourse
																			? 'font-medium'
																			: 'font-normal'
																			}`}
																	>
																		{person?.name}
																	</span>

																</div>
															)}
														</ListboxOption>
													))}
												</ListboxOptions>
											</Transition>
										</div>
									</Listbox>
									{/* {formik.errors.courseId && (
										<p className="text-red-400 py-1">
											{formik.errors.courseId}
										</p>
									)} */}
								</div>



								<div className="w-full assistants">
									<label
										htmlFor="tAs"
										className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
									>
										{t('homeBoxes.ass')}
									</label>
									<Listbox
										// name={`tAs[1]`}
										onChange={(e) => {
											// console.log(e)
											let x = e.map(item => {
												return item?._id
											})
											formik.setFieldValue('tAs', x);
											setselectedAssistant(x);

										}}


										multiple
									>
										<div className="relative mt-1">
											<ListboxButton
												id="tAs"
												className={`"relative w-full py-3 text-start  bg-white  border-input_border  border-[1px]   rounded-xl shadow-sm cursor-pointer focus:outline-none  sm:text-sm flex items-center justify-between px-4`}
											>



												<span
													className={`block truncate text-sm ${selectedAssistant.length > 0 ? "text-mainColor" : "text-textGray"}`}
												>
													{selectedAssistant?.length > 0 ? tens.includes(selectedAssistant?.length) ? `${selectedAssistant?.length} ${t("homepage.assistants")}` : `${selectedAssistant?.length} ${t("homepage.assistant")}` : t("exam.choise")}
												</span>

												<ReactSVG src={arrow} />

											</ListboxButton>

											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<ListboxOptions
													className="absolute scrollbar-thin w-full py-1 mt-12 overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-28 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
												>
													{TeacherAsssistants.map((person, personIdx) => (
														<ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
															`cursor-default select-none relative py-2 pe-10 ps-4 justify-between items-center flex   ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
														}  >

															{({ selected }) => (
																<>
																	<span
																		className={`block text-xs truncate text-mainColor  ${selected ? 'font-medium' : 'font-normal'
																			}`}
																	>

																		{person?.fullname}
																	</span>
																	<div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected && "bg-mainColor"}   rounded-md`}>
																		{selected &&
																			<ReactSVG src={marker} />
																		}
																	</div>
																</>
															)}
														</ListboxOption>
													))}
												</ListboxOptions>
											</Transition>
										</div>
									</Listbox>
									{/* {formik.errors.tAs && (
										<p className="text-red-400 py-1">{formik.errors.tAs}</p>
									)} */}
								</div>

								<div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
									<button
										type="submit"
										disabled={!(formik.isValid && formik.dirty)}
										className={` ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"} text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg`}
									>




										{addCourseLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
										></div> : t('PopUps.add')}

									</button>

									<button
										type="button"
										onClick={() => setToggler({ ...Toggler, addCourse: false })}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg"
									>
										{t('homepage.back')}
									</button>
								</div>
							</form>

						</DialogPanel>
					</div>
				</div>
			</Dialog >
		</>
	);
}
