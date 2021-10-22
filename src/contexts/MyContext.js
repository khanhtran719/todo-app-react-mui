import { createContext, useState } from "react";

export const MyContext = createContext({
    todo: [],
    setTodo: () => { }
});

export const MyContextProvider = ({children}) => {
    const [myTodo, setMyTodo] = useState([...JSON.parse(localStorage.getItem("todos"))]);
    return (
        <MyContext.Provider value={{
            todo: myTodo,
            setTodo: setMyTodo,
        }}>
            {children}
        </MyContext.Provider>
    );
}
