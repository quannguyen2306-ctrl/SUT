import {
    StyleSheet,
    Image,
    Pressable,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble, Send, Composer } from "react-native-gifted-chat";
import { V, T } from "../../atoms/Atoms";
import Logo from "../../../assets/Logo.png"
import { colors, global } from "../../constants/constants";

const chats = [
    // {
    //     "senderId": "hoangquan",
    //     "senderName": "Nguyen",
    //     "message": "Có nhé em",
    //     "timestamp": {
    //         "_seconds": 1706771690,
    //         "_nanoseconds": 526000000
    //     }
    // },
    {
        "senderId": "namnguyen",
        "senderName": "Nguyen",
        "message": "Cho em hỏi sân mình có nước miễn phí ko ạ",
        "timestamp": {
            "_seconds": 1706771682,
            "_nanoseconds": 923000000
        }
    }
]

const myId = "namnguyen"

function revert(chat) {
    const formatedChat = chat.map((item, index) => {
        return {
            _id: index,
            text: item.message,
            createdAt: new Date(item.timestamp._seconds * 1000),
            user: {
                _id: item.senderId == myId ? 1 : 2,
                name: item.senderName
            }
        }
    })

    return formatedChat
}

const ChatScreen = ({ route }) => {
    const { _courtId } = route.params;

    const [mess, setMessages] = useState([]);
    const [websocket, setWebsocket] = useState(null)
    const [inputText, setInputText] = useState("");

    const renderComposer = (props) => {
        return (
            <V style={{ ...global.center, ...global.row }}>
                <Composer {...props} composerHeight={30} textInputStyle={{ marginTop: 9 }} />

                <Send {...props} >
                    <V>
                        <Image source={Logo} style={styles.sendButton} />
                    </V>
                </Send>
            </V>
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <V>
                    <Image source={Logo} style={styles.sendButton} />
                </V>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: colors.primary,
                        padding: 5
                    },
                    left: {
                        backgroundColor: 'white',
                        padding: 5
                    }
                }}
                textStyle={{
                    right: {
                        color: "#fff",
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return <Image source={Logo} style={styles.angleDownButton} />;
    };


    useEffect(() => {
        const ws = new WebSocket('wss://chattest-d2ogvmxflq-as.a.run.app');

        ws.addEventListener('open', () => {
            console.log(`Connected to the server as user ${myId}`);
            const sendData = {
                type: "allMessage",
                _userId: myId,
                _recipentId: 'hoangquan'
            }
            ws.send(JSON.stringify(sendData));
        });

        ws.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages(revert(data.chats).reverse())

            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });


        ws.addEventListener('close', () => {
            console.log('Connection closed');
        });

        setWebsocket(prev => {
            console.log(ws)
            return ws
        })

        return () => {
            ws.close()
        }

    }, []);

    const onSend = (messages) => {
        send()
        setMessages((previousMessages) => {
            return GiftedChat.append(previousMessages, messages)
        });
    };

    function send() {
        const newMessage = {
            type: "sendMessage",
            message: inputText,
            _userId: myId,
            _recipentId: 'hoangquan',
        };
        console.log(websocket, 'web')
        if (websocket !== null) {
            websocket.send(JSON.stringify(newMessage));
        }
    }

    return (
        <Pressable
            style={{ flex: 1 }}
            onPress={() => Keyboard.dismiss()}
            accessible={false}
        >
            <V style={{ flex: 1 }}>
                <GiftedChat
                    messages={mess}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    onInputTextChanged={e => setInputText(e)}
                    renderComposer={renderComposer}
                    renderBubble={renderBubble}
                    alwaysShowSend
                    renderSend={renderSend}
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                />
            </V>
        </Pressable>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    sendButton: {
        height: 36,
        width: 36,
        transform: [{ rotate: "70deg" }],
        marginRight: 10,
        marginBottom: 5,
    },
    angleDownButton: {
        height: 22,
        width: 22,
        transform: [{ rotate: "170deg" }],
    },
});
