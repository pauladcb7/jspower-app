import { createStore } from "redux";

const initialState = {
  sidebarShow: "responsive",
  basket: [],
  user: null,
};

const changeState = (state = initialState, { type, ...action }) => {
  /* switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  } */
  switch (type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Cant remove product (id: ${action.id}) as its not in basket!"
        );
      }
      return {
        ...state,
        basket: newBasket,
      }; /*  state.basket.filter(item => item.id !== action.id)}*/

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
