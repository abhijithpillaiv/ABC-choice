import React, { useState } from 'react'
import Cart from './cart'
import { switchContext } from './switchContext'
import Alert from '../alert'

function Main() {
    const [confirm, setconfirm] = useState({isOpen:false})

    return (
        <switchContext.Provider value={{setconfirm:setconfirm,}}>
            <Cart/>

            <Alert confirm={confirm} setconfirm={setconfirm}/>
        </switchContext.Provider>
    )
}

export default Main
