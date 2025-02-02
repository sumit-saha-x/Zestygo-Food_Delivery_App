import react, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();       //globat state which can be changed from anywhere like home page
const CartDispatchContext = createContext();

const reducer = (state, action) => {                 //specify what to perform action like add ,delete is specified and move to dispach to carry out the procedure
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in Reducer")
    }
}

export const CartProvider = ({ children }) => {             //children is the component of card
    const [state, dispatch] = useReducer(reducer, []/*initial Cart array is empty*/)      //state mean initial value of cart like usestate, dispatch means multi cases like add to card then delete also
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext value={state}>
                {children}
            </CartStateContext>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
