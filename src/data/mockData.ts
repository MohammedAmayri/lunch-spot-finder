
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  type: string; // e.g., "Asian fusion", "Italian", etc.
  tags: string[]; // e.g., ["vegetarian", "gluten-free", etc.]
  ingredients?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
  rating: number;
  priceLevel: number; // 1-3, representing $, $$, $$$
  image: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  menuItems: MenuItem[];
  tags: string[];
  phoneNumber?: string;
  website?: string;
}

export const popularCities = [
  { id: "1", name: "Stockholm" },
  { id: "2", name: "Gothenburg" },
  { id: "3", name: "Malmö" },
  { id: "4", name: "Uppsala" },
  { id: "5", name: "Västerås" },
  { id: "6", name: "Örebro" },
  { id: "7", name: "Linköping" },
  { id: "8", name: "Helsingborg" },
  { id: "9", name: "Jönköping" },
  { id: "10", name: "Norrköping" },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Kebab Kungen",
    address: "Storgatan 45",
    city: "Helsingborg",
    description: "Authentic kebab with homemade bread and fresh ingredients.",
    rating: 4.2,
    priceLevel: 1,
    image: "/lovable-uploads/b92b18c1-d260-4631-94dd-77e401d774d6.png",
    hours: "Mon-Fri: 11.30-15.00",
    coordinates: { lat: 56.0465, lng: 12.6945 },
    tags: ["Mediterranean", "Fast food", "Kebab"],
    menuItems: [
      {
        id: "1-1",
        name: "Kebab Meny",
        description: "Freshly made kebab with vegetables in homemade bread.",
        price: 119,
        image: "/lovable-uploads/b92b18c1-d260-4631-94dd-77e401d774d6.png",
        type: "Mediterranean",
        tags: ["Meat", "Lunch special"],
      },
      {
        id: "1-2",
        name: "Falafel Roll",
        description: "Crispy falafel with vegetables and tahini sauce.",
        price: 109,
        type: "Mediterranean",
        tags: ["Vegetarian", "Lunch special"],
      }
    ]
  },
  {
    id: "2",
    name: "Strandhuset",
    address: "Hamnvägen 12",
    city: "Helsingborg",
    description: "Seaside restaurant with a variety of international dishes.",
    rating: 4.4,
    priceLevel: 2,
    image: "/lovable-uploads/2b997d73-8864-42c8-b802-2b9fae102614.png",
    hours: "Mon-Fri: 11.30-15.00",
    coordinates: { lat: 56.0390, lng: 12.6963 },
    tags: ["International", "Seafood", "Asian fusion"],
    menuItems: [
      {
        id: "2-1",
        name: "Gulashsoppa",
        description: "Traditional goulash soup with tender beef and vegetables.",
        price: 139,
        image: "/lovable-uploads/d17e11fa-ff15-4eb8-89b7-279feb816a8a.png",
        type: "Asian fusion",
        tags: ["Soup", "Lunch special"],
      },
      {
        id: "2-2",
        name: "Catch of the Day",
        description: "Fresh local fish with seasonal vegetables and potatoes.",
        price: 159,
        type: "Seafood",
        tags: ["Seafood", "Lunch special"],
      }
    ]
  },
  {
    id: "3",
    name: "Pasta Palace",
    address: "Kungsgatan 78",
    city: "Helsingborg",
    description: "Authentic Italian pasta made with traditional recipes.",
    rating: 4.7,
    priceLevel: 2,
    image: "/lovable-uploads/c2cdbdc2-9f1e-4ec7-a20c-8ace633be697.png",
    hours: "Mon-Fri: 11.30-15.00",
    coordinates: { lat: 56.0477, lng: 12.6923 },
    tags: ["Italian", "Pasta", "Mediterranean"],
    menuItems: [
      {
        id: "3-1",
        name: "Pasta Carbonara",
        description: "Creamy pasta with pancetta, egg, and Pecorino Romano.",
        price: 139,
        type: "Italian",
        tags: ["Pasta", "Lunch special"],
      },
      {
        id: "3-2",
        name: "Pasta Bolognese",
        description: "Classic meat sauce pasta with parmesan cheese.",
        price: 129,
        type: "Italian",
        tags: ["Pasta", "Meat", "Lunch special"],
      }
    ]
  },
  {
    id: "4",
    name: "Green Garden",
    address: "Järnvägsgatan 32",
    city: "Helsingborg",
    description: "Vegetarian and vegan dishes made with fresh local produce.",
    rating: 4.6,
    priceLevel: 2,
    image: "/lovable-uploads/309fd144-3819-4e34-a69a-d6ede0b59cab.png",
    hours: "Mon-Fri: 11.30-15.00",
    coordinates: { lat: 56.0443, lng: 12.6933 },
    tags: ["Vegetarian", "Vegan", "Healthy"],
    menuItems: [
      {
        id: "4-1",
        name: "Buddha Bowl",
        description: "Nutrient-rich bowl with quinoa, avocado, and fresh vegetables.",
        price: 139,
        type: "Vegetarian",
        tags: ["Vegan", "Healthy", "Lunch special"],
      },
      {
        id: "4-2",
        name: "Falafel Plate",
        description: "Homemade falafel with hummus, tabbouleh, and pita bread.",
        price: 129,
        type: "Vegetarian",
        tags: ["Vegan", "Lunch special"],
      }
    ]
  }
];

export const getRestaurantsByCity = (city: string): Restaurant[] => {
  return restaurants.filter(
    restaurant => restaurant.city.toLowerCase() === city.toLowerCase()
  );
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getFilteredRestaurants = (
  city: string, 
  filters: { 
    priceLevel?: number[], 
    mealTypes?: string[], 
    rating?: number 
  }
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    // Filter by city
    if (city && restaurant.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    
    // Filter by price level
    if (filters.priceLevel && filters.priceLevel.length > 0) {
      if (!filters.priceLevel.includes(restaurant.priceLevel)) {
        return false;
      }
    }
    
    // Filter by rating
    if (filters.rating && restaurant.rating < filters.rating) {
      return false;
    }
    
    // Filter by meal types
    if (filters.mealTypes && filters.mealTypes.length > 0) {
      const hasMatchingMealType = restaurant.tags.some(tag => 
        filters.mealTypes?.includes(tag)
      );
      if (!hasMatchingMealType) {
        return false;
      }
    }
    
    return true;
  });
};
