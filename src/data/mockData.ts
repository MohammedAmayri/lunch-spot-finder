import { StaticImageData } from "next/image";

// Define TypeScript interfaces for data structures
export interface City {
  id: number;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  cityId: number;
  cuisine: string;
  rating: number;
  imageUrl: string;
  address: string;
  openingHours: string;
  priceRange: string;
  menu: MenuItem[];
  reviews: Review[];
  images: string[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Review {
  id: number;
  restaurantId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  savedRestaurants: number[]; // Array of restaurant IDs
  reviews: Review[];
}

// Constants
export const PRICE_RANGES = ["Budget", "Mid-Range", "High-End"];
export const CUISINES = [
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "Indian",
  "Thai",
  "American",
  "Mediterranean",
  "French",
  "Swedish",
  "Spanish",
  "Greek",
  "Lebanese",
  "Vietnamese",
  "Korean",
  "Brazilian",
  "Ethiopian",
  "Moroccan",
  "Turkish",
  "Argentinian",
  "Peruvian",
  "Caribbean",
  "German",
  "Nigerian"
];

// Export the commonCuisines array so it can be imported in FilterBar.tsx
export const commonCuisines = [
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "Indian",
  "Thai",
  "American",
  "Mediterranean",
  "French",
  "Swedish"
];

// Mock data for popular cities
export const popularCities: City[] = [
  { id: 1, name: "Stockholm" },
  { id: 2, name: "Gothenburg" },
  { id: 3, name: "Malmö" },
  { id: 4, name: "Uppsala" },
  { id: 5, name: "Linköping" },
];

// Mock data for restaurants
export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pasta Perfetta",
    cityId: 1,
    cuisine: "Italian",
    rating: 4.5,
    imageUrl: "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
    address: "Vasagatan 15, 111 20 Stockholm",
    openingHours: "11:00 - 22:00",
    priceRange: "Mid-Range",
    menu: [
      { id: 1, name: "Spaghetti Carbonara", description: "Classic carbonara with egg, pancetta, and parmesan", price: 165, category: "Pasta" },
      { id: 2, name: "Margherita Pizza", description: "Simple pizza with tomato, mozzarella, and basil", price: 140, category: "Pizza" },
      { id: 3, name: "Tiramisu", description: "Coffee-flavored Italian dessert", price: 85, category: "Dessert" },
    ],
    reviews: [
      { id: 1, restaurantId: 1, author: "Erik", rating: 5, comment: "Best pasta in town!", date: "2024-07-01" },
      { id: 2, restaurantId: 1, author: "Anna", rating: 4, comment: "Great atmosphere and tasty food.", date: "2024-06-15" },
    ],
    images: [
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
    ]
  },
  {
    id: 2,
    name: "Sushi Palace",
    cityId: 1,
    cuisine: "Japanese",
    rating: 4.2,
    imageUrl: "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
    address: "Drottninggatan 25, 111 51 Stockholm",
    openingHours: "12:00 - 23:00",
    priceRange: "High-End",
    menu: [
      { id: 4, name: "Salmon Nigiri", description: "Fresh salmon on sushi rice", price: 45, category: "Sushi" },
      { id: 5, name: "Dragon Roll", description: "Eel, cucumber, and avocado roll", price: 180, category: "Rolls" },
      { id: 6, name: "Mochi Ice Cream", description: "Japanese rice cake with ice cream filling", price: 60, category: "Dessert" },
    ],
    reviews: [
      { id: 3, restaurantId: 2, author: "Linda", rating: 4, comment: "Excellent sushi, a bit pricey.", date: "2024-06-20" },
      { id: 4, restaurantId: 2, author: "Peter", rating: 5, comment: "The best sushi I've ever had!", date: "2024-05-10" },
    ],
    images: [
      "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
      "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
      "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
    ]
  },
  {
    id: 3,
    name: "Taco Bar",
    cityId: 2,
    cuisine: "Mexican",
    rating: 3.8,
    imageUrl: "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
    address: "Avenyn 42, 411 36 Gothenburg",
    openingHours: "11:00 - 24:00",
    priceRange: "Budget",
    menu: [
      { id: 7, name: "Chicken Taco", description: "Taco with grilled chicken, salsa, and guacamole", price: 35, category: "Tacos" },
      { id: 8, name: "Burrito", description: "Large burrito with rice, beans, and your choice of filling", price: 95, category: "Burritos" },
      { id: 9, name: "Churros", description: "Fried dough pastries with cinnamon and sugar", price: 40, category: "Dessert" },
    ],
    reviews: [
      { id: 5, restaurantId: 3, author: "Maria", rating: 4, comment: "Good for a quick and cheap meal.", date: "2024-04-01" },
      { id: 6, restaurantId: 3, author: "Johan", rating: 3, comment: "The food is okay, nothing special.", date: "2024-03-15" },
    ],
    images: [
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
    ]
  },
  {
    id: 4,
    name: "Indian Curry House",
    cityId: 2,
    cuisine: "Indian",
    rating: 4.0,
    imageUrl: "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
    address: "Andra Långgatan 12, 413 27 Gothenburg",
    openingHours: "12:00 - 22:00",
    priceRange: "Mid-Range",
    menu: [
      { id: 10, name: "Chicken Tikka Masala", description: "Creamy tomato-based curry with chicken", price: 155, category: "Curry" },
      { id: 11, name: "Vegetable Samosa", description: "Fried pastry with spiced vegetable filling", price: 50, category: "Appetizer" },
      { id: 12, name: "Gulab Jamun", description: "Sweet milk balls in rose-flavored syrup", price: 65, category: "Dessert" },
    ],
    reviews: [
      { id: 7, restaurantId: 4, author: "Sara", rating: 5, comment: "Authentic Indian flavors!", date: "2024-02-01" },
      { id: 8, restaurantId: 4, author: "David", rating: 3, comment: "The service was a bit slow.", date: "2024-01-15" },
    ],
    images: [
      "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
      "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
      "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
    ]
  },
  {
    id: 5,
    name: "Thai Basil",
    cityId: 3,
    cuisine: "Thai",
    rating: 4.3,
    imageUrl: "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
    address: "Södra Förstadsgatan 30, 211 43 Malmö",
    openingHours: "11:30 - 21:30",
    priceRange: "Mid-Range",
    menu: [
      { id: 13, name: "Pad Thai", description: "Stir-fried rice noodles with shrimp, tofu, and peanuts", price: 145, category: "Noodles" },
      { id: 14, name: "Green Curry", description: "Green curry with coconut milk, bamboo shoots, and vegetables", price: 130, category: "Curry" },
      { id: 15, name: "Mango Sticky Rice", description: "Sweet sticky rice with fresh mango", price: 70, category: "Dessert" },
    ],
    reviews: [
      { id: 9, restaurantId: 5, author: "Lena", rating: 4, comment: "Delicious and authentic Thai food.", date: "2023-12-01" },
      { id: 10, restaurantId: 5, author: "Thomas", rating: 5, comment: "The best Thai restaurant in Malmö!", date: "2023-11-15" },
    ],
    images: [
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
    ]
  },
  {
    id: 6,
    name: "Burger Joint",
    cityId: 3,
    cuisine: "American",
    rating: 3.5,
    imageUrl: "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
    address: "Davidshallstorg 5, 211 45 Malmö",
    openingHours: "11:00 - 01:00",
    priceRange: "Budget",
    menu: [
      { id: 16, name: "Classic Burger", description: "Beef burger with lettuce, tomato, and cheese", price: 85, category: "Burgers" },
      { id: 17, name: "Fries", description: "Crispy french fries", price: 30, category: "Sides" },
      { id: 18, name: "Milkshake", description: "Vanilla milkshake", price: 50, category: "Drinks" },
    ],
    reviews: [
      { id: 11, restaurantId: 6, author: "Karin", rating: 3, comment: "Decent burger, good for a quick bite.", date: "2023-10-01" },
      { id: 12, restaurantId: 6, author: "Martin", rating: 4, comment: "The fries are really good!", date: "2023-09-15" },
    ],
    images: [
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
    ]
  },
  {
    id: 7,
    name: "Mediterranean Grill",
    cityId: 4,
    cuisine: "Mediterranean",
    rating: 4.6,
    imageUrl: "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
    address: "Östra Ågatan 27, 753 22 Uppsala",
    openingHours: "11:00 - 23:00",
    priceRange: "Mid-Range",
    menu: [
      { id: 19, name: "Souvlaki", description: "Grilled meat skewers with pita bread and tzatziki", price: 120, category: "Main Course" },
      { id: 20, name: "Hummus", description: "Chickpea dip with olive oil and pita bread", price: 65, category: "Appetizer" },
      { id: 21, name: "Baklava", description: "Sweet pastry with nuts and syrup", price: 75, category: "Dessert" },
    ],
    reviews: [
      { id: 13, restaurantId: 7, author: "Sofia", rating: 5, comment: "Amazing food and great service!", date: "2023-08-01" },
      { id: 14, restaurantId: 7, author: "Anders", rating: 4, comment: "The best Mediterranean food in Uppsala.", date: "2023-07-15" },
    ],
    images: [
      "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
      "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
      "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg",
    ]
  },
  {
    id: 8,
    name: "French Bistro",
    cityId: 4,
    cuisine: "French",
    rating: 4.2,
    imageUrl: "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
    address: "Sysslomansgatan 9, 752 23 Uppsala",
    openingHours: "17:00 - 24:00",
    priceRange: "High-End",
    menu: [
      { id: 22, name: "Steak Frites", description: "Grilled steak with french fries", price: 220, category: "Main Course" },
      { id: 23, name: "Crème brûlée", description: "Custard dessert with a hard caramel layer", price: 90, category: "Dessert" },
      { id: 24, name: "Onion Soup", description: "Classic french onion soup", price: 80, category: "Appetizer" },
    ],
    reviews: [
      { id: 15, restaurantId: 8, author: "Elin", rating: 4, comment: "Elegant atmosphere and delicious food.", date: "2023-06-01" },
      { id: 16, restaurantId: 8, author: "Gustav", rating: 5, comment: "The crème brûlée is a must-try!", date: "2023-05-15" },
    ],
    images: [
      "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
      "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
      "/lovable-uploads/953f7974-09a5-499d-99a3-448054984375.jpg",
    ]
  },
  {
    id: 9,
    name: "Swedish Kitchen",
    cityId: 5,
    cuisine: "Swedish",
    rating: 4.1,
    imageUrl: "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
    address: "Storgatan 44, 582 23 Linköping",
    openingHours: "11:00 - 22:00",
    priceRange: "Mid-Range",
    menu: [
      { id: 25, name: "Meatballs", description: "Swedish meatballs with mashed potatoes and lingonberry jam", price: 135, category: "Main Course" },
      { id: 26, name: "Herring", description: "Pickled herring with potatoes and crispbread", price: 95, category: "Appetizer" },
      { id: 27, name: "Princess Cake", description: "Layered sponge cake with cream and marzipan", price: 80, category: "Dessert" },
    ],
    reviews: [
      { id: 17, restaurantId: 9, author: "Olivia", rating: 4, comment: "Classic Swedish dishes, well-prepared.", date: "2023-04-01" },
      { id: 18, restaurantId: 9, author: "William", rating: 4, comment: "A taste of Sweden!", date: "2023-03-15" },
    ],
    images: [
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
      "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg",
    ]
  },
  {
    id: 10,
    name: "Asian Fusion",
    cityId: 5,
    cuisine: "Asian",
    rating: 3.9,
    imageUrl: "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
    address: "Nygatan 22, 582 19 Linköping",
    openingHours: "11:30 - 21:30",
    priceRange: "Mid-Range",
    menu: [
      { id: 28, name: "Sushi Platter", description: "Assorted sushi rolls and nigiri", price: 180, category: "Sushi" },
      { id: 29, name: "Ramen", description: "Japanese noodle soup with pork and vegetables", price: 140, category: "Noodles" },
      { id: 30, name: "Bubble Tea", description: "Taiwanese tea-based drink with tapioca pearls", price: 55, category: "Drinks" },
    ],
    reviews: [
      { id: 19, restaurantId: 10, author: "Ella", rating: 4, comment: "Great variety of Asian dishes.", date: "2023-02-01" },
      { id: 20, restaurantId: 10, author: "Oscar", rating: 3, comment: "The ramen was a bit bland.", date: "2023-01-15" },
    ],
    images: [
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
      "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg",
    ]
  },
];
