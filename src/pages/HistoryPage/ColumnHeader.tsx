import React from "react";
import {TableCell, TableSortLabel} from "@mui/material";
import {IAction, IFilterAndSort, sortFieldType} from "./HistoryPage";

interface IColumnHeadProps {
    columnNane: string
    sortId: sortFieldType
}
interface IDispatch {
    state: IFilterAndSort
    dispatch:React.Dispatch<IAction>
}

export const ColumnHeader: React.FC<IColumnHeadProps & IDispatch> = (sortProps) => {
    const {columnNane, sortId,state,dispatch} = {...sortProps}

    const sortHandler = (sortField: sortFieldType) => {
        dispatch({type: "SORT", payload: {sortField: sortField, dir: state.dir === "desc" ? "asc" : "desc"}});
    }
    return (
        <>
            <TableCell>
                <div className="column-head">
                    <p>{columnNane}</p>

                    <div className="search-sort">
                        <TableSortLabel
                            onClick={() => {
                                sortHandler(sortId)
                            }}
                            direction={state.dir}
                            active={state.sortField === sortId}/>
                    </div>

                </div>
            </TableCell>
        </>
    )
}
