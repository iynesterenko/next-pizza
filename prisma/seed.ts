import { Prisma } from '@prisma/client'
import { prisma } from './prisma-client'
import { categories, ingredients, products } from './constants'
import { hashSync } from 'bcrypt'

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

const generatePrice = () => random(190, 600)

const pizzaSizes = [20, 30, 40]
const pizzaTypes = [1, 2]

/*
RESET DB
*/
async function reset() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
    "CartItem",
    "Cart",
    "ProductItem",
    "Product",
    "Ingredient",
    "Category",
    "StoryItem",
    "Story",
    "User"
    RESTART IDENTITY CASCADE
  `)
}

/*
USERS
*/
async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  })
}

/*
CATEGORIES
*/
async function seedCategories() {
  await prisma.category.createMany({
    data: categories,
  })
}

/*
INGREDIENTS
*/
async function seedIngredients() {
  await prisma.ingredient.createMany({
    data: ingredients,
  })
}

/*
ОБЫЧНЫЕ ПРОДУКТЫ (НЕ ПИЦЦЫ)
*/
async function seedProducts() {
  await prisma.product.createMany({
    data: products,
  })

  const dbProducts = await prisma.product.findMany({
    where: {
      categoryId: {
        not: 1, // исключаем пиццы
      },
    },
  })

  const items: Prisma.ProductItemUncheckedCreateInput[] = []

  dbProducts.forEach((product) => {
    items.push({
      productId: product.id,
      price: generatePrice(),
    })
  })

  await prisma.productItem.createMany({
    data: items,
  })
}

/*
ПИЦЦЫ + ВАРИАНТЫ
*/
async function seedPizzas() {
  const pizzas = [
    {
      name: 'Пепперони',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp',
    },
    {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
    },
    {
      name: 'Чоризо',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
    },
  ]

  for (const pizza of pizzas) {
    const product = await prisma.product.create({
      data: {
        ...pizza,
        categoryId: 1,
        ingredients: {
          connect: ingredients
            .slice(0, random(3, 6))
            .map((i) => ({ id: i.id })),
        },
      },
    })

    const items: Prisma.ProductItemUncheckedCreateInput[] = []

    pizzaTypes.forEach((type) => {
      pizzaSizes.forEach((size) => {
        items.push({
          productId: product.id,
          pizzaType: type as 1 | 2,
          size: size as 20 | 30 | 40,
          price: generatePrice(),
        })
      })
    })

    await prisma.productItem.createMany({
      data: items,
    })
  }
}

/*
STORIES
*/
async function seedStories() {
  const story1 = await prisma.story.create({
    data: {
      previewImageUrl:
        'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp',
    },
  })

  const story2 = await prisma.story.create({
    data: {
      previewImageUrl:
        'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp',
    },
  })

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: story1.id,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp',
      },
      {
        storyId: story1.id,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp',
      },
      {
        storyId: story2.id,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp',
      },
    ],
  })
}

/*
CART
*/
async function seedCart() {
  const cart = await prisma.cart.create({
    data: {
      userId: 1,
      token: '11111',
      totalAmount: 0,
    },
  })

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productItemId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 },  { id: 4 }],
      },
    },
  })
}

/*
MAIN
*/
async function main() {
  await reset()
  await seedUsers()
  await seedCategories()
  await seedIngredients()
  await seedProducts()
  await seedPizzas()
  await seedStories()
  await seedCart()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })