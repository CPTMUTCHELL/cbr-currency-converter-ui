import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Action, IHistoryPage, IHistoryParams, sortFieldType} from "@/Interfaces";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import "./scss/HistoryPage.scss"
import {ColumnHeader} from "./ColumnHeader";

import CircularProgress from "@mui/material/CircularProgress";
import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";

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


const filterReducer = (state:IHistoryParams , action:Action) => {
    switch (action.type) {
        case "FILTER":
            return {...state, [action.payload.name]:action.payload.value}
        case "SORT":
            return {...state, sortField:action.payload.sortField,dir:action.payload.dir}
        case "PAGE":
            return {
                ...state,
                pageSize: action.payload.pageSize,
                currentPageNumber: action.payload.currentPageNumber
            }

        default:
            return state
    }
}
const HISTORY_INITIAL_STATE:IHistoryParams  = {
    date:"",
    baseCurrency:"",
    targetCurrency:"",
    dir:"desc",
    sortField:"date",
    currentPageNumber: 0,
    pageSize: 5
}

const pageSizes: number[] = [5, 10, 25]
export const HistoryPage: React.FC = () => {
    const [historyState, dispatch]  = useReducer(filterReducer,HISTORY_INITIAL_STATE)
    const [hpage, setHpage] = useState<IHistoryPage>();
    const [currentPageSelect,setCurrentPageSelect] = useState(1)
    const [loading, setLoading] = useState<boolean>(true)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});

    const getHistory = useCallback((historyState:IHistoryParams,pageNum:number) => {
        responseHandlerFunc( async ()=> {
            const res = await Service.getHistoryPage(historyState,pageNum);
            setHpage(res.data)
        })
    }, [])

    useEffect(() => {
        setCurrentPageSelect(historyState.currentPageNumber + 1)
        getHistory(historyState,historyState.currentPageNumber + 1)

    }, [historyState])
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type:"PAGE",payload:{ ...historyState,pageSize:(parseInt(e.target.value )as 5|10|25)}})

    };
    const handleChangePage = (e: any, newPage: number) => {
        dispatch({type:"PAGE",payload:{...historyState, currentPageNumber: newPage}})

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
                                        <TableCell><p>{row.date!.toString()}</p></TableCell>
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
                                //another pageNumState to avoid instant change, but use enter button, because history URL doesn't have currentPageSelect
                                dispatch({type:"PAGE",payload:{...historyState, currentPageNumber: ( currentPageSelect - 1) < 1 ? 0 :  currentPageSelect - 1}})

                            }
                        }}

                            //validate page input

                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   hpage &&
                                     Number(e.target.value.substring(1)) >= hpage.totalElements / historyState.pageSize
                                       ?  setCurrentPageSelect(Math.ceil(hpage.totalElements / historyState.pageSize))
                                       :  setCurrentPageSelect(Number(e.target.value.substring(1)))

                               }}

                               value={currentPageSelect <= 1 ? 1 : currentPageSelect}/>
                        {hpage && <p> of {hpage.totalElements / historyState.pageSize < 1 ? 1 : Math.ceil(hpage.totalElements / historyState.pageSize)}</p>}


                    </div>
                    <div>
                        <TablePagination

                            rowsPerPageOptions={pageSizes}
                            component="div"
                            count={hpage ? hpage.totalElements : 0}
                            rowsPerPage={historyState.pageSize}
                            page={historyState.currentPageNumber}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}