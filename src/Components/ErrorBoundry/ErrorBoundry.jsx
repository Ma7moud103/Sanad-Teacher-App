// import React, { useContext, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { MainContext } from "../../Context/MainContext";
// import Dashboard from "../../Components/SildeMenu/Dashboard/Dashboard";
// import ExitPopUp from "../../Components/PopupWindows/ExitPopUp/ExitPopUp";
// import DashboardBtn from "../../Components/SildeMenu/DashboadBtn/DashboadBtn";

// export default function ErrorBoundry() {
//     const { toggleMenu, setToggleMenu, exitModal, detailsUser, setRole, remember, MainToken, currentUrl, setcurrentUrl } = useContext(MainContext);


//     return (
//         <div className={`bg-[#F9FAFC] md:bg-bg_mainLayout flex bg-HomePageBgImage bg-cover bg-center bg-no-repeat `} >

//             {toggleMenu ? (
//                 <div
//                     onClick={() => setToggleMenu(false)}
//                     className="md:hidden bg-shadow bg-black bg-opacity-50 end-0 top-0 bottom-0 start-0 fixed w-full flex z-[9998]"
//                 >

//                 </div>
//             ) : (
//                 ""
//             )}

//             <div
//                 className={`md:w-1/3 xl:w-1/4 2xl:w-1/5  md:block fixed md:static z-[9999] md:start-0 transition-all ${toggleMenu ? "start-0" : "start-full"
//                     }`}
//             >
//                 <Dashboard />
//             </div>
//             <div className="w-full flex flex-col md:w-2/3 xl:w-3/4 2xl:w-4/5 gap-5 px-8 py-10 md:bg-bg_mainLayout bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative">
//                 <div className="flex justify-end items-center fixed end-5 md:hidden z-[9999]">
//                     <DashboardBtn />
//                 </div>




//                 Error
//                 {exitModal ? (
//                     <>
//                         <ExitPopUp />
//                     </>
//                 ) : null}
//             </div>
//         </div>
//     );
// }