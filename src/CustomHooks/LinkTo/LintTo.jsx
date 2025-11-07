
// import React, { useContext } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
// // import avatar from "../../Assets/Avatars.png";
// import { MainContext } from '../../Context/MainContext';


// export default function LintTo({ to, item, i }) {

//     let { t } = useTranslation()
//     let { Role } = useContext(MainContext)

//     // { _id, courseData: { name, image, grade: { nameAr } }, term, totalTAs, totalSessions, totalCenters, totalTopics }
//     return (
//         <Link to={to} key={i} className="py-3 cursor-pointer px-6 w-full border-[#E1E1E1] border  flex items-center justify-between">

//             {Role === "3" ?
//                 <>
//                     <div className="flex w-1/6 text-start gap-2 items-center">
//                         {/* <img className="max-w-12 max-h-12" src={avatar} alt="" /> */}
//                         <div className="flex flex-col">
//                             <p className="font-bold text-mainColor text-lg flex justify-start items-center gap-2">
//                                 {item?.courseData.name}
//                             </p>
//                             <p className="text-base"> {item?.courseData?.grade?.nameAr}</p>
//                         </div>
//                     </div>

//                     <p className="font-semibold text-base text-textGray w-1/6 text-start px-10">
//                         {item?.term == 1 && t("coursesTable.first")}
//                         {item?.term == 2 && t("coursesTable.second")}
//                         {item?.term == 3 && t("coursesTable.third")}
//                     </p>


//                     <p className="font-semibold text-base text-textGray w-1/6 text-start">
//                         {/* {item.totalTAs >= 9 ? `${item.totalTAs} مساعدين` : item.totalTAs == 0 ? "لا يوجد مساعدين" : `${item.totalTAs} مساعد`} */}


//                         {item.totalTAs !== undefined ? item.totalTAs >= 9 ? `${item.totalTAs} ${t("homepage.assistants")}` : item.totalTAs == 0 ? `${t("homepage.no")}` : `${item.totalTAs} ${t("homepage.assistant")}` : t("homepage.no")}
//                     </p>

//                     <p className="font-semibold text-base text-textGray w-1/6 text-start">



//                         {item.totalSessions >= 9 ? `${item.totalSessions} ${t("SingleCourse.Sessions")}` : item.totalSessions == 0 ? t`${t("homepage.no")}` : `${item.totalSessions} ${t("SingleCourse.session")}`}
//                     </p>

//                     <p className="font-semibold text-base text-textGray w-1/6 text-start">
//                         {/* {item.totalTopics >= 9 ? `${item.totalTopics} مواضيع` : item.totalTopics == 0 ? "لا يوجد مواضيع" : `${item.totalTopics} موضوع`} */}

//                         {item.totalTopics >= 9 ? `${item.totalTopics} ${t("SingleCourse.topics")}` : item.totalTopics == 0 ? `${t("homepage.no")}` : `${item.totalTopics} ${t("SingleCourse.topic")}`}

//                     </p>


//                     <p className="font-semibold text-base text-textGray w-1/6 text-start">
//                         {/* {item.totalCenters >= 9 ? `${item.totalCenters} سناتر` : item.totalCenters == 0 ? "لا يوجد سناتر" : `${item.totalCenters} سنتر`} */}


//                         {item.totalCenters !== undefined ? item.totalCenters >= 9 ? `${item.totalCenters} ${t("SingleCourse.center1")}` : item.totalCenters == 0 ? `${t("homepage.no")}` : `${item.totalCenters} ${t("SingleCourse.center")}` : t("homepage.no")}
//                     </p>


//                 </> :

//                 <>

//                     <div className="flex w-1/5 text-start gap-2 items-center">
//                         {/* <img className="max-w-12 max-h-12" src={avatar} alt="" /> */}
//                         <div className="flex flex-col">
//                             <p className="font-bold text-mainColor text-lg flex justify-start items-center gap-2">
//                                 {item?.courseData?.name}
//                             </p>
//                             <p className="text-base"> {item?.courseData?.grade?.nameAr}</p>
//                         </div>
//                     </div>

//                     <p className="font-semibold text-base text-textGray w-1/5 text-start px-10">
//                         {item?.tutor?.fullname}
//                     </p>


//                     <p className="font-semibold text-base text-textGray w-1/5 text-start">
//                         {item?.totalSessions >= 9 ? `${item?.totalSessions} ${t("SingleCourse.Sessions")}` : item?.totalSessions == 0 ? t`${t("homepage.no")}` : `${item?.totalSessions} ${t("SingleCourse.session")}`}
//                     </p>

//                     <p className="font-semibold text-base text-textGray w-1/5 text-start">
//                         dsfja
//                     </p>



//                     <p className="font-semibold text-base text-textGray w-1/5 text-start">
//                         {item?.totalCenters !== undefined ? item?.totalCenters >= 9 ? `${item?.totalCenters} ${t("SingleCourse.center1")}` : item?.totalCenters == 0 ? `${t("homepage.no")}` : `${item?.totalCenters} ${t("SingleCourse.center")}` : t("homepage.no")}
//                     </p>


//                 </>
//             }


//         </Link>
//     )
// }