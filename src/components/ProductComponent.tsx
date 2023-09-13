import React from "react";
import { Product } from "../models/product";

function ProductComponent(props: Product) {
  const { id, title, thumbnail } = props;
  return (
    <div className="w-[200px] rounded-md border flex flex-col justify-center">
      <img className="object-contain h-48" src={thumbnail} alt="" />
      <div className="flex flex-wrap justify-center">
        <div className="text-red-600 font-bold">#{id}</div>
        <div className="text-center">{title}</div>
      </div>
    </div>
  );
}

export default ProductComponent;
