import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: {},

  setUser: (providedUser) => set(() => ({
    user: providedUser 
  })),

  removeFromCart: (product) => set((state) => ({
    cart: state.cart.filter((prd) => prd.id !== product.id),
  })),
}))


export default useUserStore;