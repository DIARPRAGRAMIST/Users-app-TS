import React, { useState, useEffect, FormEvent } from 'react';
import ReactModal from 'react-modal';
import './modelWindow.css';
import { User, ModalWindowProps } from '../../model/types';

const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onRequestClose, user, saveUser }) => {
    const [formData, setFormData] = useState<User | null>(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            const { name, value } = e.target;
            if (name === 'city') {
                setFormData({
                    ...formData,
                    address: { ...formData.address, city: value }
                });
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData) {
            saveUser(formData);
        }
        onRequestClose();
    };

    if (!formData) return null;

    return (
        <ReactModal 
            className="modal" 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            contentLabel="Edit User Modal"
        >
            <div className='overlay'>
                <div className='modalW'>
                    <h2>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                        <label>City:</label>
                        <input 
                            type="text" 
                            name="city" 
                            value={formData.address.city} 
                            onChange={handleChange} 
                        />
                        <div className='userBtn'>
                            <button className='save' type="submit">Save</button>
                            <button className='close' type="button" onClick={onRequestClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    );
};

export default ModalWindow;
