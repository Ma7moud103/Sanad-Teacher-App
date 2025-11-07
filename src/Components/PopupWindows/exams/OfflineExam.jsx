import React, { useContext, useState } from 'react';

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
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import addExam from '../../../Assets/sanadSVG/offline.svg';
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import { ReactSVG } from 'react-svg';

import MultieSelect from './MultieSelect';

export default function OfflineExam() {
	let [t] = useTranslation();

	const { Toggler, setToggler } = useContext(MainContext);


	const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
	const [selectedItems, setSelectedItems] = useState([]);


	function close() {
		setToggler({ ...Toggler, offline: false });
	}

	const [values, setvalues] = useState({
		selectedCourse: '',
	});


	return (
		<>
			<Dialog
				open={Toggler.offline}
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
								className="flex items-center justify-center p-4 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, offline: false })}
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
										{`${t('homepage.adding')} ${t('exam.offline')}`}
									</h3>
								</div>
							</DialogTitle>
							<form className="flex flex-col  gap-y-2 relative 2xl:gap-y-3 my-2">
								<div className="row1 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">
									<div className="examName flex flex-col gap-y-2 md:w-2/5 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('exam.examName')}
										</label>
										<input
											className="bg-white rounded-xl px-2 py-3 border-input_border border-[1px] shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray"
											placeholder={t('exam.examName')}
											type="text"
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
											value={values.selectedCourse}
											onChange={(e) => {
												// setselectedCenter(e)
												// sessionStorage.clear()
												// sessionStorage.setItem("centerid", JSON.stringify(e))
												setvalues({ ...values, selectedCourse: e });
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
																{values.selectedCourse ? (
																	values.selectedCourse
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
														{items.map((person, personIdx) => (
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
																		{person}
																	</span>
																)}
															</ListboxOption>
														))}
													</ListboxOptions>
												</div>
											)}
										</Listbox>
									</div>

									<div className="grade flex flex-col gap-y-2 md:w-1/5 ">
										<label
											className="text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('exam.timeMin')}
										</label>
										<input
											className="bg-white rounded-xl px-2 py-3 border-input_border border-[1px] shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray md:text-xs lg:text-sm placeholder:md:text-xs placeholder:lg:text-sm"
											placeholder={t('exam.timeMin')}
											type="number"
										/>
									</div>
								</div>

								<div className="row2 flex flex-col md:flex-row gap-y-3 md:items-center md:gap-x-2 lg:gap-x-4">
									<div className="exams flex flex-col gap-y-2 md:w-2/5">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor=""
										>
											{t('exam.exams')} -
											<span className="text-xs  md:text-2xs lg:text-xs">
												{t('exam.multi')}
											</span>
										</label>
										<MultieSelect
											selectedItems={selectedItems}
											setSelectedItems={setSelectedItems}
											items={items}
										/>
									</div>

									<div className="sessions flex flex-col gap-y-2 md:w-2/5">
										<label
											className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
											htmlFor=""
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
																Name
															</span>
														</div>

														<ReactSVG src={downarrow} />
													</ListboxButton>

													<ListboxOptions
														className="absolute  mt-12 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
													>
														{items.map((person, personIdx) => (
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
																		{person}
																	</span>
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
											htmlFor=""
										>
											{t('exam.finalGrade')}
										</label>
										<input
											className="bg-white rounded-xl px-2 py-3 border-input_border border-[1px] shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray placeholder:md:text-xs placeholder:lg:text-sm"
											placeholder={t('exam.finalGrade')}
											type="text"
										/>
									</div>
								</div>

								{/*  ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor " : "bg-mainColor "}  */}
								<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
									<button
										// disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={`text-white bg-mainColor  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									>
										{t('homepage.adding')}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, offline: false };
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
