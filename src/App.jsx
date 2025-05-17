import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Auth/Login"
import SingUp from "./Auth/SingUp"

import MainPage from "./Pages/MainPage"
import ProtectedRouter from "./ProtectedRouter"

import { ToastContainer } from "react-toastify"
import { Suspense } from "react"

function App() {
  

  return (
    <>
   <BrowserRouter>
   <ToastContainer />
   {/* <Suspense fallback={<div>Loading... Please wait...</div>}> */}
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/singup" element={<SingUp/>}/>

    

    <Route element={<ProtectedRouter/>}>
    <Route path="/main-page" element={<MainPage/>}/>

     






  
    </Route>
   </Routes>
 
   {/* </Suspense> */}
   
   </BrowserRouter>
    </>
  )
}

export default App
