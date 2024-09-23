import React from "react";
import ProductForm from "../../DashComponents/ProductForm/ProductForm";
import Container from "@/components/Shared/Container/Container";

const AdminAddProductPage = () => {
  return (
    <>
      <div className="pt-4">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center ">
          Create a new Product
        </h1>
      </div>
      <Container className="my-4 p-3  w-[80%] mx-auto border border-slate-400 rounded-2xl">
        <ProductForm />
      </Container>
    </>
  );
};

export default AdminAddProductPage;
