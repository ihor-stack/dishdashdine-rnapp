import {Images} from '@/assets'
import {OrderItem} from '@/models/orders'

export const favorites: Array<OrderItem> = [
  {
    thumbnail: Images.thehatchthumb,
    date: '25 Sep',
    totalItems: 3,
    restaurant: 'The Hatch',
    favorite: true,
  },
  {
    thumbnail: Images.magherainnthumb,
    date: '09 Jul',
    totalItems: 5,
    restaurant: 'Maghera Inn',
    favorite: true,
  },
  {
    thumbnail: Images.restaurants.the_mariner_bar_and_restaurant,
    date: '25 May',
    totalItems: 3,
    restaurant: 'The Mariner Bar and Restaurant',
    favorite: true,
  },

  {
    thumbnail: Images.restaurants.the_anchor_bar,
    date: '24 Apr',
    totalItems: 3,
    restaurant: 'The Anchor Bar',
    favorite: true,
  },
]
