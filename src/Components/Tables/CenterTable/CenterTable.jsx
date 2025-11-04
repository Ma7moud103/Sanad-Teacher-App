// import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// import search from "../../../Assets/sanadIcons/search.png";
// import sort from "../../../Assets/sanadIcons/newer.png";
// import icon from "../../../Assets/Vector (27).png";
// import left from "../../../Assets/Icons/Arrow/Arrow 2/iconleft.png"
// import avatar from "../../../Assets/Avatars.png";
// import Down from "../../../Assets/down.png";
// import { useTranslation } from "react-i18next";
// import Pagination from "../../Pagination/Pagination";
// import { MainContext } from "../../../Context/MainContext";
// import { Disclosure } from "@headlessui/react";
// import { Link } from "react-router-dom";
// import { ApisContext } from "../../../Context/ApisContext";
// import UseToggle from "../../../CustomHooks/UseToggle/UseToggle";


// export default function CoursesTable() {
//   const { Role, setRole } = useContext(MainContext)
//   const { AssistantCourses, TeacherCenters } = useContext(ApisContext)


//   // useEffect(() => {
//   //   setRole(4)
//   // }, [])

//   const [searchInput, setsearchInput] = UseToggle(false)
//   const inputSearchSmall = useRef()
//   const inputSearchBig = useRef()
//   let [inputSearch, setinputSearch] = useState("")

//   const [t] = useTranslation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };



//   const filteration = useMemo(() => {

//     let filter = TeacherCenters.length > 0 && Role == 3 && TeacherCenters.filter((item) => {
//       return item?.center?.name.toLowerCase().includes(inputSearch.toLowerCase())
//     })

//     return filter


//   }, [inputSearch])

//   // Calculate the start and end indexes for the current page

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const endIndex = TeacherCenters.length > 0 && Role == 3 && inputSearch === "" ? Math.min(startIndex + itemsPerPage, TeacherCenters.length) : filteration.length > 0 && Role == 3 && inputSearch !== "" && Math.min(startIndex + itemsPerPage, filteration.length)

//   const visibleData2 = TeacherCenters.length > 0 && Role == 3 && inputSearch === "" ? TeacherCenters.slice(startIndex, endIndex) : filteration.length > 0 && Role == 3 && inputSearch !== "" && filteration.slice(startIndex, endIndex)

//   // console.log(TeacherCenter);

//   return (
//     <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-6 gap-6">

//       <div className="header flex justify-between items-center">

//         <div className="headerSmallScreen flex flex-col gap-3">
//           <p className="font-extrabold text-4xl text-mainColor">
//             سجل السناتر
//           </p>

//           {Role == 3 && TeacherCenters.length > 0 ? <p className="font-semibold text-xl text-textGray xl:hidden">
//             {TeacherCenters.length} {t("homepage.courses")}
//           </p> : <p className="font-semibold text-xl text-textGray xl:hidden">
//             {t("homepage.noCourses")}
//           </p>}

//         </div>

//         <div className="headerLargescreen hidden cursor-pointer  h-12 w-80 bg-[#F4F7FE] rounded-full xl:flex justify-start p-6 items-center text-textColor__2 text-lg"
//           onClick={() => inputSearchBig.current.focus()} >
//           <img className="me-2" src={search} alt="searchIcon" />
//           <input
//             value={inputSearch}
//             ref={inputSearchBig}
//             onChange={(e) => {
//               setinputSearch(e.target.value)
//             }}
//             onFocus={(e) => {
//               e.target.style.boxShadow = "none"
//             }}
//             className={"bg-inherit w-full text-mainColor font-bold placeholder:font-normal   border-none rounded-sm"} type="search" />

//         </div>

//         <span
//           onClick={() => {
//             inputSearchSmall.current.focus()
//           }}
//           className="searchIconSmallScreen relative bg-white p-3 flex justify-center items-center rounded-xl xl:hidden cursor-pointer">
//           <img
//             onClick={setsearchInput}
//             className="w-7" src={search} alt="" />

//           <div className={`absolute ${!searchInput ? "hidden" : ""}  left-[120%] w-[300px] `}>
//             <input
//               ref={inputSearchSmall}
//               value={inputSearch}
//               onChange={e => {
//                 setinputSearch(e.target.value)
//               }}
//               placeholder="Search for Course"
//               className="w-full outline-none text-mainColor font-bold placeholder:font-normal   shadow-none focus:shadow-none focus:border-none py-3 rounded-xl border-none" type="search" />
//           </div>
//         </span>

//       </div>



//       <div className="largeScreen hidden xl:table">
//         <div className="bg-[#F4F7FE]">

//           <div className="p-6 border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none  flex ">



//             {Role == 3 && <>
//               <p className="text-start text-textGray w-[20%]">
//                 {" "}
//                 اسم السنتر
//               </p>

//               <div className="flex gap-4 w-[20%]">
//                 <img
//                   className="max-w-6 max-h-6 cursor-pointer"
//                   src={sort}
//                   alt=""
//                 />
//                 <p className="text-start text-textGray ">
//                   عدد الطلاب
//                 </p>
//               </div>

//               <p className="text-start text-textGray w-[20%]">
//                 عدد المجموعات
//               </p>

//               <p className="text-start text-textGray w-[20%]">
//                 {" "}
//                 عدد الكورسات
//               </p>

//               <p className="text-start text-textGray w-[20%]">
//                 {" "}
//                 عدد الأكواد
//               </p>


//             </>}



//           </div>

//         </div>

//         <div>


//           {Role == 3 && (
//             <>
//               {TeacherCenters.length > 0 && inputSearch === "" ?
//                 visibleData2.map((item, index) => (

//                   <Disclosure key={index}>
//                     {({ open }) => (
//                       <>

//                         <Disclosure.Button

//                           className="py-3 px-6 w-full relative border-[#E1E1E1] border  flex items-center justify-between">



//                           <p className="font-bold text-mainColor text-[26px] flex justify-start items-center gap-2 w-[20%]">
//                             {item?.center?.name}

//                           </p>

//                           <p className="font-semibold text-base text-textGray w-[20%] text-start ps-6">
//                             {item?.maxStudents} طالب
//                           </p>


//                           <p className="font-semibold text-base text-textGray w-[20%] text-start">
//                             {""} مجموعات
//                           </p>

//                           <p className="font-semibold text-base text-textGray w-[20%] text-start">
//                             {item?.course?.length} كورسات
//                           </p>

//                           <p className="font-semibold text-base text-textGray w-[20%] text-start">
//                             {""}  كود
//                           </p>


//                           <div className="flex justify-between items-center absolute left-6 text-start">

//                             <div
//                               className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
//                             >
//                               <img src={open ? Down : left} alt="" />
//                             </div>
//                           </div>
//                         </Disclosure.Button>

//                         {/* this is a header and it is static */}
//                         <Disclosure.Panel className=" py-3 px-4 w-full bg-[#F4F7FE] border-[#E1E1E1] border border-t-0 flex items-center justify-between">

//                           <p className="font-bold text-base text-textGray"> رقم المجموعة </p>

//                           <div className="flex justify-around w-[90%]">
//                             <p className="font-semibold text-base text-textGray w-1/6 text-center">
//                               عدد الطلاب
//                             </p>
//                             <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                               عدد الامتحانات
//                             </p>
//                             <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                               اسم الكورس
//                             </p>
//                             <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                               الميعاد
//                             </p>



//                           </div>
//                         </Disclosure.Panel>

//                         <Disclosure.Panel className="py-3 px-4 w-full bg-[#F4F7FE] border-[#E1E1E1] border border-t-0 flex items-center justify-between">
//                           <p className="font-bold text-base text-mainColor"> سيشن 01</p>
//                           <div className="flex justify-around w-[90%]">
//                             <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                               5 طلاب
//                             </p>
//                             <p className="  font-semibold text-base text-textGray bg-red-50 rounded-[120px] px-2 py-1 w-1/6 text-center">
//                               15 امتحان
//                             </p>
//                             <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                               سنتر 01
//                             </p>

//                           </div>
//                         </Disclosure.Panel>
//                       </>
//                     )}
//                   </Disclosure>
//                 ))
//                 :
//                 filteration.length > 0 && inputSearch !== "" ?
//                   filteration.map((item, index) => (

//                     <Disclosure key={index}>
//                       {({ open }) => (
//                         <>

//                           <Disclosure.Button

//                             className="py-3 px-6 w-full relative border-[#E1E1E1] border  flex items-center justify-between">



//                             <p className="font-bold text-mainColor text-[26px] flex justify-start items-center gap-2 w-[20%]">
//                               {item?.center?.name}

//                             </p>

//                             <p className="font-semibold text-base text-textGray w-[20%] text-start ps-6">
//                               {item?.maxStudents} طالب
//                             </p>


//                             <p className="font-semibold text-base text-textGray w-[20%] text-start">
//                               {""} مجموعات
//                             </p>

//                             <p className="font-semibold text-base text-textGray w-[20%] text-start">
//                               {item?.course?.length} كورسات
//                             </p>

//                             <p className="font-semibold text-base text-textGray w-[20%] text-start">
//                               {""}  كود
//                             </p>


//                             <div className="flex justify-between items-center absolute left-6 text-start">

//                               <div
//                                 className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
//                               >
//                                 <img src={open ? Down : left} alt="" />
//                               </div>
//                             </div>
//                           </Disclosure.Button>

//                           {/* this is a header and it is static */}
//                           <Disclosure.Panel className=" py-3 px-4 w-full bg-[#F4F7FE] border-[#E1E1E1] border border-t-0 flex items-center justify-between">

//                             <p className="font-bold text-base text-textGray"> رقم المجموعة </p>

//                             <div className="flex justify-around w-[90%]">
//                               <p className="font-semibold text-base text-textGray w-1/6 text-center">
//                                 عدد الطلاب
//                               </p>
//                               <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                                 عدد الامتحانات
//                               </p>
//                               <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                                 اسم الكورس
//                               </p>
//                               <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                                 الميعاد
//                               </p>



//                             </div>
//                           </Disclosure.Panel>

//                           <Disclosure.Panel className="py-3 px-4 w-full bg-[#F4F7FE] border-[#E1E1E1] border border-t-0 flex items-center justify-between">
//                             <p className="font-bold text-base text-mainColor"> سيشن 01</p>
//                             <div className="flex justify-around w-[90%]">
//                               <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                                 5 طلاب
//                               </p>
//                               <p className="  font-semibold text-base text-textGray bg-red-50 rounded-[120px] px-2 py-1 w-1/6 text-center">
//                                 15 امتحان
//                               </p>
//                               <p className="  font-semibold text-base text-textGray w-1/6 text-center">
//                                 سنتر 01
//                               </p>

//                             </div>
//                           </Disclosure.Panel>
//                         </>
//                       )}
//                     </Disclosure>


//                   ))
//                   :
//                   <p className="font-bold text-mainColor text-[18px] p-3 ">لا يوجد كورسات</p>
//               }
//             </>
//           )
//           }




//         </div>

//         {/* pagination */}

//         {Role == 3 && <>
//           {TeacherCenters.length > 0 && inputSearch === "" ?
//             <Pagination
//               totalItems={TeacherCenters.length}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//             />
//             :
//             filteration.length > 0 && inputSearch !== "" &&
//             <Pagination
//               totalItems={filteration.length}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//             />}
//         </>}


//       </div>

//       {/* uncomment this part if you have the data then loop in it to display the data*/}
//       <div className="smallScreen md:mt-2 flex flex-col rounded-2xl gap-5 xl:hidden">
//         {Role == 3 && (
//           <>
//             {TeacherCenters.length > 0 && inputSearch === "" ?
//               visibleData2
//                 .map((item, i) => (
//                   <div key={i}>
//                     <Disclosure>
//                       {({ open }) => (
//                         <>
//                           <Disclosure.Button
//                             className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                               }`}
//                           >
//                             <div className="flex text-start gap-2 items-center">
//                               <p className="text-[20px] text-mainColor font-bold"> {item?.center.name}</p>
//                             </div>
//                             <div
//                               className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
//                             >
//                               <img src={open ? Down : left} alt="" />
//                             </div>
//                           </Disclosure.Button>

//                           <Disclosure.Panel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                             <div className=" nameOfTeacher flex justify-between items-center w-full">

//                               <p className=" font-semibold text-base text-textGray text-center">
//                                 عدد الطلاب
//                               </p>

//                               <p className="font-semibold text-base text-textGray text-center">
//                                 {item?.maxStudents}
//                               </p>

//                             </div>

//                             <div className="numberOFStudents flex justify-between items-center w-full">
//                               <p className="font-semibold text-base text-textGray text-center">
//                                 عدد المجموعات
//                               </p>
//                               <p className="font-semibold text-base text-textGray text-center">
//                                 {""} مجموعات
//                               </p>
//                             </div>

//                             <div className="numOfCenters flex justify-between items-center w-full">
//                               <p className="font-semibold text-base text-textGray text-center">
//                                 عدد الكورسات
//                               </p>
//                               <p className="font-semibold text-base text-textGray text-center">
//                                 {""} كورسات
//                               </p>
//                             </div>
//                             <div className="numOfCenters flex justify-between items-center w-full">
//                               <p className="font-semibold text-base text-textGray text-center">
//                                 عدد الأكواد
//                               </p>
//                               <p className="font-semibold text-base text-textGray text-center">
//                                 {""}  كود
//                               </p>
//                             </div>
//                           </Disclosure.Panel>

//                         </>
//                       )}
//                     </Disclosure>
//                   </div>


//                 ))
//               :
//               filteration.length > 0 && inputSearch !== "" ?
//                 filteration
//                   .map((item, i) => (
//                     <div key={i}>
//                       <Disclosure>
//                         {({ open }) => (
//                           <>
//                             <Disclosure.Button
//                               className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                                 }`}
//                             >
//                               <div className="flex text-start gap-2 items-center">


//                                 <p className="text-base"> {item?.center.name}</p>


//                               </div>
//                               <div
//                                 className={`icon w-8 h-8 flex items-center justify-center ltr:scale-x-[-1]`}
//                               >
//                                 <img src={open ? Down : left} alt="" />
//                               </div>
//                             </Disclosure.Button>

//                             <Disclosure.Panel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                               <div className=" nameOfTeacher flex justify-between items-center w-full">

//                                 <p className=" font-semibold text-base text-textGray text-center">
//                                   عدد الطلاب
//                                 </p>

//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   {item?.maxStudents}
//                                 </p>

//                               </div>

//                               <div className="numberOFStudents flex justify-between items-center w-full">
//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   عدد المجموعات
//                                 </p>
//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   {""} مجموعات
//                                 </p>
//                               </div>

//                               <div className="numOfCenters flex justify-between items-center w-full">
//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   عدد الكورسات
//                                 </p>
//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   {""} كورسات
//                                 </p>
//                               </div>
//                               <div className="numOfCenters flex justify-between items-center w-full">
//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   عدد الأكواد
//                                 </p>
//                                 <p className="font-semibold text-base text-textGray text-center">
//                                   {""}  كود
//                                 </p>
//                               </div>
//                             </Disclosure.Panel>

//                           </>
//                         )}
//                       </Disclosure>
//                     </div>


//                   ))
//                 :
//                 <p className="font-bold text-mainColor text-[18px] p-3 ">لا يوجد كورسات</p>
//             }
//           </>
//         )
//         }

//         {Role == 3 && <>
//           {TeacherCenters.length > 0 && inputSearch === "" ?
//             <Pagination
//               totalItems={TeacherCenters.length}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//             />
//             :
//             filteration.length > 0 && inputSearch !== "" &&
//             <Pagination
//               totalItems={filteration.length}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//             />}
//         </>}

//       </div>
//     </div>);
// }

