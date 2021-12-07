import React, {createContext, useState} from 'react';
import ProductsAPI from './api/ProductsAPI'

export const GlobalState = createContext(undefined);
export const DataProvider = ({children}) =>{ 
    return (
        <GlobalState.Provider value={"Value from Global"}>
            {children}
        </GlobalState.Provider>
    )
}