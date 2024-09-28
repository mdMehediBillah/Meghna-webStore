import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cartItems: [], // Array to hold cart items
  }),

  getters: {
    cartItemCount: (state) => state.cartItems.length, // Getter for cart item count
  },

  actions: {
    addItemToCart(item) {
      console.log("Current cart items:", this.cartItems); // Debugging line
      console.log("Adding item to cart:", item); // Debugging line

      // Ensure the item has an id
      if (!item.id) {
        console.error("Item is missing an ID:", item);
        return; // Early exit if the ID is missing
      }

      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        console.log("Item already in cart. Increasing quantity."); // Debugging line
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        console.log("Adding new item to cart."); // Debugging line
        this.cartItems.push({ ...item, quantity: 1 }); // Add new item with quantity 1
      }
    },
  },
});
