import React from 'react';

type PopupProps = {
    message: string;
    onOK: () => void;
    onCancel: () => void;
};

const Popup: React.FC<PopupProps> = ({ message, onOK, onCancel }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <p>{message}</p>
                <div className="popup-buttons">
                    <button onClick={onOK}>OK</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
