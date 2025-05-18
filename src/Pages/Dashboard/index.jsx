import React, { useEffect, useState } from 'react'
import Dashboard from "../../Components/Dashboard"
import Header from '../../Components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../Redux/reduxThunk/taskThunk';
import MainDashboard from '../../Components/MainDashboard';

const DashboardPage = () => {
const dispatch=useDispatch()

    const { data: response = {}, } = useSelector((store) => store?.taskSlice);

    const [page, setPage] = useState(1);

    const limit = 6;
    const data = response?.data || [];
    const totalTasks = response?.totalTasks || 0;

    const refetchTasks = () => {
      dispatch(getAllTasks({ page, limit }));
    };


     useEffect(() => {
        dispatch(getAllTasks({ page, limit }));
      }, [dispatch, page]);
      console.log(data,"doif")

  return (
    <div>
      <Header/>
      {/* <Dashboard /> */}

      { <MainDashboard setPage={setPage} page={page} data={data} totalTasks={totalTasks} limit={limit} refetchTasks={refetchTasks}/> }
    </div>
  )
}

export default DashboardPage