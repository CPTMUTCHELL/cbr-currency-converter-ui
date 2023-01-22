import React, {useCallback, useContext, useEffect, useState} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import {IUserToken} from "@/Interfaces";
import {UserContext} from "src/functions/Contexts";
import './scss/AdminPage.scss';
import {UpdateRolesModalWindow} from "./UpdateRolesModalWindow";

import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";

export const AdminPage: React.FC = () => {
    const token = localStorage.getItem("access")!
    const {userToken} = useContext(UserContext);
    const [active, setActive] = useState<boolean>(false)
    const [users, setUsers] = useState<IUserToken[]>(Object);
    const [user, setUser] = useState<IUserToken | undefined>();

    const minRoleId = Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0])))
    const [loading, setLoading] = useState(true)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    //to reduce auth-service calls


        const getUsers = useCallback(() => {
            responseHandlerFunc(  async ()=>{
                const res = await Service.getUsers();
                setUsers(res.data)
                user?.roles.forEach(role => role.isAdded = true)
            })


        },[])

        useEffect(() => getUsers() , [active, token])



    const deleteUserHandler = (e: any) => {
        if (window.confirm("Delete the item?")) {
            responseHandlerFunc( async ()=>{
                const res = await Service.deleteUser(e.target.id);
                if (res.status === 204){
                    getUsers()

                    //replaced with Alert context
                    // setDelMsg(e.target.value + " deleted")
                    // setShowingAlert(true)
                }
            },{alertProp:{message:e.target.value + " deleted",alertType:"info"}})

        }
    }
    const openRolesModalHandler = (e: any) => {
        setActive(true);
        setUser(users.find(user => user.id == e.target.id))
    }

    return (
        <>
            <div className="admin-page-container">

                <UpdateRolesModalWindow minRoleId={minRoleId} user={user!} active={active} setActive={setActive}/>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th className="user" align="center">User</th>
                        <th className="subject" align="center">Roles</th>

                    </tr>
                    </thead>
                    <tbody>

                    {loading ? <CircularProgress/> : Object.values(users).map((user) => (
                        <tr key={user.username}>
                            {userToken.username === user.username
                                ? <td>{user.username} (me)</td>
                                : <td>{user.username}</td>

                            }
                            <td>{user.roles.map(role => role.name).join(", ")}  &nbsp;  &nbsp;
                                {minRoleId < Math.min(...user.roles.map(role => role.id!)) ?
                                    <button id={String(user.id)} onClick={openRolesModalHandler}
                                            className="material-icons blue">menu</button> : null}

                                {minRoleId < Math.min(...user.roles.map(role => role.id!)) ?
                                    <button className="material-icons red" value={user.username} id={String(user.id)}
                                            onClick={deleteUserHandler}>delete</button>
                                    : null}
                            </td>


                        </tr>
                    ))}

                    </tbody>
                </table>

            </div>
        </>
    )
}