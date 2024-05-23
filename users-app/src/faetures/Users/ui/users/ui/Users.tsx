import React, { useState } from 'react';
import { Button } from "../../../../../shared/ui";
import { useUsers } from "../model/useLocalStorage";
import ModalWindow from "../../../../../entities/user";
import "./users.css";
import { User } from '../../../../../entities/user/model/types';

function Users() {
  const { handleDelete, handleEditUser, saveEditedUser, users, editingUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user: User) => {
    handleEditUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='users'>
      {users.map(user => (
        <div className="user-card" key={user.id}>
          <p>Имя: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Город: {user.address.city}</p>
          <Button onClick={() => handleDelete(user.id)}>Удалить</Button>
          <Button onClick={() => openModal(user)}>Редактировать</Button>
        </div>
      ))}
      {editingUser && (
        <ModalWindow
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          user={editingUser}
          saveUser={saveEditedUser}
        />
      )}
    </div>
  );
}

export default Users;
