// import React, { useContext, useEffect } from "react";
// import DetailsInLargeScreen from "../../DetailsInLargeScreen/DetailsInLargeScreen";
// import search from "../../../Assets/sanadIcons/search.png";
// import sort from "../../../Assets/sanadIcons/newer.png";
// import DetailsInSmallScreen from "../../DetailsInSmallScreen/DetailsInSmallScreen";
// import { useTranslation } from "react-i18next";
// import { useState } from "react";
// import Pagination from "../../Pagination/Pagination";
// import TasksDetailsLargeScreen from "../../TasksDetailsLargeScreen/TasksDetailsLargeScreen";
// import { ApisContext } from "../../../Context/ApisContext";
// import { Disclosure } from "@headlessui/react";
// import { Link } from "react-router-dom";
// import left from "../../../Assets/Icons/Arrow/Arrow 2/iconleft.png";
// import Down from "../../../Assets/down.png";
// import filterIcon from "../../../Assets/exams/filterpng.png"
// import UseToggle from "../../../CustomHooks/UseToggle/UseToggle";

// export default function TasksTable() {
//   const [t] = useTranslation();
//   const date = new Date()
//   const { TeacherAsssistants,

//     Tasks,
//     TasksDone,
//     TasksActive,

//   } = useContext(ApisContext)
//   const [ToggleMenu, setToggleMenu] = UseToggle(false)
//   const [activeFilter, setactiveFilter] = useState(t("task.all"))

//   const [data, setdata] = useState(Tasks)

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   // Calculate the start and end indexes for the current page

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const endIndex = data.length > 0 && Math.min(startIndex + itemsPerPage, data.length)

//   const visibleData2 = data.length > 0 && data.slice(startIndex, endIndex)

//   return (
//     <div
//       // onClick={() => setToggleMenu()}
//       className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 gap-6" >
//       <div className="flex justify-between items-center">

//         <div className="header flex flex-col gap-3">
//           <p className="font-extrabold text-2xl md:text-3xl xltext-4xl text-mainColor">
//             {t("homepage.tasksLog")}
//           </p>
//           <p className="font-semibold text-xl text-textGray xl:hidden">
//             {/* {Tasks.length > 0 ? Tasks.length + ` مهام` : t("homepage.noTasks")} */}

//             {data.length !== undefined ? data.length >= 9 ? `${data.length} ${t("homepage.task")}` : data.length == 0 ? t("homepage.noTasks") : `${data.length} ${t("homepage.task")}` : t("homepage.noTasks")}
//           </p>

//         </div>

//         <div className="filters  flex w-[50%] gap-x-6 justify-end ">

//           <div className="byStatus relative  w-[160px] cursor-pointer 2xl:w-[170px] bg-bgLight py-[10px] rounded-2xl px-3 text-mainColor  md:text-[16px]  font-semibold flex items-center justify-between "
//             onClick={() => setToggleMenu()}
//           >
//             <div className="icon flex items-center gap-x-2">
//               <div className="w-[16px] flex items-center justify-center h-[16px]">
//                 <img src={filterIcon} alt="" />
//               </div>
//               <h6 className="">{activeFilter}</h6>
//             </div>

//             <div className="downArrow w-[17px] h-[17px] flex items-center justify-center">
//               <img src={Down} alt="" />
//             </div>
//             <div className={`absolute ${ToggleMenu ? "block" : "hidden"} top-[110%] w-full left-0 bg-inherit rounded-xl p-1 z-10`}>
//               <ul className="flex flex-col gap-y-3 px-3 py-2 ">
//                 <li className="text-[1rem]"
//                   onClick={() => {
//                     setactiveFilter(t("task.done"))
//                     setdata(TasksDone)

//                   }}  >
//                   {t("task.done")}
//                 </li>
//                 <li
//                   onClick={() => {
//                     setactiveFilter(t("task.ac"))
//                     setdata(TasksActive)

//                   }}   >
//                   {t("task.ac")}
//                 </li>

//                 <li
//                   onClick={() => {
//                     setactiveFilter(t("task.all"))
//                     setdata(Tasks)

//                   }}  >
//                   {t("task.all")}
//                 </li>

//               </ul>
//             </div>

//           </div>

//         </div>

//       </div>
//       <div className="hidden xl:table">
//         <div className="bg-[#F4F7FE]">
//           <div className="p-6 border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none flex justify-between">
//             <p className="text-start text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.tN")}
//             </p>
//             <div className="flex 2xl:gap-4 w-[14.28%] xl:gap-1 xl:text-[14px] 2xl:text-[1rem]  ">
//               <img
//                 className="max-w-6 max-h-6 cursor-pointer"
//                 src={sort}
//                 alt=""
//               />
//               <p className="text-start text-textGray">
//                 {t("homeBoxes.course")}

//               </p>
//             </div>
//             <p className="text-start text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("homepage.assistantNum")}
//             </p>
//             <p className="text-start text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.tD")}
//             </p>
//             <p className="text-start text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.end2")}
//             </p>
//             <p className="text-start text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.type")}
//             </p>
//             <p className="text-start text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.st")}
//             </p>
//           </div>
//         </div>

//         <div>
//           {data.length > 0 ?
//             visibleData2.map((item, i) => {
//               return (
//                 <div key={i} className="py-3 px-4 w-full  border-[#E1E1E1] border border-t-0 flex items-center justify-between">

//                   <p className="text-start font-semibold px-3 text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.title}
//                   </p>
//                   <p className="text-start font-semibold px-3 flex flex-col text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//                     <span className="text-[16px] font-bold text-mainColor">   {item?.courseData?.name}</span>
//                     <span className="text-[12px]"> {item?.courseData?.grade?.nameAr} </span>
//                   </p>

//                   <p className="text-start font-semibold px-3 text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {/* {item?.receiver.length > 2 ? `${item.receiver.length} مساعدين` : item.receiver == 0 ? "لا يوجد مساعدين" : `${item.receiver.length} مساعد`} */}

//                     {item.receiver.length !== undefined ? item.receiver.length >= 9 ? `${item.receiver.length} ${t("homepage.assistants")}` : item.receiver.length == 0 ? t("homepage.no") : `${item.receiver.length} ${t("homepage.assistant")}` : t("homepage.no")}
//                   </p>

//                   <p className="text-start font-semibold px-3 text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.createdAt.split("").slice(0, -14).join("")}
//                   </p>

//                   <p className="text-start font-semibold px-3 text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.deadline.split("").slice(0, -14).join("")}
//                   </p>

//                   <p className="text-start font-semibold px-3 text-textGray w-[14.28%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.type}
//                   </p>

//                   <div className="w-[14.28%] flex">
//                     <p className={`${!item.done ? "text-[#409261]" : "text-[#3F3748]"} ${!item.done ? "bg-[#E9FFEF]" : "bg-[#E4E4E4]"} py-1 px-3 text-[12px]  rounded-[180px]   xl:text-[14px] 2xl:text-[1rem] text-start font-semibold  `}>
//                       {!item.done ? t("task.ac") : t("task.done")}
//                       <span className="w-1 h-1 rounded-full bg-red-50"></span>
//                     </p>
//                   </div>

//                 </div>
//               )
//             }) : <p className="font-bold text-mainColor text-[18px] p-3 ">{t("homepage.noTasks")}</p>

//           }
//         </div>
//         {data.length > 0 && (
//           <Pagination
//             totalItems={data.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />

//         )}
//       </div>
//       {/* uncomment this part if you have the data then loop in it to display the data*/}
//       <div className="flex flex-col rounded-2xl gap-5 xl:hidden">
//         {data.length > 0 ?
//           visibleData2.map((item, i) => {
//             return (
//               <div key={i}>
//                 <Disclosure >
//                   {({ open }) => (
//                     <>
//                       <Disclosure.Button
//                         className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                           }`}
//                       >
//                         <div className="flex text-start gap-2 items-center">

//                           <h4 className="font-bold text-mainColor text-[20px] ">  {item?.title}  </h4>
//                         </div>

//                         <div className="flex gap-x-3 items-center">
//                           <p className={`${!item?.done ? "text-[#409261]" : "text-[#3F3748]"} ${!item.done ? "bg-[#E9FFEF]" : "bg-[#E4E4E4]"} py-1 px-3 text-[12px] font-medium rounded-[180px]`}>{!item.done ? t("task.ac") : t("task.done")}</p>
//                           <span className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`} >
//                             <img src={open ? Down : left} alt="" />
//                           </span>
//                         </div>
//                       </Disclosure.Button>

//                       <Disclosure.Panel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                         <div className=" nameOfTeacher flex justify-between items-center w-full">

//                           <p className=" font-semibold text-base text-textGray text-center">
//                             {t("homeBoxes.course")}
//                           </p>

//                           <p className="font-semibold text-base text-textGray text-center">
//                             {item?.courseData?.name}
//                           </p>

//                         </div>

//                         <div className="numberOFStudents flex justify-between items-center w-full">
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {t("coursesTable.term")}
//                           </p>
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {item?.courseData?.grade?.nameAr}
//                           </p>
//                         </div>
//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {t("homepage.assistantNum")}
//                           </p>
//                           <p className="font-semibold text-base text-textGray text-center">

//                             {item.receiver.length !== undefined ? item.receiver.length >= 9 ? `${item.receiver.length} ${t("homepage.assistants")}` : item.receiver.length == 0 ? t("homepage.no") : `${item.receiver.length} ${t("homepage.assistant")}` : t("homepage.no")}
//                           </p>
//                         </div>

//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {t("task.tD")}
//                           </p>
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {item?.createdAt.split("").slice(0, -14).join("")}
//                           </p>
//                         </div>
//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {t("task.end2")}
//                           </p>
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {item?.deadline.split("").slice(0, -14).join("")}
//                           </p>
//                         </div>
//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {t("task.st")}
//                           </p>
//                           <p className="font-semibold text-base text-textGray text-center">
//                             {item?.type}
//                           </p>
//                         </div>

//                       </Disclosure.Panel>

//                     </>
//                   )}
//                 </Disclosure>
//               </div>
//             )
//           }) : <p className="font-bold text-mainColor text-[18px] p-3 ">{t("homepage.noTasks")}</p>
//         }

//         {data.length > 0 && (
//           <Pagination
//             totalItems={data.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
