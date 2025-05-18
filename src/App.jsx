import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Auth/Login.jsx"
import SingUp from "./Auth/SingUp.jsx"

import MainPage from "./Pages/MainPage"
import Dashboard from "./Pages/Dashboard"
import TaskEdit from "./Pages/TaskEdit"
import MyTasks from "./Pages/MyTasks"

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
    <Route path="/task-create" element={<MainPage/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/task-edit/:id" element={<TaskEdit/>}/>
    <Route path="/my-tasks" element={<MyTasks/>}/>




     






  
    </Route>
   </Routes>
 
   {/* </Suspense> */}
   
   </BrowserRouter>
    </>
  )
}

export default App
