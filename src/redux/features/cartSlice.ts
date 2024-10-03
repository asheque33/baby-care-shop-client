import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "@/types/product.type";
import { toast } from "sonner";

// Defining types for state
interface ICartProduct extends IProduct {
  quantity: number;
}
export interface ICartState {
  cartProducts: ICartProduct[];
  totalItems: number;
  subTotal: number;
  shipping: number;
  grandTotal: number;
}

const initialState: ICartState = {
  cartProducts: [],
  totalItems: 0,
  subTotal: 0,
  shipping: 15,
  grandTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItem: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.cartProducts.find(
        (cartProduct) => cartProduct._id === action.payload._id
      ); // dispatch theke jeta pathabo setai action.payload ashbe(object/string/number etc)
      if (!existingItem) {
        state.cartProducts.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        toast.warning("Product Already Added To Cart!");
      }
      // Recalculate all
      state.totalItems = selectedTotalItems(state);
      state.subTotal = selectedSubTotal(state);
      state.grandTotal = selectedGrandTotal(state);
    },
    // Update item quantity in the cart
    // Update item quantity in the cart
    updateIntoCartItem: (
      state,
      action: PayloadAction<{ type: string; _id: string }>
    ) => {
      state.cartProducts = state.cartProducts.map((cartProduct) => {
        if (cartProduct._id === action.payload._id) {
          if (action.payload.type === "increment") {
            cartProduct.quantity += 1;
          } else if (
            action.payload.type === "decrement" &&
            cartProduct.quantity > 1
          ) {
            cartProduct.quantity -= 1;
          }
        }
        return cartProduct;
      });

      // Recalculate totals after quantity update
      state.totalItems = selectedTotalItems(state);
      state.subTotal = selectedSubTotal(state);
      state.grandTotal = selectedGrandTotal(state);
    },
    // New action to remove an item from the cart
    removeFromCartItem: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter(
        (cartProduct) => cartProduct._id !== action.payload
      );

      // Recalculate totals after item removal
      state.totalItems = selectedTotalItems(state);
      state.subTotal = selectedSubTotal(state);
      state.grandTotal = selectedGrandTotal(state);
    },
    clearCartItem: (state) => {
      state.cartProducts = [];
      state.totalItems = 0;
      state.subTotal = 0;
      state.grandTotal = 0;
    },
  },
});
// * totalItems
export const selectedTotalItems = (state: ICartState) =>
  state.cartProducts.reduce((initialItem: number, cartProduct: any) => {
    return Number(initialItem + cartProduct.quantity);
  }, 0);
// * subTotalPrice
export const selectedSubTotal = (state: ICartState) =>
  state.cartProducts.reduce((initialSubTotal: number, cartProduct: any) => {
    return Number(initialSubTotal + cartProduct.quantity * cartProduct.price);
  }, 0);
//* grandTotalPrice
export const selectedGrandTotal = (state: ICartState) => {
  return selectedSubTotal(state) + state.shipping;
};
export const selectedCartItems = (state: RootState) => state.cart.cartProducts;

export const {
  addToCartItem,
  updateIntoCartItem,
  removeFromCartItem,
  clearCartItem,
} = cartSlice.actions;
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

/*
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
*/
