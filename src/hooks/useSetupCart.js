import { useEffect } from "react";
import useCartStore from "./useCartStore";

export const useSetupCart = () => {
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);
};

export default useSetupCart;