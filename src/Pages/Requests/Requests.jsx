// import React, { useContext, useEffect, useState, useMemo } from "react";
// import SearchIcon from "../../Assets/sanadSVG/Search Icon.svg";
// import { useTranslation } from "react-i18next";
// import { MainContext } from "../../Context/MainContext";
// import { ApisContext } from "../../Context/ApisContext";
// import Post from "../../Components/Skeletons/Post";
// import { ReactSVG } from 'react-svg'
// import avatar from '../../Assets/sanadSVG/imgUser.svg'
// // import PaginationQuery from "../Hooks/PaginationQuery";
// import { Listbox, Disclosure, ListboxButton, ListboxOptions, ListboxOption, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import downarrow from "../../Assets/sanadSVG/downArrow.svg"
// import { SvgsContext } from "../../Context/SvgsContext";
// import filterIcon from '../../Assets/sanadSVG/filterIcon.svg'
// import { Helmet } from "react-helmet";
// import CourseImage from "../../Components/CourseImage/CourseImage";



// export default function Requests() {
//     let [t, i18n] = useTranslation();
//     const isToggled = JSON.parse(sessionStorage.getItem("toggleNotify"))





//     const { toggleNotifications, settoggleNotifications, handleUserName } = useContext(MainContext)
//     const { fetchNotifications, requestPage, setrequestPage, selectedTypeN, mainTypes, setselectedTypeN } = useContext(ApisContext)
//     // console.log(fetchNotifications.data)
//     const { leftArrow, smallCourseAvatar } = useContext(SvgsContext)








//     const itemsPerPage = 5;
//     const handlePageChange = (newPage) => {
//         setrequestPage(newPage);

//     };
//     const [totalItems, settotalItems] = useState(0)
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const handleClick = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages && newPage !== requestPage) {
//             handlePageChange(newPage);
//         }
//     };

//     const displayRange = 1;
//     const pagesToShow = [];
//     const startPage = Math.max(requestPage - displayRange, 1);
//     const endPage = Math.min(requestPage + displayRange, totalPages);

//     if (startPage > 2) {
//         pagesToShow.push(1);
//         if (startPage > 3) {
//             pagesToShow.push("...");
//         }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//         pagesToShow.push(i);
//     }

//     if (endPage < totalPages - 1) {
//         if (endPage < totalPages - 2) {
//             pagesToShow.push("...");
//         }
//         pagesToShow.push(totalPages);
//     }



//     const filteredData = mainTypes.filter(item => {
//         return item?.status !== selectedTypeN.status
//     })



//     // console.log(requestPage, fetchNotifications.isFetching, fetchNotifications.fetchStatus)

//     useEffect(() => {
//         settotalItems(fetchNotifications?.data?.metadata?.totalDocs)
//         //    setrequestPage()

//     }, [fetchNotifications, requestPage])


//     useEffect(() => {
//         if (isToggled !== null) {
//             settoggleNotifications(isToggled)
//         } else {
//             settoggleNotifications(false)
//         }
//         return () => {
//             if (toggleNotifications) {
//                 sessionStorage.removeItem("toggleNotify");
//                 settoggleNotifications(false)
//             }
//         }
//     }, [toggleNotifications])








//     return (
//         <>

//             <Helmet>
//                 <title>Requests</title>
//                 <meta name="description" content="Page description" />
//                 <link rel="canonical" href="http://example.com/my-page" />

//             </Helmet>
//             <main className="flex flex-col gap-10">
//                 <header className="flex flex-col lg:flex-row  gap-4 justify-between w-full pt-5">
//                     <h3 className=" text-center text-2xl md:text-start  sm:text-3xl  text-mainColor font-extrabold">
//                         {t("homepage.Notifications")}
//                     </h3>
//                     <div className="w-full  lg:w-[400px]">
//                         <Listbox
//                             value={selectedTypeN}
//                             onChange={(e) => {
//                                 setselectedTypeN(e)
//                                 setrequestPage(1)

//                             }} >
//                             {({ open, selected }) => (
//                                 <div className="relative mt-1">

//                                     <ListboxButton className={`font-semibold      text-mainColor  py-3 px-2 text-sm
//                       relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm `}>

//                                         <span className="absolute top-[50%] translate-y-[-50%] end-4">
//                                             {open ? <ReactSVG src={downarrow} /> : leftArrow()}
//                                         </span>

//                                         <div className="flex items-center gap-x-4">

//                                             <span>
//                                                 <ReactSVG src={filterIcon} />
//                                             </span>
//                                             <span className={`block truncate text-size_12 sm:text-base`}>
//                                                 {selectedTypeN?.name}
//                                             </span>
//                                         </div>


//                                     </ListboxButton>


//                                     <ListboxOptions className="absolute  mt-14   max-h-40 z-10
//                        w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm ">

//                                         {filteredData && filteredData.map((person, personIdx) => (

//                                             <ListboxOption
//                                                 key={personIdx}
//                                                 className={({ active }) =>
//                                                     ` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor text-size_12 sm:text-sm  '}`}
//                                                 value={person} >
//                                                 {({ selectedTypeN, selected }) => (
//                                                     <span className={`block truncate text-size_12 sm:text-sm   ${selectedTypeN ? 'font-medium' : 'font-normal'}`}>
//                                                         {person?.name}
//                                                     </span>



//                                                 )}
//                                             </ListboxOption>
//                                         ))}
//                                     </ListboxOptions>

//                                 </div>
//                             )
//                             }
//                         </Listbox>
//                     </div>


//                 </header>



//                 <section className=" w-full gap-6 hidden lg:flex">
//                     <div className="w-full  rounded-2xl     flex flex-col gap-4 ">

//                         {!fetchNotifications?.isFetched ? Array.from({ length: 5 }).map((item, i) =>
//                             <div className=" bg-white shadow p-4 rounded-2xl " key={i}><Post /></div>)
//                             : (
//                                 <>
//                                     {
//                                         fetchNotifications.data?.data.length > 0 ?
//                                             fetchNotifications.data?.data?.map((item, i) => {
//                                                 return (
//                                                     <div key={item?._id} className="box bg-white group hover:scale-[1.02] hover:bg-mainColor transition-all shadow flex items-center flex-col md:flex-row justify-between  p-4 rounded-2xl gap-5">

//                                                         <div className="imageData text flex items-center gap-x-2 w-1/4">

//                                                             {/* <ReactSVG src={avatar} /> */}
//                                                             {/* {smallCourseAvatar()} */}
//                                                             <CourseImage courseName={item?.tutorCourse?.courseData?.name} w={24} h={24} />

//                                                             <div>
//                                                                 <h4 className="text-mainColor font-bold text-sm group-hover:text-white">
//                                                                     {item?.tutorCourse?.courseData?.name}
//                                                                 </h4>
//                                                                 <p className="font-semibold text-textColor__2 text-xs sm:text-sm leading-snug group-hover:text-white">
//                                                                     {item?.tutorCourse?.courseData?.code}                                                       </p>
//                                                             </div>

//                                                         </div>

//                                                         <div className="center text   w-1/4">



//                                                             <h4 className="text-mainColor font-bold text-sm group-hover:text-white">
//                                                                 {handleUserName(item?.center?.name, 3)}

//                                                             </h4>
//                                                             <p className="font-semibold text-textColor__2 text-xs sm:text-sm leading-snug group-hover:text-white">
//                                                                 {item?.center?.code}                                                       </p>


//                                                         </div>




//                                                         <p className="text-sm w-1/4 group-hover:text-white ">{i18n.language === "ar" ? `${t("SingleCourse.gradeLevel")} ${item?.tutorCourse?.courseData?.grade?.nameAr}` : i18n.language === "en" ? `${t("SingleCourse.gradeLevel")} ${item?.tutorCourse?.courseData?.grade?.nameEn}` : null}

//                                                         </p>




//                                                         <div className="w-1/4 flex items-center  gap-x-8 2xl:gap-x-12 ">
//                                                             <p className={`${item?.status === "pending" ? "bg-orange-300 text-orange-100" : item?.status === "rejected" ? "bg-red-50 text-err" : item?.status === "accepted" && "bg-lime-100 text-green"} text-xs sm:text-sm px-2 py-1 rounded-lg `}>
//                                                                 {item?.status === selectedTypeN.status ? selectedTypeN.name : null}
//                                                             </p>

//                                                             {item?.tutorCourse?.year ? <p className={`bg-secondMainColor  text-white text-xs sm:text-sm px-2 py-1 rounded-lg`}>
//                                                                 {item?.tutorCourse?.year}
//                                                             </p> : null}


//                                                         </div>






//                                                     </div>
//                                                 )
//                                             }) : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white ">{t("homepage.nothing")}</p>}



//                                     {fetchNotifications.data?.data?.length > 0 &&
//                                         <div className="flex items-center justify-center gap-y-4">
//                                             {fetchNotifications?.data?.data?.length > 0 &&
//                                                 <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
//                                                     <button
//                                                         onClick={() => handleClick(requestPage - 1)}
//                                                         // onClick={() => setrequestPage((old) => {
//                                                         //     Math.max(old - 1, 1)
//                                                         // })}
//                                                         className={`${requestPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                                                             } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                                                         disabled={requestPage === 1}
//                                                     >
//                                                         &lt;
//                                                     </button>

//                                                     {pagesToShow.map((page, index) => (
//                                                         <button
//                                                             key={index}
//                                                             onClick={() => {
//                                                                 if (typeof page === "number") {
//                                                                     handleClick(page);
//                                                                 }
//                                                             }}
//                                                             className={`${typeof page === "number"
//                                                                 ? requestPage === page
//                                                                     ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                                                                     : "bg-transparent text-[#293241] hover:bg-slate-100"
//                                                                 : "text-[#293241]"
//                                                                 } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                                                         >
//                                                             {page}
//                                                         </button>
//                                                     ))}
//                                                     <button
//                                                         onClick={() => handleClick(requestPage + 1)}
//                                                         className={`${requestPage === totalPages
//                                                             ? "opacity-50 cursor-not-allowed"
//                                                             : "cursor-pointer"
//                                                             }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                                                         disabled={requestPage === totalPages || fetchNotifications.isPlaceholderData}

//                                                     >
//                                                         &gt;
//                                                     </button>
//                                                 </div>
//                                             }
//                                         </div>}
//                                 </>
//                             )
//                         }




//                     </div>

//                 </section>
//                 {/* small design */}
//                 <div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
//                     {!fetchNotifications?.isFetched ? Array.from({ length: 5 }).map((item, i) =>
//                         <div className=" bg-white shadow p-4 rounded-2xl " key={i}><Post /></div>)
//                         : (
//                             <>
//                                 {fetchNotifications.data?.data?.length > 0 ? fetchNotifications.data?.data?.map((item, i) => {
//                                     return (
//                                         <Disclosure key={item?._id}>
//                                             {({ open }) => (
//                                                 <div>
//                                                     <DisclosureButton
//                                                         className={`py-4 px-5 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                                                             }`}
//                                                     >

//                                                         <div className="flex items-center  gap-x-2">

//                                                             {/* <ReactSVG src={avatar} /> */}
//                                                             <CourseImage courseName={item?.tutorCourse?.courseData?.name} w={22} h={22} />
//                                                             <div className="flex flex-col items-start">
//                                                                 <p className="font-bold text-mainColor text-xs sm:text-base  text-start   text-nowrap gap-x-2 ">
//                                                                     {item?.tutorCourse?.courseData?.name}

//                                                                 </p>
//                                                                 <p className="font-bold text-textGray text-size_12 sm:text-sm ">
//                                                                     {/* {i18n.language === "ar" ? `${t("SingleCourse.gradeLevel")} ${item?.tutorCourse?.courseData?.grade?.nameAr}` : `${t("SingleCourse.gradeLevel")} ${item?.tutorCourse?.courseData?.grade?.nameEn}`} */}

//                                                                     {item?.tutorCourse?.courseData?.code}
//                                                                 </p>
//                                                             </div>

//                                                         </div>

//                                                         <div className="flex items-center gap-x-4">
//                                                             <p className={`${item?.status === "pending" ? "bg-orange-300 text-orange-100" : item?.status === "rejected" ? "bg-red-50 text-err" : item?.status === "accepted" && "bg-lime-100 text-green"} text-xs sm:text-sm px-2 py-1 rounded-lg`}>
//                                                                 {item?.status === selectedTypeN.status ? selectedTypeN.name : null}
//                                                             </p>
//                                                             {open ? <ReactSVG src={downarrow} /> : leftArrow()}
//                                                         </div>

//                                                     </DisclosureButton>
//                                                     <DisclosurePanel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">

//                                                         <div className="flex justify-between items-center w-full">
//                                                             <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
//                                                                 {t("SingleCourse.gradeLevel")}

//                                                             </p>
//                                                             <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
//                                                                 {i18n.language === "ar" ? `${t("SingleCourse.gradeLevel")} ${item?.tutorCourse?.courseData?.grade?.nameAr}` : `${t("SingleCourse.gradeLevel")} ${item?.tutorCourse?.courseData?.grade?.nameEn}`}
//                                                             </p>
//                                                         </div>

//                                                         <div className="buttons w-full flex items-center justify-between ">

//                                                             <p className="font-semibold text-sm text-textGray   ">{t("homepage.courseName")}</p>

//                                                             <p className="font-semibold text-sm text-mainColor">{item?.center?.name}</p>


//                                                         </div>
//                                                         <div className="buttons w-full flex items-center justify-between ">

//                                                             <p className="font-semibold text-sm text-textGray   ">{t("homepage.centerCode")}</p>

//                                                             <p className="font-semibold text-sm text-mainColor">{item?.center?.code}</p>


//                                                         </div>


//                                                     </DisclosurePanel>
//                                                 </div>
//                                             )}
//                                         </Disclosure>
//                                     )
//                                 }) : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white xl:bg-transparent">{t("homepage.nothing")}</p>}
//                                 {fetchNotifications.data?.data?.length > 0 &&
//                                     <div className="flex items-center justify-center gap-y-4">
//                                         {fetchNotifications?.data?.data?.length > 0 &&
//                                             <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
//                                                 <button
//                                                     onClick={() => handleClick(requestPage - 1)}
//                                                     // onClick={() => setrequestPage((old) => {
//                                                     //     Math.max(old - 1, 1)
//                                                     // })}
//                                                     className={`${requestPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                                                         } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                                                     disabled={requestPage === 1}
//                                                 >
//                                                     &lt;
//                                                 </button>

//                                                 {pagesToShow.map((page, index) => (
//                                                     <button
//                                                         key={index}
//                                                         onClick={() => {
//                                                             if (typeof page === "number") {
//                                                                 handleClick(page);
//                                                             }
//                                                         }}
//                                                         className={`${typeof page === "number"
//                                                             ? requestPage === page
//                                                                 ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                                                                 : "bg-transparent text-[#293241] hover:bg-slate-100"
//                                                             : "text-[#293241]"
//                                                             } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                                                     >
//                                                         {page}
//                                                     </button>
//                                                 ))}
//                                                 <button
//                                                     onClick={() => handleClick(requestPage + 1)}
//                                                     className={`${requestPage === totalPages
//                                                         ? "opacity-50 cursor-not-allowed"
//                                                         : "cursor-pointer"
//                                                         }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                                                     disabled={requestPage === totalPages || fetchNotifications.isPlaceholderData}

//                                                 >
//                                                     &gt;
//                                                 </button>
//                                             </div>}
//                                     </div>}
//                             </>
//                         )
//                     }





//                 </div>


//             </main>
//         </>
//     );


// }
