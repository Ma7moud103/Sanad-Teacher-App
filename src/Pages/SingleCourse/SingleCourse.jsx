import React, { useContext, useEffect } from 'react';
import SingleCourseBoxes from '../../Components/SingleCourseBoxes/SingleCourseBoxes';
import SessionTable from '../../Components/Tables/SessionTable/SessionTable';
import avatar from '../../Assets/sanadSVG/bigCourseAvatar.svg';
import { useTranslation } from 'react-i18next';
// import TSingleCoursePopupWindow from '../../Components/PopupWindows/TSingleCoursePopupWindow/TSingleCoursePopupWindow';
import { MainContext } from '../../Context/MainContext';
import icon3 from '../../Assets/sanadSVG/revTableBox.svg';
import AssistantsSingleCourse from '../../Components/AssistantsSingleCourse/AssistantsSingleCourse';
import { Link, useParams } from 'react-router-dom';
import { ApisContext } from '../../Context/ApisContext';
import hexToRgba from 'hex-to-rgba';
import { ReactSVG } from 'react-svg';
import SingleRouteLoading from '../../Components/Skeletons/SingleRouteLoading';
import Post from '../../Components/Skeletons/Post';
import onLine from "../../Assets/sanadSVG/online.svg";
import ExamsForCourse from "../Exams/ExamsForCourse"
import SingleCourseImage from '../../Components/CourseImage/SingleCourseImage';
function SingleCourse() {
	let [t, i18n] = useTranslation();

	let {
		fetchCoure,

		Topics,
		fetchTopics,

		Role,
	} = useContext(ApisContext);
	const { Toggler, setToggler, setsession } = useContext(MainContext);



	useEffect(() => {
		return () => {
			setsession("")
			sessionStorage.removeItem("uppyState")
			sessionStorage.removeItem("uppySessionId")
			sessionStorage.removeItem("isUploading")
		}
	}, [])



	return (

		<main className="w-full flex flex-col gap-y-6 ">
			<section className="flex flex-col xl:flex-row gap-4 min-h-[250px] ">
				{fetchCoure.isFetched ? (
					<article className="identity w-full 2xl:w-1/3 h-full flex flex-col bg-white rounded-2xl p-6 justify-center items-center gap-y-2 shadow md:shadow-none">
						{/* <span className="w-20"> */}
						{/* <img className="w-full" src={""} alt="" /> */}
						{/* <ReactSVG src={avatar} /> */}
						{/* </span> */}

						<SingleCourseImage courseName={fetchCoure.data?.courseData?.name} />

						<div className="text flex flex-col justify-center items-center gap-y-2">
							<p className="  md:text-xl text-mainColor font-bold text-center">
								{fetchCoure.data?.courseData?.name}
							</p>

							<p className="text-[#A3AED0] font-semibold text-sm  md:text-base  text-center">
								{t('SingleCourse.t/')} {fetchCoure.data?.tutor?.fullname}
							</p>
						</div>

						<div className="details  flex    items-center justify-between mt-3 w-full">
							<div className="text w-1/3 flex flex-col justify-center items-center gap-y-2">
								<p className="text-textGray font-semibold   text-xs sm:text-sm 2xl:text-base text-center">
									{t('SingleCourse.courseCode')}
								</p>
								<p className=" text-mainColor  text-xs sm:text-sm  font-extrabold text-center">
									{fetchCoure.data?.courseData?.code}
								</p>
							</div>

							<div className="text w-1/3 flex flex-col justify-center items-center gap-y-2">
								<p className="text-textGray font-semibold  text-xs sm:text-sm 2xl:text-base text-center">
									{t('SingleCourse.gradeLevel')}
								</p>
								<p className=" text-xs sm:text-sm  text-mainColor font-extrabold text-center">
									{i18n.language === 'ar'
										? fetchCoure.data?.courseData?.grade?.nameAr
										: i18n.language === 'en' &&
										fetchCoure.data?.courseData?.grade?.nameEn}
								</p>
							</div>



							<div className="w-1/3 flex flex-col items-center justify-center gap-y-2">
								<p className="text-textGray  text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('coursesTable.term')}
								</p>
								<div className=" text-secondMainColor text-size_10 sm:text-sm xl:text-sm font-bold">
									{fetchCoure.data &&
										fetchCoure.data?.term === '0'
										? t('homeRev.highSchool')
										: fetchCoure.data &&
											fetchCoure.data?.term
											? fetchCoure.data &&
												fetchCoure.data?.term === '1'
												? `${t('homeRev.first')}`
												: fetchCoure.data &&
													fetchCoure.data?.term === '2'
													? `${t('homeRev.second')}`
													: fetchCoure.data &&
													fetchCoure.data?.term ===
													'3' &&
													`${t('homeRev.third')}`
											: null}
								</div>
							</div>
						</div>
					</article>
				) : (
					<SingleRouteLoading />
				)}



				{fetchTopics.isFetched ?
					<article className=" topics w-full 2xl:w-1/3  bg-white rounded-2xl p-4 flex flex-col h-full   justify-start text-center xl:text-start gap-4  ">

						<div className="header flex justify-between items-center">
							<p className="title text-lg text-mainColor font-extrabold   ">
								{t('SingleCourse.courseTopics')}
							</p>

						</div>
						<div className="flex gap-3 flex-wrap">
							{Topics?.length > 0 &&
								Topics?.map((topic) => {
									return (
										<div
											key={topic?._id}
											style={{
												color: topic.color,
												backgroundColor: hexToRgba(topic.color, '0.2'),
											}}
											className="group flex topic justify-center text-xs relative items-center rounded-lg p-2  py-1 text-center"
										>

											{topic?.name}
										</div>
									);
								})}

							<div
								onClick={() => {
									setToggler({ ...Toggler, addTopic: true })
								}}
								className={`${Role === 3 ? 'flex' : 'hidden'
									}   cursor-pointer justify-center items-center text-xs  bg-gradient-to-tr from-secondMainColor to-blue_light text-white rounded-lg py-[6px] px-4 text-center`}
							>
								{'+ ' + t('SingleCourse.addTopic')}

								{/* {t("SingleCourse.addTopic")} */}
							</div>
						</div>


					</article> : <SingleRouteLoading />}


				{fetchCoure.isFetched ? (
					<div className={`${Role === 4 && "flex flex-col gap-y-4"} w-full 2xl:w-1/3 `}>
						<Link onClick={() => sessionStorage.clear()} to={"bank"} className="box shadow-md xl:shadow-none w-full  flex items-center justify-center gap-x-3  bg-white rounded-2xl p-4 cursor-pointer 2xl:gap-x-4 hover:bg-mainColor transition-all group">
							<div className="flex justify-center items-center">

								<ReactSVG src={icon3} />
							</div>
							<div className="flex flex-col justify-center items-center gap-y-2">
								<p className="text-xl 2xl:text-2xl  group-hover:text-white  text-mainColor font-bold">
									{t('exam.qBank')}
								</p>

							</div>
						</Link>
						{Role === 4 &&
							<div
								className={`box w-full cursor-pointer  bg-white hover:bg-mainColor transition-all group  items-center rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}
								onClick={() => setToggler({ ...Toggler, online: true })}
							>
								{Toggler ? (
									<>
										<ReactSVG src={onLine} />

										<div className="title text-nowrap">
											<p className=" text-mainColor group-hover:text-white text-xl 2xl:text-2xl  font-bold">
												{t('exam.addExam')}
											</p>
										</div>
									</>
								) : (
									<Post />
								)}
							</div>}
					</div>


				) : (
					<SingleRouteLoading />
				)}

			</section>

			<SingleCourseBoxes />


			<SessionTable />

			{Role === 4 && <ExamsForCourse />}
			{Role === 3 && (
				<>
					<AssistantsSingleCourse />
					{/* <CourseGroups /> */}
				</>
			)}
		</main>


	);
}

export default React.memo(SingleCourse);
