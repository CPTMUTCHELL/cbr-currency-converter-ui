import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './scss/AboutPage.scss';
import logo from "./avatar.jpeg";


export const AboutPage: React.FC = () => {
    const [kazanUniState, setKazanUniState] = useState(false);
    const [moscowUniState, setMoscowUniState] = useState(false);
    const [smsoftExpState, setSmsoftExpState] = useState(false);
    const [cbrExp, setCbrExp] = useState(false);
    const [cbrUiExp, setCbrUiExp] = useState(false);

    return <>

        <div className="about-page">
                <div className="image-wrapper" >
            <img src={logo} width="340" height="340"/>
                </div>

            <a style={{textDecoration:"none"}} href="/resume.pdf" download="resume.pdf">
                <div className="download__btn">
                    <span>
                    Download CV (PDF)</span>
                </div>
            </a>
            <div className="about-grid">
            <ul>
                <li>
                    <h2>Education</h2>

                    <div className="info">
                        <div className="text-block">

                            <h3>
                                Kazan Power State University (2015 - 2019)
                            </h3>
                    <span>
                        I have studied in the university for 4 years ( 2015 - 2019 ) and graduated as a bachelor with "designer of power supplies" speciality, the main software I used was Autocad.

                      </span>
                        </div>


                        <div className="text-block">

                        <h3>Moscow Power Engineering Institute (2019-2021)</h3>
                        <span>
                        After I graduated as bachelor I moved to Moscow to apply for Master's as a "Relay protection engineer".
                        I studied 2 terms of Java, one term of Python and one term of ML.
                        My experience from those lessons is the development of relay protection algorithms, but there was one lesson per 2 or 3 weeks.
                        After two terms had passed I decided it'd be a waste not to use this knowledge of Java.
                        Although at first I didn't like programming because of it's complexity, but I decided to go further,
                        so I started learning Java core, Spring, SQL, e.t.c alongside with the uni studying during free time and on April of 2021 I got my first job as a develop.
                    </span>
                            </div>

                            </div>

                </li>

                <li>
                    <h2>Experience</h2>

                    <div className="info">

                        <div className="text-block">


                                <h3>Smartsoft (10/2020 - present)</h3>

                    <span>As a Java developer I create Spring web services, write jenkinsfile, dockerize them and deploy to
Openshift. Sometimes I do help with frontend apps (React) and drink coffee. The code quality is checked by Sonarqube's quality gates and test coverage.
One of the projects I have been working under with a collegue is repository parser. It retrieves
different ( around 40 metrics ) data like paths, insides of sql scripts , e.t.c and builds JSON file with
comprehensive information about a repo. Aside from writing parsing and data retrieval logic I helped to
create sql views to group by the data for frontend team for further representation.
My other noticable projects are:
1. Admin ui, this service allows a customer to administrate a third party application. which is configured via PostgresDB, ui is a user friendly tool and backend side validates all the data, so no incorrect data goes to the configuration database. I do both frontend and backend on that project.
2. Testing protocol document generator which saves time of the QA team. It retrieves data from the testing database and substitutes to .docx protocol, the testers don't have to manually perform SELECT queries
                    </span>
                    </div>
                    </div>

                </li>
                <li>
                    <h2>Projects</h2>

                    <div className="info">
                        <div className="text-block">


                                <h3>Cbr-currency-converter</h3>

                    <span>Converts currencies according to Russian Central Bank rates, stores the history and supports JWT role-based authentication and authorization.
                        It can be run in docker-compose, in local k8s cluster or on a cloud provider.
                        Using Ansible I have automated Jenkins setup, creation of pipelines and webhooks is accomplished by JCasc, creation of k3s cluster, transfer kubeconfig to Jenkins VM to restrict Jenkins within specific namespace and acquiring tls certificates from Let's encrypt with Traefik.
                        The project's main purpose is to practice with technologies such as Jenkins, K8s, Helm, Docker, Ansible, Traefik.
                        More details are available in Readme.
                    </span>
                                    <a href="https://github.com/CPTMUTCHELL/cbr-currency-converter/tree/k8s">Github</a>
                        </div>


                        <div className="text-block">


                                <h3>Cbr-currency-converter-ui</h3>

                    <span>Frontend for Cbr-currency-converter. Here I learn HTML, CSS, React, TS.
                        I try to write my own styles, without any libraries for practice.
                        The app stores JWT tokens in Local storage.
                        Some components are not available for certain roles.
                    </span>
                                    <a href="https://github.com/CPTMUTCHELL/cbr-currency-converter-ui">Github</a>

                        </div>
                        </div>
                </li>
            </ul>


                </div>
        </div>

    </>
}