import React, {useEffect, useState} from 'react';
import {JwtToken} from "../../functions/JwtToken";
import axios from "axios";
import {IHistoryPage} from "../../Interfaces";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import "./HistoryPage.css"
import {singletonTokenInstance} from "../../functions/Tokens";
import {useToLogin} from "../../hooks/useToLogin";

const pageSizes: number[] = [5, 10, 25]
export const HistoryPage: React.FC = () => {

    const [pageNum, setPageNum] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(5)
    const [dir, setDir] = useState<string>("desc")
    const [sortField, setSortField] = useState<string>("date")
    const [baseCurrency, setBaseCurrency] = useState<string>("")
    const [targetCurrency, setTargetCurrency] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const {performLogout} = useToLogin();

    const [hpage, setPage] = useState<IHistoryPage>();
    const [pageNumSelect, setPageNumSelect] = useState<number>(1)
    const url = (`/backend/history/show/${pageNum + 1}?pageSize=${pageSize}
    &sortField=${sortField}&dir=${dir}&baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&date=${date}`);

    //to reduce auth-service calls
    useEffect(() => {
        JwtToken(localStorage.getItem("access")!)
    }, [])
    useEffect(() => {
        setPageNumSelect(pageNum + 1)
        axios
            .get<IHistoryPage>(url, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                setPage(res.data)
            })
            //don't logout
            // .catch((err) => {
            //     performLogout(`Bad credentials \n ${err.response.data.error_message}`)
            // });
    }, [pageNum, pageSize, sortField, dir, baseCurrency, targetCurrency, date])

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(e.target.value))

    };
    const handleChangePage = (e: any, newPage: number) => {

        setPageNum(newPage)
    };

    const sortHandler = (e: any) => {
        const col = e.target.id
        setSortField(col)
        dir == "desc" ? setDir("asc") : setDir("desc")


    };

    //wait for data load
    if (typeof hpage === 'undefined') return null
    return (

        <>
            <div className="history-page-container">
                <div>
                    <input type="text" placeholder="Search for base currency" value={baseCurrency}
                           onChange={e => setBaseCurrency(e.target.value)}/>
                    &nbsp;
                    <input type="text" placeholder="Search for target currency" value={targetCurrency}
                           onChange={e => setTargetCurrency(e.target.value)}/>
                    &nbsp;
                    <input type="date" data-date-format="yyyy-MM-dd" placeholder="Search for date" value={date}
                           onChange={e => setDate(e.target.value)}/>

                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={` ${sortField === "baseCurrency" ? `${dir}` : ""}`}
                                           id="baseCurrency"
                                           onClick={sortHandler} align="center">Base&nbsp;currency</TableCell>
                                <TableCell className={` ${sortField === "targetCurrency" ? `${dir}` : ""}`}
                                           id="targetCurrency" onClick={sortHandler}
                                           align="center">Target&nbsp;currency</TableCell>
                                <TableCell className={` ${sortField === "quantityToConvert" ? `${dir}` : ""}`}
                                           id="quantityToConvert" onClick={sortHandler}
                                           align="center">Quantity</TableCell>
                                <TableCell className={` ${sortField === "result" ? `${dir}` : ""}`} id="result"
                                           onClick={sortHandler} align="center">Result</TableCell>
                                <TableCell className={` ${sortField === "date" ? `${dir}` : ""}`} id="date"
                                           onClick={sortHandler} align="center">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hpage.dto.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.baseCurrency}</TableCell>
                                    <TableCell>{row.targetCurrency}</TableCell>
                                    <TableCell>{row.quantityToConvert}</TableCell>
                                    <TableCell>{row.result}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="align">
                    <div className="page-select">
                        <p>Select page: </p>
                        <input className="box" type="text" onKeyPress={(e) => {
                            if (!/[.]|[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                            if (e.key == 'Enter') {

                                setPageNum((pageNumSelect - 1) < 1 ? 0 : pageNumSelect -1) //another pageNumState to avoid instant change, but use enter button
                                axios
                                    .get<IHistoryPage>(url, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
                                    .then((res) => {
                                        setPage(res.data)
                                    })
                            }
                        }}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   Number(e.target.value) >= hpage.totalElements / pageSize
                                       ? setPageNumSelect(hpage.totalElements / pageSize)
                                       : setPageNumSelect(Number(e.target.value))
                               }}
                               value={pageNumSelect <= 1 ? 1 : pageNumSelect}/>
                        <p> of {hpage.totalElements / pageSize<1 ? 1 : Math.ceil(hpage.totalElements / pageSize)}</p>
                    </div>
                    <TablePagination

                        rowsPerPageOptions={pageSizes}
                        component="div"
                        count={hpage.totalElements}
                        rowsPerPage={pageSize}
                        page={pageNum}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>

        </>
    )
}