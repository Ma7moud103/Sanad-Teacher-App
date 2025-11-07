import React from 'react';
import filterIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import downarrow from '../../../Assets/sanadSVG/downArrow.svg';
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';

function DropDown({ label, list, items }) {
	const [t] = useTranslation();
	const { id, text } = label;
	const { selectedItem, setselectedItem } = list;

	return (
		<>
			<label
				className="text-sm text-secondMainColor font-semibold"
				htmlFor={id}
			>
				{text}
			</label>
			<Listbox value={selectedItem} onChange={setselectedItem}>
				{({ open }) => (
					<div className="relative ">
						<ListboxButton
							id={id}
							className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3 sm:px-2 text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
						>
							<div className="flex items-center ps-2 sm:p-0 gap-x-2">
								<ReactSVG src={filterIcon} />

								<p
									className={`block truncate text-mainColor font-semibold text-sm `}
								>
									{selectedItem ? (
										selectedItem.name
									) : (
										<span className="text-textGray">{t('exam.choise')}</span>
									)}
								</p>
							</div>

							<ReactSVG src={downarrow} />
						</ListboxButton>

						<ListboxOptions
							className="absolute  mt-12 max-h-40 z-10
	                                 w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
						>
							{items?.map((person, personIdx) => (
								<ListboxOption
									key={personIdx}
									className={({ active }) =>
										` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 text-mainColor text-sm `
									}
									value={person}
								>
									{({ selectedItem }) => (
										<span
											className={`block truncate text-size_12 sm:text-sm   ${selectedItem ? 'font-medium' : 'font-normal'
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
		</>
	);
}

export default DropDown;
