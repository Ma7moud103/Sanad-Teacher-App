// import React, { useContext } from "react";
// import icon from "../../Assets/carbon_task-view.png";
// import icon1 from "../../Assets/carbon_task-star.png";
// import icon2 from "../../Assets/Vector (11).png";
// import icon3 from "../../Assets/Vector (18).png";
// import { useTranslation } from "react-i18next";
// import { ApisContext } from "../../Context/ApisContext";
// export default function TaskArchiveBoxes() {
//   let [t, i18n] = useTranslation();

//   const { Tasks, TasksDone, TasksActive, TasksNormal,
//     TasksSep, } = useContext(ApisContext)
//   return (
//     <div className="w-full flex flex-col xl:flex-row gap-x-6 gap-y-4 justify-between">



//       <div className="box shadow-md xl:shadow-none w-full xl:w-1/4 flex items-center justify-center gap-x-3 xl:flex-col 2xl:flex-row bg-white rounded-2xl p-4 cursor-pointer 2xl:gap-x-4">

//         <div className="flex justify-center items-center">

//           <span className="w-11 h-11 sm:w-12 sm:h-12   bg-[#F4F7FE] rounded-full flex justify-center items-center p-2">
//             <img className="w-4 h-4 md:w-8 md:h-8" src={icon} alt="" />
//           </span>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-y-2">
//           <p className="text-base sm:text-size_18 md:text-size__20   text-textGray font-normal">
//             {t("TAssistants.generalTasks")}
//           </p>
//           <p className="text-size__14 sm:text-base md:text-size_18   text-mainColor font-extrabold">
//             {TasksNormal.length > 2 ? `${TasksNormal.length} مهام` : TasksNormal.length === 0 ? `لا توجد` : `${TasksNormal.length} مهمه`}
//           </p>
//         </div>
//       </div>




//       <div className="numOfTeachers box  bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] box shadow-md xl:shadow-none w-full xl:w-1/4 flex items-center justify-center gap-x-3 xl:flex-col 2xl:flex-row bg-white rounded-2xl p-4 cursor-pointer 2xl:gap-x-4 ">
//         <div className="flex justify-center items-center">

//           <span className="  rounded-full flex justify-center items-center p-2">
//             <img className="w-4 h-4 md:w-8 md:h-8" src={icon1} alt="" />
//           </span>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-y-2">
//           <p className="text-base sm:text-size_18 md:text-size__20   text-white  font-normal">
//             {t("TAssistants.customTasks")}
//           </p>
//           <p className="text-size__14 sm:text-base md:text-size_18   text-white  font-extrabold">
//             {TasksSep.length > 2 ? `${TasksSep.length} مهام` : TasksSep.length === 0 ? `لا توجد` : `${TasksSep.length} مهمه`}
//           </p>
//         </div>
//       </div>



//       <div className="box shadow-md xl:shadow-none w-full xl:w-1/4 flex items-center justify-center gap-x-3 xl:flex-col 2xl:flex-row bg-white rounded-2xl p-4 cursor-pointer 2xl:gap-x-4">

//         <div className="flex justify-center items-center">

//           <span className="w-11 h-11 sm:w-12 sm:h-12   bg-[#F4F7FE] rounded-full flex justify-center items-center p-2">
//             <img className="w-4 h-4 md:w-8 md:h-8" src={icon2} alt="" />
//           </span>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-y-2">
//           <p className="text-base sm:text-size_18 md:text-size__20   text-textGray font-normal">
//             {t("TAssistants.myCompletedTasks")}
//           </p>
//           <p className="text-size__14 sm:text-base md:text-size_18   text-mainColor font-extrabold">
//             {TasksDone.length > 2 ? `${TasksDone.length} مهام` : TasksDone.length === 0 ? `لا توجد` : `${TasksDone.length} مهمه`}

//           </p>
//         </div>
//       </div>


//       <div className="box shadow-md xl:shadow-none w-full xl:w-1/4 flex items-center justify-center gap-x-3 xl:flex-col 2xl:flex-row bg-white rounded-2xl p-4 cursor-pointer 2xl:gap-x-4">

//         <div className="flex justify-center items-center">

//           <span className="w-11 h-11 sm:w-12 sm:h-12   bg-[#F4F7FE] rounded-full flex justify-center items-center p-2">
//             <img className="w-4 h-4 md:w-8 md:h-8" src={icon3} alt="" />
//           </span>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-y-2">
//           <p className="text-base sm:text-size_18 md:text-size__20   text-textGray font-normal">
//             مهام الأرشيف
//           </p>
//           <p className="text-size__14 sm:text-base md:text-size_18   text-mainColor font-extrabold">
//             {TasksDone.length > 2 ? `${TasksDone.length} مهام` : TasksDone.length === 0 ? `لا توجد` : `${TasksDone.length} مهمه`}

//           </p>
//         </div>
//       </div>
















//     </div>
//   );
// }
