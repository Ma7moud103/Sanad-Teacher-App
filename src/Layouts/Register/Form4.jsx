import React, { useContext } from "react";
import gallary from "../../Assets/sanadSVG/Subtract.svg";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../Context/MainContext";
import ImageUploader from "./ImageUploader";
import * as Yup from 'yup'

export default function Form4({ back, next, data }) {
    const { AuthLoading, profileImage } = useContext(MainContext)

    let [t] = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [fileName, setFileName] = useState("");
    const handleFileSelect = (files) => {
        setSelectedFiles([...files]);
        setFileName(files[0]?.name); // Assuming only a single file is selected
        setFileSelected(true);
    };

    // tutors/
    // Sdk4RSl_



    const stepFourValidation = Yup.object({

        profileImage: Yup.string().required()


    });


    const handleSubmit = (values) => {
        console.log(values)
        next(values, true, false);
    };



    return (
        <>
            <Formik initialValues={data} onSubmit={handleSubmit} validationSchema={stepFourValidation} >
                {(formikProps) => {
                    console.log(formikProps.values)
                    // formikProps.setFieldValue("email", storedEmail)
                    return (
                        <Form className="w-full">
                            <div className="flex flex-col items-center justify-center w-full my-8 profile-pic ">
                                <span className="relative w-full font-semibold text-mainColor text-start text-size_12">
                                    {t("register.profileImage")}
                                </span>


                                <ImageUploader formikProps={formikProps} />

                            </div>

                            {formikProps.errors.profileImage && formikProps.touched.profileImage && (
                                <div className="flex items-center mb-3 gap-x-2">
                                    <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                    <p className="text-[#E4363DE8] text-xs sm:text-size_12  ">
                                        {formikProps.errors.profileImage}
                                    </p>
                                </div>
                            )}

                            <div className="flex w-full gap-x-2 ">
                                <button
                                    // disabled={!(formikProps.isValid)}
                                    type="submit"
                                    className="flex items-center justify-center w-1/2 py-3 text-sm font-bold text-white text-nowrap bg-mainColor hover:bg-secondMainColor rounded-2xl focus:outline-none "
                                >
                                    {AuthLoading.register ? (
                                        <div
                                            className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
                                        ></div>
                                    ) : (
                                        <>{t("register.newAccount")}</>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        back(formikProps.values);
                                    }}
                                    type="button"
                                    className="flex items-center justify-center w-1/2 py-3 text-sm font-bold text-white bg-mainColor hover:bg-secondMainColor rounded-2xl focus:outline-none "
                                >
                                    {t("register.prev")}
                                </button>
                            </div>
                        </Form>
                    )
                }
                }
            </Formik>
        </>
    );
}