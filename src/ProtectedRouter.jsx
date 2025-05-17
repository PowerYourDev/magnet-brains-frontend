import { Outlet,Navigate } from "react-router-dom"
import {useSelector} from "react-redux"


const ProctedRouter = () => {

  const user= useSelector((store)=>store?.userSlice?.data)
  

  return user.password ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export default ProctedRouter
