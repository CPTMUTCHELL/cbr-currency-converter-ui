import React, {useContext, useEffect, useMemo, useState} from 'react';
import {getUser, JwtToken} from "../../functions/JwtToken";
import axios from "axios";
import {IConvert, IHistoryPage} from "../../Interfaces";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {Pagination} from "../../components/Pagination/Pagination";
import {UserContext} from "../../functions/UserContext";
import {useValidate} from "../../hooks/useValidate";
import './styles.css';
import {singletonTokenInstance} from "../../functions/Tokens";

export const HistoryPage: React.FC = () => {
    const {setUserToken}  = useContext(UserContext);
    const token = localStorage.getItem("access")!

    // useEffect(()=>{
    //     performValidation(token)
    //     //might be new if expired during page refresh
    //     setUserToken(getUser(localStorage.getItem("access")!))
    // },[])

    // const [convert, setConvert] = useState<IConvert[]>([])
    const [pageNum, setPageNum] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(5)
    const [dir, setDir] = useState<string>("desc")
    const [sortField, setSortField] = useState<string>("date")
    const [baseCurrency, setBaseCurrency] = useState<string>("")
    const [targetCurrency, setTargetCurrency] = useState<string>("")
    const [date, setDate] = useState<string>("")

    const [hpage, setPage] = useState<IHistoryPage>();

    const url = (`http://localhost:8083/history/show/${pageNum + 1}?pageSize=${pageSize}
    &sortField=${sortField}&dir=${dir}&baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&date=${date}`);
    const arr: number[] = []
    let i =0;
    //to reduce auth-service calls
    useEffect(() => {
        JwtToken(localStorage.getItem("access")!)
    }, [])
    useEffect(() => {

        axios
            .get<IHistoryPage>(url, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                setPage(res.data)
            })
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
                            <TableCell className={` ${sortField === "baseCurrency" ? `${dir}` : ""}`} id="baseCurrency"
                                       onClick={sortHandler} align="center">Base&nbsp;currency</TableCell>
                            <TableCell className={` ${sortField === "targetCurrency" ? `${dir}` : ""}`}
                                       id="targetCurrency" onClick={sortHandler}
                                       align="center">Target&nbsp;currency</TableCell>
                            <TableCell className={` ${sortField === "quantityToConvert" ? `${dir}` : ""}`}
                                       id="quantityToConvert" onClick={sortHandler} align="center">Quantity</TableCell>
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
            <TablePagination

                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={hpage.totalElements}
                rowsPerPage={pageSize}
                page={pageNum}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Pagination
                className="pagination-bar"
                currentPage={pageNum+1}
                totalCount={hpage.totalPages}
                pageSize={pageSize}
                onPageChange={(ps: number) => {
                    setPageNum(ps-1 )
                }}
            />
            <div>
                <button className="btn" onClick={()=>window.history.go(-1)}>Back to converter</button>
            </div>
        </>
    )
}