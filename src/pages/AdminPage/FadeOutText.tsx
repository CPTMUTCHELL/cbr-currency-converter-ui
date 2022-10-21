import React from 'react';
import './scss/AdminPage.scss';
interface FadeOutTextProps {
    isShowingAlert: boolean
    setShowingAlert: (isShowingAlert: boolean) => void

}

export const FadeOutText: React.FC<FadeOutTextProps> = ({isShowingAlert, setShowingAlert, children}) => {
    if (isShowingAlert){
        setTimeout(()=>setShowingAlert(false),3000)
    }
    return (
        <>
            <div
                className={isShowingAlert ? "user-alert show" :"user-alert"}
            >
                <h3 className="box">{children}</h3>
            </div>


        </>
    )
}