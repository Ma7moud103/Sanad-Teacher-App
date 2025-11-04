import SingleExamsBoxes from './SingleExamsBoxes'
import SingleExamTable from './SingleExamTable'
import Students from "./TExamsTable/Students"

function SingleExamLayout() {


    return (
        <div className='flex flex-col gap-y-mainGap pb-6'>
            {/* single exam is in the exams page and the single cousre page  */}
            <SingleExamsBoxes />
            <SingleExamTable />
            <Students />


        </div>)
}

export default SingleExamLayout