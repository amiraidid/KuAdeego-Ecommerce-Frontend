import { Suspense, useContext } from "react";
import { Center, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import SideFilter from "../components/SideFilter";
import ProductComp from "../components/ProductComp";
import { ProductsContext } from "../context/ProductsContext";
import Loader from "../components/Loader";

function Product() {
  const { products, isLoading, value, setValue } = useContext(ProductsContext);

  // let indexLength = 2;
  // const productsSlice = products.slice(0, indexLength);
  // console.log(productsSlice);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-4 pb-3 overflow-hidden">
      <div className="flex justify-start items-start max-sm:block gap-2 ">
        <div>
          <SideFilter value={value} setValue={setValue} />
        </div>
        <div className="w-full">
          <Suspense fallback={<Loader />}>
            <ProductComp products={products} isLoading={isLoading} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Product;
