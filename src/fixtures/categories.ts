import {Icons} from '@/assets'
import {Categories} from '@/models/categories'

export const categories1: Array<Categories> = [
  {
    name: 'Pizza',
    image: Icons.pizza,
  },
  {
    name: 'Burger',
    image: Icons.burger,
  },
  {
    name: 'Desserts',
    image: Icons.desserts,
  },
]
export const categories2: Array<Categories> = [
  {
    name: 'Mexican',
    image: Icons.mexican,
  },
  {
    name: 'Kebab',
    image: Icons.kebab,
  },
  {
    name: 'Chinese',
    image: Icons.chinese,
  },
]

export const topPicks = [[...categories1], [...categories2]];

export const topPicks2 = [...categories1, ...categories2];
