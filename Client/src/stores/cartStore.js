import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cartItems: [], // Array to hold cart items
  }),

  getters: {
    cartItemCount: (state) => state.cartItems.length, // Getter for cart item count
  },

  actions: {
    // Action to add an item to the cart
    addItemToCart(item) {
      if (!item._id) {
        console.error("Item is missing an ID:", item); // Debugging line
        return; // Exit early if ID is not valid
      }
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        this.cartItems.push({ ...item, quantity: 1 }); // Add new item with quantity 1
      }
    },

    // Action to increase the quantity of a specific item
    increaseQuantity(itemId) {
      const item = this.cartItems.find((item) => item._id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },

    // Action to decrease the quantity of a specific item
    decreaseQuantity(itemId) {
      const item = this.cartItems.find((item) => item._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Action to remove an item from the cart by its ID
    removeItemFromCart(itemId) {
      console.log(`Removing item with id: ${itemId}`); // Debugging line
      this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
      console.log("Updated cart items:", this.cartItems); // Log updated cart items
    },
  },
});
