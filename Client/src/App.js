import './App.css';
import React from "react"
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateSuperhero from "./pages/CreateSuperhero/CreateSuperhero";
import SuperheroDetails from "./pages/SuperheroDetails/SuperheroDetails";
import Header from "./components/Header/Header";
import EditSuperhero from "./pages/EditSuperhero/EditSuperhero";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className='container mainContainer'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/createSuperhero" element={<CreateSuperhero/>}/>
                    <Route path="/hero/:id" element={<SuperheroDetails/>}/>
                    <Route path="/hero/:id/edit" element={<EditSuperhero/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
