import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import React, { useContext, useState } from 'react';
import { ReactSVG } from 'react-svg';
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import fitlerIcon from '../../../Assets/sanadSVG/filterIcon.svg';
import downArrow from '../../../Assets/sanadSVG/downArrow.svg';
import { ApisContext } from '../../../Context/ApisContext';
import { useTranslation } from 'react-i18next';

function MultiCourses({ selectedItems, setSelectedItems, items }) {
    const [t, i18n] = useTranslation()
    const { tens } = useContext(ApisContext);
    const toggleSelectedItem = (item) => {
        setSelectedItems((prevSelectedItems) => {
            const isItemSelected = prevSelectedItems.includes(item);
            if (isItemSelected) {
                return prevSelectedItems.filter((i) => i !== item);
            } else {
                return [...item];
            }
        });
    };

    return (
        <div className="w-full">
            <Listbox value={selectedItems} onChange={toggleSelectedItem} multiple>
                {({ open }) => (
                    <>
                        <div className="relative">
                            <ListboxButton className="relative w-full py-3 text-start  bg-white  border-input_border  border-[1px]   rounded-xl shadow-sm cursor-pointer focus:outline-none  sm:text-sm flex items-center justify-between px-4">
                                <div className="flex items-center gap-x-2">
                                    <span>
                                        <ReactSVG src={fitlerIcon} />
                                    </span>
                                    <span className="block truncate text-mainColor font-bold text-sm">
                                        {selectedItems.length > 0 ? (
                                            tens.includes(selectedItems.length) ? (
                                                `${selectedItems.length} ${t('exam.choises')}`
                                            ) : (
                                                `${selectedItems.length} ${t('exam.oneChoise')}`
                                            )
                                        ) : (
                                            <span className="text-textGray ">{t('exam.choise')}</span>
                                        )}
                                    </span>
                                </div>

                                <ReactSVG src={downArrow} />
                            </ListboxButton>

                            <ListboxOptions className="absolute scrollbar-thin w-full py-1 mt-12 overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                                {items.map((item, index) => (
                                    <ListboxOption
                                        key={index}
                                        className={({ active, selected }) =>
                                            `cursor-default select-none relative py-2 pe-10 ps-4 ${active
                                                ? 'text-amber-900 bg-amber-100'
                                                : 'text-mainColor font-semibold'
                                            } ${selected ? 'font-medium' : 'font-normal'}`
                                        }
                                        value={item}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block text-sm truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >

                                                    {i18n.language === "ar" ? `${item?.courseData?.name} - ${item?.courseData.grade?.nameAr}` : i18n.language === "en" && `${item?.courseData?.name} - ${item?.courseData.grade?.nameAr}`
                                                    }
                                                </span>
                                                {selected ? (
                                                    <span className="absolute text-sm inset-y-0 end-0 flex items-center pe-3 text-amber-600">
                                                        Chosen
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}

export default MultiCourses;
