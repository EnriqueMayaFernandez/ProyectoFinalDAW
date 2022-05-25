import React ,{useState} from 'react'

const Context = React.createContext({}) 

export function UsersContextProvider({children}){
    const [usuarios,setUsuarios] = useState([])

    return <Context.Provider value={{usuarios, setUsuarios}}>
        {children}
    </Context.Provider>
}

export default Context