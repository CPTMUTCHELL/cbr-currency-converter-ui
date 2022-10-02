import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IConvert} from "@/Interfaces";

import {JwtToken} from "../../functions/JwtToken";
import {useToLogin} from "../../hooks/useToLogin"
import "./scss/ConvertPage.scss"
import {singletonTokenInstance} from "../../functions/Tokens";
import Select from 'react-select'

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
    const CURRENCIES_URL = "backend/convert/currencies";
    const CONVERT_URL = "backend/convert/convert";
    const [currency, setCurrency] = useState<ICurrency[]>([]);
    let today = Date.parse(new Date().toISOString().slice(0, 10))
    useEffect(() => {
        JwtToken(singletonTokenInstance.getToken().access)
        const raw = JSON.parse(localStorage.getItem("currencies") || '[]')
        setCurrency(raw)
    }, [])
    useEffect(() => {
        console.log("1 " + localStorage.getItem("date"))

        const storedDate = localStorage.getItem("date")
        if (storedDate == null || today > Date.parse(storedDate)) {
            JwtToken(token)
            axios
                .get<ICurrency[]>(CURRENCIES_URL, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
                .then((res) => {
                    localStorage.setItem("currencies", JSON.stringify(res.data));
                    console.log("2 " + localStorage.getItem("date"))
                    setCurrency(res.data.sort((o1,o2)=>o1.charCode > o2.charCode ? 1 : o2.charCode > o1.charCode ? -1 : 0))
                    if (Date.parse(localStorage.getItem("date")!) != today) {

                        localStorage.setItem("date", new Date().toISOString().slice(0, 10))
                        console.log("3 " + localStorage.getItem("date"))
                    }

                })
            //let the users look at html
                // .catch((err) => {
                //     performLogout(`Bad credentials \n ${err.response.data.error_message}`)
                // });
        }
    }, [])

    const [convert, setConvert] = useState<IConvert>({
        baseCurrency: "RUB",
        targetCurrency: "USD",
        result: 0,
        quantityToConvert: 0
    })

    const convertInputHandler = (field: string) => (e: any) => {

        setConvert({...convert, [field]: e.value})
    }
    const getResultHandler = () => {
        console.log(convert)
        JwtToken(token)

        axios

            .post<IConvert>(CONVERT_URL, convert, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                setConvert({...convert, result: res.data.result})
            })
            .catch((err) => {
                performLogout(`Bad credentials \n ${err.response.data.error_message}`)
            });

    }
    const options = (): { label: string, value: string }[] => {
        const res: { label: string, value: string }[] = [];
        currency.map(item => res.push({label: item.name.concat(" (" + item.charCode + ")"), value: item.charCode}))
        return res
    }

    return (
            <>
            <div className="convert-page-container">
                <div className="convert-el">
                    <div className="base">
                        <div className="select-container">

                            <p>Select base currency</p>
                                <Select onChange={convertInputHandler('baseCurrency')}
                                    value={options().find(item => item.label.includes(convert.baseCurrency))}
                                    defaultValue={options().find(item => item.label.includes("RUB"))}
                                    options={options()}
                                    classNamePrefix="custom-select" isSearchable
                            />
                        </div>
                        <input

                            onKeyPress={(event) => {
                                if (!/[.]|[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={(e) => setConvert({...convert, ["quantityToConvert"]: Number(e.target.value)})}
                            type="text" maxLength={6}
                            placeholder="amount to convert" required
                        />

                    </div>
                    <div className="target">
                        <div className="select-container">

                            <p>Select target currency</p>
                            <Select onChange={convertInputHandler('targetCurrency')}
                                    value={options().find(item => item.label.includes(convert.targetCurrency))}
                                    defaultValue={options().find(item => item.label.includes("RUB"))}
                                    options={options()}
                                    classNamePrefix="custom-select" isSearchable
                            />

                        </div>
                        <input readOnly value={convert.result}/>

                    </div>


                </div>
                    <button onClick={getResultHandler} type="submit">Convert</button>
            </div>

        </>
    )
}