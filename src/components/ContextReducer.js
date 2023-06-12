import React, { createContext, useReducer, useContext } from 'react'
        
// CartStateContext is the state of cart state which is global 
const CartStateContext = createContext();
// CartDispatchContext is for dispatch function which is also global. 
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
      case "ADD":
          return [...state,{id:action.id, name:action.name, desc:action.desc, price:action.price}]   
      case "REMOVE":
          let newArr = [...state]
          // we can add an object directly to state but can't remove it. First we create a copy of state as newArr and then use splice function
          // splice function removes the element at action.index
          newArr.splice(action.index,1)
          return newArr;     
      case "DROP":
          let empArray = []
          return empArray    
      default:
          console.log("Error in Reducer");    
    }
}

// children here refers to the child component(s) of CartProvider
// CartProvider is the method in which we have wrapped the state updates of state of Cart and cart dispatch 
export const CartProvider = ({children})=>{

  const[state, dispatch] = useReducer(reducer,[])
  return (
    // provider accepts a "value" prop that holds the global data and any component that is a child of the provider. 
   <CartDispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
        {children}
    </CartStateContext.Provider>
   </CartDispatchContext.Provider>
  )
}

// whenever we would want to use state, we will use useCart
export const useCart = () => useContext(CartStateContext);
// whenever we would want to use dispatch, we will use useDispatch
export const useDispatch = () => useContext(CartDispatchContext);