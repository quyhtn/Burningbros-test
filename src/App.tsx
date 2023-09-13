import React, { useEffect, useState, type ChangeEvent } from "react";
import { Product, ProductsResponse } from "./models/product";
import useIntersectionObserver from "./useIntersectionObserver";
import { BASE_URL } from "./env";
import ProductComponent from "./components/ProductComponent";
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchText, setSearchText] = useState<string>();

  const fetchProducts = async (skip = 0, limit = 20) => {
    console.log(searchText);
    setLoading(true);
    const response = await fetch(
      searchText
        ? `${BASE_URL}/products/search?q=${searchText}&limit=${limit}&skip=${skip}`
        : `${BASE_URL}/products/?limit=${limit}&skip=${skip}`
    );

    const data = (await response.json()) as ProductsResponse;
    if (data.total <= skip + limit) setHasNextPage(false);
    setLoading(false);
    return data.products;
  };

  useEffect(() => {
    void fetchProducts().then(setProducts);
  }, [searchText]);

  const lastProductRef = useIntersectionObserver<HTMLLIElement>(() => {
    void fetchProducts(products.length).then((newProducts) =>
      setProducts((products) => [...products, ...newProducts])
    );
  }, [hasNextPage, !loading]);

  return (
    <div className="container flex">
      <div className="w-full flex flex-col justify-center items-center">
        <input
        placeholder="search here"
          className="outline-none pl-2 w-[200px] my-2 border-2"
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchText(event?.target?.value)
          }
        />

        <ul className="w-full flex flex-col justify-center items-center">
          {products.map((product, index, products) => {
            return (
              <li
                className="mb-2"
                key={index}
                ref={products.length - 1 === index ? lastProductRef : null}
              >
                <ProductComponent {...product} />
              </li>
            );
          })}
        </ul>
        {loading && <div>loading...</div>}
      </div>
    </div>
  );
}

export default App;
