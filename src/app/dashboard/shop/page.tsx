import { ProductCard } from "@/shop";
import { products } from "@/shop/data/products";

export default function ShopPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} {...product}/>
      ))}
    </div>
  );
}
