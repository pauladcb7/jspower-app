import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  sidebarShow: "responsive",
  basket: [],
  user: null,
};

const changeState = (state = initialState, { type, ...action }) => {
  // switch (type) {
  //   case "set":
  //     return { ...state, ...rest };
  //   default:
  //     return state;
  // }
  switch (type) {
    case "set":
      return { ...state, ...action };
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
    case "LOG_OUT":
      return {
        ...state,
        user: null,
      };
    case "SET_GPS":
      return {
        ...state,
        gps: action.gps,
      };
    default:
      return state;
  }
};
const persistedReducer = persistReducer(persistConfig, changeState);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;
