import React from 'react';
import SingleExamBoxes from './TExamsBoxes/SingleExamBoxes';
import SingleExamTable from './TExamsTable/SingleExamTable';
import { Helmet } from 'react-helmet';

export default function SingleExam() {
	return (
		<>
			{/* this is the questoin bank */}
			<Helmet>
				<title>Question Bank</title>
				<meta name="description" content="Page description" />
				<link rel="canonical" href="http://example.com/my-page" />

			</Helmet>
			<SingleExamBoxes />
			<SingleExamTable />
			{/* <StudentsCourseExam /> */}


		</>
	);
}


