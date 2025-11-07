import React, { useContext } from "react";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MainContext } from "../../Context/MainContext";
import eyePassRed from "../../Assets/sanadSVG/eyeRed.svg"
import eyePassBlue from "../../Assets/sanadSVG/eyeBlue.svg"
import { ReactSVG } from "react-svg";

export default function Form1({ data, next }) {
    const [showPassword, setShowPassword] = useState({
        password: false,
        repassword: false,
    });

    let [t] = useTranslation();
    let { AuthLoading, Toggler, setToggler } = useContext(MainContext);

    const handleSubmit = (values) => {
        localStorage.setItem("ver-email", JSON.stringify(values.email));
        next(values, false, true);

    };

    const stepOneValidation = Yup.object({
        fullname: Yup.string()
            .required(t("register.requiredFullname"))
            .matches(
                /^([\p{Script=Arabic} ]+|[A-Za-z ]+)$/u,
                t("register.fullNameMatch")
            )
            .min(3, t("register.fullname3"))
            .max(30, t("register.fullnameTall")),
        email: Yup.string()
            .required(t("register.requiredEmail"))
            .matches(
                /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                t("register.emailMatch")
            ),
        password: Yup.string()
            .required(t("register.requiredPassword"))
            .matches(
                /^(?=\S*[\d])(?=\S*[$!@%&_])\S{8,30}$/,
                t("register.passwordMatch")
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], t("register.confirmPasswordMatch"))
            .required(t("register.requiredRepassword")),
    });

    const [Rules, setRules] = useState(false);
    const [Rules2, setRules2] = useState(false);



    const getInputClasses = (error, touched) => {
        if (error && touched) {
            return "border-[#E4363DE8] placeholder:text-[#E4363DE8] text-[#E4363DE8]";
        } else {
            return "border-[#BDC4CD] text-mainColor font-bold  ";
        }
    };



    return (
        <>
            <Formik
                initialValues={data}
                onSubmit={handleSubmit}
                validationSchema={stepOneValidation}
            >
                {(formikProps) => (
                    <Form className="w-full  relative">

                        <div className={`flex flex-col   justify-center items-center gap-y-1 sm:mt-5 sm:gap-y-1  w-full`}>
                            <div className={`flex flex-col w-full ${formikProps.errors.fullname ? "" : "gap-y-2"} sm:gap-y-1`}>
                                <label
                                    htmlFor="fullname"
                                    className="text-mainColor w-full text-start font-semibold text-size_12  relative"
                                >
                                    {t("register.fullName")}
                                </label>

                                <input
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    name="fullname"
                                    placeholder={t("register.fullnamePlaceholder")}
                                    id="fullname"
                                    value={formikProps.values.fullname}
                                    type="text"
                                    className={`py-2 px-6  outline-none text-xs sm:text-sm placeholder:text-slate-400  placeholder:text-[12px]   focus:outline-none text-start border-[1px] rounded-xl  placeholder:text-start
                                    ${getInputClasses(formikProps.errors.fullname,
                                        formikProps.touched.fullname)}
                            `}

                                />

                                {formikProps.errors.fullname && formikProps.touched.fullname && (
                                    <div className="flex items-center gap-x-2  mb-3">
                                        <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                        <p className="text-[#E4363DE8] text-xs   sm:text-size_12  ">
                                            {formikProps.errors.fullname}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className={`flex flex-col w-full ${formikProps.errors.email ? "" : "gap-y-2"} sm:gap-y-1`}>
                                <label
                                    htmlFor="email"
                                    className="text-mainColor text-size_12 w-full text-start font-semibold relative"
                                >
                                    {t("register.email")}
                                </label>
                                <input
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    placeholder={t("register.emialPlaceholder")}
                                    value={formikProps.values.email}
                                    type="text"
                                    id="email"
                                    name="email"
                                    className={`py-2 px-6   outline-none placeholder:text-slate-400  focus:outline-none text-start border-[1px] rounded-xl  placeholder:text-[12px] text-size_12 placeholder:text-start
                             ${getInputClasses(formikProps.errors.email,
                                        formikProps.touched.email)}`}
                                />

                                {formikProps.errors.email && formikProps.touched.email && (
                                    <div className="flex items-center gap-x-2  mb-3 ">
                                        <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                        <p className="text-[#E4363DE8] text-xs sm:text-size_12 ">
                                            {formikProps.errors.email}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col w-full ${formikProps.errors.password ? "" : "gap-y-2"} sm:gap-y-1`}>
                                <label
                                    htmlFor="password"
                                    className="text-mainColor  w-full text-start font-semibold text-size_12  "
                                >
                                    {t("register.password")}
                                </label>

                                <div className="w-full relative bg-red-50 ">
                                    <input
                                        placeholder={t("register.passwordPlaceholder")}
                                        value={formikProps.values.password}
                                        onBlur={formikProps.handleBlur}
                                        onChange={formikProps.handleChange}
                                        onCopy={(e) => e.preventDefault()}
                                        onPaste={(e) => e.preventDefault()}
                                        onCut={(e) => e.preventDefault()}
                                        type={`${showPassword.password ? "text" : "password"}`}
                                        id="password"
                                        name="password"
                                        className={` px-6 py-2    outline-none w-full placeholder:text-slate-400 focus:outline-none text-start border-[1px] rounded-xl text-size_12  placeholder:text-[12px] placeholder:text-start
                                      ${getInputClasses(formikProps.errors.password,
                                            formikProps.touched.password)}`}
                                    />

                                    <span
                                        onClick={() => {
                                            setShowPassword((prev) => {
                                                return { ...prev, password: !prev.password };
                                            });
                                        }}
                                        className="absolute end-5 cursor-pointer  top-[50%] translate-y-[-50%]"
                                    >
                                        {formikProps.errors.password && formikProps.touched.password ?

                                            <ReactSVG src={eyePassRed} />
                                            : formikProps.values.password !== "" && <ReactSVG src={eyePassBlue} />

                                        }
                                    </span>
                                </div>

                                {formikProps.errors.password && formikProps.touched.password && (
                                    <div className="flex items-center gap-x-2  mb-3">
                                        <span className="w-[5px] h-[5px] bg-[#E4363DE8] "></span>
                                        <p className="text-[#E4363DE8] text-xs sm:text-size_12 ">
                                            {formikProps.errors.password}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col w-full ${formikProps.errors.confirmPassword ? "" : "gap-y-2"} sm:gap-y-1`}>
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-mainColor w-full text-start font-semibold text-size_12  relative"
                                >
                                    {t("register.rePassword")}
                                </label>
                                <div className="relative w-full">
                                    <input
                                        onBlur={formikProps.handleBlur}
                                        onChange={formikProps.handleChange}
                                        value={formikProps.values.confirmPassword}
                                        placeholder={t("register.rePasswordPlaceholder")}
                                        type={`${showPassword.repassword ? "text" : "password"}`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onCopy={(e) => e.preventDefault()}
                                        onPaste={(e) => e.preventDefault()}
                                        onCut={(e) => e.preventDefault()}
                                        className={`py-2 px-6   outline-none  w-full  focus:outline-none text-start border-[1px] rounded-xl placeholder:text-slate-400 placeholder:text-[12px] text-size_12 placeholder:text-start
                           ${getInputClasses(formikProps.errors.confirmPassword,
                                            formikProps.touched.confirmPassword)}  `}
                                    />

                                    <span
                                        onClick={() => {
                                            setShowPassword((prev) => {
                                                return { ...prev, repassword: !prev.repassword };
                                            });
                                        }}
                                        className="absolute end-5 cursor-pointer  top-[50%] translate-y-[-50%]"
                                    >
                                        {formikProps.errors.confirmPassword && formikProps.touched.confirmPassword ?

                                            <ReactSVG src={eyePassRed} />
                                            : formikProps.values.confirmPassword !== "" && <ReactSVG src={eyePassBlue} />

                                        }
                                    </span>
                                </div>

                                {formikProps.errors.confirmPassword &&
                                    formikProps.touched.confirmPassword && (
                                        <div className="flex items-center gap-x-2  mb-3">
                                            <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                            <p className="text-[#E4363DE8] text-xs sm:text-size_12   ">
                                                {formikProps.errors.confirmPassword}
                                            </p>
                                        </div>
                                    )}
                            </div>

                            <div className="flex flex-col gap-y-2 w-full">
                                <div className="w-full  sm:m-0  checkbox flex items-center gap-x-1">
                                    <input
                                        onChange={(e) => {
                                            setRules((prev) => !prev);
                                        }}
                                        className="outline-mainColor  focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg cursor-pointer text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none w-[20px] h-[20px]"
                                        id="remember"
                                        type="checkbox"
                                        value={Rules}
                                    />

                                    <label

                                        className="text-[#4E5556]  font-semibold text-start text-size_12 "
                                    >
                                        <span> {t("register.consentrains")} </span>


                                        <a target="_blank" href="https://www.sanadedu.com/terms-and-conditions" className="text-mainColor hover:underline  cursor-pointer">
                                            {t("register.subconsentrains")}

                                        </a>
                                        <span> {t("register.thirdConsen")} </span>
                                    </label>
                                </div>

                                <div className="  w-full flex items-center gap-x-1">
                                    <input
                                        onChange={(e) => {
                                            setRules2((prev) => !prev);
                                        }}
                                        className="outline-mainColor  focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg cursor-pointer text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none w-[20px] h-[20px] "
                                        id="check"
                                        type="checkbox"
                                        value={Rules2}

                                    />

                                    <label
                                        htmlFor="check"
                                        className="text-[#4E5556]  font-semibold text-start text-size_12 "
                                    >


                                        {t("register.consen2")}

                                    </label>
                                </div>
                            </div>

                            <button

                                type="submit"
                                disabled={!(formikProps.isValid && formikProps.dirty && Rules)}
                                className={`text-white  mt-2 sm:mt-4 flex justify-center items-center ${!(formikProps.isValid && formikProps.dirty && Rules)
                                    ? "bg-secondMainColor"
                                    : "bg-mainColor"
                                    } font-bold w-full py-3 text-size_12   rounded-xl  focus:outline-none`}
                            >
                                {AuthLoading.verifyEmail ? (
                                    <div
                                        className={`w-6 h-6 border-t-4  border-white border-solid  rounded-full animate-spin block`}
                                    ></div>
                                ) : (
                                    t("register.checkEmail")
                                )}
                            </button>

                            <p className="capitalize text-sm text-textColor__2">
                                {t("register.haveAccount")}
                                <Link
                                    to={"/login"}
                                    className="text-mainColor underline hover:no-underline mt-2  text-size_12  cursor-pointer text-center capitalize"
                                >
                                    {t("register.signIn")}
                                </Link>{" "}
                            </p>
                        </div>

                    </Form>

                )}
            </Formik>
        </>
    );
}