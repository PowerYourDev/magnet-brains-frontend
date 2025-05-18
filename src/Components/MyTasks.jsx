import React from 'react'
import Dashboard from "./Dashboard"
import ShowMessage from '../utilis/ShowMessage';

const MyTasks = ({setPage, page, data, totalTasks, limit,refetchTasks}) => {

  if (!data || data.length <= 0) {
    return <ShowMessage info={"there is no tasks for you currently"} />;
  }
  return (
    <div className=''>

        <Dashboard setPage={setPage} page={page} data={data} totalTasks={totalTasks} limit={limit} refetchTasks={refetchTasks}/>
    </div>
  )
}

export default MyTasks