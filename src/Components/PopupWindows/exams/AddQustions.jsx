import React, {
	useContext,
	useState,
	useEffect,

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
} from '@headlessui/react';
import { useFormik } from 'formik';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import addExam from '../../../Assets/sanadSVG/online.svg';
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import addA from '../../../Assets/sanadSVG/addQ.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import * as Yup from 'yup';
import del from '../../../Assets/sanadSVG/redDel.svg';
import MultieSelect from './MultieSelect';

export default function AddQustions() {

	const { Toggler, setToggler, newAnswer, setNewAnswer } = useContext(MainContext);
	const { options, selectedAnsType, setselectedAnsType, addQLoad,
		addQuetionToExam, fetchTopicsForExam, fetchSpcificSessionsForSingleExam } = useContext(ApisContext);
	let [t] = useTranslation();



	const [answers, setAnswers] = useState([]);
	const handleAddAnswer = (e) => {
		e.preventDefault();
		setAnswers(prev => {
			return [...prev,
			{
				option: newAnswer,
				isCorrect: false
			}]
		})
		setNewAnswer('');
	};

	const toggleOption = (index) => {
		setAnswers((prevOptions) => {
			return prevOptions.map((opt, i) => {
				if (selectedAnsType.value) {
					if (i === index) {
						return { ...opt, isCorrect: !opt.isCorrect };
					}
					return opt;
				} else {
					if (i === index) {
						return { ...opt, isCorrect: true };
					}
					return { ...opt, isCorrect: false };
				}
			});
		});
	};

	const toggleOptionToFalse = () => {
		setAnswers((prevOptions) => {
			return prevOptions.map((opt, i) => {

				return { ...opt, isCorrect: false };

			});
		});
	};

	const handleDelet = (id) => {
		const result = answers.filter((item, i) => {
			return i !== id;
		});

		console.log(result);
		setAnswers(result);
	};

	const questionTypes = [
		{ name: t('exam.hard'), value: 'H' },
		{ name: t('exam.normal'), value: 'M' },
		{ name: t('exam.easy'), value: 'L' },
	];


	const [selectedQT, setselectedQT] = useState(questionTypes[2]);


	const [selectedTopics, setselectedTopics] = useState([])
	const [selectedSession, setselectedSession] = useState("")



	const formik = useFormik({
		initialValues: {
			title: "",
			priority: selectedQT.value,
			session: "",
			topics: [],
			image: "",
			mark: 1,
			multipleChoice: selectedAnsType.value,
			options: []
		}
		,
		validationSchema: Yup.object({
			title: Yup.string().required(),
			priority: Yup.string().required(),
			session: Yup.string().required(),
			topics: Yup.array()
				.of(Yup.string().required('Each topic must be a valid string'))
				.min(1, 'At least one topic is required')
				.required('topics is required'),
			options: Yup.array()
				.of(
					Yup.object().shape({
						option: Yup.string().required('Option text is required'),
						isCorrect: Yup.boolean().required('isCorrect is required'),
					})
				)
				.required('Options are required')
				.test('isCorrect-conditions', 'Invalid options configuration', function (options) {
					// const { selectedAnsType } = this.parent;
					const correctOptions = options.filter(option => option.isCorrect);


					if (selectedAnsType?.value) {
						// When selectedAnsType is true, there should be at least two correct options
						return correctOptions.length >= 2;
					} else {
						// When selectedAnsType is false, there should be exactly one correct option
						return correctOptions.length === 1;
					}
				}),
		}),
		onSubmit: (values, { resetForm }) => {
			// console.log(values)



			addQuetionToExam(values, resetForm,
				setselectedTopics,
				setselectedSession,
				setAnswers)

			// resetForm()
			// setselectedTopics([])
			// setselectedSession("")
			// setAnswers([])
		}
	})

	// addQuetionToExam  this is the action




	function close() {
		setToggler((prev) => {
			return { ...prev, addQ: false };
		});

		formik.resetForm()
		setselectedTopics([])
		setselectedSession("")
		setAnswers([])
	}


	useEffect(() => {
		if (Toggler.addQ === false) {
			formik.resetForm()
			setselectedTopics([])
			setselectedSession("")
			setAnswers([])
		}
	}, [Toggler.addQ])

	useEffect(() => {
		formik.setFieldValue("topics", selectedTopics)
	}, [selectedTopics])
	useEffect(() => {
		formik.setFieldValue("options", answers)
	}, [answers])


	return (
		<>
			<Dialog
				open={Toggler.addQ}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-6 sm:p-8">
						<DialogPanel
							transition
							className="w-full md:w-[75%] xl:w-[65%] 2xl:w-[50%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-2 sm:p-3 bg-white rounded-full"
								onClick={() => {
									setToggler((prev) => {
										return { ...prev, addQ: false };
									});
								}}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={addExam} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('exam.addQ')}
									</h3>


								</div>
							</DialogTitle>


							<form onSubmit={formik.handleSubmit} className="flex flex-col   gap-y-2 relative 2xl:gap-y-3 my-4">
								<div className="row flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">
									<div className="topics flex flex-col gap-y-2 md:w-1/2">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('PopUps.chooseTopic')} -
											<span className="text-xs  md:text-2xs lg:text-xs">
												{t('PopUps.chooseMultipleTopics')}
											</span>
										</label>
										<MultieSelect
											selectedItems={selectedTopics}
											setSelectedItems={setselectedTopics}
											items={fetchTopicsForExam.data}
											type={"topics"}


										/>
									</div>

									<div className="sessions flex flex-col gap-y-2 md:w-1/2">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{`${t('exam.choise')} ${t('homepage.session')} `}

										</label>
										<Listbox

											onChange={(e) => {

												formik.setFieldValue("session", e?._id)
												setselectedSession(e)
											}}
										>
											{({ open }) => (
												<div className="relative ">
													<ListboxButton
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   text-mainColor border-input_border border-[1px]          sm:py-3 sm:px-2 text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
													>
														<div className="flex items-center ps-2 sm:p-0 gap-x-2">
															<ReactSVG src={filterIcon} />

															<span
																className={`block truncate font-bold text-sm `}
															>
																{selectedSession ? selectedSession?.name : <span className='text-textGray'>{t("exam.choise")}</span>}
															</span>
														</div>

														<ReactSVG src={downarrow} />
													</ListboxButton>

													<ListboxOptions
														className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>

														{fetchSpcificSessionsForSingleExam.data?.map((person, personIdx) => (
															<ListboxOption
																key={personIdx}
																className={({ active }) =>
																	` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-sm `
																}
																value={person}
															>
																{({ selectedCenter }) => (
																	<span
																		className={`block truncate text-size_12 sm:text-sm   ${selectedCenter
																			? 'font-medium'
																			: 'font-normal'
																			}`}
																	>
																		{person?.name}
																	</span>
																)}
															</ListboxOption>
														))}


														{/* this will be in the single exam  */}


														{/* cashedSelectedExam && fetchSpcificSessionsToCourse.data?.map((person, personIdx) => (
                                                        <ListboxOption
                                                            key={personIdx}
                                                            className={({ active }) =>
                                                                ` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-sm `
                                                            }
                                                            value={person}
                                                        >
                                                            {({ selectedCenter }) => (
                                                                <span
                                                                    className={`block truncate text-size_12 sm:text-sm   ${selectedCenter
                                                                        ? 'font-medium'
                                                                        : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {person?.name}
                                                                </span>
                                                            )}
                                                        </ListboxOption>
                                                        )) */}


													</ListboxOptions>
												</div>
											)}
										</Listbox>
									</div>


								</div>

								<div className='row flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4'>
									<div className="qType flex flex-col gap-y-2 md:w-1/2">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('exam.qType')}
										</label>
										<Listbox
											value={selectedQT}
											onChange={(e) => {

												setselectedQT(e);
												formik.setFieldValue("priority", e.value)
											}}
										>
											{({ open }) => (
												<div className="relative ">
													<ListboxButton
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3 sm:px-2 text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
													>
														<div className="flex items-center ps-2 sm:p-0 gap-x-2">
															<ReactSVG src={filterIcon} />

															<p
																className={`block truncate text-mainColor font-semibold text-sm `}
															>
																{selectedQT ? (
																	selectedQT.name
																) : (
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
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>
														{questionTypes
															.filter((item) => item.name !== selectedQT.name)
															.map((person, personIdx) => (
																<ListboxOption
																	key={personIdx}
																	className={({ active }) =>
																		` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-sm `
																	}
																	value={person}
																>
																	{({ selectedCenter }) => (
																		<span
																			className={`block truncate text-size_12 sm:text-sm   ${selectedCenter
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
									<div className="multiOption flex flex-col gap-y-2 md:w-1/2 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('exam.multiChoise')}
										</label>
										<Listbox
											value={selectedAnsType}
											onChange={(e) => {
												// setselectedCenter(e)
												// sessionStorage.clear()
												// sessionStorage.setItem("centerid", JSON.stringify(e))
												setselectedAnsType(e);
												toggleOptionToFalse()
												formik.setFieldValue("multipleChoice", e.value)
											}}
										>
											{({ open }) => (
												<div className="relative ">
													<ListboxButton
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3 sm:px-2 text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
													>
														<div className="flex items-center ps-2 sm:p-0 gap-x-2">
															<ReactSVG src={filterIcon} />

															<p
																className={`block truncate text-mainColor font-semibold text-sm `}
															>
																{selectedAnsType.name}
															</p>
														</div>

														<ReactSVG src={downarrow} />
													</ListboxButton>

													<ListboxOptions
														className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>
														{options
															.filter((item) => item.name !== selectedAnsType.name)
															.map((person, personIdx) => (
																<ListboxOption
																	key={personIdx}
																	className={({ active }) =>
																		` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-sm `
																	}
																	value={person}
																>
																	{({ selectedCenter }) => (
																		<span
																			className={`block truncate text-size_12 sm:text-sm   ${selectedCenter
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
								</div>


								<div className="question flex flex-col gap-y-2 w-full">
									<label
										className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
										htmlFor="title"
									>
										{t('exam.qHead')}

									</label>


									<textarea

										placeholder={t("exam.qHead")}
										value={formik.values.title}
										onChange={formik.handleChange}
										name='title'
										id='title'
										rows="4"
										className="block p-2.5 w-full  text-gray-900 bg-gray-50  focus:ring-blue-500 focus:border-mainColor text-mainColor font-bold border-[1px] border-input_border rounded-xl text-sm md:text-xs lg:text-sm  "
									></textarea>
								</div>


								<div className="textArea">
									<label
										htmlFor="message"
										className="block mb-2 text-sm font-semibold text-mainColor
                                        "
									>
										{t('exam.typeAnswer')}
									</label>
									<textarea
										value={newAnswer}
										onChange={(e) => setNewAnswer(e.target.value)}
										placeholder={t('exam.typeAnswer')}
										id="message"
										rows="4"
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-input_border focus:ring-blue-500 focus:border-mainColor text-mainColor font-bold "
									></textarea>
								</div>

								<div className="header w-full flex items-center justify-between ">
									<h5>{t('exam.answers')}</h5>
									<button
										type='button'
										disabled={newAnswer === ""}
										className={`${newAnswer === "" ? "bg-secondMainColor" : "bg-mainColor"} text-white  rounded-lg flex items-center gap-x-2 text-sm sm:text-base p-2 `}
										onClick={(e) => handleAddAnswer(e)}
									>
										<ReactSVG src={addA} />
										{t('exam.addAns')}
									</button>
								</div>

								<div
									className={`w-full   font-bold ${answers.length > 0 && " py-3"} rounded-lg flex items-center justify-between`}
								>
									<div className="w-full ">
										<ul className=" ">
											{answers.map((answer, i) => (
												<li
													key={i}
													className={`mb-2 flex items-center p-3 justify-between   rounded-lg ${answer.isCorrect
														? 'bg-mainColor text-white'
														: 'bg-white text-mainColor'
														}`}
												>
													<div className="flex  items-center  w-full gap-x-1">


														<input
															type="checkbox"
															checked={answer.isCorrect}
															onChange={() => toggleOption(i)}

															className="mx-1 outline-mainColor focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg w-[15px] h-[15px] sm:w-[20px] sm:h-[20px] text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none cursor-pointer"
														/>



														{/* <div onChange={() => toggleOption(i)} className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${answer.isCorrect ? "bg-mainColor" : "text-textColor__2"}   rounded-md`}>
															{answer.isCorrect &&
																<ReactSVG src={marker} />
															}
														</div> */}


														<p
															id={i}
															className={`${answer.isCorrect
																? ' text-white'
																: ' text-mainColor'
																}   font-bold break-words text-xs sm:text-sm overflow-hidden`}
														>
															{answer.option}
														</p>
													</div>

													<span
														onClick={() => handleDelet(i)}
														className="cursor-pointer"
													>
														<ReactSVG src={del} />
													</span>
												</li>
											))}
										</ul>
									</div>
								</div>


								<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={`text-white bg-mainColor ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"}  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									>



										{/* {addQLoad ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                        ></div> : t('homepage.adding')} */}

										{
											addQLoad ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div> : t('homepage.adding')}


										{/* this if we are in the single exam */}
										{/* 
                                        cashedSelectedExam ? addQToExamLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                        ></div> : t('homepage.adding') */}

										{/* addQToExamLoading */}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, addQ: false };
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
