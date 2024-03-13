/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/NT0KRnQ0oSB
 */
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

interface CartProductsListProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  removeItemCart: (id: string) => void;
}

export function CartProductsList({
  items,
  removeItemCart,
}: CartProductsListProps) {
  return (
    <div className="grid gap-4 w-full max-w-3xl mx-auto pr-10">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="font-semibold">Shopping Cart</h1>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Your items are waiting for you
          </p>
        </div>
      </div>
      {items.length === 0 && (
        <p className="font-semibold text-center leading-none text-gray-500 dark:text-gray-400">
          Your cart is empty
        </p>
      )}
      {items?.map((item) => {
        return (
          <div className="border-t border-b py-4" key={item.id}>
            <div className="grid grid-cols-2 items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-4">
                <img
                  alt="Image"
                  className="aspect-square rounded-lg object-cover"
                  height="80"
                  src="/placeholder.svg"
                  width="80"
                />
                <div className="grid gap-0.5">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm leading-none">Item {item.id}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <h3 className="font-semibold">${item.price}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Quantity:
                      </span>
                      <span className="font-semibold">{item.quantity}</span>
                    </div>
                  </div>
                  <Button
                    className="w-8 h-8"
                    size="icon"
                    variant="outline"
                    onClick={() => removeItemCart(item.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
