export interface Address {
    city: string;
    // другие свойства address, если есть
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    address: Address; // вложенный объект address
  }
export interface ModalWindowProps {
    isOpen: boolean;
    onRequestClose: () => void;
    user: User | null;
    saveUser: (user: User) => void;
}
