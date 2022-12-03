import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {IHistoryPage} from "../../Interfaces";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import "./scss/HistoryPage.scss"
import {ColumnHeader} from "./ColumnHeader";

import CircularProgress from "@mui/material/CircularProgress";
import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";

export type sortFieldType = "date" | "baseCurrency" | "targetCurrency" | "quantityToConvert" | "result"
type sortDirType = "asc" | "desc"

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

type reducerTypes = "FILTER" | "SORT" | "PAGE"


export interface IAction{
    type:reducerTypes,
    payload:any
}
export interface IFilterAndSort {
    baseCurrency:string
    targetCurrency:string
    date:string
    sortField: sortFieldType;
    dir: sortDirType;
}

const filterReducer = (state:IFilterAndSort , action:IAction) => {
    switch (action.type) {
        case "FILTER":
            return {...state, [action.payload.name]:action.payload.value}
        case "SORT":
            return {...state, sortField:action.payload.sortField,dir:action.payload.dir}


        default:
            return state
    }
}
const HISTORY_INITIAL_STATE:IFilterAndSort  = {
    date:"",
    baseCurrency:"",
    targetCurrency:"",
    dir:"desc",
    sortField:"date"
}

const pageSizes: number[] = [5, 10, 25]
export const HistoryPage: React.FC = () => {
    const [page, setPage] = useState<IPage>({currentPageNumber: 0, pageSize: 5, currentPageSelect: 1})
    const [historyState, dispatch]  = useReducer(filterReducer,HISTORY_INITIAL_STATE)
    const [hpage, setHpage] = useState<IHistoryPage>();
    const HISTORY_URL = `/backend/history/show/${page.currentPageNumber + 1}?pageSize=${page.pageSize}&sortField=${historyState.sortField}&dir=${historyState.dir}&baseCurrency=${historyState.baseCurrency}&targetCurrency=${historyState.targetCurrency}&date=${historyState.date}`

    const [loading, setLoading] = useState<boolean>(true)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});

    const getHistory = useCallback((url: string) => {
        responseHandlerFunc( async ()=> {
            const res = await Service.getHistoryPage(url);
            setHpage(res.data)
        })
    }, [])

    useEffect(() => {
        console.log(HISTORY_URL)
        setPage({...page, currentPageSelect: page.currentPageNumber + 1})
        getHistory(HISTORY_URL)

    }, [page.currentPageNumber, page.pageSize, historyState, HISTORY_URL])
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setPage({...page, pageSize: (parseInt(e.target.value))})

    };
    const handleChangePage = (e: any, newPage: number) => {
        setPage({...page, currentPageNumber: newPage})
    };
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type:"FILTER",
            payload: {name:e.target.name,value:e.target.value}
        })
    }

    return (

        <>
            <div className="history-page-container">
                <div className="filters">
                    <input type="text" placeholder="Search for base currency" value={historyState.baseCurrency} name="baseCurrency" onChange={handleFilter}/>
                    &nbsp;
                    <input type="text" placeholder="Search for target currency" value={historyState.targetCurrency} name="targetCurrency" onChange={handleFilter}/>
                    &nbsp;
                    <input type="date" data-date-format="yyyy-MM-dd" placeholder="Search for date" value={historyState.date} name="date" onChange={handleFilter}/>

                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {COLS.map((column) =>
                                    <ColumnHeader
                                        state={historyState}
                                        dispatch={dispatch}
                                        columnNane={column.columnName}
                                        sortId={column.columnSortId}
                                    />
                                )}
                            </TableRow>
                        </TableHead>
                        {loading ? <CircularProgress/> :

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

                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   hpage &&
                                   Number(e.target.value.substring(1)) >= hpage.totalElements / page.pageSize
                                       ? setPage({
                                           ...page,
                                           currentPageSelect: Math.ceil(hpage.totalElements / page.pageSize)
                                       })
                                       : setPage({...page, currentPageSelect: Number(e.target.value.substring(1))})
                               }}
                               value={page.currentPageSelect <= 1 ? 1 : page.currentPageSelect}/>
                        {hpage &&
                            <p> of {hpage.totalElements / page.pageSize < 1 ? 1 : Math.ceil(hpage.totalElements / page.pageSize)}</p>}


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