import { TableCell } from "@/components/ui/table";
import React, { useState } from "react";
import { toast } from "sonner";

const UpdateStatus = ({ order }: { order: any }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusToDelivered = async (orderId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "delivered" }),
        }
      );

      if (response.ok) {
        setStatus("delivered");
        toast.success("Order status updated to delivered");
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {status === "pending" ? (
        <TableCell
          onClick={() => handleStatusToDelivered(order._id)} // Pass the order ID
          colSpan={1}
          className="text-medium font-medium text-white bg-red-600 rounded-2xl px-2.5 cursor-pointer"
        >
          {status}
        </TableCell>
      ) : (
        <TableCell
          colSpan={1}
          className="text-medium font-bold text-white bg-[#1898ae] rounded-2xl px-2.5"
        >
          {status}
        </TableCell>
      )}
    </>
  );
};

export default UpdateStatus;
