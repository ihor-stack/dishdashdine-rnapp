const cardBg = require('@/assets/images/card_bg.png');
const cardBg2 = require('@/assets/images/card_bg2.png');
const dishBg = require('@/assets/images/dish_it1.png');
const pachaPng = require('@/assets/images/restaurants/pacha_restaurant.png');
const morellisPng = require('@/assets/images/restaurants/morellis_ice_cream.png');
const magheraPng = require('@/assets/images/restaurants/maghera_inn.png');
const villaVinciPng = require('@/assets/images/restaurants/villa_vinci.png');
const marinerRestoPng = require('@/assets/images/restaurants/the_mariner_bar_and_restaurant.png');
const railwayPng = require('@/assets/images/restaurants/railway_st.png');
const anchorBar = require('@/assets/images/restaurants/the_anchor_bar.png');

const burger1 = require('@/assets/images/burger_1.png');
const fries1 = require('@/assets/images/fries_1.png');
const sides1 = require('@/assets/images/sides_1.png');
const dessert1 = require('@/assets/images/dessert_1.png');
const wings1 = require('@/assets/images/wings_1.png');
const fish1 = require('@/assets/images/fish_1.png');
const mostPopular1 = require('@/assets/images/most_popular_1.png');

export const fakeRegistration = {
  firstName: 'John',
  lastName: 'Does',
  email: 'john.doe27@yopmail.com',
  phoneNumber: '+44 77 61 255 255',
  dateOfBirth: '2022-08-20T06:14:16.075Z',
  password: 'Test@12345',
  confirmPassword: 'Test@12345',
};

export const fakeNewPassword = {
  currentPassword: 'Test@12345',
  newPassword: 'Test@123456',
  confirmPassword: 'Test@123456',
};

export const fakeLogin = {
  emailAddress: 'john.doe61@yopmail.com',
  password: 'Test@12345',
};

export const FAQs = [
  {
    name: 'About Dish Dash Dine',
    listings: [
      {
        title: 'What is Dish Dash Dine',
      },
      {
        title: 'Our Mission',
      },
    ],
  },
  {
    name: 'Using Dish Dash Dine',
    listings: [
      {
        title: 'How does Dish Dash Dine work?',
      },
      {
        title: 'Can I place an order in advance?',
      },
      {
        title: 'Can I re-order food that I’ve ordered before?',
      },
      {
        title: 'Can I order from more than 1 merchant in the same order?',
      },
      {
        title: 'How do I manage my account?',
      },
      {
        title: 'What should I do if I have an allergy?',
      },
      {
        title: 'How do I leave a review?',
      },
    ],
  },
  {
    name: 'Guest Check Out',
    listings: [
      {
        title: 'What is checkout as guest?',
      },
      {
        title: 'What details will the restaurant see if I checkout as a guest?',
      },
      {
        title: 'Why should I create a Dish Dash Dine account?',
      },
    ],
  },
  {
    name: 'Questions about my order',
    listings: [
      {
        title: 'How do I know if a restaurant has accepted my order?',
      },
      {
        title: 'How do I change the delivery address for my order?',
      },
      {
        title: 'How do I change my order?',
      },
      {
        title: 'How do I cancel my order?',
      },
      {
        title: 'I’m not happy with my last order',
      },
      {
        title: 'Do I have to tip?',
      },
    ],
  },
  {
    name: 'Fees on Dish Dash Dine',
    listings: [
      {
        title: 'What is Dish Dash Debit?',
      },
      {
        title: 'How do I know what Dish Dash Debit I need to pay?',
      },
    ],
  },
  {
    name: 'Age restricted items',
    listings: [
      {
        title: 'What are age restricted items?',
      },
      {
        title: 'Why is my date of birth requested?',
      },
    ],
  },
  {
    name: 'I want to partner with Dish Dash Dine',
    listings: [
      {
        title: 'How do I use Dish Dash Dine for my business?',
      },
      {
        title: 'Registration requirements',
      },
      {
        title: 'How long does it take to get online?',
      },
      {
        title: 'Stripe connect',
      },
    ],
  },
];

export const HOME_CARDS = [
  {
    title: '10% off this Valentine’s Day!',
    subtitle:
      'Chill out this Valentine’s Day with our limited-edition discount.',
    image: cardBg,
  },
  {
    title: 'The Hatch is now on Dish Dash Dine',
    subtitle: 'Great local food available now on Dish Dash Dine!',
    image: cardBg2,
  },
];

export const DISH_ITEMS = [
  {
    title: 'The Hatch',
    rating: 4.6,
    distance: 0.9,
    time: '15-30',
    image: dishBg,
  },
  {
    title: 'North Down Grill',
    rating: 4.8,
    distance: 0.8,
    time: '30-45',
    image: dishBg,
  },
  {
    title: 'Mudra Restaurant',
    rating: 4.7,
    distance: 0.7,
    time: '45-60',
    image: dishBg,
  },
];

export const RECOMMENDED_DISHES = [
  {
    image: pachaPng,
    name: 'Pacha Restaurant',
    recommendedDish: 'The Original Beef',
  },
  {
    image: morellisPng,
    name: 'Pacha Restaurant',
    recommendedDish: 'The Original Beef',
  },
  {
    image: magheraPng,
    name: 'Pacha Restaurant',
    recommendedDish: 'The Original Beef',
  },
];

export const RESTAURANTS = [
  {
    name: 'Villa Vinci',
    rating: 4.6,
    distance: 0.9,
    servingTime: '45-60',
    image: villaVinciPng,
    favorite: false,
    address: '22 Great Victoria Street, Belfast BT1 6JL',
  },
  {
    name: 'The Mariner Bar and Restaurant',
    rating: 4.3,
    distance: 0.8,
    servingTime: '20-45',
    image: marinerRestoPng,
    favorite: false,
    address: '2 Golf Links Rd, Newcastle BT33 0AN',
  },
  {
    name: 'Maghera Inn',
    rating: 4.1,
    distance: 0.9,
    servingTime: '40-55',
    image: magheraPng,
    favorite: false,
    address: '22 Great Victoria Street, Belfast BT1 6JL',
  },
  {
    name: 'Railway St',
    rating: 4.3,
    distance: 0.7,
    servingTime: '45-60',
    image: railwayPng,
    favorite: false,
    address: '2 Golf Links Rd, Newcastle BT33 0AN',
  },
  {
    name: 'Pacha Restaurant',
    rating: 4.3,
    distance: 0.9,
    servingTime: '20-45',
    image: pachaPng,
    favorite: false,
    address: '22 Great Victoria Street, Belfast BT1 6JL',
  },
  {
    name: 'The Anchor Bar',
    rating: 4.1,
    distance: 1.7,
    servingTime: '40-55',
    image: anchorBar,
    favorite: false,
    address: '22 Great Victoria Street, Belfast BT1 6JL',
  },
  {
    name: 'Morellis Ice Cream',
    rating: 4.2,
    distance: 1.7,
    servingTime: '10-25',
    image: morellisPng,
    favorite: false,
    address: '22 Great Victoria Street, Belfast BT1 6JL',
  },
];

export const fakeGeolocation = {
  latitude: 54.58443905550819,
  longitude: -5.922951699039533,
};

export const TOPPINGS = [
  {
    id: 0,
    name: 'No Relish',
  },
  {
    id: 1,
    name: 'No Tomato',
  },
  {
    id: 2,
    name: 'No Cheese',
  },
  {
    id: 3,
    name: 'No Salad',
  },
];

export const SAUCES = [
  {
    id: 0,
    name: 'Vegan Mayo',
    price: '+£0.50 each',
  },
  {
    id: 1,
    name: 'Garlic Mayo',
    price: '+£0.50 each',
  },
  {
    id: 2,
    name: 'BBQ Sauce',
    price: '+£0.50 each',
  },
  {
    id: 3,
    name: 'Cheese Sauce',
    price: '+£0.50 each',
  },
  {
    id: 4,
    name: 'Tomato Relish',
    price: '+£0.50 each',
  },
  {
    id: 5,
    name: 'Hot Sauce',
    price: '+£0.50 each',
  },
  {
    id: 6,
    name: 'Sweet Chili',
    price: '+£0.50 each',
  },
  {
    id: 7,
    name: 'Tomato Ketchup',
    price: '+£0.50 each',
  },
  {
    id: 8,
    name: 'Brown Sauce',
    price: '+£0.50 each',
  },
];

export const SIDESH = [
  {
    id: 0,
    name: 'Hand Cut Chips',
    price: '+£0.50 each',
  },
  {
    id: 1,
    name: 'Skinny Fries',
    price: '+£0.50 each',
  },
  {
    id: 2,
    name: 'Smoked Chili Cheese Chips',
    price: '+£0.50 each',
  },
  {
    id: 3,
    name: 'Chicken Seasoned Chips',
    price: '+£0.50 each',
  },
  {
    id: 4,
    name: 'Truffle & Parmessan Chips',
    price: '+£0.50 each',
  },
];

export const STACKS = [
  {
    id: 0,
    name: 'Add Streaky Bacon',
    price: '+£1.00 each',
  },
  {
    id: 1,
    name: 'Add Hash Brown',
    price: '+£1.00 each',
  },
  {
    id: 2,
    name: 'Add Sliced Cheese',
    price: '+£1.00 each',
  },
  {
    id: 3,
    name: 'Add Extra Beef Patty',
    price: '+£1.00 each',
  },
  {
    id: 4,
    name: 'Add Pickle',
    price: '+£1.00 each',
  },
];

export const fakeCartItem = {
  restaurantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  subTotal: 10.5,
  tip: 1.05,
  serviceFee: 0.53,
  total: 12.03,
  promoCode: null,
  cartItems: [
    {
      itemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      menuId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      quantity: 2,
      specialInstructions:
        'Please inform the restaurant of any dietary preferences, allergies, or even religious food restrictions',
      addons: [
        {
          modifierGroupId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          modifierGroupItemSelections: [
            {
              modifierGroupItemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              quantity: 1,
            },
          ],
        },
      ],
    },
  ],
};

export const mostPopular = [
  {
    title: 'The Original Beef',
    desc: '38 Day aged local Shorthorn Beef, Hatch Relish, Emmental Cheese, salas on pretzel bun.',
    image: mostPopular1,
  },
  {
    title: 'Texas Belly Burger',
    desc: '38 Day aged local Shorthorn Beef, Hatch Relish, Emmental Cheese, salas on pretzel bun.',
    image: mostPopular1,
  },
];

export const burgers = [
  {
    title: 'The Original Beef',
    desc: '38 Day aged local Shorthorn Beef, Hatch Relish, Emmental Cheese, salad on pretzel bun.',
    price: 23,
    image: burger1,
  },
  {
    title: 'The Texas Belly Burger',
    desc: '38 Day aged local Shorthorn Beef, 10hr Hickory Smoked Pork Belly /w Butter Maple Bourbon.',
    price: 33,
    image: burger1,
  },
  {
    title: 'Nashville Hot Chicken Burger',
    desc: '24hr Buttermilk Marinated SF Hot Chicken, Hatch Slaw, Hot Sauce, Pickle in a pretzal bun.',
    price: 44,
    image: burger1,
  },
];

export const loadedFries = [
  {
    title: 'Hatch Loaded Fries',
    desc: '12hr Hickory smoked Pork Shoulder, Hatch BBQ Sauce, Crispy Onions, Pickles on Fries.',
    price: 12,
    image: fries1,
  },
  {
    title: 'Veggie Loaded Fries',
    desc: 'Emmental Cheese, Hatch BBQ Sauce, Crispy Onions, Pickles on Fries.',
    price: 8,
    image: fries1,
  },
];

export const sides = [
  {
    title: 'Handcut Chips',
    desc: 'Handcut Chips, using only source fresh, local ingredients.',
    price: 12,
    image: sides1,
  },
  {
    title: 'Skinny Fries',
    desc: 'Skinny Fries, using only source fresh, local ingredients.',
    price: 8,
    image: sides1,
  },
  {
    title: 'Smoked Chilli Cheese Chips',
    desc: 'Smoked Chilli Cheese Chips, using only source fresh, local ingredients.',
    price: 12,
    image: sides1,
  },
  {
    title: 'Chicken Seasoned Chips',
    desc: 'Chicken Seasoned Chips, using only source fresh, local ingredients.',
    price: 8,
    image: sides1,
  },
  {
    title: 'Truffle & Parmesan Chips',
    desc: 'Truffle & Parmesan, using only source fresh, local ingredients.',
    price: 3.5,
    image: sides1,
  },
];
export const desserts = [
  {
    title: 'Homemade Soft Serve Ice-Cream',
    desc: 'Homemade Soft Serve Ice-Cream with a choice of flavours and toppings.',
    price: 12,
    image: dessert1,
  },
  {
    title: 'Homemade Soft Serve Ice-Cream',
    desc: 'Homemade Soft Serve Ice-Cream with a choice of flavours and toppings.',
    price: 12,
    image: dessert1,
  },
  {
    title: 'Homemade Soft Serve Ice-Cream',
    desc: 'Homemade Soft Serve Ice-Cream with a choice of flavours and toppings.',
    price: 12,
    image: dessert1,
  },
];

export const wings = [
  {
    title: 'Chicken Wings',
    desc: 'Our famous Chicken Wings with a choice of BBQ or Salt & Chilli seasoning.',
    price: 12,
    image: wings1,
  },
  {
    title: 'Chicken Wings',
    desc: 'Our famous Chicken Wings with a choice of BBQ or Salt & Chilli seasoning.',
    price: 12,
    image: dessert1,
  },
  {
    title: 'Chicken Wings',
    desc: 'Our famous Chicken Wings with a choice of BBQ or Salt & Chilli seasoning.',
    price: 12,
    image: wings1,
  },
  {
    title: 'Chicken Wings',
    desc: 'Our famous Chicken Wings with a choice of BBQ or Salt & Chilli seasoning.',
    price: 12,
    image: dessert1,
  },
  {
    title: 'Chicken Wings',
    desc: 'Our famous Chicken Wings with a choice of BBQ or Salt & Chilli seasoning.',
    price: 12,
    image: wings1,
  },
  {
    title: 'Chicken Wings',
    desc: 'Our famous Chicken Wings with a choice of BBQ or Salt & Chilli seasoning.',
    price: 12,
    image: dessert1,
  },
];

export const fish = [
  {
    title: 'Beer Battered Fish & Chips',
    desc: 'Beer Battered Kilkeel Haddock, Handcut Chips, Mushy Peas and Tartar Sauce',
    price: 12,
    image: fish1,
  },
  {
    title: 'Beer Battered Fish & Chips',
    desc: 'Beer Battered Kilkeel Haddock, Handcut Chips, Mushy Peas and Tartar Sauce',
    price: 12,
    image: fish1,
  },
  {
    title: 'Beer Battered Fish & Chips',
    desc: 'Beer Battered Kilkeel Haddock, Handcut Chips, Mushy Peas and Tartar Sauce',
    price: 12,
    image: fish1,
  },
  {
    title: 'Beer Battered Fish & Chips',
    desc: 'Beer Battered Kilkeel Haddock, Handcut Chips, Mushy Peas and Tartar Sauce',
    price: 12,
    image: fish1,
  },
  {
    title: 'Beer Battered Fish & Chips',
    desc: 'Beer Battered Kilkeel Haddock, Handcut Chips, Mushy Peas and Tartar Sauce',
    price: 12,
    image: fish1,
  },
  {
    title: 'Beer Battered Fish & Chips',
    desc: 'Beer Battered Kilkeel Haddock, Handcut Chips, Mushy Peas and Tartar Sauce',
    price: 12,
    image: fish1,
  },
];

export const categories = [
  {
    title: 'Burgers',
    items: burgers,
  },
  {
    title: 'Loaded Fries',
    items: loadedFries,
  },
  {
    title: 'Sides',
    items: sides,
  },
  {
    title: 'Desserts',
    items: desserts,
  },
  {
    title: 'Wings',
    items: wings,
  },
  {
    title: 'Fish',
    items: fish,
  },
];

export const MENUS_SCHEDULE = [
  {
    menuType: 'All day',
    day: 'Every day: ',
    time: '12:00 PM - 11:00 PM',
  },
  {
    menuType: 'Breakfast',
    day: 'Every day: ',
    time: '07:30 AM - 12:00 PM',
  },
  {
    menuType: 'Drinks',
    day: 'Every day: ',
    time: '12:00 PM - 11:00 PM',
  },
];

export const ORDER = [
  {
    orderNo: '#24',
    customer: 'Johnny Bravo',
    orderDate: '21/24/2022, 2:58 PM',
    contactNumber: '+44 1388 436844',
    items: [
      {
        name: 'The Original Beef',
        quantity: 1,
        amount: '£8.50',
        toppings: [
          {
            name: 'No Relish',
          },
          {
            name: 'No Tomato',
          },
        ],
        stackItUp: [
          {
            name: 'Add Streaky Bacon',
            quantity: 1,
          },
        ],
        sidesh: [
          {
            name: 'Hand Cut Chips',
            quantity: 1,
          },
        ],
      },
      {
        name: 'Coke',
        quantity: 2,
        amount: '£2.00',
      },
    ],
    total: '£12.03',
    orderStatusID: 1,
    orderStatus: 'Collection',
  },
  {
    orderNo: '#25',
    customer: 'Johnny Bravo',
    orderDate: '21/24/2022, 2:58 PM',
    contactNumber: '+44 1388 436844',
    items: [
      {
        name: 'The Original Beef',
        quantity: 1,
        amount: '£8.50',
        toppings: [
          {
            name: 'No Relish',
          },
          {
            name: 'No Tomato',
          },
        ],
        stackItUp: [
          {
            name: 'Add Streaky Bacon',
            quantity: 1,
          },
        ],
        sidesh: [
          {
            name: 'Hand Cut Chips',
            quantity: 1,
          },
        ],
      },
      {
        name: 'Coke',
        quantity: 2,
        amount: '£2.00',
      },
    ],
    total: '£12.03',
    orderStatusID: 2,
    orderStatus: 'Delivery',
  },
  {
    orderNo: '#26',
    customer: 'Johnny Bravo',
    orderDate: '21/24/2022, 2:58 PM',
    contactNumber: '+44 1388 436844',
    items: [
      {
        name: 'The Original Beef',
        quantity: 1,
        amount: '£8.50',
        toppings: [
          {
            name: 'No Relish',
          },
          {
            name: 'No Tomato',
          },
        ],
        stackItUp: [
          {
            name: 'Add Streaky Bacon',
            quantity: 1,
          },
        ],
        sidesh: [
          {
            name: 'Hand Cut Chips',
            quantity: 1,
          },
        ],
      },
      {
        name: 'Coke',
        quantity: 2,
        amount: '£2.00',
      },
    ],
    total: '£12.03',
    orderStatusID: 2,
    orderStatus: 'Delivery',
  },
];

export const CATEGORIES = [
  {
    id: 0,
    category: 'Specials',
    menus: 'Specials, Desserts, Deli',
  },
  {
    id: 1,
    category: 'Breakfast',
    menus: 'Specials',
  },
  {
    id: 2,
    category: 'Drinks',
    menus: 'Specials',
  },
];

export const CATEGORY_TYPE = [
  {
    id: 0,
    type: 'Specials',
  },
  {
    id: 1,
    type: 'All day menu',
  },
  {
    id: 2,
    type: 'Breakfast',
  },
  {
    id: 3,
    type: 'Deli',
  },
];

export const DIETARY_ATTRIBUTES = [
  {
    id: 0,
    type: 'Vegetarian',
  },
  {
    id: 1,
    type: 'Vegan',
  },
  {
    id: 2,
    type: 'Gluten Free',
  },
];

export const TEMPERATURE = [
  {
    id: 0,
    name: 'Cold',
  },
  {
    id: 1,
    name: 'Unheated',
  },
  {
    id: 2,
    name: 'Hot',
  },
];

export const MODIFIERS = [
  {
    id: 0,
    name: 'Sauce',
    contains: 'Ketchup, Mayo, BBQ',
  },
  {
    id: 1,
    name: 'Gluten Free',
    contains: 'Excludes any foods that con...',
  },
];

export const FAKE_PREDICTIONS = [
  {
    description: 'Naawan, Misamis Oriental, Philippines',
    matched_substrings: [
      {
        length: 6,
        offset: 0,
      },
    ],
    place_id: 'ChIJEeRy0tRoVTIR19bgegYVDew',
    reference: 'ChIJEeRy0tRoVTIR19bgegYVDew',
    structured_formatting: {
      main_text: 'Naawan',
      main_text_matched_substrings: [
        {
          length: 6,
          offset: 0,
        },
      ],
      secondary_text: 'Misamis Oriental, Philippines',
    },
    terms: [
      {
        offset: 0,
        value: 'Naawan',
      },
      {
        offset: 8,
        value: 'Misamis Oriental',
      },
      {
        offset: 26,
        value: 'Philippines',
      },
    ],
    types: ['locality', 'political', 'geocode'],
  },
  {
    description:
      'Naawan Misamis Oriental, Naawan, Misamis Oriental, Philippines',
    matched_substrings: [
      {
        length: 6,
        offset: 0,
      },
    ],
    place_id: 'ChIJx7eM001vVTIRDDVH8loVdz8',
    reference: 'ChIJx7eM001vVTIRDDVH8loVdz8',
    structured_formatting: {
      main_text: 'Naawan Misamis Oriental',
      main_text_matched_substrings: [
        {
          length: 6,
          offset: 0,
        },
      ],
      secondary_text: 'Naawan, Misamis Oriental, Philippines',
    },
    terms: [
      {
        offset: 0,
        value: 'Naawan Misamis Oriental',
      },
      {
        offset: 25,
        value: 'Naawan',
      },
      {
        offset: 33,
        value: 'Misamis Oriental',
      },
      {
        offset: 51,
        value: 'Philippines',
      },
    ],
    types: ['travel_agency', 'point_of_interest', 'establishment'],
  },
  {
    description: 'Naawan Municipal Hall, Naawan, Misamis Oriental, Philippines',
    matched_substrings: [
      {
        length: 6,
        offset: 0,
      },
    ],
    place_id: 'ChIJO-7MRNRoVTIRPhyMjM0WJE8',
    reference: 'ChIJO-7MRNRoVTIRPhyMjM0WJE8',
    structured_formatting: {
      main_text: 'Naawan Municipal Hall',
      main_text_matched_substrings: [
        {
          length: 6,
          offset: 0,
        },
      ],
      secondary_text: 'Naawan, Misamis Oriental, Philippines',
    },
    terms: [
      {
        offset: 0,
        value: 'Naawan Municipal Hall',
      },
      {
        offset: 23,
        value: 'Naawan',
      },
      {
        offset: 31,
        value: 'Misamis Oriental',
      },
      {
        offset: 49,
        value: 'Philippines',
      },
    ],
    types: [
      'city_hall',
      'local_government_office',
      'point_of_interest',
      'establishment',
    ],
  },
  {
    description: 'NAawan.mis Or, Naawan, Misamis Oriental, Philippines',
    matched_substrings: [
      {
        length: 6,
        offset: 0,
      },
    ],
    place_id: 'ChIJseEXkrtnVTIRqSraQRijuY8',
    reference: 'ChIJseEXkrtnVTIRqSraQRijuY8',
    structured_formatting: {
      main_text: 'NAawan.mis Or',
      main_text_matched_substrings: [
        {
          length: 6,
          offset: 0,
        },
      ],
      secondary_text: 'Naawan, Misamis Oriental, Philippines',
    },
    terms: [
      {
        offset: 0,
        value: 'NAawan.mis Or',
      },
      {
        offset: 15,
        value: 'Naawan',
      },
      {
        offset: 23,
        value: 'Misamis Oriental',
      },
      {
        offset: 41,
        value: 'Philippines',
      },
    ],
    types: [
      'supermarket',
      'grocery_or_supermarket',
      'food',
      'point_of_interest',
      'store',
      'establishment',
    ],
  },
  {
    description:
      'Naawan Beach, Unnamed Road, Naawan, Misamis Oriental, Philippines',
    matched_substrings: [
      {
        length: 6,
        offset: 0,
      },
    ],
    place_id: 'ChIJ0UgffqVpVTIRBYLEWCSt4YQ',
    reference: 'ChIJ0UgffqVpVTIRBYLEWCSt4YQ',
    structured_formatting: {
      main_text: 'Naawan Beach',
      main_text_matched_substrings: [
        {
          length: 6,
          offset: 0,
        },
      ],
      secondary_text: 'Unnamed Road, Naawan, Misamis Oriental, Philippines',
    },
    terms: [
      {
        offset: 0,
        value: 'Naawan Beach',
      },
      {
        offset: 14,
        value: 'Unnamed Road',
      },
      {
        offset: 28,
        value: 'Naawan',
      },
      {
        offset: 36,
        value: 'Misamis Oriental',
      },
      {
        offset: 54,
        value: 'Philippines',
      },
    ],
    types: ['lodging', 'point_of_interest', 'establishment'],
  },
];
