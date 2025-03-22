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
    hours: "Mån-Fre: 11.30-15.00",
    coordinates: { lat: 56.0465, lng: 12.6945 },
    tags: ["Mediterranean", "Fast food", "Kebab"],
    menuItems: [
      {
        id: "1-1",
        name: "Kebab Meny",
        description: "Freshly made kebab with vegetables in homemade bread.",
        price: 119,
        image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=3540&auto=format&fit=crop",
        type: "Mediterranean",
        tags: ["Meat", "Lunch special", "Coffee included", "Salad included"],
      },
      {
        id: "1-2",
        name: "Falafel Roll",
        description: "Crispy falafel with vegetables and tahini sauce.",
        price: 109,
        image: "https://images.unsplash.com/photo-1593001872095-7d5b3668fc03?q=80&w=3540&auto=format&fit=crop",
        type: "Mediterranean",
        tags: ["Vegetarian", "Lunch special", "Coffee included"],
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
    hours: "Mån-Fre: 11.30-15.00",
    coordinates: { lat: 56.0390, lng: 12.6963 },
    tags: ["International", "Seafood", "Asian fusion"],
    menuItems: [
      {
        id: "2-1",
        name: "Gulashsoppa",
        description: "Traditional goulash soup with tender beef and vegetables.",
        price: 139,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=3541&auto=format&fit=crop",
        type: "Asian fusion",
        tags: ["Soup", "Lunch special", "Coffee included", "Salad bar", "Dessert included"],
      },
      {
        id: "2-2",
        name: "Catch of the Day",
        description: "Fresh local fish with seasonal vegetables and potatoes.",
        price: 159,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3540&auto=format&fit=crop",
        type: "Seafood",
        tags: ["Seafood", "Lunch special", "Coffee included", "Salad included"],
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
    hours: "Mån-Fre: 11.30-15.00",
    coordinates: { lat: 56.0477, lng: 12.6923 },
    tags: ["Italian", "Pasta", "Mediterranean"],
    menuItems: [
      {
        id: "3-1",
        name: "Pasta Carbonara",
        description: "Creamy pasta with pancetta, egg, and Pecorino Romano.",
        price: 139,
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=3474&auto=format&fit=crop",
        type: "Italian",
        tags: ["Pasta", "Lunch special"],
      },
      {
        id: "3-2",
        name: "Pasta Bolognese",
        description: "Classic meat sauce pasta with parmesan cheese.",
        price: 129,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=3540&auto=format&fit=crop",
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
    hours: "Mån-Fre: 11.30-15.00",
    coordinates: { lat: 56.0443, lng: 12.6933 },
    tags: ["Vegetarian", "Vegan", "Healthy"],
    menuItems: [
      {
        id: "4-1",
        name: "Buddha Bowl",
        description: "Nutrient-rich bowl with quinoa, avocado, and fresh vegetables.",
        price: 139,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=3540&auto=format&fit=crop",
        type: "Vegetarian",
        tags: ["Vegan", "Healthy", "Lunch special"],
      },
      {
        id: "4-2",
        name: "Falafel Plate",
        description: "Homemade falafel with hummus, tabbouleh, and pita bread.",
        price: 129,
        image: "https://images.unsplash.com/photo-1593001872095-7d5b3668fc03?q=80&w=3540&auto=format&fit=crop",
        type: "Vegetarian",
        tags: ["Vegan", "Lunch special"],
      }
    ]
  },
  {
    id: "5",
    name: "Stockholm Lunch House",
    address: "Drottninggatan 62",
    city: "Stockholm",
    description: "Popular lunch spot offering multiple cuisines with daily changing menus.",
    rating: 4.8,
    priceLevel: 2,
    image: "/lovable-uploads/2b997d73-8864-42c8-b802-2b9fae102614.png",
    hours: "Mån-Fre: 11.00-14.30",
    coordinates: { lat: 59.3326, lng: 18.0649 },
    phoneNumber: "08-123-4567",
    website: "https://stockholmlunch.se",
    tags: ["International", "Swedish", "Buffet", "Weekly menu"],
    menuItems: [
      // Monday Menu
      {
        id: "5-1",
        name: "Monday: Köttbullar",
        description: "Traditional Swedish meatballs with creamy sauce, lingonberry jam, and mashed potatoes.",
        price: 125,
        type: "Swedish",
        tags: ["Meat", "Monday special", "Coffee included", "Salad included", "Dessert included"],
      },
      {
        id: "5-2",
        name: "Monday: Vegetarian Lasagna",
        description: "Hearty vegetable lasagna with zucchini, eggplant, and spinach.",
        price: 115,
        type: "Italian",
        tags: ["Vegetarian", "Monday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-3",
        name: "Monday: Fish Soup",
        description: "Creamy fish soup with salmon, cod, and shrimp, served with bread.",
        price: 135,
        type: "Seafood",
        tags: ["Seafood", "Monday special", "Coffee included", "Salad included"],
      },
      // Tuesday Menu
      {
        id: "5-4",
        name: "Tuesday: Beef Stroganoff",
        description: "Classic beef stroganoff with mushrooms and rice.",
        price: 129,
        type: "International",
        tags: ["Meat", "Tuesday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-5",
        name: "Tuesday: Falafel Bowl",
        description: "Mediterranean falafel bowl with hummus, tabbouleh, and pita bread.",
        price: 119,
        type: "Mediterranean",
        tags: ["Vegetarian", "Vegan", "Tuesday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-6",
        name: "Tuesday: Grilled Salmon",
        description: "Perfectly grilled salmon with lemon-dill sauce and roasted vegetables.",
        price: 139,
        type: "Seafood",
        tags: ["Seafood", "Tuesday special", "Coffee included", "Salad included"],
      },
      // Wednesday Menu
      {
        id: "5-7",
        name: "Wednesday: Chicken Curry",
        description: "Aromatic chicken curry with basmati rice and cucumber raita.",
        price: 125,
        type: "Asian",
        tags: ["Meat", "Wednesday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-8",
        name: "Wednesday: Veggie Burger",
        description: "Housemade vegetable and bean patty with all the fixings and sweet potato fries.",
        price: 129,
        type: "American",
        tags: ["Vegetarian", "Wednesday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-9",
        name: "Wednesday: Shrimp Pasta",
        description: "Garlic shrimp pasta with cherry tomatoes and fresh herbs.",
        price: 135,
        type: "Italian",
        tags: ["Seafood", "Wednesday special", "Coffee included", "Salad included"],
      },
      // Thursday Menu
      {
        id: "5-10",
        name: "Thursday: Pulled Pork",
        description: "Slow-cooked pulled pork with BBQ sauce, coleslaw, and potato wedges.",
        price: 129,
        type: "American",
        tags: ["Meat", "Thursday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-11",
        name: "Thursday: Mushroom Risotto",
        description: "Creamy mushroom risotto with truffle oil and parmesan cheese.",
        price: 119,
        type: "Italian",
        tags: ["Vegetarian", "Thursday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-12",
        name: "Thursday: Fish Tacos",
        description: "Crispy fish tacos with avocado, salsa, and lime crema.",
        price: 125,
        type: "Mexican",
        tags: ["Seafood", "Thursday special", "Coffee included", "Salad included"],
      },
      // Friday Menu
      {
        id: "5-13",
        name: "Friday: Beef Burger",
        description: "Juicy beef burger with bacon, cheese, and hand-cut fries.",
        price: 139,
        type: "American",
        tags: ["Meat", "Friday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-14",
        name: "Friday: Pumpkin Ravioli",
        description: "Homemade pumpkin ravioli with sage butter and toasted pine nuts.",
        price: 129,
        type: "Italian",
        tags: ["Vegetarian", "Friday special", "Coffee included", "Salad included"],
      },
      {
        id: "5-15",
        name: "Friday: Seafood Platter",
        description: "Selection of today's fresh seafood with aioli and lemon.",
        price: 149,
        type: "Seafood",
        tags: ["Seafood", "Friday special", "Coffee included", "Salad included"],
      }
    ]
  },
  {
    id: "6",
    name: "Sushi Express",
    address: "Sveavägen 82",
    city: "Stockholm",
    description: "Fresh sushi and Japanese specialties made to order.",
    rating: 4.5,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=3540&auto=format&fit=crop",
    hours: "Mån-Fre: 11.00-15.00",
    coordinates: { lat: 59.3416, lng: 18.0595 },
    phoneNumber: "08-765-4321",
    website: "https://sushiexpress.se",
    tags: ["Japanese", "Sushi", "Asian", "Healthy"],
    menuItems: [
      {
        id: "6-1",
        name: "Sushi Lunch Set",
        description: "12 pieces of mixed nigiri and maki with miso soup.",
        price: 149,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=3540&auto=format&fit=crop",
        type: "Japanese",
        tags: ["Seafood", "Lunch special", "Miso included"],
      },
      {
        id: "6-2",
        name: "Veggie Sushi Combo",
        description: "10 pieces of vegetarian sushi with avocado, cucumber, and pickled vegetables.",
        price: 129,
        image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=3540&auto=format&fit=crop",
        type: "Japanese",
        tags: ["Vegetarian", "Lunch special", "Miso included"],
      },
      {
        id: "6-3",
        name: "Teriyaki Salmon Bowl",
        description: "Grilled salmon with teriyaki sauce over rice with vegetables.",
        price: 159,
        image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=3540&auto=format&fit=crop",
        type: "Japanese",
        tags: ["Seafood", "Lunch special", "Miso included"],
      }
    ]
  },
  {
    id: "7",
    name: "Nonna's Trattoria",
    address: "Kungsholmsgatan 31",
    city: "Stockholm",
    description: "Family-owned Italian restaurant with authentic recipes.",
    rating: 4.7,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=3540&auto=format&fit=crop",
    hours: "Mån-Fre: 11.30-14.30",
    coordinates: { lat: 59.3312, lng: 18.0430 },
    phoneNumber: "08-345-6789",
    website: "https://nonnastrattoria.se",
    tags: ["Italian", "Mediterranean", "Pasta", "Pizza"],
    menuItems: [
      {
        id: "7-1",
        name: "Gnocchi al Pesto",
        description: "Homemade potato gnocchi with basil pesto and parmesan cheese.",
        price: 145,
        image: "https://images.unsplash.com/photo-1589227365533-cee630bd59bd?q=80&w=3540&auto=format&fit=crop",
        type: "Italian",
        tags: ["Pasta", "Lunch special", "Bread included", "Coffee included"],
      },
      {
        id: "7-2",
        name: "Lasagna alla Bolognese",
        description: "Traditional beef lasagna with béchamel sauce.",
        price: 155,
        image: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=3540&auto=format&fit=crop",
        type: "Italian",
        tags: ["Meat", "Pasta", "Lunch special", "Bread included", "Coffee included"],
      },
      {
        id: "7-3",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, fresh mozzarella, and basil.",
        price: 135,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3540&auto=format&fit=crop",
        type: "Italian",
        tags: ["Pizza", "Vegetarian", "Lunch special", "Salad included"],
      }
    ]
  },
  {
    id: "8",
    name: "The Green Bowl",
    address: "Götgatan 45",
    city: "Stockholm",
    description: "Health-focused restaurant serving nutritious bowls and salads.",
    rating: 4.6,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=3540&auto=format&fit=crop",
    hours: "Mån-Fre: 10.30-15.00",
    coordinates: { lat: 59.3153, lng: 18.0739 },
    phoneNumber: "08-987-6543",
    website: "https://thegreenbowl.se",
    tags: ["Vegetarian", "Vegan", "Healthy", "Organic"],
    menuItems: [
      {
        id: "8-1",
        name: "Protein Power Bowl",
        description: "Quinoa bowl with roasted chickpeas, avocado, and tahini dressing.",
        price: 149,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=3540&auto=format&fit=crop",
        type: "Healthy",
        tags: ["Vegan", "Protein-rich", "Lunch special", "Juice included"],
      },
      {
        id: "8-2",
        name: "Mediterranean Falafel Plate",
        description: "Homemade falafel with hummus, tabbouleh, and pita bread.",
        price: 139,
        image: "https://images.unsplash.com/photo-1615424047417-7e661235ee91?q=80&w=3540&auto=format&fit=crop",
        type: "Mediterranean",
        tags: ["Vegetarian", "Lunch special", "Juice included"],
      },
      {
        id: "8-3",
        name: "Seasonal Grain Bowl",
        description: "Mixed grains with seasonal vegetables and miso-tahini dressing.",
        price: 145,
        image: "https://images.unsplash.com/photo-1604531048487-ef7a45896a9a?q=80&w=3539&auto=format&fit=crop",
        type: "Fusion",
        tags: ["Vegan", "Healthy", "Seasonal", "Lunch special", "Juice included"],
      }
    ]
  },
  {
    id: "9",
    name: "Taco Lounge",
    address: "Odengatan 55",
    city: "Stockholm",
    description: "Modern Mexican taqueria with authentic flavors and craft drinks.",
    rating: 4.4,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=3533&auto=format&fit=crop",
    hours: "Mån-Fre: 11.30-15.00",
    coordinates: { lat: 59.3457, lng: 18.0527 },
    phoneNumber: "08-234-5678",
    website: "https://tacolounge.se",
    tags: ["Mexican", "Tacos", "Latin American"],
    menuItems: [
      {
        id: "9-1",
        name: "Taco Trio Lunch",
        description: "Three tacos with your choice of fillings: chicken, beef, or vegetarian.",
        price: 149,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=3481&auto=format&fit=crop",
        type: "Mexican",
        tags: ["Mix and match", "Lunch special", "Chips and salsa included"],
      },
      {
        id: "9-2",
        name: "Chicken Quesadilla",
        description: "Grilled flour tortilla filled with chicken, cheese, and vegetables.",
        price: 139,
        image: "https://images.unsplash.com/photo-1600891963935-9e70bb671257?q=80&w=3870&auto=format&fit=crop",
        type: "Mexican",
        tags: ["Lunch special", "Chips and salsa included"],
      },
      {
        id: "9-3",
        name: "Veggie Burrito Bowl",
        description: "Rice bowl with beans, grilled vegetables, guacamole, and salsa.",
        price: 145,
        image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=3540&auto=format&fit=crop",
        type: "Mexican",
        tags: ["Vegetarian", "Vegan option", "Lunch special"],
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
