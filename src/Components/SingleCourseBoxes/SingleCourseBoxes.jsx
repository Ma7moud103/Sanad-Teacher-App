import React, { useContext } from 'react';
import icon from '../../Assets/sanadSVG/students.svg';
import icon1 from '../../Assets/sanadSVG/courses.svg';
import icon2 from '../../Assets/sanadSVG/students.svg';
import icon3 from '../../Assets/sanadSVG/groups.svg';
import { useTranslation } from 'react-i18next';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../Skeletons/Post';
import { ReactSVG } from 'react-svg';
export default function SingleCourseBoxes() {
	let [t] = useTranslation();

	let { fetchCoure, tens, Role, fetchAssistants, fetchSessions, fetchTopics } = useContext(ApisContext);

	return (
		<div className="w-full flex flex-col xl:flex-row gap-x-6 gap-y-4 justify-between">


			{fetchSessions.isFetched ? (
				<div className="box shadow-md xl:shadow-none w-full xl:w-1/3 flex items-center justify-center gap-x-3   bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC]  rounded-2xl p-4  2xl:gap-x-4">
					<div className="flex justify-center items-center">

						<ReactSVG src={icon1} />
					</div>
					<div className="flex flex-col justify-center items-center gap-y-2">
						<p className="text-lg   text-white font-normal">
							{t('SingleCourse.sessionsNum')}
						</p>
						<p className="text-lg text-white font-extrabold">
							{fetchSessions.data?.length > 0
								? tens.includes(fetchSessions.data?.length)
									? `${fetchSessions.data?.length} ${t(
										'SingleCourse.Sessions'
									)}`
									: `${fetchSessions.data?.length} ${t(
										'SingleCourse.session'
									)}`
								: t('homepage.nothing')}
						</p>
					</div>
				</div>
			) : (
				<div className="w-full xl:w-1/3 p-3 bg-white rounded-xl flex items-center justify-center">

					<Post />
				</div>
			)}

			{fetchCoure.isFetched ? (
				<div className="box shadow-md xl:shadow-none w-full xl:w-1/3 flex items-center justify-center gap-x-3   bg-white rounded-2xl p-4  2xl:gap-x-4">
					<div className="flex justify-center items-center">

						<ReactSVG src={icon2} />
					</div>
					{Role === 3 &&
						<div className="flex flex-col justify-center items-center gap-y-2">
							<p className="text-lg   text-textGray font-normal">
								{t("coursesTable.assistantsNum")}</p>
							<p className="text-lg text-mainColor font-extrabold">
								{fetchAssistants.data?.length > 0
									? tens.includes(fetchAssistants.data?.length)
										? `${fetchAssistants.data?.length} ${t('homepage.assistants')}`
										: `${fetchAssistants.data?.length} ${t('homepage.assistant')}`
									: t('homepage.nothing')}
							</p>
						</div>}
					{Role === 4 && <div className="flex flex-col justify-center items-center gap-y-2">
						<p className="text-lg   text-textGray font-normal">
							{t("homepage.examsName")}
						</p>
						<p className="text-lg text-mainColor font-extrabold">
							{(() => {


								return fetchCoure?.data?.totalExams ? tens.includes(fetchCoure?.data?.totalExams) ? `${fetchCoure?.data?.totalExams} ${t("homepage.exams")}` : `${fetchCoure?.data?.totalExams} ${t("homepage.exam")}` : t("homepage.nothing")
							})()}
						</p>
					</div>}
				</div>
			) : (
				<div className="w-full xl:w-1/3 p-3 bg-white rounded-xl flex items-center justify-center ">
					{' '}
					<Post />
				</div>
			)}

			{fetchTopics.isFetched ? (
				<div className="box shadow-md xl:shadow-none w-full xl:w-1/3 flex items-center justify-center gap-x-3   bg-white rounded-2xl p-4  2xl:gap-x-4">
					<div className="flex justify-center items-center">


						<ReactSVG src={icon3} />
					</div>
					<div className="flex flex-col justify-center items-center gap-y-2">
						<p className="text-lg   text-textGray font-normal">
							{t('SingleCourse.topicsNum')}
						</p>
						<p className='text-mainColor font-bold text-lg'>
							{fetchTopics.data?.length > 0 ? tens.includes(fetchTopics.data?.length)
								? `${fetchTopics.data?.length} ${t(
									'SingleCourse.topics'
								)}`
								: `${fetchTopics.data?.length} ${t(
									'SingleCourse.topic'
								)}` : t("homepage.nothing")}
						</p>


					</div>
				</div>
			) : (
				<div className="w-full xl:w-1/3 p-3 bg-white rounded-xl flex items-center justify-center">
					{' '}
					<Post />
				</div>
			)}
		</div>
	);
}


// {
// 	fetchCoure.isFetched ? (
// 		<div className="box shadow-md xl:shadow-none w-full xl:w-1/3 flex items-center justify-center gap-x-3   bg-white rounded-2xl p-4  2xl:gap-x-4">
// 			<div className="flex justify-center items-center">
// 				{/* <span className="w-11 h-11 sm:w-12 sm:h-12 bg-[#F4F7FE] rounded-full flex justify-center items-center p-2">
// 							<img className="w-5 h-5 sm:w-6 sm:h-6" src={icon} alt="" />
// 						</span> */}
// 				<ReactSVG src={icon} />
// 			</div>
// 			<div className="flex flex-col justify-center items-center gap-y-2">
// 				<p className="text-lg   text-textGray font-normal">
// 					{t('SingleCourse.totalStudents')}
// 				</p>
// 				<p className="text-lg text-mainColor font-extrabold">
// 					{fetchCoure.data?.totalStudents > 0
// 						? tens.includes(fetchCoure.data?.totalStudents)
// 							? `${fetchCoure.data?.totalStudents} ${t(
// 								'SingleCourse.students'
// 							)}`
// 							: `${fetchCoure.data?.totalStudents} ${t(
// 								'SingleCourse.student'
// 							)}`
// 						: t('homepage.nothing')}
// 				</p>
// 			</div>
// 		</div>
// 	) : (
// 	<div className="w-full xl:w-1/3 p-3 bg-white rounded-xl flex items-center justify-center">
// 		{' '}
// 		<Post />
// 	</div>
// )
// }