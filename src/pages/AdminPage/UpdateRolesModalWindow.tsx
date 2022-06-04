import React, {useEffect, useState} from 'react';
import './AdminPage.css';
import {IRole, IUserToken} from "@/Interfaces";
import axios from "axios";
import {singletonTokenInstance} from "../../functions/Tokens";


export interface ModalProps {
    minRoleId: number
    user: IUserToken
    active: boolean,
    setActive: (active: boolean) => void
}


const UPDATE_ROLES_URL = "backend/auth/admin/roles"

export const UpdateRolesModalWindow: React.FC<ModalProps> = ({minRoleId, user, active, setActive, children}) => {
    function refreshState() {
        setActive(false)
        roles.forEach(role => role.isAdded = false)
        roles.forEach(role => role.isRevoked = false)
        setUpdateRoleErr("")
    }

    const [roles, setRoles] = useState<IRole[]>([
        {id: 1, name: "OWNER", isAdded: false, isRevoked: false},
        {id: 2, name: "ADMIN", isAdded: false, isRevoked: false},
        {id: 3, name: "USER", isAdded: false, isRevoked: false},
        {id: 4, name: "BANNED", isAdded: false, isRevoked: false}
    ])
    const [updateRoleErr, setUpdateRoleErr] = useState<string>("")
    const [rolesToUpdate, setRolesToUpdate] = useState<IRole[]>([])

    const setRolesToUpdateHandler = (field: string) => (e: any) => {
        const upd = roles.map(role => {
            if (role.id === Number(e.target.id)) {
                // @ts-ignore
                role[field] = !role[field]
            }
            return role;
        })
        setRoles(upd)
    }
    useEffect(() => {
        if (user)
            setRolesToUpdate([...user.roles.filter(userRole => roles.find(role => userRole.id == role.id && !role.isRevoked)), ...roles.filter(role => role.isAdded && !role.isRevoked)])
    }, [roles, user, active])
    const updateRolesHandler = () => {
        axios
            .put<IUserToken>(UPDATE_ROLES_URL, {
                ...user,
                roles: rolesToUpdate
            }, {headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().access}`}})
            .then(() => {
                // to avoid duplicates before browser page refresh
                refreshState()
            })
            .catch((err) => {
                setUpdateRoleErr(err.response.data.errors)
            });
    }

    return (

        <div className={active ? "pop_up active" : "pop_up"}>
            <div className="pop_up_body">
                <div className="modal-window-content">
                    <div className="add-roles">
                        <i>Roles to add</i>
                        <ul>
                            {user
                                ? roles.filter(role => role.id! > minRoleId && !user.roles.find(userRole => userRole.id == role.id)).map(role =>
                                    <li className={role.isAdded ? "active" : ""}
                                        id={String(role.id)}
                                        onClick={setRolesToUpdateHandler("isAdded")}>
                                        <span className={role.isAdded ? "selected" : "unselected"}>&#10004;</span> {role.name}
                                    </li>)
                                : null
                            }
                        </ul>

                    </div>
                    <div className="revoke-roles">
                        <i>Roles to revoke</i>
                        <ul>
                            {user
                                ? roles.filter(role => user.roles.find(userRole => userRole.id == role.id)).map(role =>
                                    <li className={role.isRevoked ? "revoked" : ""} id={String(role.id)}
                                        onClick={setRolesToUpdateHandler("isRevoked")}>{role.name}</li>)
                                : null}

                        </ul>
                    </div>
                    <div className="final-roles">
                        <i>User's roles</i>
                        <ul>
                            {rolesToUpdate.map(role => <li>{role.name}</li>)}

                        </ul>
                    </div>

                    <div className="btn-bottom-center">
                        <span className="error">{updateRoleErr}</span>
                        <button type='button' onClick={updateRolesHandler}>Apply</button>
                    </div>
                </div>
                <div className="pop_up_close" onClick={() => {
                    refreshState()
                }}>&#10006;</div>
            </div>

        </div>
    )
}
