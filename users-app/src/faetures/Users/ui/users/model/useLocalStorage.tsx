import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../../../../entities/user/model/types";
import { baseUrl } from "../../../../../entities/user/model/BaseUrl";

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

        const fetchUsersFromAPI = async () => {
            try {
                const { data } = await axios.get<User[]>(baseUrl);
                setUsers(data);
                localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        loadUsersFromLocalStorage();
        if (users.length === 0) {
            fetchUsersFromAPI();
        }
    }, [users.length]);

    useEffect(() => {
        const fetchUsersFromAPI = async () => {
            try {
                const { data } = await axios.get<User[]>(baseUrl);
                setUsers(data);
                localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (users.length === 0) {
            fetchUsersFromAPI();
        }
    }, [users.length]);

    const updateUserStorage = (updatedUsers: User[]) => {
        setUsers(updatedUsers);
        localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    };

    const handleDelete = (id: number) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        updateUserStorage(updatedUsers);
    };

    const handleEdit = (editedUser: User) => {
        const updatedUsers = users.map((user) => (user.id === editedUser.id ? editedUser : user));
        updateUserStorage(updatedUsers);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    const saveEditedUser = (editedUser: User) => {
        handleEdit(editedUser);
        setEditingUser(null);
    };

    return { handleDelete, handleEdit, users, handleEditUser, saveEditedUser, editingUser };
};
