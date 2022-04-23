import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {IConvert} from "../../Interfaces";

import {JwtToken} from "../../functions/JwtToken";
import { NavLink} from 'react-router-dom'
import {useToLogin} from "../../hooks/useToLogin"

import {singletonTokenInstance} from "../../functions/Tokens";

interface ICurrency {
    "date": Date
    "id": string,
    "numCode": number,
    "charCode": string,
    "nominal": number,
    "name": string,
    "value": number
}

export const ConvertPage: React.FC = () => {
    const token = localStorage.getItem("access")!
    const {performLogout} = useToLogin();
    // useEffect(()=>{
    //
    //
    //         performValidation(token)
    //         //might be new if expired during page refresh
    //         setUserToken(getUser(localStorage.getItem("access")!))
    //
    // },[])
    const CURRENCIES_URL = "http://localhost:8082/convert/currencies";
    const CONVERT_URL = "http://localhost:8082/convert/convert";
    const [currency, setCurrency] = useState<ICurrency[]>([]);
    // const [storedDate, setDate] = useState<number>();

    let today=Date.parse(new Date().toISOString().slice(0,10))
    useEffect(()=>{
        JwtToken(singletonTokenInstance.getToken().access)
        const raw = JSON.parse(localStorage.getItem("currencies") || '[]')
        setCurrency(raw)
    },[])
    useEffect(()=> {
        console.log("1 "+localStorage.getItem("date"))

        const storedDate= localStorage.getItem("date")
        if (storedDate == null || today > Date.parse(storedDate ) ) {
            JwtToken(token)
            axios
                .get<ICurrency[]>(CURRENCIES_URL, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
                .then((res) => {
                    localStorage.setItem("currencies", JSON.stringify(res.data));
                    console.log("2 "+localStorage.getItem("date"))

                    setCurrency(res.data)
                    if (Date.parse(localStorage.getItem("date")!)!= today) {

                        localStorage.setItem("date", new Date().toISOString().slice(0,10))
                        console.log("3 "+localStorage.getItem("date"))
                    }

                })
                .catch((err) => {
                    performLogout   (`Bad credentials \n ${err.response.data.error_message}`)
                });

            //sunday


        }
    },[])
    //
    // useEffect(() => {
    //     localStorage.setItem("currencies", JSON.stringify(currency));
    // }, [currency])
    const [convert, setConvert] = useState<IConvert>({baseCurrency:"NOK",targetCurrency:"NOK",result:0,quantityToConvert:0})

    const convertInputHandler = (field: string) => (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setConvert({...convert, [field]: e.target.value})
    }
    const getResultHandler = () => {
        JwtToken(token)

        axios

            .post<IConvert>(CONVERT_URL, convert,{headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                setConvert({...convert, result:res.data.result})
            })
            .catch((err) => {
                performLogout   (`Bad credentials \n ${err.response.data.error_message}`)
            });

    }


    return (
        <>
                <div>
                <select  onChange={convertInputHandler('baseCurrency')}>
                    {currency.map(item => {
                        return (
                            <option  key={item.charCode} value={item.charCode}>{item.name} ({item.charCode})</option>);
                    })}
                </select>
                <input

                    onKeyPress={(event) => {
                        if (!/[.]|[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    onChange={convertInputHandler('quantityToConvert')} type="text" maxLength={6}  placeholder="amount to convert" required
                />

                </div>



            <div>
                <select  onChange={convertInputHandler('targetCurrency')}>
                    {currency.map(item => {
                        return (
                            <option key={item.charCode} value={item.charCode}>{item.name} ({item.charCode})</option>);
                    })}
                </select>
                <input readOnly value={convert.result}/>

            </div>
                <button onClick={getResultHandler} type="submit">Convert</button>



        </>
    )
}