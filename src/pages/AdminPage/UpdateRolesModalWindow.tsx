import React, {memo, useEffect, useState} from 'react';
import './scss/AdminPage.scss';
import {IRole, IUser} from "@/Interfaces";
import CircularProgress from "@mui/material/CircularProgress";
import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";


export interface ModalProps {
    minRoleId: number
    user: IUser
    active: boolean,
    setActive: (active: boolean) => void
}


export const UpdateRolesModalWindow: React.FC<ModalProps> = memo(({minRoleId, user,active, setActive}) => {
    const [loading,setLoading] = useState(false)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    const [roles, setRoles] = useState<IRole[]>([
        {id: 1, name: "OWNER", isAdded: false, isRevoked: false},
        {id: 2, name: "ADMIN", isAdded: false, isRevoked: false},
        {id: 3, name: "USER", isAdded: false, isRevoked: false},
        {id: 4, name: "BANNED", isAdded: false, isRevoked: false}
    ])
    const [updateRoleErr, setUpdateRoleErr] = useState<string>("")
    const [rolesToUpdate, setRolesToUpdate] = useState<IRole[]>([])


    function refreshState() {
        setActive(false)
        roles.forEach(role => role.isAdded = false)
        roles.forEach(role => role.isRevoked = false)
        setUpdateRoleErr("")
    }

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
    }, [roles, user])
    const updateRolesHandler = () => {
        responseHandlerFunc( async ()=>{
            await Service.updateUserRoles({
                ...user,
                roles: rolesToUpdate})
            refreshState()
        },{alertProp: {message: `Roles of ${user.username} have been updated`, alertType: "success"}})

    }

    return (

        <div className={active ? "modal-background" :"modal-background closed"}>
            <div className="modal-container">

                <div className="modal-close" onClick={() => {
                    refreshState()
                }}>&#10006;</div>
                <div className="modal-window-content">
                    <div className="add-roles">
                        <i>Roles to add</i>
                        <ul>
                            {user
                                ? roles.filter(role => role.id! > minRoleId && !user.roles.find(userRole => userRole.id == role.id)).map(role =>
                                    <li className={role.isAdded ? "selected" : ""}
                                        id={String(role.id)}
                                        onClick={setRolesToUpdateHandler("isAdded")}>
                                        <span
                                            className={role.isAdded ? "selected" : "unselected"}>&#10004;</span> {role.name}
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
                                    <li className={role.isRevoked ? "selected" : ""} id={String(role.id)}
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

                </div>
                <div className="apply-roles">
                    <span className="error">{updateRoleErr}</span>
                    <div className="apply-btn">
                        {loading ? <CircularProgress/> : <button type="button" onClick={updateRolesHandler}>Submit</button>}
                    </div>
                </div>

            </div>

        </div>
    )

})
