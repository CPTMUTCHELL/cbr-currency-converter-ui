import React, {useState, useContext, useEffect} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import {IUserToken} from "@/Interfaces";
import {JwtToken} from "src/functions/JwtToken";
import {UserContext} from "src/functions/UserContext";
import './scss/AdminPage.scss';
import {singletonTokenInstance} from "src/functions/Tokens";
import {UpdateRolesModalWindow} from "./UpdateRolesModalWindow";
import {FadeOutText} from "./FadeOutText";
import {useAxiosFunction} from "src/hooks/useAxiosFunction";

export const AdminPage: React.FC = () => {
    const USERS_URL = "backend/auth/admin/users";
    const token = localStorage.getItem("access")!
    const {userToken} = useContext(UserContext);
    const [active, setActive] = useState<boolean>(false)
    const [users, setUsers] = useState<IUserToken[]>(Object);
    const [user, setUser] = useState<IUserToken | undefined>();
    const [delMsg, setDelMsg] = useState<string>("")
    const [isShowingAlert, setShowingAlert] = useState<boolean>(false);

    const minRoleId = Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0])))
    const [getUsersFuncLoading, getUsersFunc] = useAxiosFunction<IUserToken[]>({
        method: "GET",
        url: USERS_URL,
    headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}
    })
    const [deleteUserFuncLoading, deleteUserFunc] = useAxiosFunction({
        method: "DELETE",
        url: USERS_URL,
        headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}
    })

    useEffect(() => {
        JwtToken(token)
        const getUsers =  async () => {
            const res = await getUsersFunc();
            const {response,error} =res;
            if (response) {
                setUsers(response.data)
                user?.roles.forEach(role => role.isAdded = true)
            }

        }
        getUsers()
    }, [delMsg, active]);
    const deleteUserHandler = async (e: any) => {
        if (window.confirm("Delete the item?")) {
            JwtToken(token)
            const res = await deleteUserFunc(undefined,USERS_URL + "/" + e.target.id)
            const {response,error} =res;
            if (response)
                if (response.status === 204){
                    setDelMsg(e.target.value + " deleted")
                    setShowingAlert(true)
                }

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
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th className="user" align="center">User</th>
                        <th className="subject" align="center">Roles</th>

                    </tr>
                    </thead>
                    <tbody>

                    {getUsersFuncLoading ? <CircularProgress/> : Object.values(users).map((user) => (
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