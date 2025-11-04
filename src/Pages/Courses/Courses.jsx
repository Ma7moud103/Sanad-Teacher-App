import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet"

export default function Courses() {


  return (
    <main className="w-full flex flex-col gap-y-8 pb-4">
      <Helmet>
        <title>Courses</title>
        <meta name="description" content="Page description" />
        <link rel="canonical" href="http://example.com/my-page" />

      </Helmet>
      <Outlet />
    </main>
  );
}

