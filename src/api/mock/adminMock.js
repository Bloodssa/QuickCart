    // src/api/mock/adminMock.js
// In-memory mock of the admin endpoints that don't exist in the backend yet.
// Same method names as `adminApi`, same return shapes the pages read.
// State lives in memory: adjusting stock / featuring a product is reflected in
// Dashboard, Inventory and Deals until you refresh the page.

const LATENCY = 300; // ms, set to 0 to disable
const LOW_STOCK_THRESHOLD = 10;
const MAX_FEATURED = 8;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const wait = async (value) => {
    if (LATENCY) await sleep(LATENCY);
    return structuredClone(value);
};
const fail = async (message, status = 400) => {
    if (LATENCY) await sleep(LATENCY);
    const err = new Error(message);
    err.response = { status, data: { message } };
    throw err;
};

// deterministic random so the data looks the same on every reload
function rng(seed) {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}
const rand = rng(42);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (a, b) => a + Math.floor(rand() * (b - a + 1));

const isoDay = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n, hour = 12) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(hour, between(0, 59), 0, 0);
    return d;
};

function paginate(list, page = 1, pageSize = 10) {
    page = Number(page) || 1;
    pageSize = Number(pageSize) || 10;
    const start = (page - 1) * pageSize;
    return { items: list.slice(start, start + pageSize), page, pageSize, totalResults: list.length };
}

/* ----------------------------- categories ----------------------------- */

let categories = [
    { id: 1, name: "Electronics", description: "Gadgets and accessories" },
    { id: 2, name: "Groceries", description: "Everyday food and pantry items" },
    { id: 3, name: "Home & Kitchen", description: "Appliances and cookware" },
    { id: 4, name: "Beauty & Care", description: "Skincare and personal care" },
    { id: 5, name: "Fashion", description: "Clothing and bags" },
    { id: 6, name: "Sports", description: "Gear and fitness" },
];
let nextCategoryId = 7;
const categoryName = (id) => categories.find((c) => c.id === id)?.name ?? "";

/* ------------------------------ products ------------------------------ */

const seedProducts = [
    ["Wireless Earbuds Pro", 1, 2499, 34, true],
    ["Bluetooth Speaker Mini", 1, 1299, 8, true],
    ["USB-C Fast Charger 65W", 1, 899, 52, false],
    ["Smart Watch Series 4", 1, 3999, 0, true],
    ["Mechanical Keyboard", 1, 2199, 15, false],
    ["Premium Jasmine Rice 5kg", 2, 389, 120, false],
    ["Instant Coffee 3-in-1 (30s)", 2, 169, 7, false],
    ["Extra Virgin Olive Oil 500ml", 2, 549, 25, true],
    ["Whole Wheat Bread Loaf", 2, 95, 4, false],
    ["Air Fryer 4L", 3, 3299, 12, true],
    ["Non-stick Pan 28cm", 3, 749, 3, false],
    ["Rice Cooker 1.8L", 3, 1899, 0, false],
    ["Electric Kettle 1.7L", 3, 899, 28, false],
    ["Vitamin C Serum 30ml", 4, 699, 41, true],
    ["Sunscreen SPF50 100ml", 4, 449, 9, false],
    ["Shampoo Anti-Dandruff 340ml", 4, 219, 66, false],
    ["Classic White Sneakers", 5, 1799, 18, true],
    ["Canvas Tote Bag", 5, 349, 45, false],
    ["Denim Jacket", 5, 1599, 6, false],
    ["Yoga Mat 6mm", 6, 599, 30, false],
    ["Adjustable Dumbbell Set", 6, 2899, 2, true],
    ["Running Shorts", 6, 499, 0, false],
    ["Insulated Water Bottle 1L", 6, 649, 74, true],
    ["Resistance Bands (5pc)", 6, 399, 22, false],
].map(([name, categoryId, price, stock, isFeatured], i) => ({
    id: i + 1,
    name,
    categoryId,
    price,
    stock,
    isFeatured,
    imageUrl: `https://picsum.photos/seed/quickcart${i + 1}/400/300`,
}));

let products = seedProducts;

/* ------------------------------- orders ------------------------------- */

const CUSTOMER_NAMES = [
    "Maria Santos", "Juan Dela Cruz", "Angela Reyes", "Mark Villanueva", "Katrina Lim",
    "Paolo Garcia", "Bianca Ramos", "Carlo Mendoza", "Sofia Aquino", "Rafael Cruz",
    "Isabel Bautista", "Miguel Torres", "Nicole Flores", "Gabriel Navarro", "Patricia Castillo",
    "Enzo Domingo", "Leah Pascual", "Daniel Soriano",
];

let customers = CUSTOMER_NAMES.map((name, i) => ({
    id: i + 1,
    name,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`,
    phone: `+63 9${between(10, 99)} ${between(100, 999)} ${between(1000, 9999)}`,
    joinedAt: daysAgo(i < 4 ? between(0, 6) : between(8, 240)).toISOString(),
    isActive: true,
}));

const PAYMENT_METHODS = ["Cash on Delivery", "GCash", "Credit Card", "Bank Transfer"];

function buildOrders() {
    const list = [];
    let n = 10001;
    for (let day = 44; day >= 0; day--) {
        const count = between(2, 6) + (day < 7 ? 1 : 0);
        for (let k = 0; k < count; k++) {
            const created = daysAgo(day, between(8, 21));
            // recent orders are still in flight, older ones are settled
            let status;
            const r = rand();
            if (day <= 3) status = r < 0.4 ? "Pending" : r < 0.6 ? "Confirmed" : r < 0.8 ? "Processing" : r < 0.93 ? "Completed" : "Cancelled";
            else if (day <= 10) status = r < 0.15 ? "Processing" : r < 0.85 ? "Completed" : "Cancelled";
            else status = r < 0.9 ? "Completed" : "Cancelled";

            const items = Array.from({ length: between(1, 3) }, () => {
                const p = pick(products);
                return { productId: p.id, name: p.name, price: p.price, quantity: between(1, 3) };
            });
            const total = items.reduce((s, i) => s + i.price * i.quantity, 0) + 99; // flat shipping
            const method = pick(PAYMENT_METHODS);
            let paymentStatus = "Paid";
            if (status === "Pending") paymentStatus = method === "Cash on Delivery" ? "Pending" : rand() < 0.5 ? "Pending" : "Paid";
            if (status === "Cancelled") paymentStatus = rand() < 0.5 ? "Failed" : "Pending";
            if (status === "Confirmed" || status === "Processing") paymentStatus = method === "Cash on Delivery" ? "Pending" : "Paid";
            if (status === "Completed" && rand() < 0.03) paymentStatus = "Failed";

            const customer = pick(customers);
            list.push({
                id: n,
                orderNumber: `QC-${n}`,
                date: created.toISOString(),
                customerId: customer.id,
                customerName: customer.name,
                items,
                total,
                status,
                paymentMethod: method,
                paymentStatus,
            });
            n++;
        }
    }
    return list;
}

const orders = buildOrders();

/* ----------------------------- the "me" user ----------------------------- */

let me = {
    id: 1,
    firstName: "Admin",
    lastName: "QuickCart",
    email: "admin@quickcart.test",
    phone: "+63 917 000 0000",
    role: "Admin",
};

/* ------------------------------ helpers ------------------------------ */

const inRange = (iso, from, to) => {
    const d = iso.slice(0, 10);
    return (!from || d >= from) && (!to || d <= to);
};
const sum = (arr, fn) => arr.reduce((s, x) => s + fn(x), 0);

function revenueBetween(fromDaysAgo, toDaysAgo) {
    const from = isoDay(daysAgo(fromDaysAgo));
    const to = isoDay(daysAgo(toDaysAgo));
    return sum(orders.filter((o) => o.paymentStatus === "Paid" && inRange(o.date, from, to)), (o) => o.total);
}

// shape the Deals page reads: { id, name, price, stock, imageUrl, isFeatured }
const toDealItem = ({ id, name, price, stock, imageUrl, isFeatured }) => ({ id, name, price, stock, imageUrl, isFeatured });

/* ------------------------------- the API ------------------------------- */

export const mockAdminApi = {
    dashboard: () => {
        const now = Date.now();
        const pending = orders.filter((o) => o.status === "Pending");
        const stale = pending.filter((o) => now - new Date(o.date).getTime() > 24 * 3600 * 1000);

        const ordersByDay = Array.from({ length: 7 }, (_, i) => {
            const date = isoDay(daysAgo(6 - i));
            return { date, count: orders.filter((o) => o.date.slice(0, 10) === date).length };
        });

        const ordersByStatus = {};
        for (const s of ["Pending", "Confirmed", "Processing", "Completed", "Cancelled"]) {
            ordersByStatus[s] = orders.filter((o) => o.status === s).length;
        }

        const rev30 = revenueBetween(29, 0);
        const prev30 = revenueBetween(59, 30);
        const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;

        return wait({
            pendingOrders: pending.length,
            staleOrders: stale.length,
            revenue30d: rev30,
            revenueChangePct: prev30 > 0 ? ((rev30 - prev30) / prev30) * 100 : null,
            lowStockCount: products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD).length,
            newCustomers7d: customers.filter((c) => new Date(c.joinedAt).getTime() >= sevenDaysAgo).length,
            totalCustomers: customers.length,
            ordersByDay,
            ordersByStatus,
            recentOrders: [...orders]
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 6)
                .map(({ id, orderNumber, customerName, total, status }) => ({ id, orderNumber, customerName, total, status })),
            restock: [...products]
                .filter((p) => p.stock <= LOW_STOCK_THRESHOLD)
                .sort((a, b) => a.stock - b.stock)
                .slice(0, 5)
                .map(({ id, name, stock }) => ({ id, name, stock })),
        });
    },

    /* ---- categories ---- */
    categories: (params = {}) => {
        const q = (params.search ?? "").toLowerCase();
        const list = categories
            .filter((c) => c.name.toLowerCase().includes(q))
            .map((c) => ({ ...c, productCount: products.filter((p) => p.categoryId === c.id).length }));
        return wait(paginate(list, params.page, params.pageSize ?? 10));
    },
    createCategory: (body) => {
        if (!body?.name?.trim()) return fail("Name is required.");
        if (categories.some((c) => c.name.toLowerCase() === body.name.trim().toLowerCase())) return fail("Category already exists.");
        const created = { id: nextCategoryId++, name: body.name.trim(), description: body.description ?? "" };
        categories = [...categories, created];
        return wait({ ...created, productCount: 0 });
    },
    updateCategory: ({ id, ...body }) => {
        const existing = categories.find((c) => c.id === Number(id));
        if (!existing) return fail("Category not found.", 404);
        Object.assign(existing, body);
        return wait({ ...existing, productCount: products.filter((p) => p.categoryId === existing.id).length });
    },
    deleteCategory: (id) => {
        const cid = Number(id);
        if (products.some((p) => p.categoryId === cid)) return fail("Cannot delete a category that still has products.");
        categories = categories.filter((c) => c.id !== cid);
        return wait(null);
    },

    /* ---- inventory ---- */
    inventory: ({ search, filter = "all", page = 1, pageSize = 10 } = {}) => {
        const q = (search ?? "").toLowerCase();
        let list = products.filter((p) => p.name.toLowerCase().includes(q));
        if (filter === "low") list = list.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD);
        if (filter === "out") list = list.filter((p) => p.stock <= 0);

        const pageData = paginate(
            list.map((p) => ({ id: p.id, name: p.name, categoryName: categoryName(p.categoryId), stock: p.stock })),
            page,
            pageSize,
        );
        return wait({
            items: pageData.items,
            page: pageData.page,
            pageSize: pageData.pageSize,
            totalResults: pageData.totalResults,
            lowStockThreshold: LOW_STOCK_THRESHOLD,
            summary: {
                totalUnits: sum(products, (p) => p.stock),
                lowCount: products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length,
                outCount: products.filter((p) => p.stock <= 0).length,
            },
        });
    },
    adjustStock: ({ productId, delta }) => {
        const p = products.find((x) => x.id === Number(productId));
        if (!p) return fail("Product not found.", 404);
        if (p.stock + delta < 0) return fail("Stock cannot go below zero.");
        p.stock += delta;
        return wait({ id: p.id, stock: p.stock });
    },

    /* ---- customers ---- */
    customers: ({ search, page = 1, pageSize = 10 } = {}) => {
        const q = (search ?? "").toLowerCase();
        const list = customers
            .filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
            .map((c) => {
                const mine = orders.filter((o) => o.customerId === c.id);
                return {
                    ...c,
                    orderCount: mine.length,
                    totalSpent: sum(mine.filter((o) => o.paymentStatus === "Paid"), (o) => o.total),
                };
            });
        return wait(paginate(list, page, pageSize));
    },
    customer: (id) => {
        const c = customers.find((x) => x.id === Number(id));
        if (!c) return fail("Customer not found.", 404);
        const mine = orders
            .filter((o) => o.customerId === c.id)
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(({ id, orderNumber, date, total, status, paymentStatus }) => ({ id, orderNumber, date, total, status, paymentStatus }));
        return wait({
            ...c,
            orderCount: mine.length,
            totalSpent: sum(mine.filter((o) => o.paymentStatus === "Paid"), (o) => o.total),
            orders: mine,
        });
    },

    /* ---- deals ---- */
    featured: () => {
        const items = products.filter((p) => p.isFeatured).map(toDealItem);
        return wait({ items, totalResults: items.length });
    },
    searchProducts: (q) => {
        const term = (q ?? "").toLowerCase();
        const items = products.filter((p) => p.name.toLowerCase().includes(term)).slice(0, 8).map(toDealItem);
        return wait({ items, totalResults: items.length });
    },
    setFeatured: ({ id, isFeatured }) => {
        const p = products.find((x) => x.id === Number(id));
        if (!p) return fail("Product not found.", 404);
        if (isFeatured && !p.isFeatured && products.filter((x) => x.isFeatured).length >= MAX_FEATURED) {
            return fail(`Only ${MAX_FEATURED} products can be featured.`);
        }
        p.isFeatured = Boolean(isFeatured);
        return wait(toDealItem(p));
    },

    /* ---- reports ---- */
    salesReport: ({ from, to, page = 1, pageSize = 10 } = {}) => {
        const scoped = orders.filter((o) => inRange(o.date, from, to));
        const paid = scoped.filter((o) => o.paymentStatus === "Paid");

        // one bar per day in range (zeros included), capped at 90 days
        const revenueByDay = [];
        if (from && to && from <= to) {
            const cursor = new Date(from);
            const end = new Date(to);
            while (cursor <= end && revenueByDay.length < 90) {
                const date = isoDay(cursor);
                revenueByDay.push({
                    date,
                    revenue: sum(paid.filter((o) => o.date.slice(0, 10) === date), (o) => o.total),
                });
                cursor.setDate(cursor.getDate() + 1);
            }
        }

        const sold = new Map();
        for (const o of scoped.filter((x) => x.status !== "Cancelled")) {
            for (const i of o.items) {
                const cur = sold.get(i.productId) ?? { productId: i.productId, name: i.name, quantity: 0 };
                cur.quantity += i.quantity;
                sold.set(i.productId, cur);
            }
        }

        const sorted = [...scoped].sort((a, b) => b.date.localeCompare(a.date));
        const pageData = paginate(
            sorted.map((o) => ({
                date: o.date,
                orderNumber: o.orderNumber,
                paymentMethod: o.paymentMethod,
                paymentStatus: o.paymentStatus,
                total: o.total,
            })),
            page,
            pageSize,
        );

        return wait({
            summary: {
                paidRevenue: sum(paid, (o) => o.total),
                orders: scoped.length,
                averageOrder: paid.length ? Math.round(sum(paid, (o) => o.total) / paid.length) : 0,
                cancelled: scoped.filter((o) => o.status === "Cancelled").length,
            },
            revenueByDay,
            topProducts: [...sold.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 5),
            transactions: pageData.items,
            page: pageData.page,
            pageSize: pageData.pageSize,
            totalResults: pageData.totalResults,
        });
    },

    /* ---- account ---- */
    me: () => wait(me),
    updateMe: (body) => {
        me = { ...me, ...body };
        return wait(me);
    },
    changePassword: ({ currentPassword, newPassword } = {}) => {
        if (!newPassword || newPassword.length < 8) return fail("New password must be at least 8 characters.");
        if (currentPassword === newPassword) return fail("New password must be different from the current one.");
        return wait({ message: "Password updated." });
    },
};
