import React, {useState, useContext, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './AboutPage.css';
import logo from "./avatar.png";


export const AboutPage: React.FC = () => {
    const [kazanUniState, setKazanUniState] = useState(false);
    const [moscowUniState, setMoscowUniState] = useState(false);
    const [smsoftExpState, setSmsoftExpState] = useState(false);
    const [cbrExp, setCbrExp] = useState(false);
    const [cbrUiExp, setCbrUiExp] = useState(false);

    return <>

        <div className="about-page">
                <div className="image-wrapper" >
            <img src={logo}/>
                </div>
            <button className="btnCv">
                <Link style={{textDecoration:"none"}} to="/resume.pdf" target="_blank" download>Download CV</Link>
            </button>

            <ul>
                <li>
                    <div className="name-alignment">
                    <h3>Education</h3>

                        <div  className="dropdownBtn-container">
                        <button  className="dropdownBtn" onClick={()=>setKazanUniState(!kazanUniState)}>
                            <i className={`arrow ${kazanUniState ? `up` : `down`}`}/>
                            <span className="btnName">
                                Kazan Power State University (2015 - 2019)
                            </span>
                        </button>
                        {kazanUniState ?
                        <div className="box">
                    <span>
                        I have studied in the university for 4 years ( 2015 - 2019 ) and graduated as a bachelor with "designer of power supplies" speciality, the main software I used was Autocad.

                      </span>
                        </div> : null}

                    <button className="dropdownBtn" onClick={()=>setMoscowUniState(!moscowUniState)}>
                        <i className={`arrow ${moscowUniState ? `up` : `down`}`}/>

                        <span className="btnName">Moscow Power Engineering Institute (2019-2021)</span></button>
                    {moscowUniState ?
                        <div className="box">
                    <span>
                        After I graduated as bachelor I moved to Moscow to apply for Master's as a "Relay protection engineer".
                        I studied 2 terms of Java, one term of Python and one term of ML.
                        My experience from those lessons is the development of relay protection algorithms, but there was one lesson per 2 or 3 weeks.
                        After two terms had passed I decided it'd be a waste not to use this knowledge of Java.
                        Although at first I didn't like programming because of it's complexity, but I decided to go further,
                        so I started learning Java core, Spring, SQL, e.t.c alongside with the uni studying during free time and on April of 2021 I got my first job as a develop.
                    </span>
                        </div> : null}
                        </div>
                    </div>
                </li>

                <li>
                    <div className="name-alignment">
                <h3>Experience</h3>

                        <div className="dropdownBtn-container">
                            <button className="dropdownBtn" onClick={()=>setSmsoftExpState(!smsoftExpState)}>
                                <i className={`arrow ${smsoftExpState ? `up` : `down`}`}/>

                                <span className="btnName">Smartsoft (10/2020 - present)</span></button>
                            {smsoftExpState ?
                                <div  className="box">
                    <span>As a Java developer I create Spring web services, write jenkinsfile, dockerize them and deploy to
Openshift. Sometimes I do help with frontend apps (React) and drink coffee. The code quality is checked by Sonarqube's quality gates.
One of the projects I have been working under with a collegue is repository parser. It retrieves
different ( around 40 metrics ) data like paths, insides of sql scripts , e.t.c and builds JSON file with
comprehensive information about a repo. Aside from writing parsing and data retrieval logic I helped to
create sql views to group by the data for frontend team for further representation.
My other noticable projects are:
1. Admin ui, where I drew the model in draw.io for our designer and then helped to create an admin ui
for one of our projects
2. Testing protocol document generator which saves time of the QA team</span>
                                </div> : null}

                        </div>
                        </div>
                </li>
                <li>
                    <div className="name-alignment">
                    <h3>Projects</h3>

                        <div className="dropdownBtn-container">
                            <button className="dropdownBtn" onClick={()=>setCbrExp(!cbrExp)}>
                                <i className={`arrow ${cbrExp ? `up` : `down`}`}/>
                                <span className="btnName">Cbr-currency-converter</span></button>
                            {cbrExp ?
                                <div className="box">
                    <span>Converts currencies according to Russian Central Bank rates, stores the history and supports JWT role-based authentication and authorization.
                        It can be run in docker-compose, in local k8s cluster or on a cloud provider.
                        Using Ansible I have automated Jenkins setup, creation of pipelines and webhooks is accomplished by JCasc, creation of k3s cluster, transfer kubeconfig to Jenkins VM to restrict Jenkins within specific namespace and acquiring tls certificates from Let's encrypt with Traefik.
                        The project's main purpose is to practice with technologies such as Jenkins, K8s, Helm, Docker, Ansible, Traefik.
                        More details are available in Readme.
                    </span>
                                    <a href="https://github.com/CPTMUTCHELL/cbr-currency-converter/tree/k8s">Github</a>
                                </div> : null}



                            <button className="dropdownBtn" onClick={()=>setCbrUiExp(!cbrUiExp)}>
                                <i className={`arrow ${cbrUiExp ? `up` : `down`}`}/>

                                <span className="btnName">Cbr-currency-converter-ui</span></button>
                            {cbrUiExp ?
                                <div  className="box">
                    <span>Frontend for Cbr-currency-converter. Here I learn HTML, CSS, React, TS.
                        I try to write my own styles, without any libraries for practice.
                        The app stores JWT tokens in Local storage.
                        Some components are not available for certain roles.
                    </span>
                                    <a href="https://github.com/CPTMUTCHELL/cbr-currency-converter-ui">Github</a>
                                </div> : null}

                        </div>
                    </div>
                </li>
            </ul>


                </div>

    </>
}