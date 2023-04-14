import React, {useContext, useEffect, useState} from 'react';
import {IUser} from "@/Interfaces";
import {INotificationContext, NotificationContext, UserContext} from "src/functions/Contexts";
import './scss/AdminPage.scss';

import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";
import {Checkbox, Table, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {SortOrder} from "@/Types";
import {sortAndSlicePages} from "@/functions/SortFunction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {UpdateRolesModalWindow} from "@/pages/AdminPage/UpdateRolesModalWindow";
import CircularProgress from "@mui/material/CircularProgress";

type ColumnId = keyof IUser

interface IColumn {
    label: string,
    id: ColumnId
}

const columns: IColumn[] =
    [
        {label: "username", id: "username"},
        {label: "roles", id: "roles"},
        {label: "email", id: "email"},
        {label: "verified", id: "verified"}
    ]


export const AdminPage: React.FC = () => {

    const [order, setOrder] = React.useState<SortOrder>("asc");
    const [orderBy, setOrderBy] = React.useState<ColumnId>("username");
    const [selected, setSelected] = React.useState<number[]>([]);

    const token = localStorage.getItem("access")!
    const {userToken} = useContext(UserContext);
    const [active, setActive] = useState<boolean>(false)
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | undefined>();
    const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const minRoleId = Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0])))
    const [loading, setLoading] = useState(true)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    const {setMessage, setShow, setAlertType} = useContext(NotificationContext) as INotificationContext;
    const isSelected = (id: number) => selected.includes(id)


    const getUsers = () => {
        responseHandlerFunc(async () => {
            const res = await Service.getUsers();
            setUsers(res.data)
            user?.roles.forEach(role => role.isAdded = true)
            const sorted = sortAndSlicePages(res.data, order, orderBy, page, rowsPerPage)

            setVisibleUsers(sorted)

        })

    }
    useEffect(() => getUsers(), [active, token])

    const deleteUserHandler = (e: any) => {
        if (window.confirm("Delete items?")) {
            responseHandlerFunc(async () => {
                const res = await Service.deleteUsers(selected);
                const notDeletedNames = res.data.map(el => el.username)
                getUsers()
                if (notDeletedNames.length!=0) {
                    setShow(true)
                    setAlertType("warning")
                    setMessage(notDeletedNames.join(", ") + " not deleted. Insufficient rights")
                }
                setSelected([])
            })

        }
    }
    const openRolesModalHandler = (e: any) => {
        setActive(true);
        setUser(users.find(user => user.id == selected[0]))

    }


    const sortHandler = (sortId: ColumnId) => (e: React.MouseEvent<unknown>) => {
        setOrderBy(sortId)
        const newOrder = order == "asc" ? "desc" : "asc"
        setOrder(newOrder)
        const sorted = sortAndSlicePages(users, newOrder, orderBy, page, rowsPerPage)
        setVisibleUsers(sorted)

    }


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
        const sorted = sortAndSlicePages(users, order, orderBy, newPage, rowsPerPage)
        setVisibleUsers(sorted)
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rowsPerPage = parseInt(e.target.value)

        setRowsPerPage(rowsPerPage)
        const sorted = sortAndSlicePages(users, order, orderBy, page, rowsPerPage)

        setVisibleUsers(sorted)
    }

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        if (selected.includes(id)) {
            setSelected(prevState => prevState.filter(el => el != id))
        } else setSelected([...selected, id])

    };
    const handleSelectAllClick = () => {
        const selectedVisibleIds = visibleUsers.filter(el => canRemove(el)).map(el => el.id)
        if (checked) setSelected(prevState => prevState.filter(el => !selectedVisibleIds.includes(el)))
        else setSelected([...selected, ...selectedVisibleIds.filter(el => !selected.includes(el))])

    }
    const canRemove = (user: IUser) => minRoleId < Math.min(...user.roles.map(role => role.id!))

    const visibleAndSelectedIntersection = visibleUsers.map(el => el.id).filter(el => selected.includes(el))

    const checked = visibleAndSelectedIntersection.length == visibleUsers.filter(el => canRemove(el)).length && visibleUsers.filter(el=>canRemove(el)).length!=0
    const indeterminate = visibleAndSelectedIntersection.length < visibleUsers.length && visibleAndSelectedIntersection.length > 0 && !checked
    return (
        <>
            <UpdateRolesModalWindow minRoleId={minRoleId} user={user!} active={active} setActive={setActive}/>

            {loading ? <CircularProgress/> :
                <div className="admin-page-container">

                    <Toolbar>
                        <div>{selected.length != 0 ? <h3>{selected.length} selected</h3> : <h3>Users</h3>}</div>
                        <div className="action-buttons">
                            {selected.length == 1 ?
                                <IconButton onClick={openRolesModalHandler}>
                                    <ListOutlinedIcon/>
                                </IconButton> :
                                null
                            }
                            {selected.length != 0 ?
                                <div>
                                    <IconButton onClick={deleteUserHandler}>
                                        <DeleteIcon color="error"/>
                                    </IconButton>
                                </div> :
                                null
                            }
                        </div>
                    </Toolbar>
                    <TableContainer>
                        <Table className="admin-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox className="header-checkbox"
                                                  color="primary"
                                                  onChange={handleSelectAllClick}
                                                  checked={checked}
                                                  indeterminate={indeterminate}
                                                  disabled={visibleUsers.filter(el=>canRemove(el)).length==0}
                                        />
                                    </TableCell>
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.id}
                                            sortDirection={orderBy === col.id ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === col.id}
                                                direction={orderBy === col.id ? order : 'asc'}
                                                onClick={sortHandler(col.id)}
                                            >
                                                <h4>{col.label}</h4>
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleUsers.map((row) => {
                                    const isItemSelected = isSelected(row.id);
                                    const canRemove = minRoleId < Math.min(...row.roles.map(role => role.id!))

                                    return (

                                        <TableRow

                                            key={row.id}
                                            hover={canRemove}
                                            sx={{cursor: canRemove ? 'pointer' : ''}}

                                            selected={isItemSelected}
                                            onClick={(event) => canRemove ? handleClick(event, row.id) : null}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    disabled={!canRemove}
                                                    disableRipple={!canRemove}

                                                />
                                            </TableCell>

                                            <TableCell width="30%">{row.username}</TableCell>
                                            <TableCell
                                                width="30%">{row.roles.map(el => el.name).sort((a, b) => a.localeCompare(b)).join(",")}</TableCell>
                                            <TableCell width="30%">{row.email}</TableCell>
                                            <TableCell width="10%">{String(row.verified)}</TableCell>
                                        </TableRow>
                                    );
                                })
                                }

                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>

            }
        </>
    )
}
