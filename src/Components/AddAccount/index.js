import React from 'react'
import "./AddAccount.css"
const AddAccount = () => {
    return (
        <div className="overlay">
            <div className="component">
                <div className="body-component">
                    <div className="header">
                        Sign Up
                    </div>
                    <div className="mobile-header">Name:</div>
                    <input type="text" className="mobile-number-box" />
                    <div className="mobile-header">Mobile Number:</div>
                    <input type="text" className="mobile-number-box" />
                    <div className="mobile-header">Create Password:</div>
                    <input type="password" className="mobile-number-box" />
                    <div className="mobile-header">Confirm Password</div>
                    <input type="password" className="mobile-number-box" />
                    <input type="button" value ="Sign Up" className="signup-button" />
                </div>
            </div>

        </div>
    )
}

export default AddAccount