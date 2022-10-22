import React from "react";
import {TableCell, TableSortLabel} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {ISort, sortFieldType} from "./HistoryPage";

interface IColumnHeadProps {
    sort: ISort
    setSort: (sort: ISort) => void
    columnNane: string
    sortId: sortFieldType
    setFilter:(filter:sortFieldType)=>void
    filter:sortFieldType | undefined
}

export const ColumnHeader: React.FC<IColumnHeadProps> = (sortProps) => {
    const {columnNane, sort, setSort, sortId,setFilter,filter} = {...sortProps}

    const sortHandler = (sortField: sortFieldType) => {

        setSort({sortField: sortField, dir: sort.dir === "desc" ? "asc" : "desc"})
    };

    return (
        <>
            <TableCell>
                <div className="column-head">
                    <div>{columnNane}</div>

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
