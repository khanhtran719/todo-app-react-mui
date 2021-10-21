import { createContext, useState } from "react";

export const MyContext = createContext({
    todo: [],
    setTodo: () => { }
});

export const MyContextProvider = ({children}) => {
    const [myTodo, setMyTodo] = useState([
        {
            name: "Learn ReactJs",
            date: "2021-10-16",
            completed: true
        },
        {
            name: "To-do List",
            date: "2021-10-23",
            completed: true
        },
        {
            name: "Learn English",
            date: "2021-10-24",
            completed: false
        }
    ]);
    return (
        <MyContext.Provider value={{
            todo: myTodo,
            setTodo: setMyTodo,
        }}>
            {children}
        </MyContext.Provider>
    );
}
