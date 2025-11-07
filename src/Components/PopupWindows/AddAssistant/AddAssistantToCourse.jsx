import React, {
    useContext,
    Fragment,
    useEffect,

} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import warning from '../../../Assets/sanadSVG/teachers.svg';
import arrow from "../../../Assets/sanadSVG/downArrow.svg"
import * as Yup from 'yup';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import avatar from '../../../Assets/sanadSVG/courseSmallAvatar.svg';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Post from '../../Skeletons/Post';
import marker from "../../../Assets/sanadSVG/checked.svg"
import CourseImage from '../../CourseImage/CourseImage';
export default function AddAssistantToCourse() {

    let [t, i18n] = useTranslation();
    const { id } = useParams()

    const { selectedAssistant,
        setselectedAssistant, TeacherAsssistants,
        tens, AddAssistantToCourse
        ,
        loadingAddAss
    } = useContext(ApisContext);

    const validation = Yup.object({
        tAs: Yup.array()
            .of(Yup.string().required('Each TA must be a valid string'))
            .min(1, 'At least one TA is required')
            .required('TAs is required'),
    });

    const formik = useFormik({
        initialValues: {
            tAs: []
        },
        validationSchema: validation,
        onSubmit: async (values) => {

            AddAssistantToCourse(values, id)
            // setPopupWindowContent(0)


        }
    })

    const { Toggler, setToggler } = useContext(MainContext);
    const { fetchCoure } =
        useContext(ApisContext);


    function close() {
        setToggler({ ...Toggler, assAssToCourse: false });
        setselectedAssistant([])
        formik.resetForm()
    }

    useEffect(() => {
        if (Toggler.assAssToCourse === false) {
            setselectedAssistant([])
            formik.resetForm()
        }
    }, [Toggler.assAssToCourse])



    return (
        <>

            <Dialog
                open={Toggler.assAssToCourse}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex min-h-full b items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-3 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, assAssToCourse: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7 mb-2 font-medium text-mainColor"
                            >
                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    <ReactSVG src={warning} />
                                    <h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
                                        {t('homepage.addAssistant')}
                                    </h3>
                                    {/* <p className="font-normal text-sm sm:text-base text-center">
                                        {t('homepage.assistantP')}
                                    </p> */}
                                </div>
                            </DialogTitle>
                            {/* content */}
                            <>

                                <form onSubmit={formik.handleSubmit} className="flex assistants flex-col gap-3 2xl:gap-4">






                                    <div className="w-full assistants">
                                        <label
                                            htmlFor="tAs"
                                            className={`text-[#023E8A] w-full text-start font-semibold text-sm relative flex items-center gap-x-1 `}
                                        >
                                            {t('homeBoxes.ass')}

                                            <span className='text-xs'>{t("exam.multi")}</span>
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


                                            // value={selectedAssistant}
                                            multiple
                                        >
                                            <div className="relative mt-1">
                                                <ListboxButton
                                                    id="tAs"
                                                    className={`"relative w-full py-3 text-start  bg-white  border-input_border  border-[1px]   rounded-xl shadow-sm cursor-pointer focus:outline-none  sm:text-sm flex items-center justify-between px-4`}
                                                >



                                                    <span
                                                        className={`block truncate text-sm text-mainColor`}
                                                    >
                                                        {selectedAssistant?.length > 0 ? tens.includes(selectedAssistant?.length) ? `${selectedAssistant?.length} ${t("homepage.assistants")}` : `${selectedAssistant?.length} ${t("homepage.assistant")}` : <span className='text-textGray'>{t("exam.choise")}</span>}
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
                                                        {TeacherAsssistants?.map((person, personIdx) => (
                                                            <ListboxOption key={personIdx} value={person} className={({ active, selected }) =>
                                                                `cursor-default select-none relative py-2 pe-10 ps-4 flex justify-between items-center    ${selected ? 'font-medium' : 'font-normal'} cursor-pointer`
                                                            }  >

                                                                {({ selected }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block text-xs truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}
                                                                        >

                                                                            {person?.fullname}
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
                                        {/* {formik.errors.tAs && (
										<p className="text-red-400 py-1">{formik.errors.tAs}</p>
									)} */}
                                    </div>



                                    {fetchCoure.isFetched ? <div className="course-name flex flex-col gap-3">
                                        <label
                                            htmlFor="courseName"
                                            className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
                                        >
                                            {t("homepage.courseName")}
                                        </label>
                                        <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
                                            <div className="flex w-2/3 justify-start items-center gap-3">
                                                <span>
                                                    {/* <img src={fetchCoure.data?.courseData?.image != "" ? fetchCoure.data?.courseData?.image : avatar} alt="" /> */}
                                                    <CourseImage courseName={fetchCoure.data?.courseData?.name} h={24} w={24} />

                                                </span>
                                                <div className="flex flex-col">
                                                    <p className="text-secondMainColor text-sm  whitespace-nowrap font-extrabold">
                                                        {fetchCoure.data?.courseData?.name}
                                                    </p>
                                                    <p className="text-[#9CA3AF] text-xs">
                                                        {i18n.language === "ar" ? fetchCoure.data?.courseData?.grade?.nameAr : i18n.language === "en" && fetchCoure.data?.courseData?.grade?.nameEn}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex w-1/3 justify-center items-center">
                                                <p className="text-[#9CA3AF] text-sm">
                                                    {fetchCoure.data?.term === "0" && ` ${t("coursesTable.zero")}`}

                                                    {fetchCoure.data?.term === "1" && `${t("coursesTable.term")}  ${t("coursesTable.first")}`}
                                                    {fetchCoure.data?.term === "2" && `${t("coursesTable.term")}  ${t("coursesTable.second")}`}
                                                    {fetchCoure.data?.term === "3" && `${t("coursesTable.term")}  ${t("coursesTable.third")}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div> :
                                        <div className='p-2 bg-white rounded-xl w-full'><Post /></div>}



                                    <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
                                        <button
                                            type="submit"
                                            disabled={!(formik.isValid && formik.dirty)}
                                            className={` ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"} text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg`}
                                        >
                                            {loadingAddAss ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                            ></div> : t('PopUps.add')}


                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setToggler({ ...Toggler, assAssToCourse: false })}
                                            className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg"
                                        >
                                            {t('homepage.back')}
                                        </button>
                                    </div>
                                </form>
                            </>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
