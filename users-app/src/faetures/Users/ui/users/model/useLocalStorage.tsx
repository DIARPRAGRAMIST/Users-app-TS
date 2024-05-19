import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../../../../entities/user/model/types";
import { baseUrl } from "../../../../../entities/user/model/api";

const USERS_LOCAL_STORAGE_KEY = "users";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUsersFromLocalStorage = () => {
            const localUsersJSON = localStorage.getItem(USERS_LOCAL_STORAGE_KEY);
            if (localUsersJSON) {
                setUsers(JSON.parse(localUsersJSON));
            }
        };

        loadUsersFromLocalStorage();

        if (users.length === 0) {
            axios
                .get<User[]>(baseUrl)
                .then((res) => {
                    setUsers(res.data);
                    localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(res.data));
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, []);

    const handleDelete = (id: number) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    };

    const handleEdit = (editedUser: User) => {
        const updatedUsers = users.map((user) => (user.id === editedUser.id ? editedUser : user));
        setUsers(updatedUsers);
        localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    const saveEditedUser = (editedUser: User) => {
        handleEdit(editedUser);
        setEditingUser(null);
    };

    const allUsersDeleted = users.length === 0;

    useEffect(() => {
        if (allUsersDeleted) {
            axios
                .get<User[]>(baseUrl)
                .then((res) => {
                    setUsers(res.data);
                    localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(res.data));
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, [allUsersDeleted]);

    return { handleDelete, handleEdit, users, handleEditUser, saveEditedUser, editingUser };
};
