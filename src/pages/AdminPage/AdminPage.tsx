import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {IRole, IUserToken} from "../../Interfaces";
import {JwtToken} from "../../functions/JwtToken";
import {UserContext} from "../../functions/UserContext";
import './styles.css';
import {singletonTokenInstance} from "../../functions/Tokens";
import {ModalWindow} from "./ModalWindow";
import {FadeOutText} from "./FadeOutText";
const roles: Readonly<IRole[]> = [{id:1,name:"ADMIN"},{id:2,name:"USER"}];
export const AdminPage: React.FC = () => {
    const API_URL_USERS = "http://localhost:8081/auth/admin/users";
    const token = localStorage.getItem("access")!
    const {userToken}  = useContext(UserContext);
    const [active,setActive] = useState<boolean>(false)
    const [users, setUsers] = useState<IUserToken[]>(Object);
    const [user, setUser] = useState<IUserToken>(Object);
    const [delMsg, setDelMsg] = useState<string>("")
    const [isShowingAlert, setShowingAlert] = useState<boolean>(false);


    const deleteUserHandler =(e:any) =>{
        window.confirm("Delete the item?")
        JwtToken(token)
        axios
            .delete(API_URL_USERS+"/"+e.target.id, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                if (res.status==204){
                    setDelMsg(e.target.value + " deleted")
                    setShowingAlert(true)
                    //remove DOM element with deleted user's name
                    // setTimeout(()=>{
                    //     document.getElementById("fadeout")!.remove()
                    // },2000)
                }
            })
    }
    const changeRolesHandler = (e:any) =>{
        setActive(true);
        setUser(e.target.value)
        // setShowingAlert(true)


    }
    useEffect(() => {
        JwtToken(token)
        axios
            .get<IUserToken[]>(API_URL_USERS, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then((res) => {
                setUsers(res.data)
            })
    },[delMsg]);
    const minRoleId=Math.min(...userToken.roles.map(role=>Number(String(role).split("-")[0])))
    return (
        <>
            <FadeOutText isShowingAlert={isShowingAlert} setShowingAlert={setShowingAlert}>{delMsg}</FadeOutText>
            <ModalWindow user={user}  active={active} setActive={setActive}>
                <p className='top-left'>Available roles to add:</p>

                <select className="" >
                    {roles.filter(role=>role.id!>minRoleId).map(role => {
                        return (
                            <option key={role.id} value={role.name}>{role.name}</option>);
                    })}
                </select>
                <div className="btn-bottom-center">
                <button type='button'>Accept</button>
                </div>
            </ModalWindow>

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
                                {userToken.username===user.username
                                    ? <td>{user.username} (me)</td>
                                    : <td>{user.username}</td>

                                }
                                <td>{user.roles.map(role=>role.name).join(", ")}  &nbsp;  &nbsp;
                                    <button onClick={changeRolesHandler} className="material-icons blue">menu</button>

                                    {minRoleId<Math.min(...user.roles.map(role=>role.id!))?
                                        <button className="material-icons red" value={user.username} id={String(user.id)} onClick={deleteUserHandler}>delete</button>
                                        : null}
                                </td>


                            </tr>
                        ))}

                    </tbody>
                </table>


        </>
    )
}