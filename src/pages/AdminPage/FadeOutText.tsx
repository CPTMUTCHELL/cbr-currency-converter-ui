import React from 'react';
import './styles.css';
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
                <h3 id="fadeout" className="red">{children}</h3>
            </div>


        </>
    )
}