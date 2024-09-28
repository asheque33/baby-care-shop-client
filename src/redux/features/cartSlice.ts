import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "@/types/product.type";
import { toast } from "sonner";

interface ICartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

interface ICartState {
  cartItems: ICartItem[];
}
const initialState: ICartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItem: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      ); // dispatch theke jeta pathabo setai action.payload ashbe(object/string/number etc)
      if (!existingItem) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        toast.warning("Product Already Added To Cart!");
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCartItem: (state) => {
      state.cartItems = [];
    },
  },
});
export const { addToCartItem, removeCartItem, clearCartItem } =
  cartSlice.actions;
export const selectedCartItems = (state: RootState) => state.cart.cartItems;
export const cartReducer = cartSlice.reducer;

//!   if i want to add multiple items clicking on the Add to Cart button
/*  
 const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
*/
