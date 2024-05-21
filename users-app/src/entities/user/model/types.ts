export interface Address {
    city: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    address: Address; 
  }
export interface ModalWindowProps {
    isOpen: boolean;
    onRequestClose: () => void;
    user: User | null;
    saveUser: (user: User) => void;
}
