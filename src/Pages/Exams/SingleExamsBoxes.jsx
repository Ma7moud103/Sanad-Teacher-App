import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactSVG } from 'react-svg';

import addQuestion from '../../Assets/sanadSVG/sGrade.svg';
import students from '../../Assets/sanadSVG/students.svg';

import { MainContext } from '../../Context/MainContext';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../../Components/Skeletons/Post';
import dayjs from 'dayjs';

export default function SingleExamsBoxes() {
    const [t] = useTranslation();
    const { setToggler, Toggler } = useContext(MainContext);
    const { fetchExamQuestions, tens, fetchStudents } =
        useContext(ApisContext);

    // start.isAfter(now) && end.isAfter(now)
    const cachedSelectedExam = JSON.parse(sessionStorage.getItem("selectedExam"))

    const currentTime = dayjs();
    const startTime = dayjs(cachedSelectedExam.startTime);
    const endTime = dayjs(cachedSelectedExam.endTime);




    return (
        <div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
            <>


                {fetchExamQuestions.isFetched ? (
                    <div className="box  cursor-pointer w-full xl:w-1/3 rounded-2xl flex p-4 gap-x-4 xl:gap-x-4 justify-center  items-center  bg-white">
                        <>
                            <div className="title">
                                <p className=" text-textGray text-lg  2xl:text-base font-bold">
                                    {t('exam.totalQ')}
                                </p>

                                <div className="flex items-center text-nowrap">
                                    <p className="text-mainColor text-lg  2xl:text-base font-bold">
                                        {
                                            fetchExamQuestions.data?.metadata?.totalDocs
                                                ? tens.includes(fetchExamQuestions.data?.metadata?.totalDocs)
                                                    ? `${fetchExamQuestions.data?.metadata?.totalDocs} ${t(
                                                        'exam.questions'
                                                    )}`
                                                    : `${fetchExamQuestions.data?.metadata?.totalDocs} ${t(
                                                        'exam.question'
                                                    )}`
                                                : t('homepage.nothing')
                                        }
                                    </p>
                                </div>
                            </div>
                        </>
                    </div>
                ) : (
                    <div className="w-full xl:w-1/3 bg-white rounded-2xl p-3">
                        <Post />
                    </div>
                )}

                {fetchExamQuestions.isFetched ? (
                    <div

                        onClick={() => {
                            if (startTime.isAfter(currentTime) && endTime.isAfter(currentTime)) {
                                setToggler({ ...Toggler, addQ: true })


                            } else {
                                console.log("exam is started")
                                return null
                            }

                        }}
                        className={`box w-full xl:w-1/3 bg-gradient-to-bl from-secondMainColor to-blue_light rounded-2xl flex p-7 gap-x-4 xl:gap-x-4 justify-center ${startTime.isAfter(currentTime) && endTime.isAfter(currentTime) ? "cursor-pointer" : "cursor-default"}`}
                    >
                        {startTime.isAfter(currentTime) && endTime.isAfter(currentTime) ? <>


                            <p className=" text-white text-xl  2xl:text-2xl font-bold">
                                {t('exam.addQ')}
                            </p>
                        </> :
                            <p className=" text-white      font-bold text-center">
                                {t("homepage.examCase")}
                            </p>}

                    </div>
                ) : (
                    <div className="w-full xl:w-1/3 bg-white rounded-2xl p-3">
                        <Post />
                    </div>
                )}
                {
                    fetchStudents.isFetched ? <div className="box w-full xl:w-1/3 bg-white rounded-2xl flex p-4 gap-x-4 xl:gap-x-4 justify-center">

                        <ReactSVG src={students} />
                        <div className="title text-nowrap">
                            <p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
                                {t('homeBoxes.st')}
                            </p>
                            <p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
                                {fetchStudents?.data?.data?.length > 0
                                    ? tens.includes(fetchStudents?.data?.data?.length)
                                        ? `${fetchStudents?.data?.data?.length} ${t(
                                            'SingleCourse.students'
                                        )}`
                                        : `${fetchStudents?.data?.data?.length} ${t(
                                            'SingleCourse.student'
                                        )}`
                                    : t('homepage.nothing')}
                            </p>
                        </div>

                    </div>
                        : <div className="w-full p-3 xl:w-1/3 bg-white rounded-2xl">
                            <Post />
                        </div>

                }


            </>
        </div>
    );
}


