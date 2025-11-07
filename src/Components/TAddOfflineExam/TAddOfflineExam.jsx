// import React, { useContext } from "react";
// import exit from "../../Assets/sanadIcons/Vector.png";
// import icon from "../../Assets/Vector (8).png";
// import { useTranslation } from "react-i18next";
// import { useFormik } from "formik";
// import * as Yup from "yup"
// import axios from "axios";
// import Cookies from "universal-cookie";

// export default function TAddOfflineExam({ setoffLineExam }) {

//     return (
//         <>
//             <div className="justify-center items-center flex inset-0 z-50 outline-none focus:outline-none absolute w-full h-screen p-6 md:p-0 top-0">
//                 <div className="absolute md:fixed w-[90%] md:w-2/5 xl:w-1/2 3xl:w-1/3 max-h-[775px] mx-auto max-w-3xl z-40 flex justify-center items-center shadow-lg rounded-2xl">
//                     {/*Exit*/}
//                     <div className="rounded-2xl relative flex flex-col w-full h-auto bg-[#F4F7FE] bg-HomePageBgImage bg-cover bg-center bg-no-repeat outline-none focus:outline-none p-6 md:pb-8 md:pt-4 md:px-8 gap-y-1">
//                         <div className="flex justify-end">
//                             <button
//                                 className="p-1 w-10 h-10 flex justify-center items-center bg-white rounded-full"
//                                 onClick={() => setoffLineExam(false)}
//                             >
//                                 <img src={exit} alt=""></img>
//                             </button>
//                         </div>
//                         {/*header*/}
//                         <div className="flex flex-col items-center justify-between rounded-t gap-y-1 mb-4">
//                             <span className="w-16 h-16 bg-[#F0F6FFB2] rounded-full flex justify-center items-center">
//                                 <img className="w-8 max-w-full" src={icon} alt="" />
//                             </span>
//                             <div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
//                                 <h3 className="text-xl md:text-3xl font-black text-[#023E8A]">
//                                     kkj
//                                 </h3>
//                                 <p className="text-[#4E5556] text-sm md:lg">
//                                     bb
//                                 </p>
//                             </div>
//                         </div>
//                         {/*body*/}
//                         <form className="flex flex-col gap-1 2xl:gap-4">
//                             <div className="alertAddress flex flex-col w-full">
//                                 <input

//                                     className={` py-2 px-6
//                              placeholder:text-[#A4ACAD] placeholder:font-bold
//                         border-[#E6E9EA]
//                            outline-none  focus:outline-none text-start border-[1px] rounded-xl my-3 h-[56px] placeholder:text-start`}
//                                     type="text"

//                                 />
//                             </div>
//                             <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
//                                 <button className="bg-mainColor text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                                     hk
//                                 </button>
//                                 <button
//                                     onClick={() => setoffLineExam(false)}
//                                     className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                                     h
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <div
//                     onClick={() => setoffLineExam(false)}
//                     className="fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-[0.02]"
//                 ></div>
//             </div>
//         </>
//     );
// }
