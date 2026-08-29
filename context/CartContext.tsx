"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/data/products";

// ============================================================
// CART CONTEXT
// ============================================================

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "INCREASE_QTY"; id: string }
  | { type: "DECREASE_QTY"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
        isOpen: true,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.id),
      };
    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        increaseQty: (id) => dispatch({ type: "INCREASE_QTY", id }),
        decreaseQty: (id) => dispatch({ type: "DECREASE_QTY", id }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
        openCart: () => dispatch({ type: "OPEN_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
