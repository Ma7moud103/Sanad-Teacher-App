// import React, { useContext, useState } from "react";
// import DetailsInLargeScreen from "../../DetailsInLargeScreen/DetailsInLargeScreen";
// import DetailsInSmallScreen from "../../DetailsInSmallScreen/DetailsInSmallScreen";
// import search from "../../../Assets/sanadIcons/search.png";
// import sort from "../../../Assets/sanadIcons/newer.png";
// import icon from "../../../Assets/Icons/Dark/Vector.png";
// import icon1 from "../../../Assets/Icons/Dark/Vector1.png";
// import { useTranslation } from "react-i18next";
// import Pagination from "../../Pagination/Pagination";
// import { ApisContext } from "../../../Context/ApisContext";
// import { Disclosure } from "@headlessui/react";
// import left from "../../../Assets/Icons/Arrow/Arrow 2/iconleft.png";
// import Down from "../../../Assets/down.png";
// import UseToggle from "../../../CustomHooks/UseToggle/UseToggle";
// import filterIcon from "../../../Assets/exams/filterpng.png"


// export default function TaskArchiveTable() {

//   const { AssistantTasks, TeacherAsssistants, ArchiefTasks, getAllTasksDone, Tasks, TasksDone, TasksActive } = useContext(ApisContext)
//   const [t] = useTranslation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   const [ToggleMenu, setToggleMenu] = UseToggle(false)
//   const [activeFilter, setactiveFilter] = useState("normal")


//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };



//   // Calculate the start and end indexes for the current page

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const endIndex = TasksDone.length > 0 && Math.min(startIndex + itemsPerPage, TasksDone.length)

//   const visibleData2 = TasksDone.length > 0 && TasksDone.slice(startIndex, endIndex)






//   return (
//     <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 gap-6">

//       <div className=" header flex justify-between items-center">

//         <div className="heaaderSmall  flex flex-col gap-3">
//           <p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
//             {t("TAssistants.archiveTasks")}
//           </p>
//           {/* <p className="font-semibold text-xl text-textGray xl:hidden">
//             {t("TAssistants.noTasks")}
//           </p> */}
//           <p className="font-semibold text-size_18 sm:text-size__20  text-textGray xl:hidden">
//             {TasksDone.length !== undefined ? TasksDone.length >= 9 ? `${TasksDone.length} ${t("homepage.task")}` : TasksDone.length == 0 ? t("homepage.noTasks") : `${TasksDone.length} ${t("homepage.task")}` : t("homepage.noTasks")}
//           </p>
//         </div>
//         {/* drop down here */}
//         {/* <div className="filters hidden xl:flex w-[50%] gap-x-6 justify-end">




//           <div className="byStatus relative  w-[160px] cursor-pointer 2xl:w-[170px] bg-bgLight py-[10px] rounded-2xl px-3 text-mainColor  md:text-[16px] font-semibold flex items-center justify-between "
//             onClick={() => setToggleMenu()}
//           >
//             <div className="icon flex items-center gap-x-2">
//               <div className="w-[16px] flex items-center justify-center h-[16px]">
//                 <img src={filterIcon} alt="" />
//               </div>
//               <h6 className="text-[12px] xl:text-[14px]">{activeFilter}</h6>
//             </div>

//             <div className="downArrow w-[17px] h-[17px] flex items-center justify-center">
//               <img src={Down} alt="" />
//             </div>
//             <div className={`absolute ${ToggleMenu ? "block" : "hidden"} top-[110%] w-full left-0 bg-inherit rounded-xl p-1 z-10`}>
//               <ul className="flex flex-col gap-y-3 px-4 ">
//                 <li
//                   onClick={() => {
//                     setactiveFilter("normal")
//                     getAllTasksDone("type=normal")

//                   }}  >
//                   Normal
//                 </li>
//                 <li
//                   onClick={() => {
//                     setactiveFilter("seperated")
//                     getAllTasksDone("type=seperated")
//                   }}   >
//                   Seperated
//                 </li>

//               </ul>
//             </div>
//           </div>

//         </div> */}

//       </div>

//       <div className="hidden xl:table">

//         <div className="bg-[#F4F7FE]">
//           <div className="p-6 border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none flex justify-between">
//             <p className="text-start text-textGray w-[14.26%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.tN")}
//             </p>

//             <div className="flex 2xl:gap-4 w-[14.26%] xl:gap-1 xl:text-[14px] 2xl:text-[1rem]  ">
//               <img
//                 className="max-w-6 max-h-6 cursor-pointer"
//                 src={sort}
//                 alt=""
//               />
//               <p className="text-start text-textGray">
//                 {t("homeBoxes.course")}

//               </p>
//             </div>

//             <p className="text-start text-textGray w-[14.26%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.by")}

//             </p>
//             <p className="text-start text-textGray w-[14.26%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.end2")}
//             </p>
//             <p className="text-start text-textGray w-[14.26%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.type")}
//             </p>

//             <p className="text-start text-textGray w-[14.26%] xl:text-[14px] 2xl:text-[1rem] ">
//               {t("task.st")}
//             </p>
//           </div>
//         </div>

//         <div>
//           {TasksDone.length > 0 ?
//             visibleData2.map((item, i) => {
//               return (
//                 <div key={item._id} className="py-3 px-4 w-full  border-[#E1E1E1] border border-t-0 flex items-center justify-between">

//                   <p className="text-start font-semibold px-3 text-textGray w-[16.6%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item.title}
//                   </p>

//                   <p className="text-start font-semibold flex flex-col px-3 text-textGray w-[16.6%] xl:text-[14px] 2xl:text-[1rem] ">
//                     <span className="text-mainColor font-bold">   {item?.courseData?.name}</span>
//                     <span className="text-[12px]">   {item?.courseData?.grade?.nameAr}</span>
//                   </p>

//                   <p className="text-start font-semibold px-3 text-textGray w-[16.6%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.createdBy?.name}
//                   </p>
//                   <p className="text-start font-semibold px-3 text-textGray w-[16.6%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.deadline.split("").slice(0, -14).join("")}
//                   </p>

//                   <p className="text-start font-semibold px-3 text-textGray w-[16.6%] xl:text-[14px] 2xl:text-[1rem] ">
//                     {item?.type}
//                   </p>
//                   <div className="w-[16.6%] flex">
//                     <p className={`${!item.done ? "text-[#409261]" : "text-[#3F3748]"} ${!item.done ? "bg-[#E9FFEF]" : "bg-[#E4E4E4]"} py-1 px-3 text-[12px]  rounded-[180px]   xl:text-[14px] 2xl:text-[1rem] text-start font-semibold  `}>
//                       {!item.done ? t("task.ac") : t("task.done")}
//                       <span className="w-1 h-1 rounded-full bg-red-50"></span>
//                     </p>
//                   </div>

//                 </div>
//               )
//             }) :
//             <p className="font-bold text-mainColor text-[18px] p-3 ">{t("homepage.noTasks")}</p>

//           }

//         </div>
//         {TasksDone.length > 0 && (
//           <Pagination
//             totalItems={TasksDone.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         )}

//       </div>
//       {/* uncomment this part if you have the data then loop in it to display the data*/}
//       <div className="flex flex-col rounded-2xl gap-5 xl:hidden">
//         {TasksDone.length > 0 ?
//           visibleData2.map((item, i) => {
//             return (
//               <div key={item?._id}>
//                 <Disclosure >
//                   {({ open }) => (
//                     <>
//                       <Disclosure.Button
//                         className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                           }`}
//                       >
//                         <div className="flex text-start gap-2 items-center">

//                           <h4 className="font-bold text-mainColor text-size_12 sm:text-size__14 ">  {item.title}  </h4>
//                         </div>

//                         <div className="flex gap-x-2 sm:gap-x-3  items-center">
//                           <p className={`${!item.done ? "text-[#409261]" : "text-[#3F3748]"}  text-size_10 sm:text-size_12 ${!item.done ? "bg-[#E9FFEF]" : "bg-[#E4E4E4]"} py-1 px-2  font-medium rounded-[120px]`}>{!item.done ? t("task.ac") : t("task.done")}</p>
//                           <span className={`icon ${!open ? " w-2 h-2  sm:w-3 sm:h-3 " : " w-5 h-5  sm:w-7 sm:h-7"} flex items-center justify-center ltr:scale-x-[-1]`} >
//                             <img src={open ? Down : left} alt="" />
//                           </span>
//                         </div>
//                       </Disclosure.Button>

//                       <Disclosure.Panel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                         <div className=" nameOfTeacher flex justify-between items-center w-full">

//                           <p className=" font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {t("homeBoxes.course")}
//                           </p>

//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {item?.courseData.name}
//                           </p>

//                         </div>

//                         <div className="numberOFStudents flex justify-between items-center w-full">
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {t("coursesTable.term")}
//                           </p>
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {item?.courseData.grade.nameAr}
//                           </p>
//                         </div>
//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {t("task.by")}
//                           </p>
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {item?.createdBy.name}
//                           </p>
//                         </div>


//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {t("task.end2")}
//                           </p>
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-mainColor text-center">
//                             {item?.deadline.split("").slice(0, -14).join("")}
//                           </p>
//                         </div>
//                         <div className="numOfGroups flex justify-between items-center w-full">
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
//                             {t("task.type")}
//                           </p>
//                           <p className="font-semibold text-size_12 sm:text-size__14 md:text-base text-textGray text-center">
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

//         {TasksDone.length > 0 && (
//           <Pagination
//             totalItems={TasksDone.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />)}
//       </div>
//     </div>
//   );
// }
