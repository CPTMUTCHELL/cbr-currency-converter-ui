import React from 'react';
import './AdminPage.css';
export interface FadeOutTextProps {
    isShowingAlert: boolean
    setShowingAlert: (isShowingAlert: boolean) => void

}

export const FadeOutText: React.FC<FadeOutTextProps> = ({isShowingAlert, setShowingAlert, children}) => {

    return (
        <>
            <div
                className={`${isShowingAlert ? 'alert-shown' : 'alert-hidden'}`}
                onTransitionEnd={() => setShowingAlert(false)}
            >
                <h3 className="box">{children}</h3>
            </div>


        </>
    )
}