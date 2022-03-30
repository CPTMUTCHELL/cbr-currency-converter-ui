import React from 'react';

import { IUserToken} from "../../Interfaces";

import './styles.css';


export interface ModalProps  {
    user: IUserToken
    // setUser: (user:IUserToken)=>void
    active: boolean,
    setActive: (active:boolean)=>void
}

export const ModalWindow:React.FC<ModalProps> = ({ user,active, setActive,children}) =>{

    return (
        <>

            <div className={active?"pop_up active":"pop_up"}>
                    <div className="pop_up_body">
                        {children}
                        <div className="pop_up_close" onClick={()=>setActive(false)}>&#10006;</div>
                    </div>

            </div>


        </>
    )
}