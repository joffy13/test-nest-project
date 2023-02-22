export const productSelect = {
  id: true,
  name: true,
  rating: true,
  price: true,
  type: true,
  authorId: true,
  gameId: true,
  appId: true,
  author: {
    select: {
      email: true,
      age: true,
      role: true,
    },
  },
  game: {
    select: {
      name: true,
      image: true,
    },
  },
};
