import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from '@headlessui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import fitlerIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import { t } from 'i18next';
import downArrow from '../../../Assets/sanadSVG/downArrow.svg';
import marker from "../../../Assets/sanadSVG/checked.svg"
import { ApisContext } from '../../../Context/ApisContext';

function MultieSelect({ selectedItems, setSelectedItems, items, type, loading = true, isValid, handleBlur, formik }) {
	const { tens, selectedCourse } = useContext(ApisContext);

	// useEffect(() => {
	// 	setSelectedItems([]);
	// }, [selectedCourse]);



	return (
		<div className="w-full">
			<Listbox
				onChange={(e) => {
					let x = e?.map(item => {
						return item?._id
					})
					setSelectedItems(x);

					if (type === "topics") {
						formik?.setFieldValue("topics", x)
					}

				}}


				// value={selectedAssistant}
				multiple
			>
				<div className="relative mt-1">
					<ListboxButton
						onBlur={handleBlur}
						id="tAs"
						className={`relative w-full py-3 text-st
							art  bg-white  ${isValid}   rounded-xl shadow-sm cursor-pointer focus:outline-none  sm:text-sm flex items-center justify-between px-4`}
					>



						<span
							className={`block truncate text-sm text-mainColor`}
						>
							{loading ? selectedItems?.length > 0 ? tens.includes(selectedItems?.length) ? `${selectedItems?.length} ${t("exam.choises")}` : `${selectedItems?.length} ${t("exam.oneChoise")}` : t("exam.choise") : t("exam.wait")}
						</span>

						<ReactSVG src={downArrow} />

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
							{items?.map((person, personIdx) => (
								<ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
									`cursor-default select-none relative py-2 px-4 flex items-center justify-between  ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
								}  >

									{({ selected }) => (
										<>
											<span
												className={`block text-xs truncate ${selected ? 'font-medium' : 'font-normal'
													}`}
											>

												{type === "topics" || type === "topicsExam" ? person?.name : "nothing"}
											</span>
											<div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected ? "bg-mainColor" : "text-textColor__2"}   rounded-md`}>
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
		</div>
	);
}

export default MultieSelect;
