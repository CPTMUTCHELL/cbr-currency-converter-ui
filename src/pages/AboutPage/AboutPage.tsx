import React from 'react';
import logo from "./avatar.jpeg";
import './scss/AboutPage.scss';
import resume from "./resume.pdf"

import {AccordionGroup, AccordionGroupType, BulletList, BulletListType} from "@/pages/AboutPage/AboutComponents";

const moscowUniExp:BulletListType =
    [
        <a href="https://github.com/CPTMUTCHELL/Relay-protection-algorithms">Relay protection algorithms</a>,
        <a href="https://github.com/CPTMUTCHELL/GOOSE_Parser">GOOSE parser</a>,
        <span>Stm32 microcontroller programming using C and HAL library</span>,
        <a href="https://github.com/CPTMUTCHELL/ML">ML. Neural networks, optimization algorithms </a>
    ]
const smartsoftExp:BulletListType =
    [
        <span> Design and development of Spring microservices</span>,
        <span> Code documentation (Swagger)</span>,
       <span> Creation CI/CD pipelines (Jenkins, Bash) and deployment (Docker, Helm, Openshift)</span>,
       <span> Frontend development (React, AntD)</span>,
       <span> Support and extend existing microservices</span>,
       <span> Code quality (Unit tests, Sonarqube)</span>
    ]
const cbrExp:BulletListType =
    [
        <span> Jenkins</span>,
        <span> Kubernetes</span>,
        <span> Helm</span>,
        <span> Docker</span>,
        <span> Ansible</span>,
        <span> Traefik</span>,
        <span> RabbitMQ</span>,
        <span> Kotlin</span>
    ]
const cbrUiExp:BulletListType =
    [
        <span> HTML</span>,
        <span> SCSS</span>,
        <span> React</span>,
        <span> Material UI</span>,
        <span> Typescript</span>,
        <span> Webpack</span>
    ]

const aboutInfo: AccordionGroupType = {

    group: [
        {
            groupTitle: "Education",
            sub: [{
                title: "Kazan Power State University (2015 - 2019)",
                value: <span>I have studied in the university for 4 years ( 2015 - 2019 ) and graduated as a bachelor
                        "with "designer of power supplies" speciality, the main software I used was Autocad.</span>
            }, {
                title: "Moscow Power Engineering Institute (2019-2021)",
                value: <span>  After I graduated as bachelor I moved to Moscow to apply for Master's as a "Relay
                                protection engineer".
                                I studied 2 terms of Java, one term of Python and one term of ML.
                                My experience from those lessons is the development of relay protection algorithms, but
                                there was one lesson per 2 or 3 weeks.
                                <p>
                                Projects:
                                    <BulletList data={moscowUniExp}/>
                                </p>

                                After two terms had passed I decided it'd be a waste not to use this knowledge of Java.
                                Although at first I didn't like programming because of it's complexity, but I decided to
                                go further,
                                so I started learning Java core, Spring, SQL, e.t.c alongside with the uni studying
                                during free time and on April of 2021 I got my first job as a develop. </span>
            }
            ]
        },
        {
            groupTitle: "Experience",
            sub: [{
                title: "Smartsoft (04/2020 - present)",
                value:
                    <span>
                        <BulletList data={smartsoftExp}/>
                        Participated in company’s qualification courses as a lector. Created few lessons about advanced PostgreSQL and basics of NoSQL.
                    </span>
            }]
        },
        {
            groupTitle: "Projects",
            sub: [{
                title: "Cbr-currency-converter",
                value:
                    <span>Converts currencies according to Russian Central Bank rates, stores the history and supports JWT role-based authentication and authorization.
                        It can be run in docker-compose, in local k8s cluster or on a cloud provider.
                        Using Ansible I have automated Jenkins setup, creation of pipelines and webhooks is accomplished by JCasc, creation of k3s cluster, transfer kubeconfig to Jenkins VM to restrict Jenkins within specific namespace and acquiring tls certificates from Let's encrypt with Traefik.
                        The project is deployed on GCP, the latter is configured via Terraform
                        The project's main purpose is to practice with technologies such as:
                     <BulletList data={cbrExp}/>

                        More details are available in Readme.   <a href="https://github.com/CPTMUTCHELL/cbr-currency-converter">Github link</a>
                    </span>

            },
                {
                    title: "Cbr-currency-converter-ui",
                    value:
                        <span>
                      Frontend for Cbr-currency-converter. Here I practice with:
                            <BulletList data={cbrUiExp}/>
                        The app stores JWT tokens in Local storage.
                        Some pages are access-restricted based on JWT roles.   <a href="https://github.com/CPTMUTCHELL/cbr-currency-converter-ui">Github link</a>
                    </span>
                }]
        }

    ]

}

export const AboutPage: React.FC = () => {
    return <>

        <div className="about-page">
            <div className="image-wrapper">
                <img src={logo} width="340" height="340"/>
            </div>

            <a style={{textDecoration: "none"}} href={resume} download="resume.pdf">
                <div className="download__btn">
                    <span>
                    Download CV (PDF)</span>
                </div>
            </a>
            <AccordionGroup data={aboutInfo}/>
        </div>

    </>
}