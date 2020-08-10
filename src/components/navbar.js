import {FaCodeBranch, FaGithub, FaGraduationCap, FaIdCard, FaLinkedinIn, FaUsers} from "react-icons/fa";
import React from "react";

export function NavBar() {
    return (
        <ul className="nav justify-content-center">
            <NavBarItem link={'https://github.com/mzegar/resume/blob/master/Matthew%20Zegar%20-%20Resume%202019%201page.pdf'}>
                <FaIdCard className={'navBarItemIcon'}/> Resume
            </NavBarItem>

            <NavBarItem link={'https://github.com/mzegar'}>
                <FaGithub className={'navBarItemIcon'}/> GitHub
            </NavBarItem>

            <NavBarItem link={'https://www.linkedin.com/in/matthewzegar/'}>
                <FaLinkedinIn className={'navBarItemIcon'}/> LinkedIn
            </NavBarItem>
        </ul>
    );
}

function NavBarItem(props) {
    return (
        <div className={'navBarItemSpacing'}>
            <a href={props.link}>
                <button type="button" className="btn btn-outline-light">
                    {props.children}
                </button>
            </a>
        </div>
    );
}