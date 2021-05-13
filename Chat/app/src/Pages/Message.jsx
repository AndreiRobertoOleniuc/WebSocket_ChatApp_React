import React from 'react'

function Message({ key, name, message, owner }) {
    return (
        <div key={key} className={owner}>
            <p className="name">{name}</p>
            <p className="message">{message}</p>
        </div>
    )
}

export default Message
