/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../userContext";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
export default function ChatList() {
    const [ListId, setListId] = useState([])
    const [sendMess, setSendMess] = useState([]);
    const [receiMess, setReceiMess] = useState([]);
    const { user } = useContext(UserContext);
    const [content, setContent] = useState('')
    const messagesListRef = useRef(null);
    const [prevContentHeight, setPrevContentHeight] = useState(null);

    useEffect(() => {
        axios.get('/api/list/customer-on-chat').then(response => {
            setListId(response.data)
            console.log(response.data);
        })
    }, [ListId])

    useEffect(() => {
        axios.get('/user-send-chats').then(response => {
            setSendMess(response.data);
            console.table(response.data)
        })

    }, [sendMess]);

    useEffect(() => {    
        axios.get('/user-receiver-chats').then(response => {
            setReceiMess(response.data);
        })
    }, [receiMess])

    const allMess = [...sendMess, ...receiMess];
    allMess.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    async function sendMessages(ev) {
        ev.preventDefault(ev);
        try {
            await axios.post('/api/chats', {
                content
            });
            setContent('')
        } catch (error) {
            console.error(error);
            alert('fail');
        }
    }

    useEffect(() => {
        if (messagesListRef.current) {
            const contentHeight = messagesListRef.current.scrollHeight;
            if (prevContentHeight !== null && contentHeight > prevContentHeight) {
                messagesListRef.current.scrollTop = contentHeight;
            }
            setPrevContentHeight(contentHeight);
        }
    }, [sendMess, receiMess]);

    return (
        <>
           
                <div className="mess-content" ref={messagesListRef}>
                    {allMess.length > 0 && allMess.map(chat => (
                        <div key={chat} className=
                            {chat.sender === user._id ? "message-sent-by-me" : "message-received"}
                        >
                            {/* Hiển thị thời gian tin nhắn */}
                            <p className="message-time">
                                {new Date(chat.createdAt).toLocaleString()}
                            </p>
                            {/* Hiển thị nội dung tin nhắn */}
                            <p className="message-content">{chat.content}</p>
                        </div>
                    ))}
                </div>
                <div className="mess-input">
                    <form className="form-input-mess" onSubmit={sendMessages}>
                        <div className="input-img">
                            <FontAwesomeIcon style={{ height: '25px', color: 'white' }} icon={faAdd} />
                        </div>
                        <div className="input-text">

                            <input type="text" className="input-content" value={content}
                                onChange={(e) => setContent(e.target.value)} />

                        </div>
                        <div className="btn-send">
                            <FontAwesomeIcon style={{ height: '20px' }} icon={faFaceSmile} />
                        </div>
                        {/* <button>Send</button> */}
                    </form>
                </div>
           
        </>
    )
}