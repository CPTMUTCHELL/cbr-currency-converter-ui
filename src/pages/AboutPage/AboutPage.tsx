import React, {useState, useContext, useEffect, useRef} from 'react';

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
            <div className="align-aboutPage-content">
                <div style={{display:"flex" ,justifyContent:"center"}}>
            <img src={logo}/>
                </div>
                <div>
            <ul>
                <li>
                    <div className="name-alignment">
                    <h3>Education</h3>

                        <div className="dropdownBtn-container">
                        <button className="dropdownBtn" onClick={()=>setKazanUniState(!kazanUniState)}>
                            <i className={`arrow ${kazanUniState ? `up` : `down`}`}/>
                            <span className="btnName">

                                Kazan Power State University
                            </span>
                        </button>
                        {kazanUniState ?
                        <div className="box">
                    <span>I am a Java developer with a Bachelor’s degree and unfinished Master’s degree in electrician engineering. During master’s studying I put my eye on Java programming language and since that it’s my passion. In one and a half years of studying alongside with the university I found my first job as a developer, where since I’ve been working.

I enjoy being challenged with complex projects that require me to dive into design patterns and technologies. That is the way when you level up as a software developer I like to write code, put applications into containers to run them in a cluster and deliver the product to a customer. The progress starts with difficulties, as the degradation with easiness.</span>
                        </div> : null}

                    <button className="dropdownBtn" onClick={()=>setMoscowUniState(!moscowUniState)}>
                        <span className="btnName">Moscow Power Engineering Institute</span></button>
                    {moscowUniState ?
                        <div className="box">
                    <span>I am a Java developer with a Bachelor’s degree and unfinished Master’s degree in electrician engineering. During master’s studying I put my eye on Java programming language and since that it’s my passion. In one and a half years of studying alongside with the university I found my first job as a developer, where since I’ve been working.

I enjoy being challenged with complex projects that require me to dive into design patterns and technologies. That is the way when you level up as a software developer I like to write code, put applications into containers to run them in a cluster and deliver the product to a customer. The progress starts with difficulties, as the degradation with easiness.</span>
                        </div> : null}
                        </div>
                    </div>
                </li>




                <li>
                    <div className="name-alignment">
                <h3>Experience</h3>

                        <div className="dropdownBtn-container">
                            <button className="dropdownBtn" onClick={()=>setSmsoftExpState(!smsoftExpState)}>
                                <span className="btnName">Smartsoft</span></button>
                            {smsoftExpState ?
                                <div className="box">
                    <span>I am a Java developer with a Bachelor’s degree and unfinished Master’s degree in electrician engineering. During master’s studying I put my eye on Java programming language and since that it’s my passion. In one and a half years of studying alongside with the university I found my first job as a developer, where since I’ve been working.

I enjoy being challenged with complex projects that require me to dive into design patterns and technologies. That is the way when you level up as a software developer I like to write code, put applications into containers to run them in a cluster and deliver the product to a customer. The progress starts with difficulties, as the degradation with easiness.</span>
                                </div> : null}

                        </div>
                        </div>
                </li>
                <li>
                    <div className="name-alignment">
                    <h3>Projects</h3>

                        <div className="dropdownBtn-container">
                            <button className="dropdownBtn" onClick={()=>setCbrExp(!cbrExp)}>
                                <span className="btnName">Cbr-currency-converter</span></button>
                            {cbrExp ?
                                <div className="box">
                    <span>I am a Java developer with a Bachelor’s degree and unfinished Master’s degree in electrician engineering. During master’s studying I put my eye on Java programming language and since that it’s my passion. In one and a half years of studying alongside with the university I found my first job as a developer, where since I’ve been working.

I enjoy being challenged with complex projects that require me to dive into design patterns and technologies. That is the way when you level up as a software developer I like to write code, put applications into containers to run them in a cluster and deliver the product to a customer. The progress starts with difficulties, as the degradation with easiness.</span>
                                </div> : null}



                            <button className="dropdownBtn" onClick={()=>setCbrUiExp(!cbrUiExp)}>
                                <span className="btnName">Cbr-currency-converter-ui</span></button>
                            {cbrUiExp ?
                                <div className="box">
                    <span>I am a Java developer with a Bachelor’s degree and unfinished Master’s degree in electrician engineering. During master’s studying I put my eye on Java programming language and since that it’s my passion. In one and a half years of studying alongside with the university I found my first job as a developer, where since I’ve been working.

I enjoy being challenged with complex projects that require me to dive into design patterns and technologies. That is the way when you level up as a software developer I like to write code, put applications into containers to run them in a cluster and deliver the product to a customer. The progress starts with difficulties, as the degradation with easiness.</span>
                                </div> : null}

                        </div>
                    </div>
                </li>
            </ul>
                </div>

            </div>
        </div>
    </>
}