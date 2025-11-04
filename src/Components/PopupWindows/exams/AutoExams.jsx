import React, {
    useContext,
    useState,

} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import addExam from '../../../Assets/sanadSVG/feedback.svg';
import del from '../../../Assets/sanadSVG/delet.svg'
import downarrow from '../../../Assets/sanadSVG/downArrow.svg'
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import { SvgsContext } from '../../../Context/SvgsContext';
import Pagination from '../../Pagination/Pagination';
export default function AutoExams() {
    let [t] = useTranslation();

    const { Toggler, setToggler } = useContext(MainContext);
    const { leftArrow } = useContext(SvgsContext);
    const { qGenerated, setqGenerated } = useContext(ApisContext);

    function close() {
        setToggler({ ...Toggler, autoQusetions: false });
    }



    // const [answers, setAnswers] = useState([]);
    // const handleAddAnswer = (e) => {
    //     e.preventDefault();
    //     setAnswers(prev => {
    //         return [...prev,
    //         {
    //             option: newAnswer,
    //             isCorrect: false
    //         }]
    //     })
    //     setNewAnswer('');
    // };

    // const toggleOption = (index) => {
    //     setAnswers((prevOptions) => {
    //         return prevOptions.map((opt, i) => {
    //             if (selectedAnsType.value) {
    //                 if (i === index) {
    //                     return { ...opt, isCorrect: !opt.isCorrect };
    //                 }
    //                 return opt;
    //             } else {
    //                 if (i === index) {
    //                     return { ...opt, isCorrect: true };
    //                 }
    //                 return { ...opt, isCorrect: false };
    //             }
    //         });
    //     });
    // };

    // const toggleOptionToFalse = () => {
    //     setAnswers((prevOptions) => {
    //         return prevOptions.map((opt, i) => {

    //             return { ...opt, isCorrect: false };

    //         });
    //     });
    // };

    // const handleDelet = (id) => {
    //     const result = answers.filter((item, i) => {
    //         return i !== id;
    //     });

    //     console.log(result);
    //     setAnswers(result);
    // };

    const handleDeletQ = (id) => {
        const result = qGenerated.filter((item) => item?._id !== id)
        setqGenerated(result)
        setCurrentPage(1)
    }


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, qGenerated?.length)
    const visibleData2 = qGenerated?.slice(startIndex, endIndex)


    return (
        <>
            <Dialog
                open={Toggler.autoQusetions}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex min-h-full b items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full sm:w-[700px]  rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-2 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, autoQusetions: false })}
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
                                        {t('exam.qDetails')}
                                    </h3>
                                    <p className="text-center text-textColor__2 font-semibold text-sm  sm:text-base">
                                        {t('exam.autoP')}
                                    </p>
                                </div>
                            </DialogTitle>




                            <div className=' my-mainMargin flex flex-col gap-y-4 '>
                                {visibleData2?.map((item, i) => {
                                    return (
                                        <div key={i} className=''>
                                            <div className='w-full flex items-center justify-between'>
                                                <div className='mb-2 flex items-center  gap-x-2'>

                                                    <h6 className='text-xs px-3 py-1.5 bg-stone-500 w-fit  rounded-md text-white'>{item?.multipleChoice ? t("exam.multiQ") : t("exam.oneA")}</h6>


                                                    <h5 className={`${item?.priority === "H" ? "bg-bg_red text-text_res " : item?.priority === "L" ? "text-text_green bg-bg_green" : item?.priority === "M" && "bg-bg_orange text-text_orange"}  relative z-10 rounded-md  px-3 py-1.5 font-medium hover:bg-gray-100 text-xs`}

                                                    >
                                                        {item?.priority === "H" ? t("exam.hard") : item?.priority === "L" ? t("exam.easy") : item?.priority === "M" && t("exam.normal")}
                                                    </h5>
                                                </div>
                                                <span className='me-6 cursor-pointer'
                                                    onClick={() => handleDeletQ(item?._id)}
                                                >
                                                    <ReactSVG src={del} />
                                                </span>
                                            </div>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <div>
                                                        <DisclosureButton
                                                            className={`py-4 px-6 w-full  bg-white shadow-sm border-[#E1E1E1] border-b   flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
                                                                }`}
                                                        >
                                                            <div className='flex items-center gap-x-2'>
                                                                <p className='w-2 h-2 block bg-stone-500 rounded-full'>
                                                                </p>
                                                                <h3 className='text-sm  text-textColor__2 font-bold   '>

                                                                    {item?.title}

                                                                </h3>
                                                            </div>




                                                            <div className='flex items-center gap-x-4'>


                                                                <span className=''>
                                                                    {!open ? leftArrow() : <ReactSVG src={downarrow} />}
                                                                </span>
                                                            </div>
                                                        </DisclosureButton>

                                                        <DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex rounded-b-2xl  items-start gap-y-6 flex-col ">
                                                            {item?.options?.map((op, opI) => {
                                                                return (
                                                                    <div className=' flex items-center gap-x-2' key={opI}>
                                                                        <p className='w-5 h-5 bg-stone-500  text-white rounded-md flex items-center justify-center'>
                                                                            {opI + 1}
                                                                        </p>

                                                                        <p className={`text-sm text-textGray font-bold break-all w-fit ${op?.isCorrect ? "text-text_green bg-bg_green p-2 rounded-lg" : null}`}>
                                                                            {op?.option}
                                                                        </p>
                                                                    </div>
                                                                )
                                                            })}

                                                        </DisclosurePanel>
                                                    </div>
                                                )}
                                            </Disclosure>
                                        </div>
                                    )
                                })}

                                {qGenerated?.length > 0 &&
                                    <Pagination
                                        totalItems={qGenerated?.length}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />}

                            </div>


                            <form className=''>


                                {/* 
                                <div className="question flex flex-col gap-y-2 w-full">
                                    <label
                                        className="text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold"
                                        htmlFor="title"
                                    >
                                        {t('exam.qHead')}

                                    </label>

                                    <input
                                        className='border-[1px] border-input_border rounded-xl text-sm md:text-xs lg:text-sm text-secondMainColor font-semibold py-3 '
                                        type="text"
                                        placeholder={t("exam.qHead")}

                                        name='title'
                                        id='title'
                                    />
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
                                            // formik.setFieldValue("multipleChoice", e.value)
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

                                <div className="header w-full flex items-center justify-between px-4">
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


                                {/* answers */}


                                {/* <div
                                    className={`w-full   font-bold ${answers.length > 0 && "p-2 py-3"} rounded-lg flex items-center justify-between`}
                                >
                                    <div className="w-full ">
                                        <ul className=" pe-5">
                                            {answers.map((answer, i) => (
                                                <li
                                                    key={i}
                                                    className={`mb-2 flex items-center justify-between  p-3 rounded-lg ${answer.isCorrect
                                                        ? 'bg-mainColor text-white'
                                                        : 'bg-white text-mainColor'
                                                        }`}
                                                >
                                                    <div className="flex  items-center  w-[90%]  gap-x-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={answer.isCorrect}
                                                            onChange={() => toggleOption(i)}

                                                            className="mx-1 outline-mainColor focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg w-[15px] h-[15px] sm:w-[20px] sm:h-[20px] text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none cursor-pointer"
                                                        />
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
                                </div>  */}




                                <div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
                                    <button
                                        onClick={() => setToggler({
                                            ...Toggler,

                                            onlineQBank: true,
                                            autoQusetions: false
                                        })}
                                        type="button"
                                        className={`text-white bg-mainColor  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
                                    >
                                        {t('homepage.adding')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggler((prev) => {
                                                return { ...prev, autoQusetions: false };
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
