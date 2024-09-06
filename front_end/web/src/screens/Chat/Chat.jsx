import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./styles.module.css";
import { sampleUserData } from "../../fixtures/fixtures";
import ChatContent from "../../components/Chat/ChatContent";
function Chat() {
    const myId = "hoangquan"
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("namnguyen");
    const [websocket, setWebsocket] = useState(null)



    const handleSend = () => {
        console.log('called')
        if (inputText.trim() !== "") {
            const newMessage = {
                type: "sendMessage",
                message: inputText.trim(),
                _userId: myId,
                _recipentId: selectedUserId,
            };
            if (websocket !== null) {
                websocket.send(JSON.stringify(newMessage));
            }
            setInputText("");
        };
    };

    useEffect(() => {
        // your function here
        // (testing only, fake id) 
        if (selectedUserId !== null) {
            const ws = new WebSocket('wss://chattest-d2ogvmxflq-as.a.run.app');


            ws.addEventListener('open', () => {
                console.log(`Connected to the server as user ${myId}`);
                const sendData = {
                    type: "allMessage",
                    _userId: myId,
                    _recipentId: selectedUserId
                }
                ws.send(JSON.stringify(sendData));
            });

            ws.addEventListener('message', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    // function display chat here (const chat)

                    // console.log(data.chats)
                    setMessages(data.chats)

                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });


            ws.addEventListener('close', () => {
                console.log('Connection closed');
            });

            setWebsocket(ws)

            return () => {
                ws.close()
            }

        }


    }, [selectedUserId]);


    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.navHolder}></div>
                <div className={styles.chatBody}>
                    <div className={styles.chatList}>
                        {sampleUserData.map((user, index) => (
                            <button
                                className={styles.singleUser}
                                key={index}
                                style={user.id === selectedUserId ? { backgroundColor: '#EAEAEA' } : null}
                                onClick={() => setSelectedUserId(user.id)}
                            >
                                <div className={styles.image}>
                                    <p>{user.userName[0].toUpperCase()}</p>
                                </div>
                                <div className={styles.textArea}>
                                    <h3 className={styles.userName}>{user.userName}</h3>
                                    <p className={styles.messageText}>{user.messageText}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <ChatContent
                        messages={messages}
                        inputText={inputText}
                        setInputText={setInputText}
                        handleSend={handleSend}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chat;