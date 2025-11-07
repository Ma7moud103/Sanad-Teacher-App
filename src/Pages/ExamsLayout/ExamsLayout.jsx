import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

function ExamsLayout() {
	return (
		<>
			<Helmet>
				<title>Exams</title>
				<meta name="description" content="Page description" />
				<link rel="canonical" href="http://example.com/my-page" />

			</Helmet>
			<Outlet />
		</>
	);
}

export default ExamsLayout;
