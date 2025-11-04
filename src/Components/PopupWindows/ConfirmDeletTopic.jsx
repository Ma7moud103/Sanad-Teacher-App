import React, {
    useContext,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../Context/MainContext';
import x from '../../Assets/sanadSVG/Multiply.svg';
import addExam from '../../Assets/sanadSVG/sGrade.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../Context/ApisContext';
import { useParams } from 'react-router-dom';
export default function ConfirmDeletTopic() {
    let [t] = useTranslation();
    const { id } = useParams()

    const { Toggler, setToggler } = useContext(MainContext);
    const { deletTopic } = useContext(ApisContext);

    function close() {
        setToggler({ ...Toggler, deletTopic: false });
    }

    const [loading, setloading] = useState(false)
    return (
        <>
            <Dialog
                open={Toggler.deletTopic}
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
                                className="flex items-center justify-center p-4 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, deletTopic: false })}
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
                                        {t('homepage.confirmDeletTopic')}
                                    </h3>
                                    <p className="text-center text-sm  sm:text-base">
                                        {t('homepage.topicTitle')}
                                    </p>
                                </div>
                            </DialogTitle>


                            <div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
                                <button
                                    // disabled={!(formik.isValid && formik.dirty)}
                                    // disabled={!deletedQCourse}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (id) {
                                            deletTopic(id, setloading)
                                        }
                                    }}
                                    type="button"
                                    className={`text-white bg-mainColor  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
                                >

                                    {loading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                    ></div> : t('exam.confirm')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {

                                        setToggler((prev) => {
                                            return { ...prev, deletTopic: false };
                                        });
                                    }}
                                    className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg"
                                >
                                    {t('homepage.back')}
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
