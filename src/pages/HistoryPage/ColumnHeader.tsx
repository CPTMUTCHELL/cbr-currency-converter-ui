import React from "react";
import { TableCell, TableSortLabel} from "@mui/material";
import {ISort, sortFieldType} from "./HistoryPage";

interface IColumnHeadProps {
    sort: ISort
    setSort: (sort: ISort) => void
    columnNane: string
    sortId: sortFieldType
}

export const ColumnHeader: React.FC<IColumnHeadProps> = (sortProps) => {
    const {columnNane, sort, setSort, sortId} = {...sortProps}

    const sortHandler = (sortField: sortFieldType) => {

        setSort({sortField: sortField, dir: sort.dir === "desc" ? "asc" : "desc"})
    };

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
                            direction={sort.dir}
                            active={sort.sortField === sortId}/>
                    </div>

                </div>
            </TableCell>
        </>
    )
}
