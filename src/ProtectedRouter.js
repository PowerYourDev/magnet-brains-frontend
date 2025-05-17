import { Outlet,Navigate } from "react-router-dom"
// import {useSelector} from "react-redux"


const ProctedRouter = () => {

//   const user= useSelector((store)=>store?.userSlice?.data)
  
  const user = true
  return user ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export default ProctedRouter
