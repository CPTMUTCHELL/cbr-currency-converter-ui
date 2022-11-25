import React, {useCallback, useEffect, useState} from 'react';
import {IHistoryPage} from "../../Interfaces";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import "./scss/HistoryPage.scss"
import {ColumnHeader} from "./ColumnHeader";

import CircularProgress from "@mui/material/CircularProgress";
import {Service} from "src/functions/Service";

export type sortFieldType = "date" | "baseCurrency" | "targetCurrency" | "quantityToConvert" | "result"
type sortDirType = "asc" | "desc"

export interface ISort {
    sortField: sortFieldType;
    dir: sortDirType;
}

interface IColumn {
    search?: boolean
    columnName: string
    columnSortId: sortFieldType
}

const COLS: IColumn[] = [
    {columnName: "Base currency", columnSortId: "baseCurrency"},
    {columnName: "Target currency", columnSortId: "targetCurrency"},
    {columnName: "Quantity", columnSortId: "quantityToConvert"},
    {columnName: "Result", columnSortId: "result"},
    {columnName: "Date", columnSortId: "date"},
]

interface IPage {
    currentPageNumber: number
    pageSize: 5 | 10 | 25
    currentPageSelect: number
}

const pageSizes: number[] = [5, 10, 25]
export const HistoryPage: React.FC = () => {
    const [page, setPage] = useState<IPage>({currentPageNumber: 0, pageSize: 5, currentPageSelect: 1})
    const [sort, setSort] = useState<ISort>({sortField: "date", dir: "desc"})
    const [baseCurrency, setBaseCurrency] = useState<string>("")
    const [targetCurrency, setTargetCurrency] = useState<string>("")
    const [date, setDate] = useState<string>("")

    const [hpage, setHpage] = useState<IHistoryPage>();
    const HISTORY_URL = (`/backend/history/show/${page.currentPageNumber + 1}?pageSize=${page.pageSize}
    &sortField=${sort.sortField}&dir=${sort.dir}&baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&date=${date}`);

    const [historyLoading,setHistoryLoading] = useState<boolean>(true)
    const token = localStorage.getItem("access")!

    const getHistory = useCallback(async (url:string) => {
        const res = await Service.getHistoryPage(url);
        setHistoryLoading(false)

        const {response, error} = res;
        setHpage(response?.data)
    }, [])
    useEffect(() => {
        setPage({...page,currentPageSelect:page.currentPageNumber + 1})
        getHistory(HISTORY_URL)

    }, [page.currentPageNumber, page.pageSize, sort, baseCurrency, targetCurrency, date,HISTORY_URL])
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setPage({...page,pageSize:(parseInt(e.target.value))})

    };
    const handleChangePage = (e: any, newPage: number) => {
        setPage({...page, currentPageNumber: newPage})
    };

    //wait for data load
    // if (typeof hpage === 'undefined' ) return <CircularProgress/>
    return (

        <>
            <div className="history-page-container">
                <div className="filters">
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
                                {COLS.map((column) =>
                                    <ColumnHeader
                                        sort={sort} setSort={setSort}
                                        columnNane={column.columnName}
                                        sortId={column.columnSortId}
                                        />
                                )}
                            </TableRow>
                        </TableHead>
                        {historyLoading ? <CircularProgress/> :

                            <TableBody>
                                {hpage && hpage.dto.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell><p>{row.baseCurrency}</p></TableCell>
                                        <TableCell><p>{row.targetCurrency}</p></TableCell>
                                        <TableCell><p>{row.quantityToConvert}</p></TableCell>
                                        <TableCell><p>{row.result}</p></TableCell>
                                        <TableCell><p>{row.date}</p></TableCell>
                                    </TableRow>
                                ))}

                        </TableBody>
                        }
                    </Table>
                </TableContainer>

                <div className="pagination-container">
                    <div className="page-select">
                        <p>Select page: </p>
                        <input className="box" type="text" onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                            if (e.key == 'Enter') {

                                setPage({
                                    ...page,
                                    currentPageNumber: (page.currentPageSelect - 1) < 1 ? 0 : page.currentPageSelect - 1
                                }) //another pageNumState to avoid instant change, but use enter button
                                getHistory(HISTORY_URL)

                            }
                        }}

                            //validate page input

                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => { hpage &&
                                   Number(e.target.value.substring(1)) >= hpage.totalElements / page.pageSize
                                       ? setPage({
                                           ...page,
                                           currentPageSelect: Math.ceil(hpage.totalElements / page.pageSize)
                                       })
                                       : setPage({...page, currentPageSelect: Number(e.target.value.substring(1))})
                               }}
                               value={page.currentPageSelect <= 1 ? 1 : page.currentPageSelect}/>
                        {hpage &&<p> of {hpage.totalElements / page.pageSize < 1 ? 1 : Math.ceil(hpage.totalElements / page.pageSize)}</p>}


                    </div>
                    <div className="pagination">
                        <TablePagination

                            rowsPerPageOptions={pageSizes}
                            component="div"
                            count={hpage ? hpage.totalElements : 0}
                            rowsPerPage={page.pageSize}
                            page={page.currentPageNumber}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}