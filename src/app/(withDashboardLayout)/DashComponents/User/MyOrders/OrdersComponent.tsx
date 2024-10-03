"use client";
import Container from "@/components/Shared/Container/Container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectedUser } from "@/redux/features/authSlice";

export const UserOrdersComponents = () => {
  const user = useAppSelector(selectedUser); // Fetch the authenticated user from Redux
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user!.email) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders?userEmail=${
            user!.email
          }`
        );
        const data = await response.json();
        console.log(data, "email by data");

        if (response.ok) {
          setOrders(data.data);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user!.email]); // Trigger when the user email is available

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Container className=" p-0 w-[90%]">
      <div className="pt-4">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center mb-4">
          My Orders
        </h1>
      </div>
      <Table className="my-6">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader className="font-bold text-lg bg-[#F1EFEF]  ">
          <TableRow className="text-[#191717] flex justify-between gap-x-4">
            <TableHead className=" ">Order No</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Total Items</TableHead>
            <TableHead className="">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="mx-auto">
          {orders?.map((order, index) => (
            <TableRow
              className="flex justify-between gap-x-4 p-2
              "
              key={order._id}
            >
              <TableCell className="  ml-6" colSpan={1}>
                {index + 1}
              </TableCell>
              {order.status === "pending" ? (
                <TableCell
                  colSpan={1}
                  className="text-medium
                font-medium text-white bg-red-600 rounded-2xl px-2.5"
                >
                  {order.status}
                </TableCell>
              ) : (
                <TableCell
                  colSpan={1}
                  className="text-medium
               font-bold text-white bg-[#1898ae] rounded-2xl px-2.5"
                >
                  {order.status}
                </TableCell>
              )}
              <TableCell colSpan={1} className="font-semibold text-center">
                {order.totalItems}
              </TableCell>
              <TableCell colSpan={1} className="font-bold">
                {order.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="flex justify-between">
            <TableCell colSpan={3}>Total Orders</TableCell>
            <TableCell className="mr-4">{orders?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  );
};
