import { getProducts } from "@/utils/getProducts";
import ProductsTabularList from "../../DashComponents/Admin/ProductsTabularList/ProductsTabularList";

const AdminProductsPage = async () => {
  const { data: existingProducts } = await getProducts({ cache: "no-store" });
  return <ProductsTabularList existingProducts={existingProducts} />;
};

export default AdminProductsPage;
