import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { LoginForm } from "./components/component/login-form";
import { ProductList } from "./components/component/product-list";
import { Button } from "./components/ui/button";
import { CartProductsList } from "./components/component/cart-products-list";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
function App() {
  const [userId, setUserId] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    amplitude.init(import.meta.env.VITE_AMPLITUDE_KEY);
  }, []);
  console.log(import.meta.env.VITE_AMPLITUDE_KEY);

  const onSubmit = (values: { email: string; password: string }) => {
    setUserId(values.email);
    amplitude.setUserId(values.email);
  };

  const handleLogout = () => {
    amplitude.reset();
    setUserId("");
  };

  const handleAddCart = (value: string) => {
    const index = cartItems.findIndex((c) => c.name === value);

    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += 1;
      setCartItems(newCartItems);
      amplitude.logEvent("add_to_cart", { product_id: value });
      return;
    }

    if (index >= 0) {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += 1;
      setCartItems(newCartItems);
      amplitude.logEvent("add_to_cart", { product_id: value });
      return;
    }

    const item = {
      id: Math.random().toString(36).substring(7),
      name: value,
      price: 29.99,
      quantity: 1,
    };

    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    amplitude.logEvent("add_to_cart", { product_id: value });
  };

  const removeItemCart = (value: string) => {
    const index = cartItems.findIndex((c) => c.id === value);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
    }

    amplitude.logEvent("remove_from_cart", { product_id: value });
  };

  return (
    <>
      {!userId ? (
        <div className="flex justify-center mt-20">
          <LoginForm onSubmit={onSubmit} />
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="justify-end flex p-4">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          <div className="flex w-full">
            <ProductList handleAddCart={handleAddCart} />

            <div className="max-w-[320px]">
              <CartProductsList
                items={cartItems}
                removeItemCart={removeItemCart}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
