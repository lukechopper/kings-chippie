const vinegarSides = [
    {
        type: 'No Salt & Vinegar',
    },
    {
        type: 'Salt & Vinegar',
    },
    {
        type: 'Salt Only',
    },
    {
        type: 'Vinegar Only',
    }
];
const smallLarge1 = [
    {
        type: 'Small',
        price: '+0'
    },
    {
        type: 'Large',
        price: '+1.10'
    },
];
const smallLarge2 = [
    {
        type: 'Small',
        price: '+0'
    },
    {
        type: 'Large',
        price: '+1.00'
    },
];
const drinks = [
    {
        type: 'Ginger Beer Can - 330ml'
    },
    {
        type: '7Up Can - 330ml'
    },
    {
        type: 'Lilt Can - 330ml'
    },
    {
        type: 'Dr Pepper Can - 330ml'
    },
    {
        type: 'Pepsi Can - 330ml'
    },
    {
        type: 'Coke Can - 330ml'
    },
    {
        type: 'Vimto Can - 330ml'
    },
    {
        type: 'Rio Tropical Can - 330ml'
    },
    {
        type: 'Diet Coke Can - 330ml'
    },
    {
        type: 'Water - 500ml'
    },
];
const cheese = [
    {
        type: 'Add Cheese',
        price: 0.20
    },
    {
        type: 'No Cheese'
    }
];
const sauce = [
    {
        type: 'No, Sauce'
    },
    {
        type: 'Sauce Options',
        options: [
            {
                type: 'Barbecue sauce'
            },
            {
                type: 'Chilli sauce'
            },
            {
                type: 'Chinese Curry Sauce',
                price: 1.20
            },
            {
                type: 'Garlic mayo'
            },
            {
                type: 'Gravy',
                price: 1.20
            },
            {
                type: 'Ketchup'
            },
            {
                type: 'Mayo'
            },
            {
                type: 'Mint yoghurt'
            },
            {
                type: 'Mushy Peas',
                price: 1.20
            },
            {
                type: 'Sweet \'n\' Sour Sauce',
                price: 1.20
            },
            {
                type: 'Sweet Chilli'
            },
        ]
    }
];
const costDrinks = [
    {
        type: '7up Can',
        price: 1.20
    },
    {
        type: 'Coke Can',
        price: 1.20
    },
    {
        type: 'Diet Coke Can',
        price: 1.20
    },
    {
        type: 'Dr Pepper Can',
        price: 1.20
    },
    {
        type: 'Ginger Beer Can',
        price: 1.20
    },
    {
        type: 'Lilt Can',
        price: 1.20
    },
    {
        type: 'No Drink',
    },
    {
        type: 'Pepsi Can',
        price: 1.20
    },
    {
        type: 'Rio Tropical Can',
        price: 1.20
    },
    {
        type: 'Vimto Can',
        price: 1.20
    },
    {
        type: 'Water',
        price: 1.20
    },
];
const salad = [
    {
        type: 'Salad'
    },
    {
        type: 'No Salad'
    }
];
const singleSauce = [
    {
        type: 'Barbecue sauce'
    },
    {
        type: 'Chilli sauce'
    },
    {
        type: 'Chinese Curry Sauce',
        price: 1.20
    },
    {
        type: 'Garlic mayo'
    },
    {
        type: 'Gravy',
        price: 1.20
    },
    {
        type: 'Ketchup'
    },
    {
        type: 'Mayo'
    },
    {
        type: 'Mint yoghurt'
    },
    {
        type: 'Mushy Peas',
        price: 1.20
    },
    {
        type: 'Sweet \'n\' Sour Sauce',
        price: 1.20
    },
    {
        type: 'Sweet Chilli'
    },
];


module.exports = [
{
    "title" : "Appetisers",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Prawn Crackers",
            "desc" : "A portion of fresh Prawn Crackers",
            "price" : "£2.95"
        }, 
        {
            "subDesc" : [],
            "title" : "Chinese Spring Roll",
            "desc" : "Handmade Spring Roll containing Chinese chicken, fresh bean sprouts, carrots, and cabbage",
            "price" : "£3.25",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Boiled Rice",
            "desc" : "Long grain rice boiled",
            "price" : "from £3.25",
            "sides": [
                {
                    option: smallLarge1
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Egg Fried Rice",
            "desc" : "Long grain rice cooked with fresh eggs, soya sauce and our blend of herbs",
            "price" : "from £3.75",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        },
        {
            "subDesc" : [],
            "title" : "Cold Bites",
            "desc" : "Freshly cut bite size pieces of Cod",
            "price" : "£3.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }
    ],
},
{
    "title" : "Fish & Chips",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Regular Chips",
            "desc" : "A regular portion of freshly prepared chips",
            "price" : "£2.45",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Large Chips",
            "desc" : "A large portion of freshly prepared chips",
            "price" : "£3.45",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cone of Chips",
            "desc" : "A cone of freshly prepared chips",
            "price" : "£1.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Regular Cheesy Chips",
            "desc" : "A large portion of freshly prepared chips covered in melted cheese",
            "price" : "£3.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Large Cheesy Chips",
            "desc" : "A large portion of freshly prepared chips covered in melted cheese",
            "price" : "£4.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mini Cod",
            "desc" : "Mini cod fillet cooked in our famous crispy batter",
            "price" : "£4.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mini Cod & Chips",
            "desc" : "Mini cod fillet cooked in our famous crispy batter served with a portion of freshly prepared chips",
            "price" : "£5.95"
        }, 
        {
            "subDesc" : [],
            "title" : "Cod",
            "desc" : "Large cod fillet cooked in our famous crispy batter",
            "price" : "£6.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cod & Chips",
            "desc" : "Large cod fillet cooked in our famous crispy batter served with a portion of freshly prepared chips",
            "price" : "£8.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Battered Mushrooms",
            "desc" : "Four mushrooms on a skewer cooked in our famous crispy batter",
            "price" : "£2.50",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Sausage",
            "desc" : "Large sausage",
            "price" : "£1.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Battered Sausage",
            "desc" : "Large sausage coated in our famous crispy batter",
            "price" : "£1.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Saveloy",
            "desc" : "Large saveloy",
            "price" : "£1.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Fishcake",
            "desc" : "Large fishcake",
            "price" : "£1.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cod Roe",
            "desc" : "Tinned Roe cooked in our famous crispy batter",
            "price" : "£1.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Nuggets",
            "desc" : "Eight freshly prepared Chicken Nuggets",
            "price" : "£3.60",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Scampi",
            "desc" : "Ten freshly prepared Scampi",
            "price" : "£4.20",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Scallop",
            "desc" : "Freshly cut potatoes coated in our famous crispy batter",
            "price" : "£1.25",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mussels",
            "desc" : "A jar of Mussels",
            "price" : "£2.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cockles",
            "desc" : "A jar of Cockles",
            "price" : "£2.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Pitta Bread",
            "desc" : "One Pitta Bread",
            "price" : "£1.00",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Bun",
            "desc" : "One seeded Bun",
            "price" : "£1.00",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Pickled Onion",
            "desc" : "One Pickled Onion",
            "price" : "£0.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Pickled Egg",
            "desc" : "One Pickled Egg",
            "price" : "£0.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }
    ],
},
{
    "title" : "Meal Deals",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Mini Cod & Chips Meal Deal",
            "desc" : "Mini cod fillet cooked in our famous crispy batter served with a portion of freshly prepared chips",
            "price" : "£5.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cod & Chips Meal Deal",
            "desc" : "Large cod fillet cooked in our famous crispy batter served with a portion of freshly prepared chips",
            "price" : "£8.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cod & Chips with all the Trimmings Meal Deal",
            "desc" : "Large cod fillet cooked in our famous crispy batter served with a portion of freshly prepared chips with a side of Chinese Curry Sauce & Mushy Peas and a can of your choice.",
            "price" : "from £11.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: drinks
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chips & Curry Sauce Meal Deal",
            "desc" : "Regular portion of freshly prepared chips served with our legendary, in house and hand made Chinese Curry Sauce",
            "price" : "from £3.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chips & Gravy Meal Deal",
            "desc" : "Regular portion of freshly prepared chips served with Onion Gravy",
            "price" : "£3.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chips & Sweet 'n' Sour Sauce Meal Deal",
            "desc" : "Regular portion of freshly prepared chips served with our unique, in house and hand made Sweet 'n' Sour Sauce",
            "price" : "£3.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chips & Mushy Peas Meal Deal",
            "desc" : "Regular portion of freshly prepared chips served with Mushy Peas",
            "price" : "£3.75",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Egg Fried Rice, Chips & Curry Sauce Meal Deal",
            "desc" : "A Kings favourite. Chinese Egg Fried Rice with a regular portion of freshly prepared chips served with our legendary, in house and hand made Chinese Curry Sauce",
            "price" : "£4.80",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : ["Egg Fried Rice, Chips & Sweet 'n' Sour Sauce Meal Deal"],
            "title" : "Egg Fried Rice, Chips & Sweet 'n' Sour Sauce Meal",
            "desc" : "A Kings favourite. Chinese Egg Fried Rice with a regular portion of freshly prepared chips served with our unique, in house and hand made Sweet 'n' Sour Sauce",
            "price" : "£4.80",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Nuggets (8) & Chips Meal Deal",
            "desc" : "Eight freshly prepared Chicken Nuggets served with a portion of freshly prepared chips",
            "price" : "£4.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Sausage, Chips & Curry Sauce Meal Deal",
            "desc" : "Large sausage with a regular portion of freshly prepared chips served with our legendary, in house and hand made Chinese Curry Sauce",
            "price" : "£4.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Sausage, Chips & Gravy Meal Deal",
            "desc" : "Large sausage with a regular portion of freshly prepared chips served with onion gravy",
            "price" : "£4.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Battered Sausage, Chips & Curry Sauce Meal Deal",
            "desc" : "Large sausage coated in our famous crispy batter with a regular portion of freshly prepared chips served with Onion Gravy",
            "price" : "£4.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Saveloy, Chips & Curry Sauce Meal Deal",
            "desc" : "Large saveloy with a regular portion of freshly prepared chips served with Onion Gravy",
            "price" : "£4.95",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Fillet Burger & Chips Meal Deal",
            "desc" : "Chicken breast fillet coated in crispy batter with the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepared chips",
            "price" : "£5.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        },
        {
            "subDesc" : [],
            "title" : "Beef Burger & Chips",
            "desc" : "Beef patty with the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepared chips",
            "price" : "£5.35",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        },
        {
            "subDesc" : [],
            "title" : "Cheese Burger & Chips Meal Deal",
            "desc" : "Beef patty with a slice of cheese and the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepared chips",
            "price" : "£5.50",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Double Cheese Burger & Chips Meal Deal",
            "desc" : "Double beef patty with a slice of cheese and the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepared chips",
            "price" : "£6.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Donner Kebab Burger & Chips Meal Deal",
            "desc" : "Freshly sliced lamb donner grilled to perfection with the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepapred chips",
            "price" : "£5.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Kebab Burger & Chips Meal Deal",
            "desc" : "Freshly sliced chicken kebab meat grilled to perfection with the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepared chips",
            "price" : "£5.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Meat Feast Burger & Chips Meal Deal",
            "desc" : "The best of both worlds. A chicken breast fillet combined with a beef patty with a slice of cheese and the option of fresh salad and a sauce of your choice in a seeded bun with freshly prepared chips",
            "price" : "£6.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "The Kings Special Meal Deal",
            "desc" : "Freshly sliced lamb donner and chicken kebab meat with freshly prepared chips, Egg Fried Rice smothered in our legendary Chinese Curry Sauce",
            "price" : "£7.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: sauce
                },
                {
                    option: costDrinks
                }
            ]
        }
    ],
},
{
    "title" : "Burgers",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Beef Burger",
            "desc" : "Beef patty with the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £3.50",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cheese Burger",
            "desc" : "Beef patty with a slice of cheese and the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £3.75",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Double Cheese Burger",
            "desc" : "Double beef patty with a slice of cheese and the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £5.50",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Fillet Burger",
            "desc" : "Chicken breast fillet coated in crispy batter with the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £4.80",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Donner Kebab Burger",
            "desc" : "Freshly sliced lamb donner grilled to perfection with the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £4.80",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Cod Burger",
            "desc" : "100% freshly cut Cod fillet cooked in a light crispy batter with a option of a slice of cheese, freshly cut salad and a sauce of your choice served in a seeded bun",
            "price" : "from £4.80",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Kebab Burger",
            "desc" : "Freshly sliced chicken kebab meat grilled to perfection with the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £5.10",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mixed Kebab Burger",
            "desc" : "A mixture of freshly sliced lamb donner & chicken kebab meat grilled to perfection with the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £5.40",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Meat Feast Burger",
            "desc" : "The best of both worlds. A chicken breast fillet combined with a beef patty with a slice of cheese and the option of fresh salad and a sauce of your choice in a seeded bun",
            "price" : "from £5.95",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Veggie Burger",
            "desc" : "Vegetable patty coated in breading with the option of a slice of cheese, freshly cut salad and a sauce of your choice served in a seeded bun",
            "price" : "from £4.80",
            "sides": [
                {
                    option: salad
                },
                {
                    option: cheese
                },
                {
                    option: singleSauce
                }
            ]
        }
    ],
},
{
    "title" : "Kebabs",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Donner Meat",
            "desc" : "A portion of freshly sliced lamb donner grilled to perfection with a sauce of your choice",
            "price" : "from £4.80",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Kebab Meat",
            "desc" : "A portion of freshly sliced chicken kebab meat grilled to perfection with a sauce of your choice",
            "price" : "from £5.10",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mixed Kebab Meat",
            "desc" : "A portion of a mixture of freshly sliced lamb donner & chicken kebab meat grilled to perfection with a sauce of your choice",
            "price" : "from £5.40",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Donner Meat & Chips",
            "desc" : "Freshly sliced lamb donner grilled to perfection with freshly prepared chips and the option of freshly cut salad and a sauce of your choice",
            "price" : "from £5.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Kebab Meat & Chips",
            "desc" : "Freshly sliced chicken kebab meat grilled to perfection with freshly prepared chips and the option of freshly cut salad and a sauce of your choice",
            "price" : "from £6.50",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mixed Kebab Meat & Chips",
            "desc" : "A mixture of freshly sliced lamb donner & chicken kebab meat grilled to perfection with freshly prepared chips and the option of freshly cut salad and a sauce of your choice",
            "price" : "from £6.95",
            "sides": [
                {
                    option: vinegarSides
                },
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Donner Kebab in Pitta",
            "desc" : "Freshly sliced lamb donner grilled to perfection with the option of fresh salad and a sauce of your choice served in a toasted pitta bread",
            "price" : "from £5.75",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Kebab in Pitta",
            "desc" : "Freshly sliced chicken kebab meat grilled to perfection with the option of fresh salad and a sauce of your choice served in a toasted pitta bread",
            "price" : "from £5.95",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mixed Kebab in Pitta",
            "desc" : "A mixture of freshly sliced lamb donner & chicken kebab meat grilled to perfection with freshly prepared chips and the option of freshly cut salad and a sauce of your choice",
            "price" : "from £6.45",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Salad Kebab in Pitta",
            "desc" : "Freshly cut salad and a sauce of your choice served in a toasted pitta bread",
            "price" : "from £3.95",
            "sides": [
                {
                    option: salad
                },
                {
                    option: singleSauce
                }
            ]
        }
    ],
},
{
    "title" : "Combo Meals",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Egg Fried Rice, Chips & Curry Sauce",
            "desc" : "A Kings favourite. Chinese Egg Fried Rice with a regular portion of reshly prepared chips served with our legendary, in house and hand made Chinese Curry Sauce",
            "price" : "from £4.45",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Egg Fried Rice, Chips & Sweet 'n' Sour Sauce",
            "desc" : "A Kings favourite. Chinese Egg Fried Rice with a regular portion of reshly prepared chips served with our unique, in house and hand made Sweet 'n' Sour Sauce",
            "price" : "from £4.45",
            "sides": [
                {
                    option: vinegarSides
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Chicken Curry, Chips & Egg Fried Rice",
            "desc" : "Chicken and onion stir fry served with our famous Curry and Egg Fried Rice",
            "price" : "from £5.45",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Beef Curry, Chips & Egg Fried Rice",
            "desc" : "Beef and onion stir fry served with our famous Curry and Egg Fried Rice",
            "price" : "from £5.75",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "King Prawn Curry, Chips & Egg Fried Rice",
            "desc" : "King Prawns and onion stir fry served with our famous Curry and Egg Fried Rice",
            "price" : "from £6.75",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }
    ],
},
{
    "title" : "Sweet n Sour Dishes",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Sweet 'n' Sour Chicken & Egg Fried Rice",
            "desc" : "Chicken - crispy battered covered with Sweet 'n' Sour Sauce served with Egg Fried Rice",
            "price" : "from £5.45",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Sweet 'n' Sour King Prawn & Egg Fried Rice",
            "desc" : "King Prawns - crispy battered covered with Sweet 'n' Sour Sauce served with Egg Fried Rice",
            "price" : "from £6.45",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }
    ],
},
{
    "title" : "Chow Mein",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Chicken Chow Mein",
            "desc" : "Stir Fry -  Noodles with Bean Sprouts ,Onions and Chicken cooked in Soya Sauce",
            "price" : "from £6.95",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Beef Chow Mein",
            "desc" : "Stir Fry -  Noodles with Bean Sprouts ,Onions and Beef cooked in Soya Sauce",
            "price" : "from £6.95",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "King Prawn Chow Mein",
            "desc" : "Stir Fry -  Noodles with Bean Sprouts ,Onions and King Prawns cooked in Soya Sauce",
            "price" : "from £7.95",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Vegetable Chow Mein",
            "desc" : "Stir Fry -  Noodles with Bean Sprouts ,Onions and Green Pepper cooked in Soya Sauce",
            "price" : "from £5.95",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }
    ],
},
{
    "title" : "Lemon Dishes",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Lemon Chicken & Egg Fried Rice",
            "desc" : "Crispy battered Chicken cut into strips served with Lemon Sauce and Egg Fried Rice",
            "price" : "from £5.45",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }
    ],
},
{
    "title" : "Ben & Jerry's",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Ben & Jerry's Caramel Chew Chew 465 Ml",
            "desc" : "Caramel ice cream with a swirl of caramel & fudge covered caramel chunks.",
            "price" : "£5.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Ben & Jerry's Chocolate Fudge Brownie 465 Ml",
            "desc" : "Chocolate ice cream crammed with delicious fudge brownies.",
            "price" : "£5.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Ben & Jerry's Cookie Dough 465 Ml",
            "desc" : "Vanilla ice cream packed with delicious chocolate chip cookie dough.",
            "price" : "£5.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Chilled Bundle",
            "desc" : "Any 4 Ben & Jerry's",
            "price" : "£20.00",
            "sides": [
                {
                    title: 'Choose 4',
                    select: 4,
                    option: [
                        {
                            type: "Ben & Jerry's Caramel Chew Chew 465 Ml",
                            desc: "Caramel ice cream with a swirl of caramel & fudge covered caramel chunks."
                        },
                        {
                            type: "Ben & Jerry's Chocolate Fudge Brownie 465 Ml",
                            desc: "Chocolate ice cream crammed with delicious fudge brownies."
                        },
                        {
                            type: "Ben & Jerry's Cookie Dough 465 Ml",
                            desc: "Vanilla ice cream packed with delicious chocolate chip cookie dough."
                        }
                    ]
                }
            ]
        }
    ],
},
{
    "title" : "Drinks",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Coke Bottle - 1.25l",
            "desc" : "",
            "price" : "£2.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Pepsi Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "7Up Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Coke Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Diet Coke Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Dr Pepper Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Ginger Beer Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Lilt Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Vimto Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Rio Tropical Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Water - 500ml",
            "desc" : "",
            "price" : "£1.35"
        }, 
        {
            "subDesc" : [],
            "title" : "Tango Orange Can - 330ml",
            "desc" : "",
            "price" : "£1.35"
        }
    ],
},
{
    "title" : "Sauces",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Curry Sauce",
            "desc" : "A kings classic. Our legendary Chinese Curry Sauce is made in house from scratch",
            "price" : "from £1.75",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Sweet 'n' Sour Sauce",
            "desc" : "A kings old favourite. Our unique, in house and hand made Sweet 'n' Sour Sauce",
            "price" : "from £1.75",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Mushy Peas Sauce",
            "desc" : "A portion of Mushy Peas. The perfect partner with Cod & Chips.",
            "price" : "from £1.45",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [],
            "title" : "Gravy Sauce",
            "desc" : "A portion of Onion Gravy",
            "price" : "from £1.45",
            "sides": [
                {
                    option: smallLarge2
                }
            ]
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Barbecue Sauce",
            "desc" : "A portion of Barbecue sauce",
            "price" : "£0.50"
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Chilli Sauce",
            "desc" : "A portion of Chilli sauce",
            "price" : "£0.50"
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Garlic Mayonnaise Sauce",
            "desc" : "A portion of Garlic Mayonnaise",
            "price" : "£0.50"
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Mint Sauce",
            "desc" : "A portion of Mint sauce",
            "price" : "£0.50"
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Sweet Chilli Sauce",
            "desc" : "A portion of Sweet Chilli sauce",
            "price" : "£0.50"
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Tomato Ketchup Sauce",
            "desc" : "A portion of Tomato Ketchup",
            "price" : "£0.50"
        }, 
        {
            "subDesc" : [ 
                "Cold Sauces"
            ],
            "title" : "Yoghurt & Mint Sauce",
            "desc" : "A portion of Yoghurt & Mint sauce",
            "price" : "£0.50"
        }
    ],
},
{
    "title" : "Ice Cream",
    "items" : [ 
        {
            "subDesc" : [],
            "title" : "Ben & Jerry's Caramel Chew Chew Ice Cream 465 ml",
            "desc" : "Caramel ice cream with a swirl of caramel & fudge covered caramel chunks.",
            "price" : "£5.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Ben & Jerry's Chocolate Fudge Brownie Ice Cream 465 ml",
            "desc" : "Chocolate ice cream crammed with delicious fudge brownies.",
            "price" : "£5.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Ben & Jerry's Cookie Dough Ice Cream 465 ml",
            "desc" : "Vanilla ice cream packed with delicious chocolate chip cookie dough.",
            "price" : "£5.50"
        }, 
        {
            "subDesc" : [],
            "title" : "Haagen Dasz Vanilla Ice Cream 460 Ml",
            "desc" : "Vanilla ice cream",
            "price" : "£5.50"
        }
    ],
}
]