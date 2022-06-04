import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {IUserToken} from "@/Interfaces";
import {JwtToken} from "../../functions/JwtToken";
import {UserContext} from "../../functions/UserContext";
import './AdminPage.css';
import {singletonTokenInstance} from "../../functions/Tokens";
import {UpdateRolesModalWindow} from "./UpdateRolesModalWindow";
import {FadeOutText} from "./FadeOutText";

export const AdminPage: React.FC = () => {
    const API_URL_USERS = "backend/auth/admin/users";
    const token = localStorage.getItem("access")!
    const {userToken} = useContext(UserContext);
    const [active, setActive] = useState<boolean>(false)
    const [users, setUsers] = useState<IUserToken[]>(Object);
    const [user, setUser] = useState<IUserToken | undefined>();
    const [delMsg, setDelMsg] = useState<string>("")
    const [isShowingAlert, setShowingAlert] = useState<boolean>(false);

    const minRoleId = Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0])))
    useEffect(() => {
        JwtToken(token)
        axios
            .get<IUserToken[]>(API_URL_USERS, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                setUsers(res.data)
                user?.roles.forEach(role => role.isAdded = true)
            })
    }, [delMsg, active]);
    const deleteUserHandler = (e: any) => {
        if (window.confirm("Delete the item?")) {
            JwtToken(token)
            axios
                .delete(API_URL_USERS + "/" + e.target.id, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
                .then((res) => {
                    if (res.status == 204) {
                        setDelMsg(e.target.value + " deleted")
                        setShowingAlert(true)
                    }
                })
        }
    }
    const openRolesModalHandler = (e: any) => {
        setActive(true);
        setUser(users.find(user => user.id == e.target.id))

    }

    return (
        <>
            <div className="admin-page-container">
                <FadeOutText isShowingAlert={isShowingAlert} setShowingAlert={setShowingAlert}>{delMsg}</FadeOutText>
                <UpdateRolesModalWindow minRoleId={minRoleId} user={user!} active={active} setActive={setActive}/>

                <table>
                    <thead>
                    <tr>

                        <th className="user" align="center">User</th>
                        <th className="subject" align="center">Roles</th>

                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(users).map((user) => (
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