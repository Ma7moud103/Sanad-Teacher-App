import React from "react";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { MainContext } from "../../Context/MainContext";
import Cookies from "universal-cookie";

export default function HeaderHomePage() {
  let cookie = new Cookies()
  const { userData } = useContext(MainContext);
  let userDetails = cookie.get("userDetails")

  const [t] = useTranslation();

  return (
    <>
      <div className="flex items-center justify-between mb-2 ">
        <div className="welcome pt-10 md:p-0">
          <p className="text-secondMainColor text-2xl pb-2 capitalize">
            {t("homepage.titleP")} {userDetails ? userDetails.fullname : userData.fullname} ,
          </p>
          <h1 className="text-mainColor font-bold text-3xl capitalize">
            {t("homepage.titleH")}
          </h1>
        </div>
      </div>
    </>
  );
}
