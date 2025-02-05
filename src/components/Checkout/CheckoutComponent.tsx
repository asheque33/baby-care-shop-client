"use client";
import { selectedCartItems } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import CartDetails from "./CartDetails";
import CheckoutSummary from "./CheckoutSummary";
import Container from "../Shared/Container/Container";

const CheckoutComponent = () => {
  const cartProducts = useAppSelector(selectedCartItems);

  return (
    <Container className="grid grid-cols-12">
      <section className="col-span-12 md:col-span-8 w-4/5 sm:w-3/4 md:w-full mx-auto md:mx-0">
        {cartProducts.length > 0 ? (
          cartProducts.map((cartProduct) => (
            <CartDetails key={cartProduct._id} cartProduct={cartProduct} />
          ))
        ) : (
          <div className="h-[60vh] text-xl md:text-2xl flex items-center justify-center text-[#333]">
            <span className="text-red-600 font-semibold">
              {" "}
              Your cart is empty!!
            </span>
          </div>
        )}
      </section>
      <section className="col-span-12 md:col-span-4 w-4/5 sm:w-3/4 md:w-full mx-auto md:mx-0">
        <CheckoutSummary />
      </section>
    </Container>
  );
};

export default CheckoutComponent;
