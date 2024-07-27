import React from 'react';

export default function ProductList({ listProduct, selectedProduct, onSelectProduct }:{
    listProduct: ListProduk[];
    selectedProduct: any;
    onSelectProduct: any;}) {
  return (
    <section>
      <h3 className="pb-4 text-sm/6 font-semibold text-card-foreground">Diamonds</h3>
      <div>
        <label className="sr-only">Select a variant list</label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {listProduct.map((data: any) => (
            <label
              key={data.code}
              htmlFor={`product-${data.code}`}
              className={`relative flex cursor-pointer rounded-xl p-2.5 text-background shadow-sm outline-none bg-accent/60 md:p-4 ${
                selectedProduct?.code === data.code ? 'ring-2 ring-offset-background ring-offset-2 ring-primary' : 'border-transparent'
              }`}
            >
              <input
                type="radio"
                id={`product-${data.code}`}
                name="product"
                value={data.code}
                checked={selectedProduct?.code === data.code}
                onChange={() => onSelectProduct(data)}
                className="absolute opacity-0"
              />
              <span className="flex flex-1">
                <span className="flex flex-col justify-between text-white">
                  <span className="block text-xs font-semibold">{data.name}</span>
                  <div>
                    <span
                      className={`mt-1 flex items-center text-xs ${
                        selectedProduct?.code === data.code ? 'text-foreground' : 'text-foreground'
                      } font-semibold`}
                    >
                      {data.price.basic}
                    </span>
                  </div>
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
