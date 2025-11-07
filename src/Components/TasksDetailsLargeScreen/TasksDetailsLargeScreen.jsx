// import React, { useContext } from "react";
// import left from "../../Assets/Icons/Arrow/Arrow 2/iconleft.png";
// import { Disclosure } from "@headlessui/react";
// import Down from "../../Assets/down.png";
// import icon from "../../Assets/Vector (27).png";
// import avatar from "../../Assets/Avatars.png";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import { MainContext } from "../../Context/MainContext";

// export default function TasksDetailsLargeScreen() {
//     let [t, i18n] = useTranslation();

//     let { Role } = useContext(MainContext)

//     return (
//         <div className="py-3 px-6 w-full border-[#E1E1E1] border  flex items-center justify-between">

//             <p className="text-[22px] text-secondMainColor  font-bold w-1/6 text-start pr-10">
//                 Mission
//             </p>
//             <p className="font-semibold text-base text-textGray w-1/6 text-start pr-10">
//                 محمد خليفة
//             </p>

//             <p className="font-semibold text-base text-textGray w-1/6 text-start">
//                 500 طالب
//             </p>
//             <p className="font-semibold text-base text-textGray w-1/6 text-start">
//                 5 {Role === 3 ? "groups" : "assistants"}
//             </p>

//             {Role === 1 && <p className="font-semibold text-base text-textGray w-1/6 text-start">
//                 5 exams
//             </p>}

//             <div className="flex justify-between items-center w-1/6 text-start">
//                 <p className="font-semibold text-base text-textGray">
//                     5 سناتر
//                 </p>

//                 <input type="checkbox" className="border-[1px] border-textGray rounded-md w-8 h-8  checked:bg-mainColor" />
//             </div>
//         </div>


//     );
// }
