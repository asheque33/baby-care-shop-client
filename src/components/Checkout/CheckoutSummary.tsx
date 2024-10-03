"use client";
import { clearCartItem } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { CreditCard, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { selectedUser } from "@/redux/features/authSlice";

const CheckoutSummary = () => {
  const dispatch = useAppDispatch();
  const { cartProducts, totalItems, subTotal, shipping, grandTotal } =
    useAppSelector((store: RootState) => store.cart);
  const user = useAppSelector(selectedUser);
  // * handle clear cart
  const handleClearCart = () => {
    dispatch(clearCartItem());
  };
  // * handle proceed checkout
  const handleProceedCheckout = async () => {
    if (!user || !user!.email) {
      toast.error("You must be logged in to place an order");
      return;
    }
    const order = {
      userName: user!.name,
      userEmail: user!.email,
      products: cartProducts,
      status: "pending",
      totalItems: totalItems,
      totalAmount: grandTotal,
      paymentMethod: "Cash On Delivery",
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
          cache: "no-store",
        }
      );

      if (response.ok) {
        await response.json();

        dispatch(clearCartItem());
        toast.success("Order created successfully!");
      } else {
        toast.error("Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("An error occurred creating order.");
    }
  };

  return (
    <section
      id="checkout-summary"
      className="static bg-[#F5EFE6] my-6 md:my-0 md:fixed md:top-1/3 md:right-8 z-50 md:transform md:-translate-y-1/2"
    >
      <div className="border border-slate-300 rounded-xl  shadow-md shadow-blue-200">
        <div className="px-6 py-4 space-y-4">
          <h1 className="text-3xl font-bold text-dark">Checkout Summary</h1>
          <p className="text-sm text-dark mt-2">
            Total Selected Items: {totalItems}
          </p>
          <p className="text-sm text-dark mt-2">
            SubTotal: ${subTotal.toFixed(2)}
          </p>
          <p className="text-sm text-dark mt-2">
            Shipping: {shipping.toFixed(2)}
          </p>
          <h3 className="text-xl font-semibold text-dark mt-4">
            Grand Total: {grandTotal.toFixed(2)} Taka
          </h3>

          {/* Payment Method Option */}
          <div className="border p-4 bg-white rounded-md shadow-md mt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Payment Method
            </h4>
            <div className="flex items-center">
              <Input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="Cash On Delivery"
                defaultChecked
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
              />
              <label
                htmlFor="cashOnDelivery"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Cash On Delivery
              </label>
            </div>
          </div>
        </div>

        <div className="px-4 pb-6">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-500 px-3 py-2 text-white  mt-2 rounded-md w-full text-xs flex justify-between items-center mb-4"
          >
            <span>Clear Cart</span>
            <Trash2 className="inline" width={15} height={15} />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleProceedCheckout();
            }}
            className="bg-green-600 px-3 py-2 text-white  mt-2 rounded-md w-full text-xs flex justify-between items-center"
          >
            <span>Proceed Checkout</span>
            <CreditCard className="inline" width={15} height={15} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSummary;
