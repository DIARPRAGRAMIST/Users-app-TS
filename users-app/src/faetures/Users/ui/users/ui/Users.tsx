import { useState } from 'react';
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
    <div className='users' style={{ paddingLeft: "40%" }}>
      {users.map(user => (
        <div key={user.id}>
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
          <p>city: {user.address.city}</p> {/* Обращаемся к city через address */}
          <Button onClick={() => handleDelete(user.id)}>delete</Button>
          <Button onClick={() => openModal(user)}>edit</Button>
        </div>
      ))}
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        user={editingUser}
        saveUser={saveEditedUser}
      />
    </div>
  );
}

export default Users;
