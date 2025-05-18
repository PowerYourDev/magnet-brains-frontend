import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header';
import Dashboard from "../../Components/Dashboard"
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserTasks } from '../../Redux/reduxThunk/taskThunk';
import ShowMessage from "../../utilis/ShowMessage"
import MyTasks from '../../Components/MyTasks';

const MyTask = () => {
  const dispatch=useDispatch()

  const { userTask: response = {}, } = useSelector((store) => store?.taskSlice);

  const [page, setPage] = useState(1);

  const limit = 6;
  const data = response?.data || [];
  const totalTasks = response?.totalTasks || 0;

    const refetchTasks = () => {
        dispatch(getAllUserTasks({ page, limit }));
      };

  useEffect(() => {
    dispatch(getAllUserTasks({ page, limit }));
  }, [dispatch, page]);



  

  


  

return (
  <div className='h-screen flex flex-col'>
    <Header/>
    <MyTasks  setPage={setPage} page={page} data={data} totalTasks={totalTasks} limit={limit} refetchTasks={refetchTasks}/>
   
  </div>
)
}


export default MyTask