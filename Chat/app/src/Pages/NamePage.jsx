import React from 'react'
import { useHistory } from "react-router-dom";

function NamePage({ setUserName, userName }) {
    const history = useHistory();
    const inputChange = (e) => {
        setUserName(e.target.value);
    }
    const goToChat = () => {
        if (userName !== "" && userName != null) {
            history.push("/Chat");
        }
    }
    return (
        <div>
            <h1>Chat App</h1>
            <input type="text" onChange={inputChange} />
            <button onClick={goToChat}>Go Chat</button>
        </div>
    )
}

export default NamePage
