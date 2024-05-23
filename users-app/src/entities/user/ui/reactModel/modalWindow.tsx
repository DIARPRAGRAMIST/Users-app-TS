import React, { useState, useEffect, FormEvent } from 'react';
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

    if (!isOpen || !formData) return null;

    return (
        <div className='overlay'>
            <div className='modal'>
                <div className='modal-content'>
                    <h2>Редактировать пользователя</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Имя:</label>
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
                        <label>Город:</label>
                        <input 
                            type="text" 
                            name="city" 
                            value={formData.address.city} 
                            onChange={handleChange} 
                        />
                        <div className='userBtn'>
                            <button className='save' type="submit">Сохранить</button>
                            <button className='close' type="button" onClick={onRequestClose}>Закрыть</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
