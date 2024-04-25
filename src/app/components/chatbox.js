// chatbox.js
import React, { useState } from 'react';
import styles from './chatbox.module.css'; // Import your chatbox styles
import { FaComment, FaTimes } from 'react-icons/fa'; // Import icons

const ChatBox = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [posX, setPosX] = useState(0); // Initial X position
    const [posY, setPosY] = useState(0); // Initial Y position
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Calculate position relative to the widget button
            const widgetButton = document.querySelector(`.${styles.toggleButton}`);
            const rect = widgetButton.getBoundingClientRect();
            setPosX(rect.left - 420); // Adjust the value as needed for the desired distance from the widget button
            setPosY(rect.top- 180);
        }
    };

    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.clientX - posX);
        setStartY(e.clientY - posY);
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosX(e.clientX - startX);
            setPosY(e.clientY - startY);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div className={className}> {/* Container for both draggable area and fixed widget button */}
            <div
                className={`${isOpen ? `${styles.chatbox} ${styles.open}` : styles.chatbox}`}
                style={{ left: `${posX}px`, top: `${posY}px` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
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
            <button className={styles.toggleButton} onClick={toggleChatBox}>
                {isOpen ? <FaTimes /> : <FaComment />}
            </button>
        </div>
    );
};

export default ChatBox;
