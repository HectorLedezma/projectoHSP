import {  Route, Routes, useParams } from "react-router-dom";
import Screen from "../screen";
import Test from "../data/test";
import MainMenu from "../screen/menu";

function ProfilePage() {
    // Get the userId param from the URL.
    let { dpto } = useParams();
    // ...
    return(<Screen dpto={dpto}/>)
  }

function Rutas(){
    return(
        <Routes>
            <Route path="/" element={<MainMenu/>}/>
            <Route path="/piso">
                <Route path=":dpto" element={<ProfilePage/>}/>
            </Route> {/* 👈 Renders at /app/ */}
            <Route path="/test" element={<Test/>}/>
        </Routes>
    )
}

export default Rutas