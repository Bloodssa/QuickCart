// MOCK
export const categories = [
    { id: 1, name: "Gadgets", slug: "gadgets", productCount: 42, isActive: true },
    { id: 2, name: "Clothes", slug: "clothes", productCount: 128, isActive: true },
    { id: 3, name: "Glasses & Accessories", slug: "glasses-accessories", productCount: 35, isActive: true },
    { id: 4, name: "Home & Living", slug: "home-living", productCount: 0, isActive: false },
];

export const customers = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    fullName: ["Maria Santos", "Juan Dela Cruz", "Ana Reyes", "Paolo Garcia", "Liza Mendoza"][i % 5],
    email: `customer${i + 1}@mail.com`,
    orderCount: (i * 3) % 11,
    totalSpent: ((i * 1370) % 24000) + 500,
    joinedOn: new Date(2026, 9 - (i % 9), (i % 27) + 1).toISOString(),
    isActive: i % 7 !== 0,
}));

export const products = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    sku: `QC-${String(1000 + i)}`,
    name: ["Wireless Earbuds", "Smart Watch", "Denim Jacket", "Polo Shirt", "Blue-Light Glasses", "Leather Wallet"][i % 6],
    category: ["Gadgets", "Gadgets", "Clothes", "Clothes", "Glasses & Accessories", "Glasses & Accessories"][i % 6],
    stock: [0, 4, 18, 62, 3, 120, 9][i % 7],
    reorderLevel: 10,
}));

export const deals = [
    { id: 1, name: "Payday Sale", type: "Percentage", value: 20, startsOn: "2026-10-30", endsOn: "2026-11-02", status: "Scheduled" },
    { id: 2, name: "Free shipping over ₱1,500", type: "Free shipping", value: 0, startsOn: "2026-10-01", endsOn: "2026-12-31", status: "Active" },
    { id: 3, name: "WELCOME100", type: "Fixed amount", value: 100, startsOn: "2026-01-01", endsOn: "2026-09-30", status: "Expired" },
];

export const dailySales = [
    { day: "Mon", revenue: 12400 }, { day: "Tue", revenue: 9800 }, { day: "Wed", revenue: 15200 },
    { day: "Thu", revenue: 11300 }, { day: "Fri", revenue: 18900 }, { day: "Sat", revenue: 22100 },
    { day: "Sun", revenue: 16700 },
];

export const topProducts = [
    { name: "Wireless Earbuds", units: 84, revenue: 125160 },
    { name: "Smart Watch", units: 51, revenue: 142800 },
    { name: "Denim Jacket", units: 47, revenue: 56400 },
    { name: "Blue-Light Glasses", units: 39, revenue: 23400 },
];