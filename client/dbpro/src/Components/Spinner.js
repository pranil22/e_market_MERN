import React from 'react'

function Spinner() {
    return (
        <div style={{textAlign: 'center', marginTop: "40px"}}>
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style={{marginLeft: "7px"}}>Loading...</div>
        </div>
    )
}

export default Spinner
