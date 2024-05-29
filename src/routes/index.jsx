import {  Route, Routes } from "react-router-dom";
import Screen from "../screen";
import Test from "../data/test";


function Rutas(){
    return(
        <Routes>
            <Route path="/" element={<Screen/>}/> {/* 👈 Renders at /app/ */}
            <Route path="/test" element={<Test/>}/>
        </Routes>
    )
}

export default Rutas