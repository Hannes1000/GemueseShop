//import { Button } from 'antd';
import React from 'react'
import { FaCode } from "react-icons/fa";
import "./LandingPage.css"
import { Button } from '@material-ui/core';

function LandingPage() {
    return (
        <>
            <div className="app">
                <div className="startseite"></div>
                <p id="überschrift">Gemüse Shop</p>
                <p id="unterschrift">Frisches Gemüse vom Bauernhof aus Südtirol</p>
                <Button id="einkaufen" variant="outlined" color="primary" href="/product/view">Bestellen</Button>
            </div>
        </>
    )
}

export default LandingPage
