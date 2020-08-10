import {ContainerLink, ContainerText, ContainerTitle, Date} from "../common/textstyles";
import {Card} from "@material-ui/core";
import React from "react";

export function Body() {
    return (
        <div className="container center">
            <div className="row">
                <div className="col-md-8">
                    <CustomContainer title={'About Me'}>
                        Hello! My name is Matthew Zegar, I am currently doing an internship at HomeX. This website
                        contains all relevant information regarding my work experience, projects,
                        and education.
                    </CustomContainer>
                </div>
                <div className="col-md">
                    <CustomContainer title={'Contact Me'}>
                        <a href="mailto:matthewzegar@gmail.com">matthewzegar@gmail.com</a>
                        <br/>
                        <br/>
                        <br/>
                    </CustomContainer>
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <CustomContainer title={'Work Experience'}>
                        <ContainerLink><a href="https://homex.com/">HomeX - Mobile Developer Internship</a></ContainerLink> <Date>(May 2020 - Sept 2020)</Date>
                        <ul>
                            <li>Built core user functionality on pre-production IOS/Android consumer mobile app using Flutter</li>
                            <li>Developed automated end-to-end tests in Dart ran using GitHub actions</li>
                            <li>Constructed app pages using MVVM (Model-View-ViewModel) and GraphQL endpoints</li>
                        </ul>

                        <ContainerLink><a href="https://kabam.com/">Kabam - Software Engineer Co-op</a></ContainerLink> <Date>(May 2019 - Dec 2019)</Date>
                        <ul>
                            <li>Worked alongside three different teams during the duration of the co-op (Front-end, Systems, Back-end)</li>
                            <li>Implemented features using C# played by hundreds of thousands of users</li>
                            <li>Optimized game code to improve game performance and reduce game crashes</li>
                            <li>Improved server web interface usability using Javascript, jQuery, and Node.js</li>
                            <li>Fixed bugs and problem solved live in-game issues over multiple releases</li>
                        </ul>
                    </CustomContainer>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <CustomContainer title={'Languages'}>
                        C++, C#, Dart, Python, JavaScript, Java
                    </CustomContainer>
                </div>
                <div className="col-md-6">
                    <CustomContainer title={'Tools / Libraries'}>
                        Git, Flutter, React, Spring, Node.js, Bootstrap, JavaFX, SQL
                    </CustomContainer>
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <CustomContainer title={'Projects'}>
                        <ContainerLink><a href="https://github.com/mzegar/Retter">Retter - Flutter Reddit App</a></ContainerLink> <Date>Dart, Flutter – (June 2020)</Date>
                        <ul>
                            <li>A complete Reddit experience built using Flutter</li>
                            <li>Open sourced and contributed to by other developers</li>
                            <li>Available on IOS and Android</li>
                        </ul>

                        <ContainerLink><a href="https://github.com/mzegar/Social-Gaming-App">Social Gaming App</a></ContainerLink> <Date>C++, GoogleTest, CMake – (Jan 2020 - April 2020)</Date>
                        <ul>
                            <li>Developed the application using modern C++ practices</li>
                            <li>Created a build system using CMake</li>
                            <li>Wrote extensive testing for the application using the GoogleTest framework</li>
                            <li>Led the eight person group as the "Project Manager"</li>
                        </ul>

                        <ContainerLink><a href="https://github.com/mzegar/Chip8-Preview/blob/master/README.md">JavaScript Chip8 Emulator</a></ContainerLink> <Date>JavaScript, Bootstrap – (Jan 2019 - April 2019)</Date>
                        <ul>
                            <li>Played the role of GitHub master and managed the repository for group members</li>
                            <li>Implemented all front-end work for the project (using JavaScript, Bootstrap, HTML)</li>
                            <li>Designed the internal program structure according to Chip8 system specifications</li>
                        </ul>

                        <ContainerLink>Database Interface App</ContainerLink> <Date>Java, JavaFX, Spring – (April 2019)</Date>
                        <ul>
                            <li>Setup a Spring server that provides Rest API (CRUD)</li>
                            <li>Rest API calls modify the "Database" with the information passed in</li>
                            <li>Designed a front-end JavaFX application responsible for providing UI and making client calls to the server</li>
                        </ul>

                        <ContainerLink><a href="https://github.com/mzegar/Invoke">Invoke</a></ContainerLink> <Date>C#, Unity – (Dec 2018)</Date>
                        <ul>
                            <li>Participated in the “Homemade Game Jam” by creating a mobile game within Unity</li>
                            <li>Designed all visual assets and programming used within the game</li>
                            <li>Complied a mobile and web version</li>
                        </ul>

                        <ContainerLink><a href="https://github.com/mzegar/Tetracube">Tetracube</a></ContainerLink> <Date>Python, Pygame – (Oct 2018)</Date>
                        <ul>
                            <li>Recreated NES Tetris using Python and Pygame library</li>
                            <li>Implemented an OOP approach to represent Tetris pieces in memory</li>
                            <li>Compiled all Python code to an executable using cx_Freeze makefile</li>
                        </ul>

                        <ContainerLink><a href="https://github.com/mzegar/dotabot">Dotabot</a></ContainerLink> <Date>JavaScript, Node.js, Heroku – (May 2018)</Date>
                        <ul>
                            <li>Gathers API information from a server and neatly formats it for users requesting data</li>
                            <li>Allows users to input their unique ID to request specific information about their statistics</li>
                            <li>Hosted on Heroku to maintain constant uptime</li>
                        </ul>

                        <ContainerLink><a href="https://github.com/mzegar?tab=repositories">Other projects</a></ContainerLink>
                        <ul>
                            <li>Other projects can be found on my GitHub</li>
                            <li><a href="https://github.com/mzegar/LearnPianoNotes">Piano Note learning App</a></li>
                            <li><a href="https://github.com/mzegar/smashbot">Twitterbot made with Node.js</a></li>
                            <li><a href="https://github.com/mzegar/Minesweeper-Cplusplus">Minesweeper coded using C++</a></li>
                            <li><a href="https://github.com/mzegar/Connect4">Connect4 in TypeScript</a></li>
                        </ul>
                    </CustomContainer>
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <CustomContainer title={'Education'}>
                        <p>BSc. Software Systems - Computer Science   <i>(Sept 2017 - Sept 2021)</i></p>
                        <i>Simon Fraser University, Burnaby, British Columbia</i>
                    </CustomContainer>
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <CustomContainer title={'Courses'}>
                        <div className="row">
                            <div className="col-md">
                                <ContainerLink>Programming</ContainerLink>
                                <ul>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/summer/courses/cmpt/225.html">Data
                                        Structures and Programming</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/cmpt/276.html">Introduction
                                        to Software Engineering</a></li>
                                    <li><a href="http://www.sfu.ca/students/calendar/2020/spring/courses/cmpt/354.html">Database
                                        Systems</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/cmpt/135.html">OOP
                                        using C++</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/cmpt/213.html">OOP
                                        using Java</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/cmpt/295.html">Introduction
                                        to Computer Systems</a></li>
                                </ul>
                            </div>
                            <div className="col-md">
                                <ContainerLink>Mathematics</ContainerLink>
                                <ul>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/summer/courses/math/150.html">Calculus
                                        I</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/math/232.html">Linear
                                        Algebra</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/macm/101.html">Discrete
                                        Mathematics I</a></li>
                                    <li><a href="https://www.sfu.ca/students/calendar/2020/spring/courses/macm/201.html">Discrete
                                        Mathematics II</a></li>
                                </ul>
                            </div>
                        </div>
                    </CustomContainer>
                </div>
            </div>
        </div>
    );
}

function CustomContainer(props) {
    return (
        <Card className={'customContainer'}>
            <ContainerTitle>{props.title}</ContainerTitle>
            <ContainerText>{props.children}</ContainerText>
            <br/>
        </Card>
    );
}