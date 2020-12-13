import {Jumbotron} from "react-bootstrap";
import {SubTitle, Title} from "../common/textstyles";
import mattPhoto from "../matt.jpg";
import React from "react";

export function Header() {
    return (
        <Jumbotron className={'text-center'}>
            <HeaderImage/>
            <Title>Matthew Zegar</Title>
            <SubTitle>Computer Science Student at Simon Fraser University</SubTitle>
        </Jumbotron>
    );
}

function HeaderImage() {
    return (
        <img className={'headerImage'} src={mattPhoto} alt='Matthew Zegar'/>
    );
}