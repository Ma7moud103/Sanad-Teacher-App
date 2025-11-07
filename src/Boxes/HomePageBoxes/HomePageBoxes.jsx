import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import courses from '../../Assets/sanadSVG/courses.svg';
import students from '../../Assets/sanadSVG/students.svg';
import teachers from '../../Assets/sanadSVG/teachers.svg';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../../Components/Skeletons/Post';

export default function HomePageBoxes() {
	const [t] = useTranslation();
	const { userDetails, tens, Role, fetchTutorKeyForTa, } =
		useContext(ApisContext);


	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
			<>
				{fetchTutorKeyForTa.isFetched ? (
					<div className={`box w-full  xl:w-1/3  bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}>
						<>
							<ReactSVG src={students} />

							<div className="title">
								<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
									{' '}
									{Role === 3
										? t('homepage.assistantNum')
										: Role === 4 && t('homepage.assistantCode')}
								</p>

								<div className="flex items-center text-nowrap">
									<p className="text-mainColor text-lg xl:text-size__14 2xl:text-base font-bold">
										{Role === 3
											? fetchTutorKeyForTa.data?.tutorData?.totalTAs > 0
												? tens.includes(fetchTutorKeyForTa.data?.tutorData?.totalTAs)
													? `${fetchTutorKeyForTa.data?.tutorData?.totalTAs} ${t(
														'homepage.assistants'
													)}`
													: `${fetchTutorKeyForTa.data?.tutorData?.totalTAs} ${t(
														'homepage.assistant'
													)}`
												: t('homepage.nothing')
											: Role === 4 && fetchTutorKeyForTa.data?.code
												? fetchTutorKeyForTa.data?.code
												: t('homepage.nothing')}
									</p>
								</div>
							</div>
						</>
					</div>
				) : (
					<div className={`w-full  xl:w-1/3  bg-white rounded-2xl p-3`}>
						<Post />
					</div>
				)}

				{fetchTutorKeyForTa.isFetched ? (
					<div className={`box w-full  xl:w-1/3  rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light`}>
						<ReactSVG src={courses} />

						<div className="title text-nowrap">
							<p className=" text-white text-size__20 xl:text-base 2xl:text-lg font-bold">
								{t('homepage.activeCoursesNum')}
							</p>
							<div className="text-white text-lg xl:text-size__14 2xl:text-base font-bold">
								{fetchTutorKeyForTa.data.totalTutorCourses > 0
									? tens.includes(fetchTutorKeyForTa.data.totalTutorCourses)
										? `${fetchTutorKeyForTa.data.totalTutorCourses} ${t(
											'homepage.courses'
										)}`
										: `${fetchTutorKeyForTa.data.totalTutorCourses} ${t(
											'homepage.course'
										)}`
									: t('homepage.nothing')}
							</div>
						</div>
					</div>
				) : (
					<div className={`w-full  xl:w-1/3  bg-white rounded-2xl p-3`}>
						<Post />
					</div>
				)}

				{fetchTutorKeyForTa.isFetched ? (
					<div className={`box w-full ${Role === 3 ? "hidden" : "xl:w-1/3"} bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}>
						<>
							<ReactSVG src={teachers} />

							<div className="title text-nowrap">
								<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
									{Role === 4
										&& t('homepage.teacherNum')
									}
									{/* : t('homepage.centersNum') */}
								</p>
								<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
									{/* 
									Role === 3
										? fetchTutorKeyForTa.data?.tutorData?.totalCenters > 0
									? tens.includes(fetchTutorKeyForTa.data?.tutorData?.totalCenters)
									? `${fetchTutorKeyForTa.data?.tutorData?.totalCenters} ${t(
										'homepage.centerss'
									)}`
									: `${fetchTutorKeyForTa.data?.tutorData?.totalCenters} ${t(
										'homepage.centers'
									)}`
											: t('homepage.nothing')
										: */}


									{Role === 4 && fetchTutorKeyForTa.data?.tAData?.totalTutors > 0
										? tens.includes(fetchTutorKeyForTa.data?.tAData?.totalTutors)
											? `${fetchTutorKeyForTa.data?.tAData?.totalTutors} ${t(
												'homepage.teachers'
											)}`
											: `${fetchTutorKeyForTa.data?.tAData?.totalTutors} ${t(
												'homepage.teacher'
											)}`
										: t('homepage.nothing')}

									{/* {selectedCenter ? tens.includes(selectedCenter?.tutorsCount
                  ) ? `${selectedCenter?.tutorsCount
                  }${t("Courses.Teachers")}` : `${selectedCenter?.tutorsCount
                  }${t("Courses.teacher")}` : t("homepage.nothing")} */}
								</p>
							</div>
						</>
					</div>
				) : (
					<div className={`w-full p-3 ${Role === 3 ? "hidden" : "xl:w-1/3"} bg-white rounded-2xl`}>
						<Post />
					</div>
				)}

				{Role === 3 ?
					fetchTutorKeyForTa.isFetched ? <div className="box w-full xl:w-1/3 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">

						<ReactSVG src={teachers} />
						<div className="title text-nowrap">
							<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
								{t('homeBoxes.st')}
							</p>
							<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
								{fetchTutorKeyForTa.data?.tutorData?.totalStudents > 0
									? tens.includes(fetchTutorKeyForTa.data?.tutorData?.totalStudents)
										? `${fetchTutorKeyForTa.data?.tutorData?.totalStudents} ${t(
											'SingleCourse.students'
										)}`
										: `${fetchTutorKeyForTa.data?.tutorData?.totalStudents} ${t(
											'SingleCourse.student'
										)}`
									: t('homepage.nothing')}
							</p>
						</div>

					</div>
						: <div className="w-full p-3 xl:w-1/3 bg-white rounded-2xl">
							<Post />
						</div> : null

				}
			</>
		</div>
	);
}



// div className = "box w-full xl:w-1/4 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center" >

// 					<ReactSVG src={teachers} />
// 					<div className="title text-nowrap">
// 						<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
// 							{t('homeBoxes.st')}
// 						</p>
// 						<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
// 							{userDetails?.tutorData?.totalStudents
// 								? tens.includes(userDetails?.tutorData?.totalStudents)
// 									? `${userDetails?.tutorData?.totalStudents} ${t(
// 										'SingleCourse.students'
// 									)}`
// 									: `${userDetails?.tutorData?.totalStudents} ${t(
// 										'SingleCourse.student'
// 									)}`
// 								: t('homepage.nothing')}
// 						</p>
// 					</div>

// 				</div >
// 					: <div className="w-full p-3 xl:w-1/4 bg-white rounded-2xl">
// 	<Post />
// </div>