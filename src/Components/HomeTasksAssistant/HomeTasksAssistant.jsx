// import React, { useContext, useEffect } from "react";
// import search from "../../Assets/sanadIcons/search.png";
// import sort from "../../Assets/sanadIcons/newer.png";
// import { useTranslation } from "react-i18next";
// import { useState } from "react";
// import { ApisContext } from "../../Context/ApisContext";
// import { Disclosure } from "@headlessui/react";
// import { Link } from "react-router-dom";
// import left from "../../Assets/Icons/Arrow/Arrow 2/iconleft.png";
// import Down from "../../Assets/down.png";
// import filterIcon from "../../Assets/exams/filterpng.png"
// import UseToggle from "../../CustomHooks/UseToggle/UseToggle";
// import Pagination from "../Pagination/Pagination";
// import axios from "axios";
// import { MainContext } from "../../Context/MainContext";

// export default function HomeTasksAssistant() {


//     const [t] = useTranslation();
//     const date = new Date()
//     const { TeacherAsssistants, Tasks,
//         TasksActive,
//         BASUE__URL,
//         TasksDone, headers } = useContext(ApisContext)
//     const { ErorrMessage } = useContext(MainContext)


//     const [ToggleMenu, setToggleMenu] = UseToggle(false)
//     const [activeFilter, setactiveFilter] = useState("منتهية")



//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };



//     // Calculate the start and end indexes for the current page

//     const startIndex = (currentPage - 1) * itemsPerPage;

//     const endIndex = TasksActive.length > 0 && Math.min(startIndex + itemsPerPage, TasksActive.length)

//     const visibleData2 = TasksActive.length > 0 && TasksActive.slice(startIndex, endIndex)


//     return (
//         <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 gap-6">
//             <div className="flex justify-between items-center">

//                 <div className="header flex flex-col gap-3">
//                     <p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
//                         {t("homepage.tasksLog")}
//                     </p>
//                     <p className="font-semibold text-xl text-textGray xl:hidden">


//                         {TasksActive.length !== undefined ? TasksActive.length >= 9 ? `${TasksActive.length} ${t("homepage.task")}` : TasksActive.length == 0 ? t("homepage.noTasks") : `${TasksActive.length} ${t("homepage.task")}` : t("homepage.noTasks")}
//                     </p>

//                 </div>




//             </div>
//             <div className="hidden xl:table">
//                 <div className="bg-[#F4F7FE]">
//                     <div className="p-6 border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none flex justify-between">
//                         <p className="text-start text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                             {t("task.tN")}
//                         </p>
//                         <div className="flex 2xl:gap-4 w-[20%] xl:gap-1 xl:text-[14px] 2xl:text-[1rem]  ">
//                             <img
//                                 className="max-w-6 max-h-6 cursor-pointer"
//                                 src={sort}
//                                 alt=""
//                             />
//                             <p className="text-start text-textGray">
//                                 {t("homeBoxes.course")}

//                             </p>
//                         </div>
//                         <p className="text-start text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                             {t("task.by")}
//                         </p>
//                         <p className="text-start text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                             {t("task.tD")}
//                         </p>

//                         <p className="text-start text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                             {t("task.type")}
//                         </p>

//                     </div>
//                 </div>

//                 <div>
//                     {TasksActive.length > 0 ?
//                         visibleData2.map((item, i) => {
//                             return (
//                                 <div key={i} className="py-3 px-4 w-full relative  border-[#E1E1E1] border border-t-0 flex items-center justify-between">

//                                     <p className="text-start font-semibold px-3 text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                                         {item?.title}
//                                     </p>
//                                     <p className="text-start font-semibold px-3 flex flex-col text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                                         <span className="text-[16px] font-bold text-mainColor">   {item?.courseData?.name}</span>
//                                         <span className="text-[12px]"> {item?.courseData?.grade?.nameAr} </span>
//                                     </p>

//                                     <p className="text-start font-semibold px-3 text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                                         {item?.createdBy?.name}
//                                     </p>

//                                     <p className="text-start font-semibold px-3 text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                                         {item?.deadline.split("").slice(0, -14).join("")}
//                                     </p>


//                                     <p className="text-start font-semibold px-3 text-textGray w-[20%] xl:text-[14px] 2xl:text-[1rem] ">
//                                         {item?.type}
//                                     </p>

//                                     {/* <div className="w-[14.28%] flex">
//                                         <p className={`${!item.done ? "text-[#409261]" : "text-[#3F3748]"} ${!item.done ? "bg-[#E9FFEF]" : "bg-[#E4E4E4]"} py-1 px-3 text-[12px]  rounded-[180px]   xl:text-[14px] 2xl:text-[1rem] text-start font-semibold  `}>
//                                             {!item?.done ? "نشط" : "منتهية"}
//                                             <span className="w-1 h-1 rounded-full bg-red-50"></span>
//                                         </p>
//                                     </div> */}

//                                     <input
//                                         className="outline-mainColor absolute left-6 focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg cursor-pointer text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none w-[24px] h-[24px]"
//                                         id="check"
//                                         type="checkbox"
//                                         // checked={ }
//                                         onChange={async (e) => {
//                                             if (e.target.checked === true) {
//                                                 return await axios.put(`${BASUE__URL}/todo/complete-task/${item._id}`, {}, { headers: headers }).then((res) => {
//                                                     if (res.status === 200 || res.status === 201 || res.data.status === "success") {
//                                                         ErorrMessage("You add Task To the Archief  , Succussfulley", "#023E8AB2", 3000)
//                                                     }
//                                                 }).catch((error) => {
//                                                     console.log(error);
//                                                 })
//                                             } else if (e.target.checked === false) {
//                                                 return await axios.put(`${BASUE__URL}/todo/notcomplete-task/${item._id}`, {}, { headers: headers }).then((res) => {
//                                                     if (res.status === 200 || res.status === 201 || res.data.status === "success") {
//                                                         ErorrMessage("You pull This Task from archief", "#023E8AB2", 3000)
//                                                     }
//                                                 }).catch((error) => {
//                                                     console.log(error);
//                                                 })
//                                             }
//                                         }}
//                                     />


//                                 </div>
//                             )
//                         }) : <p className="font-bold text-mainColor text-[18px] p-3 ">{t("homepage.noTasks")}</p>

//                     }
//                 </div>

//                 {TasksActive.length > 0 && (
//                     <Pagination
//                         totalItems={TasksActive.length}
//                         itemsPerPage={itemsPerPage}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />
//                 )}

//             </div>
//             {/* uncomment this part if you have the data then loop in it to display the data*/}
//             <div className="flex flex-col rounded-2xl gap-5 xl:hidden">
//                 {TasksActive.length > 0 ?
//                     visibleData2.map((item, i) => {
//                         return (
//                             <div key={i}>
//                                 <Disclosure >
//                                     {({ open }) => (
//                                         <>
//                                             <Disclosure.Button
//                                                 className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                                                     }`}
//                                             >
//                                                 <div className="flex text-start gap-2 items-center">


//                                                     <input
//                                                         className="outline-mainColor  focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg cursor-pointer text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none w-[26px] h-[26px]"
//                                                         id="check"
//                                                         type="checkbox"
//                                                         // checked={ }
//                                                         onChange={async (e) => {
//                                                             if (e.target.checked === true) {
//                                                                 return await axios.put(`${BASUE__URL}/todo/complete-task/${item._id}`, {}, { headers: headers }).then((res) => {
//                                                                     if (res.status === 200 || res.status === 201 || res.data.status === "success") {
//                                                                         ErorrMessage("You add Task To the Archief  , Succussfulley", "#023E8AB2", 3000)
//                                                                     }
//                                                                 }).catch((error) => {
//                                                                     console.log(error);
//                                                                 })
//                                                             } else if (e.target.checked === false) {
//                                                                 return await axios.put(`${BASUE__URL}/todo/notcomplete-task/${item._id}`, {}, { headers: headers }).then((res) => {
//                                                                     if (res.status === 200 || res.status === 201 || res.data.status === "success") {
//                                                                         ErorrMessage("Task is Done , Succussfulley", "#023E8AB2", 3000)
//                                                                     }
//                                                                 }).catch((error) => {
//                                                                     console.log(error);
//                                                                 })
//                                                             }
//                                                         }}
//                                                     />

//                                                     <h4 className="font-bold text-mainColor text-[20px] ">  {item?.title}  </h4>
//                                                 </div>

//                                                 <div className="flex gap-x-3 items-center">

//                                                     <span className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`} >
//                                                         <img src={open ? Down : left} alt="" />
//                                                     </span>

//                                                 </div>
//                                             </Disclosure.Button>

//                                             <Disclosure.Panel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                                                 <div className=" nameOfTeacher flex justify-between items-center w-full">

//                                                     <p className=" font-semibold text-base text-textGray text-center">
//                                                         {t("homeBoxes.course")}
//                                                     </p>

//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {item?.courseData?.name}
//                                                     </p>

//                                                 </div>

//                                                 <div className="numberOFStudents flex justify-between items-center w-full">
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {t("coursesTable.term")}
//                                                     </p>
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {item?.courseData?.grade?.nameAr}
//                                                     </p>
//                                                 </div>
//                                                 <div className="numOfGroups flex justify-between items-center w-full">
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {t("task.by")}
//                                                     </p>
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {item?.createdBy?.name}
//                                                     </p>
//                                                 </div>

//                                                 <div className="numOfGroups flex justify-between items-center w-full">
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {t("task.end2")}
//                                                     </p>
//                                                     <p className="font-semibold text-base text-mainColor text-center">
//                                                         {item?.deadline.split("").slice(0, -14).join("")}
//                                                     </p>
//                                                 </div>
//                                                 <div className="numOfGroups flex justify-between items-center w-full">
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {t("task.type")}
//                                                     </p>
//                                                     <p className="font-semibold text-base text-textGray text-center">
//                                                         {item?.type}
//                                                     </p>
//                                                 </div>


//                                             </Disclosure.Panel>

//                                         </>
//                                     )}
//                                 </Disclosure>
//                             </div>
//                         )
//                     }) : <p className="font-bold text-mainColor text-[18px] p-3 ">{t("homepage.noTasks")}</p>
//                 }

//                 {TasksActive.length > 0 && (
//                     <Pagination
//                         totalItems={TasksActive.length}
//                         itemsPerPage={itemsPerPage}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />
//                 )}
//             </div>
//         </div>
//     )
// }
