// import languages from "../../Assets/courses/Language.svg";
import Algebra from "../../Assets/courses/Algebra.svg";
import Bio from "../../Assets/courses/Bio.svg";
import Dynamics from "../../Assets/courses/Dynamics.svg";
// import Math from "../../Assets/courses/Math.svg";
import Physics from "../../Assets/courses/Physics.svg";
import Science from "../../Assets/courses/Science.svg";
import Social from "../../Assets/courses/Social Studies.svg";
import Statics from "../../Assets/courses/Statics.svg";
import calculus from "../../Assets/courses/calculus.svg";
import chemistry from "../../Assets/courses/chemistry.svg";
import geography from "../../Assets/courses/geography.svg";
import geometry from "../../Assets/courses/geometry.svg";
import philosophy from "../../Assets/courses/philosophy .svg";
import sociology from "../../Assets/courses/sociology.svg";
import { ReactSVG } from "react-svg";
import { useContext } from "react";
import { SvgsContext } from "../../Context/SvgsContext";



function SingleCourseImage({ courseName }) {

    const { langs, Math, Science, Geog, Chem, Phsy, Bio, Geologya, Philosophy, Sico } = useContext(SvgsContext)
    if (
        courseName?.toLowerCase()?.includes("english") ||
        courseName?.toLowerCase()?.includes("spanish") ||
        courseName?.toLowerCase()?.includes("italian") ||
        courseName?.toLowerCase()?.includes("german") ||
        courseName?.toLowerCase()?.includes("french") ||
        courseName?.toLowerCase()?.includes("لغة عربية")
    ) {
        return langs(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("math") ||
        courseName?.toLowerCase()?.includes("رياضيات")
    ) {
        return Math(55, 55)
    } else if (
        courseName?.toLowerCase() === "Geology and environmental sciences".toLowerCase() ||
        courseName?.toLowerCase()?.includes("جيولوجيا و علوم بيئية")
    ) {
        return Geologya(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("science") ||
        courseName?.toLowerCase()?.includes("علوم")
    ) {
        return Science(55, 55)
    } else if (courseName?.toLowerCase()?.includes("دراسات") || courseName?.toLowerCase()?.includes("جغرافيا")
    ) {
        return Geog(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("chemistry") ||
        courseName?.toLowerCase()?.includes("كيمياء")
    ) {
        return Chem(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("physics") ||
        courseName?.toLowerCase()?.includes("فيزياء")
    ) {
        return Phsy(55, 55)
    } else if (
        courseName?.toLowerCase()?.includes("biology") ||
        courseName?.toLowerCase()?.includes("أحياء")
    ) {
        return Bio(55, 55)
    } else if (courseName?.includes("فلسفة و علم نفس")) {
        return Philosophy(55, 55)
    } else if (courseName?.includes("تاريخ")) {
        return Sico(55, 55)
    }
}

export default SingleCourseImage