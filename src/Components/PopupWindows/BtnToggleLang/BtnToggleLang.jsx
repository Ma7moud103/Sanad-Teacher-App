import React from 'react'
import { useTranslation } from 'react-i18next';

export default function BtnToggleLang() {

    let { t, i18n } = useTranslation()
    return (
        <>




            {i18n.language === "en" && (
                <button
                    onClick={() => {
                        document.dir = "rtl";
                        i18n.changeLanguage("ar");
                        localStorage.setItem("dir", "rtl");
                        localStorage.setItem("lang", "ar");
                    }}
                    className="  bg-mainColor   cursor-pointer text-size_12 sm:text-size__14 py-1 px-2 sm:px-5 sm:py-2 rounded-[120px] flex items-center justify-center shadow text-white">
                    Arabic
                </button>
            )}

            {i18n.language === "ar" || i18n.language === "ar-EG" ? (
                <button
                    onClick={() => {
                        document.dir = "ltr";
                        i18n.changeLanguage("en");
                        localStorage.setItem("dir", "lrt");
                        localStorage.setItem("lang", "en");
                    }}
                    className=" bg-mainColor   cursor-pointer text-size_12 sm:text-size__14 py-1 px-2 sm:px-5 sm:py-2 rounded-[120px] flex items-center justify-center shadow text-white">
                    الانجليزيه
                </button>
            ) : null}

        </>
    )
}
