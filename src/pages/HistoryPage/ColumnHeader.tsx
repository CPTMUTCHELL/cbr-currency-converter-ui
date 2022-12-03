import React from "react";
import {TableCell, TableSortLabel} from "@mui/material";
import {Action, IHistoryParams, sortFieldType} from "@/Interfaces";

interface IColumnHeadProps {
    columnNane: string
    sortId: sortFieldType
}
interface IDispatch {
    state: IHistoryParams
    dispatch:React.Dispatch<Action>
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
