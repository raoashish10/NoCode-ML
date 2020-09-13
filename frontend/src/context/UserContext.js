import { useContext, createContext } from 'react';

export const UserContext = createContext();

export const useStore = () => {
    return useContext(UserContext);
};