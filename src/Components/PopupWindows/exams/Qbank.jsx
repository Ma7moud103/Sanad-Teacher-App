import React, {
	useContext,
	useState,
	useEffect,
} from 'react';

import { useTranslation } from 'react-i18next';
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
import addExam from '../../../Assets/sanadSVG/online.svg'
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import * as Yup from 'yup';
import MultieSelect from './MultieSelect';
import marker from "../../../Assets/sanadSVG/checked.svg"

export default function Qbank() {
	let [t] = useTranslation();

	const { Toggler, setToggler } = useContext(MainContext);
	const { tens, fetchTopics, fetchSpcificSessionsToCourse, autoGenerateExam,
		maxQ } = useContext(ApisContext);



	const [selectedSessions, setselectedSessions] = useState([])
	const [selectedTopics, setselectedTopics] = useState([])
	const validationSchema = Yup.object({

		priority: Yup.object({
			H: Yup.number()
				.required('High priority is required')
				.min(0, 'High priority must be at least 0'),
			M: Yup.number()
				.required('Medium priority is required')
				.min(0, 'Medium priority must be at least 0'),
			L: Yup.number()
				.required('Low priority is required')
				.min(0, 'Low priority must be at least 0'),
		}).required('Priority is required'),

	})

	const formik = useFormik({
		initialValues: {
			topics: selectedTopics,
			sessions: "",
			priority: { H: "", M: "", L: "" }
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			if (selectedSessions.length <= 0) {
				delete formik.values.sessions
			}
			if (selectedTopics <= 0) {
				delete formik.values.topics
			}




			autoGenerateExam(values, resetForm, setselectedTopics, setselectedSessions)
			// setselectedTopics([])
			// setselectedSessions([])
		}
	})


	function close() {
		setToggler((prev) => {
			return { ...prev, qbank: false };
		});
		formik.resetForm()
		setselectedTopics([])
		setselectedSessions([])


	}


	useEffect(() => {
		if (!Toggler.qbank) {
			formik.resetForm()
			setselectedTopics([])
			setselectedSessions([])

		}
	}, [Toggler.qbank])



	useEffect(() => {
		formik.setFieldValue("topics", selectedTopics)
	}, [selectedTopics])


	function isValidInput(inputErr, inputTouched) {
		if (inputErr && inputTouched) {
			return ' text-err border-[1px] border-err'
		} else {
			return "text-mainColor border-[1px]  border-input_border"
		}
	}



	return (
		<>
			<Dialog
				open={Toggler.qbank}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>

				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full md:w-[75%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => {
									setToggler((prev) => {
										return { ...prev, qbank: false };
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
										{`${t('homepage.adding')} ${t('exam.bank')}`}
									</h3>
								</div>
							</DialogTitle>
							<form onSubmit={formik.handleSubmit} className="flex flex-col  gap-y-2 relative 2xl:gap-y-3 my-2">


								<div className="row1 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">




									<div className="topics flex flex-col gap-y-2 md:w-1/2">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="topics"
										>
											{t('PopUps.chooseTopic')} -
											<span className="text-xs  md:text-2xs lg:text-xs">
												{t('PopUps.chooseMultipleTopics')}
											</span>
										</label>
										<div className="w-full">

											<MultieSelect
												items={fetchTopics.data}
												selectedItems={selectedTopics}
												setSelectedItems={setselectedTopics}
												type={"topics"}
												isValid={isValidInput(formik.errors?.topics, formik.touched?.topics)}
											/>
										</div>
									</div>

									<div className="sessions flex flex-col gap-y-2 md:w-1/2">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="sessions"
										>
											{t('exam.sessions')} -
											<span className="text-xs md:text-2xs lg:text-xs">
												{t('exam.multi')}
											</span>
										</label>
										<Listbox

											// value={selectedCenter}
											onChange={(e) => {
												// setselectedCenter(e)
												// sessionStorage.clear()
												// sessionStorage.setItem("centerid", JSON.stringify(e))
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
														id='sessions'
														className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between ${isValidInput(formik.errors.sessions, formik.touched?.sessions)}             sm:py-3  text-sm
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
														className="absolute  mt-12 max-h-40 z-40
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>
														{fetchSpcificSessionsToCourse.data?.length > 0 ? fetchSpcificSessionsToCourse.data?.map((person, personIdx) => (

															<ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
																`cursor-default select-none relative py-2  px-4  flex items-center justify-between ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
															}  >

																{({ selected }) => (
																	<>
																		<span
																			className={`  text-xs truncate break-all block ${selected ? 'font-medium' : 'font-normal'
																				}`}
																		>



																			{`${person?.name} (${person?.sessionNumber})`}




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


								</div>

								<div className="row2 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">
									<div className="hard flex flex-col gap-y-2 md:w-1/3">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="H"
										>
											{t('exam.hard')} {maxQ.H ? <span className='text-xs font-bold'>
												{` - ${t("exam.limit")} (${maxQ.H}) `}</span>
												: null}


										</label>
										<input
											// isValidInput(formik.errors.topics)
											className={`bg-white rounded-xl px-5 py-3 ${isValidInput(formik.errors.priority?.H, formik.touched?.priority?.H)}  shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray placeholder:md:text-xs placeholder:lg:text-sm focus:shadow-none focus:outline-none`}
											placeholder={t('exam.hard')}
											type="number"
											id='H'
											name='priority.H'
											value={formik.values.priority.H}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}


										/>
									</div>

									<div className="normal flex flex-col gap-y-2 md:w-1/3">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="M"
										>
											{t('exam.normal')} {maxQ.M ? <span className='text-xs font-bold'>
												{` - ${t("exam.limit")} (${maxQ.M}) `}</span>
												: null}
										</label>
										<input
											className={`bg-white rounded-xl px-5 py-3 ${isValidInput(formik.errors.priority?.M, formik.touched?.priority?.M)} shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray placeholder:md:text-xs placeholder:lg:text-sm focus:shadow-none focus:outline-none`}
											placeholder={t('exam.normal')}
											type="number"
											id='M'
											name='priority.M'
											value={formik.values.priority.M}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}

										/>
									</div>
									<div className="easy flex flex-col gap-y-2 md:w-1/3">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor="L"
										>
											{t('exam.easy')} {maxQ.L ? <span className='text-xs font-bold'>
												{` - ${t("exam.limit")} (${maxQ.L}) `}</span>
												: null}
										</label>
										<input
											className={`bg-white rounded-xl px-5 py-3 ${isValidInput(formik.errors?.priority?.L, formik.touched?.priority?.L)} shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray placeholder:md:text-xs placeholder:lg:text-sm focus:shadow-none focus:outline-none`}
											placeholder={t('exam.easy')}
											type="number"
											id='L'
											name='priority.L'
											value={formik.values.priority.L}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									</div>
								</div>

								<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={`text-white bg-mainColor ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"}  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									>
										{t('homepage.adding')}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, qbank: false };
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
