import React, { useContext, useMemo, useRef, useState } from 'react';
import search from '../../../Assets/sanadSVG/Search Icon.svg';
import sort from '../../../Assets/sanadSVG/sort.svg';
import { useTranslation } from 'react-i18next';
import Pagination from '../../Pagination/Pagination';

import { ApisContext } from '../../../Context/ApisContext';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import Down from '../../../Assets/sanadSVG/downArrow.svg';
import avatar from '../../../Assets/sanadSVG/imgUser.svg';
import { ReactSVG } from 'react-svg';
import { SvgsContext } from '../../../Context/SvgsContext';
import LargePosts from '../../Skeletons/LargePosts';
import SmallPosts from '../../Skeletons/SmallPosts';
import del from "../../../Assets/sanadSVG/delet.svg"
import { MainContext } from '../../../Context/MainContext';
import { BASUE_IMAGES } from '../../../Soursre';

function AssistantsTable() {
	// const { Role } = useContext(MainContext);
	const [t] = useTranslation();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const { TeacherAsssistants, tens, fetcchallAssistants, setdeletedTaId } = useContext(ApisContext);
	const { Toggler, setToggler, handleUserName } = useContext(MainContext)



	// const [searchInput, setsearchInput] = UseToggle(false);
	const { leftArrow } = useContext(SvgsContext);
	// const inputSearchSmall = useRef();
	const inputSearchBig = useRef();
	let [inputSearch, setinputSearch] = useState('');

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const filteration = useMemo(() => {
		if (TeacherAsssistants?.length === 0) return [];
		return TeacherAsssistants?.filter((item) =>
			item?.fullname?.toLowerCase()?.includes(inputSearch.toLowerCase())
		);
	}, [inputSearch, TeacherAsssistants]);

	// Calculate the start and end indexes for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(
		startIndex + itemsPerPage,
		inputSearch === '' ? TeacherAsssistants?.length : filteration?.length
	);

	const visibleData2 =
		inputSearch === ''
			? TeacherAsssistants?.slice(startIndex, endIndex)
			: filteration?.slice(startIndex, endIndex);



	return (
		<div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 py-8   gap-6">
			<div className="flex justify-between items-center">
				<div className="flex items-center justify-between w-full">
					<p className="font-extrabold text-2xl md:text-3xl xltext-4xl text-mainColor">
						{t('homepage.assistantsLog')}
					</p>


				</div>

				<div className="headerLargescreen hidden cursor-pointer  h-12 w-80 bg-[#F4F7FE] rounded-full xl:flex justify-start p-6 items-center text-textColor__2 text-lg ">
					<ReactSVG src={search} />
					<input
						placeholder={t('homepage.search')}
						value={inputSearch}
						ref={inputSearchBig}
						onChange={(e) => {
							setinputSearch(e.target.value);
						}}
						onFocus={(e) => {
							e.target.style.boxShadow = 'none';
						}}
						className={
							'bg-inherit w-full text-mainColor text-sm font-bold placeholder:text-[14px] placeholder:text-textGray placeholder:font-thin   border-none rounded-sm'
						}
						type="search"
					/>
				</div>

			</div>



			<div className="hidden xl:block">
				<div className='  p-6 flex justify-between    rounded-2xl rounded-b-none  bg-[#F4F7FE] border border-[#E1E1E1]'>
					<p className="text-start text-sm text-textGray w-1/4">
						{t('PopUps.assistantName')}
					</p>
					<div className="flex gap-x-1 w-1/4">
						<ReactSVG src={sort} />
						<p className="text-start text-sm text-textGray">{t('ass.phone')}</p>
					</div>
					<p className="text-start text-sm text-textGray w-1/4">
						{t('homepage.activeCoursesNum')}
					</p>
					<p className="text-start text-sm text-textGray w-1/4">
						{t('homepage.teacherNum')}
					</p>
				</div>


				<div>

					{fetcchallAssistants.isFetched ?
						filteration?.length > 0 ? (
							visibleData2?.map((item, i) => {
								const last = visibleData2?.length - 1
								return (



									<div key={i} className={`py-3 relative px-6 w-full border-[#E1E1E1] border border-t-0 ${last === i && "rounded-b-2xl"}  flex items-center justify-between`}>
										<div className="flex w-1/4 justify-start gap-2 items-center">
											{/* <ReactSVG src={avatar} /> */}
											{item?.profileImage !== "" ?
												<span className=''>
													<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
												</span>

												: <ReactSVG src={avatar} />}
											<div className="flex flex-col">
												<p className="font-bold text-mainColor text-sm flex justify-start items-center gap-2">
													{item?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}
												</p>
												<p className="text-xs"> {item?.code}</p>
											</div>
										</div>

										<p className="font-semibold text-sm text-textGray w-1/4 text-start ">
											{item?.phoneNumber}
										</p>

										<p className="font-semibold text-sm text-textGray w-1/4  text-start">
											{item?.totalTutorCourses !== undefined
												? tens.includes(item?.totalTutorCourses)
													? `${item?.totalTutorCourses} ${t(
														'homepage.courses'
													)}`
													: `${item?.totalTutorCourses} ${t(
														'SingleCourse.course'
													)}`
												: t('homepage.nothing')}
										</p>

										<p className="font-semibold text-sm text-textGray w-1/4  text-start">
											{item?.tAData?.totalTutors !== undefined
												? tens.includes(item?.tAData?.totalTutors)
													? `${item?.tAData?.totalTutors} ${t(
														'homepage.teachers'
													)}`
													: `${item?.tAData?.totalTutors} ${t(
														'homepage.teacher'
													)}`
												: t('homepage.nothing')}
										</p>
										<span className='cursor-pointer' onClick={() => {
											setToggler({ ...Toggler, deletTa: true })
											setdeletedTaId(item?._id)
										}}>
											<ReactSVG src={del} />
										</span>
									</div>



								)
							}
							)
						) : (
							<p className="font-bold text-mainColor text-sm text-center w-full">
								{t('homepage.nothing')}
							</p>
						)

						: <LargePosts />

					}

				</div>
				<>
					{filteration.length > 0 && (
						<Pagination
							totalItems={filteration?.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					)}
				</>
			</div>
			{/* uncomment this part if you have the data then loop in it to display the data*/}

			<div className="smallScreen  flex flex-col rounded-2xl gap-5 xl:hidden">
				{fetcchallAssistants.isFetched ?
					filteration?.length > 0 ? (
						visibleData2?.map(
							({
								address,
								birthDate,
								city,
								code,
								email,
								fullname,
								gender,
								governorate,
								phoneNumber,
								profileImage,
								role,
								tAData: { totalTutors, tutorKey, tutors },
								totalTutorCourses,
								tutorCourses,
								tutorData,
								_id,
							}) => (
								<div key={_id}>
									<Disclosure>
										{({ open }) => (
											<>
												<DisclosureButton
													className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b  flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
														}`}
												>
													<div className="flex text-start gap-2 items-center">
														{/* <img

															className="max-w-12 max-h-12"
															src={avatar}
															alt=""
														/> */}


														{profileImage !== "" ?
															<span className=''>
																<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${profileImage}`} alt="profileImage" />
															</span>

															: <ReactSVG src={avatar} />}
														<div className="flex flex-col">
															<p className="font-bold text-mainColor text-sm sm:text-base flex justify-start items-center gap-2">
																{handleUserName(fullname, 3)}
															</p>
															<p className="text-xs sm:text-base"> {email}</p>
														</div>
													</div>

													{/* <img src={open ? Down : left} alt="" /> */}
													{!open ? leftArrow() : <ReactSVG src={Down} />}
												</DisclosureButton>

												<DisclosurePanel className=" py-3 px-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
													<div className=" nameOfTeacher flex justify-between items-center w-full">
														<p className=" font-semibold text-xs sm:text-base text-textGray text-center">
															{t('ass.phone')}
														</p>

														<p className="font-semibold text-xs sm:text-base text-textGray text-center">
															{phoneNumber}
														</p>
													</div>

													<div className="numberOFStudents flex justify-between items-center w-full">
														<p className="font-semibold text-xs sm:text-base text-textGray text-center">
															{t('homepage.activeCoursesNum')}
														</p>
														<p className="font-semibold text-xs sm:text-base text-textGray text-center">
															{totalTutorCourses !== undefined
																? tens.includes(totalTutorCourses)
																	? `${totalTutorCourses} ${t(
																		'homepage.courses'
																	)}`
																	: `${totalTutorCourses} ${t(
																		'SingleCourse.course'
																	)}`
																: t('homepage.nothing')}
														</p>
													</div>
													<div className="numOfGroups flex justify-between items-center w-full">
														<p className="font-semibold text-xs sm:text-base text-textGray text-center">
															{t('homepage.teacherNum')}
														</p>
														<p className="font-semibold text-xs sm:text-base text-textGray text-center">
															{totalTutors !== undefined
																? tens.includes(totalTutors)
																	? `${totalTutors} ${t('homepage.teachers')}`
																	: `${totalTutors} ${t('homepage.teacher')}`
																: t('homepage.nothing')}
														</p>
													</div>
													<div className='w-full  flex justify-end'>
														<span className='cursor-pointer' onClick={() => {
															setToggler({ ...Toggler, deletTa: true })
															setdeletedTaId(_id)
														}}>
															<ReactSVG src={del} />
														</span>
													</div>
												</DisclosurePanel>
											</>
										)}
									</Disclosure>
								</div>
							)
						)
					) : (
						<p className="font-bold bg-white text-center rounded-lg  text-mainColor text-[18px] p-3 ">
							{t('task.noass')}
						</p>
					)
					: <SmallPosts />
				}

				{
					filteration?.length > 0 &&
					(
						<Pagination
							totalItems={filteration?.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>

					)}
			</div>
		</div>
	);
}

export default React.memo(AssistantsTable);
