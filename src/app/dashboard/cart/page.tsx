import { products, type Product } from "@/shop/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";
import { WidgetItem } from "../../../components/widgets/WidgetItem";

export const metadata = {
  title: "Carrito de compras",
  description: "Carrito de compras",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

interface CookiesCart {
  [id: string]: number;
}

// esta funcion procesa los productos en el carrito y me devuelve un array con los productos y la cantidad de cada 1
const getProductsInCart = (cart: CookiesCart): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default async function CartPage() {
  const cookieStore = await cookies();

  const cart = JSON.parse(
    cookieStore.get("cart")?.value ?? "{}"
  ) as CookiesCart;

  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-3" />

      <div className="flex flex-col w-full sm:flex-row">
        {productsInCart.length === 0 ? (
          <p className="w-full text-2xl text-red-500">
            No hay productos en el carrito
          </p>
        ) : (
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-2 w-full sm:w-8/12">
              {productsInCart.map(({ product, quantity }) => (
                <ItemCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col sm:w-4/12 w-full">
          <WidgetItem title="Resumen de la compra">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
