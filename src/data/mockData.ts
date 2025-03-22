
export interface LunchInclude {
  id: string;
  name: string;
}

export interface Allergen {
  id: string;
  name: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  url: string;
  createdAt: Date;
  createdBy: string;
}

export interface LunchMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  validFrom?: Date;
  validTo?: Date;
  images?: Image[];
  allergens?: Allergen[];
  tags: Tag[];
  lunchMenuId: string;
}

export interface LunchMenu {
  id: string;
  name: string;
  description?: string;
  lunchLink?: string;
  restaurantId: string;
  hoursId: string;
  lunchIncludes: LunchInclude[];
  lunchMenuItems: LunchMenuItem[];
}

export interface Hours {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
  type: "OPEN" | "LUNCH";
  restaurantId: string;
}

export interface Contact {
  id: string;
  phone: string;
  email?: string;
  website?: string;
  restaurantId: string;
}

export interface Location {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  address?: string;
  street?: string;
  postalCode?: string;
  restaurantId: string;
}

export interface Feature {
  id: string;
  name: string;
}

export interface Cuisine {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: Cuisine[];
  location?: Location;
  contact?: Contact;
  hours: Hours[];
  rating: number;
  images: Image[];
  popularDishes: string[];
  reservationLinks: string[];
  features: Feature[];
  lunchMenus: LunchMenu[];
  createdAt: Date;
  updatedAt: Date;
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

// Common tags
const commonTags: Tag[] = [
  { id: "t1", name: "Vegetarian" },
  { id: "t2", name: "Vegan" },
  { id: "t3", name: "Gluten-free" },
  { id: "t4", name: "Lunch special" },
  { id: "t5", name: "Coffee included" },
  { id: "t6", name: "Salad included" },
  { id: "t7", name: "Dessert included" },
  { id: "t8", name: "Meat" },
  { id: "t9", name: "Seafood" },
  { id: "t10", name: "Healthy" },
];

// Common includes
const commonIncludes: LunchInclude[] = [
  { id: "i1", name: "Coffee" },
  { id: "i2", name: "Salad" },
  { id: "i3", name: "Bread" },
  { id: "i4", name: "Dessert" },
  { id: "i5", name: "Water" },
];

// Common allergens
const commonAllergens: Allergen[] = [
  { id: "a1", name: "Gluten", description: "Contains wheat, rye, barley or oats" },
  { id: "a2", name: "Lactose", description: "Contains milk products" },
  { id: "a3", name: "Nuts", description: "Contains various nuts" },
  { id: "a4", name: "Shellfish", description: "Contains shellfish" },
];

// Common features
const commonFeatures: Feature[] = [
  { id: "f1", name: "Outdoor seating" },
  { id: "f2", name: "Accessible" },
  { id: "f3", name: "Takes reservations" },
  { id: "f4", name: "Free WiFi" },
  { id: "f5", name: "Parking" },
];

// Common cuisines
const commonCuisines: Cuisine[] = [
  { id: "c1", name: "Swedish" },
  { id: "c2", name: "Italian" },
  { id: "c3", name: "Asian" },
  { id: "c4", name: "Mediterranean" },
  { id: "c5", name: "Mexican" },
  { id: "c6", name: "Vegetarian" },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Kebab Kungen",
    cuisines: [commonCuisines[3]],
    rating: 4.2,
    popularDishes: ["Kebab Meny", "Falafel Roll"],
    reservationLinks: [],
    features: [commonFeatures[0], commonFeatures[3]],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-10"),
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/b92b18c1-d260-4631-94dd-77e401d774d6.png",
        createdAt: new Date("2023-01-15"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc1",
      coordinates: { lat: 56.0465, lng: 12.6945 },
      city: "Helsingborg",
      address: "Storgatan 45",
      restaurantId: "1",
    },
    contact: {
      id: "con1",
      phone: "042-123456",
      website: "https://kebabkungen.se",
      restaurantId: "1",
    },
    hours: [
      {
        id: "h1",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:30",
        endTime: "15:00",
        type: "LUNCH",
        restaurantId: "1",
      }
    ],
    lunchMenus: [
      {
        id: "lm1",
        name: "Lunch Menu",
        restaurantId: "1",
        hoursId: "h1",
        lunchIncludes: [commonIncludes[0], commonIncludes[1]],
        lunchMenuItems: [
          {
            id: "1-1",
            name: "Kebab Meny",
            description: "Freshly made kebab with vegetables in homemade bread.",
            price: 119,
            lunchMenuId: "lm1",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5]],
            images: [
              {
                id: "img1-1",
                url: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-01-15"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "1-2",
            name: "Falafel Roll",
            description: "Crispy falafel with vegetables and tahini sauce.",
            price: 109,
            lunchMenuId: "lm1",
            tags: [commonTags[0], commonTags[3], commonTags[4]],
            images: [
              {
                id: "img1-2",
                url: "https://images.unsplash.com/photo-1593001872095-7d5b3668fc03?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-01-15"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  },
  // Additional restaurants would follow the same pattern - truncated for brevity
  {
    id: "2",
    name: "Strandhuset",
    cuisines: [commonCuisines[2], commonCuisines[4]],
    rating: 4.4,
    popularDishes: ["Gulashsoppa", "Catch of the Day"],
    reservationLinks: ["https://bookatable.com/strandhuset"],
    features: [commonFeatures[0], commonFeatures[2], commonFeatures[4]],
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-15"),
    images: [
      {
        id: "img2",
        url: "/lovable-uploads/2b997d73-8864-42c8-b802-2b9fae102614.png",
        createdAt: new Date("2023-02-10"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc2",
      coordinates: { lat: 56.0390, lng: 12.6963 },
      city: "Helsingborg",
      address: "Hamnvägen 12",
      restaurantId: "2",
    },
    contact: {
      id: "con2",
      phone: "042-654321",
      website: "https://strandhuset.se",
      restaurantId: "2",
    },
    hours: [
      {
        id: "h2",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:30",
        endTime: "15:00",
        type: "LUNCH",
        restaurantId: "2",
      }
    ],
    lunchMenus: [
      {
        id: "lm2",
        name: "Daily Lunch",
        restaurantId: "2",
        hoursId: "h2",
        lunchIncludes: [commonIncludes[0], commonIncludes[1], commonIncludes[3]],
        lunchMenuItems: [
          {
            id: "2-1",
            name: "Gulashsoppa",
            description: "Traditional goulash soup with tender beef and vegetables.",
            price: 139,
            lunchMenuId: "lm2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5], commonTags[6]],
            images: [
              {
                id: "img2-1",
                url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=3541&auto=format&fit=crop",
                createdAt: new Date("2023-02-10"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "2-2",
            name: "Catch of the Day",
            description: "Fresh local fish with seasonal vegetables and potatoes.",
            price: 159,
            lunchMenuId: "lm2",
            tags: [commonTags[8], commonTags[3], commonTags[4], commonTags[5]],
            images: [
              {
                id: "img2-2",
                url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-02-10"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getRestaurantsByCity = (city: string): Restaurant[] => {
  return restaurants.filter(
    restaurant => restaurant.location && restaurant.location.city.toLowerCase() === city.toLowerCase()
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
    if (city && (!restaurant.location || restaurant.location.city.toLowerCase() !== city.toLowerCase())) {
      return false;
    }
    
    // Filter by rating
    if (filters.rating && restaurant.rating < filters.rating) {
      return false;
    }
    
    // Filter by meal types (using cuisines as proxy for now)
    if (filters.mealTypes && filters.mealTypes.length > 0) {
      const hasMatchingMealType = restaurant.cuisines.some(cuisine => 
        filters.mealTypes?.includes(cuisine.name)
      );
      if (!hasMatchingMealType) {
        return false;
      }
    }
    
    return true;
  });
};
