import { useRef } from "react"
import { createContext } from "react"
import { useEffect } from "react"
import { io } from "socket.io-client"

export const SocketContext= createContext()
const ContainerSocket = ({children}) => { 
  const socketRef= useRef()
  useEffect(()=> {
    socketRef.useEffect= io("http://localhost:4000/client", { transports: ["websocket"] })
  }, [])
  const ping= ()=> {
    socketRef.current.emit("hello", {data: "giang"})
    socketRef.current.on("server", (data)=> {
        console.log(1111) 
    })
  }
  return (
    <SocketContext.Provider value={{ping}}>
        {children}
    </SocketContext.Provider>
  )
}

export default ContainerSocket
