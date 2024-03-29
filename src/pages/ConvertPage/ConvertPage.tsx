import React, {useEffect, useState} from 'react';
import {IConvert, ICurrency} from "@/Interfaces";
import "./scss/ConvertPage.scss"
import Select from 'react-select'

import CircularProgress from "@mui/material/CircularProgress";
import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";


export const ConvertPage: React.FC = () => {
    const [currency, setCurrency] = useState<ICurrency[]>([]);
    let today = Date.parse(new Date().toISOString().slice(0, 10))

    const [loading,setLoading] = useState(false)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});

    useEffect(() => {
        const raw = JSON.parse(localStorage.getItem("currencies") || '[]')
        setCurrency(raw)
    }, [])
    useEffect(() => {

        const storedDate = localStorage.getItem("date")
        if (storedDate == null || today > Date.parse(storedDate)) {
            

                responseHandlerFunc( async ()=> {
                    const res = await Service.getCurrencies();
                    localStorage.setItem("currencies", JSON.stringify(res.data));
                    setCurrency(res.data.sort((o1, o2) => o1.charCode > o2.charCode ? 1 : o2.charCode > o1.charCode ? -1 : 0))
                    if (Date.parse(localStorage.getItem("date")!) != today) {
                        localStorage.setItem("date", new Date().toISOString().slice(0, 10))
                    }
                })

        }
    }, [])

    const [convert, setConvert] = useState<Omit<IConvert,"id">>({
        baseCurrency: "RUB",
        targetCurrency: "USD",
        result: 0,
        quantityToConvert: 0
    })

    const convertInputHandler = (field: string) => (e: any) => {
        setConvert({...convert, [field]: e.value})
    }
    const getResultHandler = async () => {

        responseHandlerFunc( async ()=> {
            const res = await Service.convert(convert);
            setConvert({...convert, result: res.data.result})

        })
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
                { loading ? <CircularProgress/> : <button onClick={getResultHandler} type="submit">Convert</button>}
            </div>

        </>
    )
}