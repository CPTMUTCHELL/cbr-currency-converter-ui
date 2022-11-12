import React, {useEffect, useState} from 'react';
import {IConvert} from "@/Interfaces";

import {JwtToken} from "src/functions/JwtToken";
import {useToLogin} from "src/hooks/useToLogin"
import "./scss/ConvertPage.scss"
import {singletonTokenInstance} from "src/functions/Tokens";
import Select from 'react-select'
import {useAxiosFunction} from "src/hooks/useAxiosFunction";
import CircularProgress from "@mui/material/CircularProgress";

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
    const [getCurrenciesFuncLoading, getCurrenciesFunc] = useAxiosFunction< never,ICurrency[]>({
        method: "GET",
        url: CURRENCIES_URL,
        headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}
    })
    const [convertFuncLoading, convertFunc] = useAxiosFunction<IConvert, IConvert>({
        method: "POST",
        url: CONVERT_URL,
        headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}
    })


    useEffect(() => {
        JwtToken(singletonTokenInstance.getToken().access)
        const raw = JSON.parse(localStorage.getItem("currencies") || '[]')
        setCurrency(raw)
    }, [])
    useEffect(() => {

        const storedDate = localStorage.getItem("date")
        if (storedDate == null || today > Date.parse(storedDate)) {
            JwtToken(token)
            const getCurrencies = async () => {
                const res = await getCurrenciesFunc();
                const {response, error} = res;
                if (response) {
                    localStorage.setItem("currencies", JSON.stringify(response.data));
                    setCurrency(response.data.sort((o1, o2) => o1.charCode > o2.charCode ? 1 : o2.charCode > o1.charCode ? -1 : 0))
                    if (Date.parse(localStorage.getItem("date")!) != today) {
                        localStorage.setItem("date", new Date().toISOString().slice(0, 10))
                    }
                }

            }

            getCurrencies();


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
    const getResultHandler = async () => {
        JwtToken(token)
        const res = await convertFunc(convert);
        const {response, error} = res;
        if (response)
            setConvert({...convert, result: response.data.result})
        if (error) performLogout(`Bad credentials \n ${error}`)

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
                { convertFuncLoading ? <CircularProgress/> : <button onClick={getResultHandler} type="submit">Convert</button>}
            </div>

        </>
    )
}