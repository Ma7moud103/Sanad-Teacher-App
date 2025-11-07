// import Options from "../Options/Options";
import ProfileFrame from "../ProfileFrame/ProfileFrame"
import End from "../End/End";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Options from "../Options/Options";
import { useContext } from "react";
import { MainContext } from "../../../Context/MainContext";
// import mainLogo from "../../../Assets/Logo.png"
import mainLogo from '../../../Assets/sanad.svg'

import { ReactSVG } from 'react-svg'
import ContactUs from "../ContactUs";
export default function Dashboard() {
  const { setToggleMenu } = useContext(MainContext)
  const [t] = useTranslation();
  return (


    <>
      <div className=" h-full flex flex-col justify-between py-2" >
        <div>

          <Link onClick={() => setToggleMenu(false)}
            to="/"
            className=" flex items-center justify-center  w-full  pe-4"  >


            <ReactSVG src={mainLogo} />

          </Link>

          <ProfileFrame />
          <Options />
        </div>
        <div className="px-4">
          <ContactUs />
        </div>

        <div>
          <End />
        </div>
      </div>

    </>

  );
}
