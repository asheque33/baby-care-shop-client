"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import {
  removeFromCartItem,
  updateIntoCartItem,
} from "@/redux/features/cartSlice";
import Image from "next/image";
const CartDetails = ({ cartProduct }: { cartProduct: any }) => {
  const dispatch = useAppDispatch();
  const handleQuantity = (type: string, _id: string) => {
    const payload = { type, _id };
    dispatch(updateIntoCartItem(payload));
  };
  const handleRemove = (_id: string) => {
    dispatch(removeFromCartItem(_id));
  };

  return (
    <div className=" border border-gray-300 bg-[#F5EFE6] rounded-lg p-4  transition-transform transform  hover:scale-105  w-full max-w-md mx-auto my-6">
      <Image
        height={96}
        width={96}
        src={cartProduct.image}
        alt={cartProduct.title}
        className="w-24 h-24  object-cover rounded-md"
      />
      <div className="flex-grow ">
        <h3 className="text-lg font-semibold text-green-700 truncate mb-2">
          {cartProduct.title}
        </h3>
        <p className="text-lg font-bold text-red-600">${cartProduct.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => handleQuantity("decrement", cartProduct._id)}
          className="bg-green-700 text-white p-2 rounded-full hover:bg-green-800"
        >
          <Minus size={18} />
        </Button>
        <span className="text-lg font-semibold">{cartProduct.quantity}</span>
        <Button
          onClick={() => handleQuantity("increment", cartProduct._id)}
          className="bg-green-700 text-white p-2 rounded-full hover:bg-green-800"
        >
          <Plus size={18} />
        </Button>
        <Button
          onClick={() => handleRemove(cartProduct._id)}
          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};
export default CartDetails;
