// chatbox.js
import React, { useState } from 'react';
import styles from "./chatbox.module.css"; // Import your chatbox styles
import { FaComment, FaTimes } from 'react-icons/fa'; // Import icons

const ChatBox = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${isOpen ? `${styles.chatbox} ${styles.open}` : styles.chatbox} ${className}`}>
            <button className={styles.toggleButton} onClick={toggleChatBox}>
                {isOpen ? <FaTimes /> : <FaComment />}
            </button>
            {isOpen && (
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h2>Chat Support</h2>
                        <button onClick={toggleChatBox}><FaTimes /></button>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.messages}>
                            <div className={styles.message}>Hello! How can I assist you today?</div>
                            {/* Add more messages here */}
                        </div>
                        <input type="text" placeholder="Type your message..." className={styles.inputField} />
                        <button className={styles.sendButton}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
