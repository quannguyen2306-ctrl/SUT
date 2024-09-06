import React, { memo, useEffect, useRef } from "react";
import styles from "./styles.module.css";

const ChatContent = memo(
    ({ senderId, messages, inputText, setInputText, handleSend }) => {
        // [{senderId: "hoangquan", message: "hello nam nguyen", timestamp: {_seconds: 1706771682, _nanoseconds: 526000000}}, {timestamp: {_seconds: 1706771690, _nanoseconds: 923000000}, message: "hello hoang quan", senderId: "namnguyen"}]
        const myId = "hoangquan"

        const divRef = useRef()

        useEffect(() => {
            if (divRef.current) {
                divRef.current.scrollTop = divRef.current.scrollHeight;
            }
        }, [messages])

        return (
            <div className={styles.chatContent}>

                <div className={styles.chatHeader}>
                    {/* <div className={styles.avatar}>
                                <p>{selectedUser.userName[0].toUpperCase()}</p>
                            </div>
                            <h3 className={styles.headerUserName}>{selectedUser.userName}</h3> */}
                </div>

                <div className={styles.messageList} ref={divRef} >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${styles.messageBubble} ${message.senderId === myId ? styles.user : styles.friend
                                }`}
                        >
                            {message.message}
                            <div
                                className={`${styles.timestamp} ${message.sender === "user" ? styles.user : ""
                                    }`}
                            >
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.inputArea}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Aa"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <div className={styles.sendButton} onClick={handleSend}>
                        Gửi
                    </div>
                </div>
            </div>
        );
    }
);

export default ChatContent;
