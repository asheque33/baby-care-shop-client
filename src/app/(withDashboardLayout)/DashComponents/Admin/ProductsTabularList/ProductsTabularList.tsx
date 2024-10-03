"use client";
import { IProduct } from "@/types/product.type";
import Container from "@/components/Shared/Container/Container";
import ProductActions from "@/services/actions/ProductActions";
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
import Image from "next/image";
import React, { useState } from "react";
import EditedProductModal from "../../ProductEditedModal/Modal";

const ProductsTabularList = ({
  existingProducts,
}: {
  existingProducts: IProduct[];
}) => {
  const [products, setProducts] = useState<IProduct[]>(existingProducts);
  const updateProductsList = (updatedProduct: IProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct._id === updatedProduct._id ? updatedProduct : prevProduct
      )
    );
  };

  return (
    <Container className=" p-0 w-[90%]">
      <div className="pt-4">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl text-center mb-4">
          Products Management
        </h1>
      </div>
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader className="font-bold text-lg bg-[#F1EFEF] p-0">
          <TableRow>
            <TableHead className="text-[#191717] ms-8">Picture</TableHead>
            <TableHead className="text-[#191717] ms-4">Title</TableHead>
            <TableHead className="text-[#191717]">Category</TableHead>
            <TableHead className="text-[#191717]">Price</TableHead>
            <TableHead className="text-[#191717] text-end mr-8">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: IProduct) => (
            <TableRow key={product._id}>
              <TableCell className="ms-8 " colSpan={1}>
                <Image
                  height={50}
                  width={50}
                  src={product.image}
                  alt="pImages"
                  className="rounded-lg p-0.5"
                />
              </TableCell>
              <TableCell
                colSpan={1}
                className="text-medium
                  font-bold truncate"
              >
                {product.title?.length > 25
                  ? product.title.slice(0, 25)
                  : product.title}
                ...
              </TableCell>
              <TableCell colSpan={1} className="font-semibold">
                {product.category}
              </TableCell>
              <TableCell colSpan={1} className="font-bold">
                {product.price}
              </TableCell>

              <TableCell
                colSpan={1}
                className=" flex items-center justify-end gap-3"
              >
                <EditedProductModal
                  product={product}
                  getUpdated={updateProductsList}
                />

                <ProductActions productId={product._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Products</TableCell>
            <TableCell>{products.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  );
};

export default ProductsTabularList;
