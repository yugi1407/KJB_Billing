import { useTheme } from "@/hooks";

export const useInitialProducts = () => {
  const { Images } = useTheme();
  return [
    { product_id: 1, product_name: 'Melting Cheese Pizza', sub: "1 piece", rating: "4.5", amount: 200, count: 0, product_photo: Images.screens.pizza },
    { product_id: 2, product_name: 'Classic Beef Burger', sub: "1 piece", rating: "4.2", amount: 100, count: 0, product_photo: Images.screens.burger },
    { product_id: 3, product_name: 'Steamed Veg Momos', sub: "6 pcs", rating: "4.3", amount: 60, count: 0, product_photo: Images.screens.momos },
    { product_id: 4, product_name: 'Crispy French Fries', sub: "1/2 kg", rating: "4.0", amount: 120, count: 0, product_photo: Images.screens.french },
    { product_id: 5, product_name: 'Grilled Chicken Sandwich', sub: "1 piece", rating: "4.4", amount: 80, count: 0, product_photo: Images.screens.sanwitch },
  ];
};
