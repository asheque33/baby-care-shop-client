"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit } from "lucide-react";
import React, { useState } from "react";
import ModalForm from "../ModalForm/ModalForm";
import { IProduct } from "@/types/product.type";

const EditedProductModal = ({
  product,
  getUpdated,
}: {
  product: IProduct;
  getUpdated: (updatedProduct: IProduct) => void;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <section>
      {/* className="bg-[#afb9c6]" */}
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setVisible(true)}
            className="bg-blue-400 p-1.5 rounded-sm"
          >
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#f5efe6]">
          <DialogHeader>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ModalForm
            setVisible={setVisible}
            product={product}
            getUpdated={getUpdated}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EditedProductModal;
