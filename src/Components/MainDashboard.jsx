import React from 'react'
import Dashboard from "./Dashboard"
import ShowMessage from '../utilis/ShowMessage';


const MainDashboard = ({setPage, page, data, totalTasks, limit,refetchTasks}) => {
    console.log(data,"kjdd")

    if (!data || data.length <= 0) {
        return <ShowMessage info={"there is no tasks currently , please create"} />;
      }

  return (
    <div>
        <Dashboard setPage={setPage} page={page} data={data} totalTasks={totalTasks} limit={limit} refetchTasks={refetchTasks}/>
    </div>
  )
}

export default MainDashboard