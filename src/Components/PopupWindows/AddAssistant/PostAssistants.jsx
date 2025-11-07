import React, {
    useContext,
    useRef,
    useState,
} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import warning from '../../../Assets/sanadSVG/teachers.svg';
import * as Yup from 'yup';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import scan from "../../../Assets/sanadSVG/scanGray.svg"
import { Html5Qrcode } from 'html5-qrcode';

const PostAssistants = function () {
    let [t] = useTranslation();
    const { AddAssistant, assLoading } = useContext(ApisContext);
    const validation = Yup.object({
        tutorKey: Yup.string().required(t("homepage.requiredField")).matches(/^[A-Za-z0-9_-]{8}$/, t("homepage.tutorKeyValidation")),
    });

    let formik = useFormik({
        initialValues: {
            tutorKey: '',
        },

        validationSchema: validation,

        onSubmit: async (values) => {
            AddAssistant(values, formik);

        },
    });
    const { Toggler, setToggler } = useContext(MainContext);









    const [scannerStarted, setScannerStarted] = useState(false);
    const hasCalledGetCard = useRef(false);
    const videoRef = useRef(null);
    const toggleScanner = () => {
        setScannerStarted((prev) => !prev);
    };
    useEffect(() => {
        let html5QrCode;
        if (scannerStarted) {
            html5QrCode = new Html5Qrcode('reader');
            html5QrCode.start(
                { facingMode: 'environment' },
                {
                    fps: 20,
                    qrbox: 200,
                },
                (qrCodeMessage) => {




                    formik.values.tutorKey = qrCodeMessage
                    formik.setFieldValue("tutorKey", qrCodeMessage)


                    // Call getCard directly after scanning
                    if (formik.errors.tutorKey === "" && !hasCalledGetCard.current) {
                        formik.values.tutorKey = qrCodeMessage
                        formik.setFieldValue("tutorKey", qrCodeMessage)
                        hasCalledGetCard.current = true; // Prevent multiple calls for the same QR data
                    }


                    setScannerStarted(false);

                    hasCalledGetCard.current = false;


                },
                (errorMessage) => {
                    console.error(errorMessage);
                }
            );
        }

        return () => {
            if (html5QrCode) {
                html5QrCode.stop()
            }
        };
    }, [scannerStarted]);

    // const isButtonDisabled = !formik.isValid || !selectedCenter;


    function close() {
        setToggler({ ...Toggler, addAssistant: false });
        formik.resetForm()


        formik.values.tutorKey = ""
        formik.setFieldValue("tutorKey", "")
    }

    useEffect(() => {
        if (Toggler.addAssistant === false) {
            formik.resetForm()

            formik.values.tutorKey = ""
            formik.setFieldValue("tutorKey", "")

        }
    }, [Toggler.addAssistant])

    return (
        <>

            <Dialog
                open={Toggler.addAssistant}
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
                                onClick={() => setToggler({ ...Toggler, addAssistant: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-mainColor"
                            >
                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    <ReactSVG src={warning} />
                                    <h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
                                        {t('homepage.addAssistant')}
                                    </h3>
                                    <p className="font-normal text-sm sm:text-base text-center">
                                        {t('homepage.assistantP')}
                                    </p>
                                </div>
                            </DialogTitle>
                            {/* content */}
                            <form
                                onSubmit={formik.handleSubmit}
                                className="flex flex-col gap-4 mt-4 "
                            >


                                <div className="alertAddress flex flex-col gap-y-1 w-full ">

                                    <div
                                        id="reader"
                                        style={{ display: scannerStarted ? 'block' : 'none', }}
                                        ref={videoRef}
                                    ></div>
                                    {/* {formik.errors.tutorKey && formik.touched.tutorKey && <p className='text-err text-sm'>
                                        {formik.errors.tutorKey}
                                    </p>} */}
                                    <div className={`w-full bg-white px-3 py-1      flex items-center justify-between     
                        border-[#E6E9EA] 
                           outline-none  focus:border-none text-start border-[1px] rounded-xl   ${formik.errors.tutorKey && formik.touched.tutorKey
                                            ? 'text-err border-err  placeholder:text-err '
                                            : 'placeholder:text-[#A4ACAD] text-mainColor border-[#E6E9EA]'
                                        }`}>

                                        <input
                                            onFocus={(e) => e.target.style.boxShadow === "none"}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            placeholder="KAFAIPSE__2KDASJF2"
                                            className={` w-[90%] border-none  focus:outline-none 
                           placeholder:text-start placeholder:text-[#A4ACAD] placeholder:font-bold`}
                                            type="text"
                                            id="tutorKey"
                                            name="tutorKey"
                                        />

                                        <span onClick={toggleScanner} className="cursor-pointer">
                                            <ReactSVG src={scan} />
                                        </span>
                                    </div>

                                </div>





                                <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
                                    <button
                                        type="submit"
                                        disabled={!(formik.isValid && formik.dirty)}
                                        className={` ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"} text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg`}
                                    >
                                        {assLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                        ></div> : t('PopUps.add')}


                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setToggler({ ...Toggler, addAssistant: false })}
                                        className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 sm:text-lg"
                                    >
                                        {t('homepage.back')}
                                    </button>
                                </div>

                                {/* <div className="formBtns flex  gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.dirty && formik.isValid)}
										className={`${formik.dirty && !formik.isValid
											? 'bg-mainColor'
											: 'bg-secondMainColor'
											} text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl`}
									>
										assLoading
										{t('PopUps.add')}
									</button>
									<button
										onClick={() =>
											setToggler({ ...Toggler, addAssistant: false })
										}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl"
									>
										{t('homepage.back')}
									</button>
								</div> */}
                            </form>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
export default PostAssistants