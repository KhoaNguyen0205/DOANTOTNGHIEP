/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Admin from "./Admin";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSmile } from "@fortawesome/free-solid-svg-icons";

export default function Chat() {

    const [customers, setCustomers] = useState([])
    const { id } = useParams();
    const [chatByCustomers, setChatByCustomers] = useState([]);
    const [chatByAdmin, setChatByAdmin] = useState([]);
    const [content, setContent] = useState('');
    const messagesListRef = useRef(null);
    const [prevContentHeight, setPrevContentHeight] = useState(null);
    const [idCustomerOnChat, setIdCustomerOnChat] = useState([]);

    
    useEffect(() => {
        axios.get('/api/list/customer-on-chat').then(response => {
            setIdCustomerOnChat(response.data);
        })
    },[idCustomerOnChat]);

    const IdArray = [...idCustomerOnChat]
    const reverseArr = [...IdArray].reverse()
    const setReverseArr = new Set(reverseArr);
    const resultId = [...setReverseArr];

    useEffect(() => {
        if (messagesListRef.current) {
            const contentHeight = messagesListRef.current.scrollHeight;
            if (prevContentHeight !== null && contentHeight > prevContentHeight) {
                messagesListRef.current.scrollTop = contentHeight;
            }
            setPrevContentHeight(contentHeight);
        }
    }, [chatByAdmin, chatByCustomers]);

    useEffect(() => {
        axios.get('/api/user').then(response => (
            setCustomers(response.data)
        ))
    })

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/api/customer/send/${id}`).then(response => {
                setChatByCustomers(response.data);
            });
        }

    }, [chatByCustomers, id]);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/api/customer/receiver/${id}`).then(response => {
                setChatByAdmin(response.data);
            })
        }

    }, [chatByAdmin,id])

    const allChats = [...chatByCustomers, ...chatByAdmin];
    allChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));



    async function sendMess(ev) {
        ev.preventDefault(ev);
        try {
            await axios.post(`api/admin/chats/${id}`, {
                content
            });
            setContent('')
        } catch (error) {
            console.error(error);
            alert('fail');
        }
    }
    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            sendMess(ev);
        }
    }



    return (<>
        <Admin />
        <div className="admin-content-container">
            <div className="admin-chat-container">
                <div className="chat-list">
                    { resultId.length > 0 && resultId.filter(idCustomer => idCustomer !== '652f946bab172e1c97cce150')
                    .map(idCustomer => (
                        <div className="customer-chat" key={idCustomer}>
                            {customers.length > 0 && customers.filter(customer => customer._id === idCustomer && customer._id !== '652f946bab172e1c97cce150')
                                .map(customer => (
                                    <Link to={'/adminpage/chat/' + customer._id} key={customer} className="">
                                        {customer.name}
                                    </Link>
                                ))}
                                {/* <div>{idCustomer}</div> */}
                        </div>
                        
                    ))}
                </div>
                <div className="messages-content-input">
                    <div className="admin-chat-content" ref={messagesListRef}>
                        {allChats.length > 0 && allChats.map(chat => (
                            <div key={chat} className=
                                {chat.sender !== id ? "message-sent-by-me" : "message-received"}
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

                    <form className="admin-input-mess" onSubmit={sendMess}>
                        <div className="admin-input-file">
                            <FontAwesomeIcon icon={faAdd} />
                        </div>
                        <div className="admin-input-content">
                            <input type="text" value={content} required onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div className="admin-input-icon">
                            <FontAwesomeIcon icon={faSmile} />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </>);
}