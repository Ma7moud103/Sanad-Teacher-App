import React, { useContext } from "react";
import HeaderHomePage from "../../Components/HeaderHomePage/HeaderHomePage";
import CoursesTable from "../../Components/Tables/CoursesTable/CoursesTable";
import HomePageBoxes from "../../Boxes/HomePageBoxes/HomePageBoxes"

import LessonSchedule from "../../Components/LessonSchedule/LessonSchedule";

import { ApisContext } from "../../Context/ApisContext";
import { Helmet } from "react-helmet";

function HomePage() {

  let { Role } = useContext(ApisContext)

  // let date = new Date(`Thu ${new Date().getMonth() + 1} ${new Date().getDate() + 1} ${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds()} GMT+0200 (Eastern European Standard Time)`)
  // let af = new Date().getSeconds()
  // console.log(date);

  // console.log(Role)


  return (
    <>

      <Helmet>
        <title>Home</title>
        <meta name="description" content="Page description" />
        <link rel="canonical" href="http://example.com/my-page" />

      </Helmet>


      <main className="w-full flex flex-col gap-y-8 ">

        <HeaderHomePage />
        <HomePageBoxes />
        {Role === 3 && <LessonSchedule />}
        <CoursesTable linkTo={"courses/course"} />


        {/* {Role === 4 &&
          <HomeTasksAssistant />
        } */}

        {/* {Role === 3 &&
          <>
            <CenterCourse />
          </>
        } */}
      </main>

    </>
  );
}

export default React.memo(HomePage)
