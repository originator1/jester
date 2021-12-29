import React from 'react';
import logo from '../images/jesterHeader.jpg';
import { Card } from "react-bootstrap";
import '../App.css';

function Main() {
    return (
        <div className="main">
        <Card className="mainImg">

        <img className="imageFrame" src={logo} alt="landing page large logo"/>


        </Card>
        </div>
    )
}

export default Main