import React, { useContext } from 'react'
import AssistantsBoxs from '../../Boxes/AssistantsBoxs/AssistantsBoxs'
import AssistantsTable from '../../Components/Tables/AssistantsTable/AssistantsTable'
import { Helmet } from 'react-helmet'

export default function Assistants() {
  return <>

    <Helmet>
      <title>Assistants</title>
      <meta name="description" content="Page description" />
      <link rel="canonical" href="http://example.com/my-page" />

    </Helmet>

    <main className="w-full flex flex-col gap-y-8 h-full">

      <AssistantsBoxs />
      <AssistantsTable />
      {/* <TasksTable /> */}
    </main>

  </>
}
