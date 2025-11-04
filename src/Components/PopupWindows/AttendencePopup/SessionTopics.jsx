


import React, {
    useContext,
} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import head from '../../../Assets/sanadSVG/sessions.svg';
import { ReactSVG } from 'react-svg';
import hexToRgba from 'hex-to-rgba';
export default function SessionTopics() {
    let [t] = useTranslation();

    const { Toggler, setToggler, sessionTopics } = useContext(MainContext);

    function close() {
        setToggler({ ...Toggler, topics: false });
    }



    return (
        <>
            <Dialog
                open={Toggler.topics}
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
                                onClick={() => setToggler({ ...Toggler, topics: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-mainColor"
                            >
                                <div className='headers flex flex-col items-center gap-y-2'>

                                    <ReactSVG src={head} />
                                    <h1 className='text-[29px] font-bold text-mainColor '>
                                        {t('homepage.sessionTopics')}
                                    </h1>
                                    {/* <p className='font-normal text-[16px] text-textColor__2'>{t("homepage.attendenceConfirmp")}</p> */}
                                </div>
                            </DialogTitle>
                            {/* content */}


                            <div className="content my-4 flex  gap-3 flex-wrap bg-white p-4 rounded-lg justify-center">
                                {sessionTopics?.map((topic, i) => {
                                    return (

                                        <span key={topic?._id} style={{ color: topic?.color, backgroundColor: hexToRgba(topic?.color, "0.2") }} className="flex justify-center items-center  rounded-full py-1 px-2 text-xs text-center">
                                            {sessionTopics?.name !== "" || sessionTopics?.name !== undefined ? topic?.name.split(" ").slice(0, 3).join(" ") : `${t("homepage.no")}`}
                                        </span>

                                    )
                                })
                                }
                            </div>


                            {/* <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4 px-4">
                                <button
                                    // disabled={!(id && selectedSession?._id)}
                                    // onClick={() => {
                                    //     takeAttendance()
                                    // }}
                                    className={`${id && selectedSession?._id ? "bg-mainColor" : "bg-secondMainColor"} text-white rounded-2xl px-10 py-2 w-full md:w-1/2 text-xl`}>
                                    {t('exam.confirm')}

                                </button>
                                <button
                                    onClick={() => setToggler({ ...Toggler, topics: false })}
                                    className="bg-transparent text-secondMainColor rounded-2xl px-10 py-2 w-full md:w-1/2 text-xl"
                                >
                                    {t("homepage.back")}
                                </button>
                            </div> */}

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}


