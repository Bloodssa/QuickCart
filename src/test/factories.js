// dummy factory tests data

export const makeProduct = (overrides = {}) => ({
    id: 1,
    name: "Wireless Mouse",
    description: "",
    price: 599,
    stockQuantity: 10,
    categoryId: 1,
    categoryName: "Electronics",
    isFeatured: false,
    images: [{ id: 1, imageUrl: "http://localhost:3000/uploads/products/mouse.jpg", isDefault: true }],
    ...overrides,
});