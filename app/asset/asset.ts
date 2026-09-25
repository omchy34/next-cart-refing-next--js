// app/asset/asset.ts

export interface UserInfo {
    name: string;
    image: string;
}

export interface StoreInfo {
    id: string;
    userId: string;
    name: string;
    description: string;
    username: string;
    address: string;
    status: string;
    isActive: boolean;
    logo: string;
    email: string;
    contact: string;
    createdAt: string;
    updatedAt: string;
    user: UserInfo;
}

export interface Rating {
    id: string;
    rating: number;
    review: string;
    user: UserInfo;
    productId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    mrp: number;
    price: number;
    images: string[];
    category: string;
    storeId: string;
    inStock: boolean;
    store: StoreInfo;
    rating: Rating[];
    createdAt: string;
    updatedAt: string;
}

// ---- Avatars (reviewers) ----
const profile_pic1 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format'
const profile_pic2 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format'
const profile_pic3 = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format'

// ---- Store ----
export const dummyStoreData: StoreInfo = {
    id: 'store_1',
    userId: 'user_1',
    name: 'Happy Shop',
    description: "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
    username: 'happyshop',
    address: '3rd Floor, Happy Shop, New Building, 123 street, c sector, NY, US',
    status: 'approved',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&q=80&auto=format',
    email: 'happyshop@example.com',
    contact: '+0 1234567890',
    createdAt: '2025-09-04T09:04:16.189Z',
    updatedAt: '2025-09-04T09:04:44.273Z',
    user: {
        name: 'Great Stack',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format',
    },
}

// ---- Ratings ----
export const dummyRatingsData: Rating[] = [
    { id: 'rat_1', rating: 5, review: 'Turned out even better than I imagined. Quality feels premium and easy to use.', user: { name: 'Kristin Watson', image: profile_pic1 }, productId: 'prod_1', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_2', rating: 5, review: 'Loved it! Made my day-to-day so much easier.', user: { name: 'Jenny Wilson', image: profile_pic2 }, productId: 'prod_1', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_3', rating: 4, review: 'Great build quality, works exactly as described.', user: { name: 'Bessie Cooper', image: profile_pic3 }, productId: 'prod_2', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_4', rating: 5, review: 'Super simple setup, sound quality is amazing.', user: { name: 'Kristin Watson', image: profile_pic1 }, productId: 'prod_2', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_5', rating: 4, review: 'Battery lasts long, comfortable to wear all day.', user: { name: 'Jenny Wilson', image: profile_pic2 }, productId: 'prod_3', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_6', rating: 5, review: 'Best purchase this year, highly recommend.', user: { name: 'Bessie Cooper', image: profile_pic3 }, productId: 'prod_4', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_7', rating: 4, review: 'Good value for the price, does the job well.', user: { name: 'Kristin Watson', image: profile_pic1 }, productId: 'prod_5', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
    { id: 'rat_8', rating: 5, review: 'Compact and powerful, exceeded expectations.', user: { name: 'Jenny Wilson', image: profile_pic2 }, productId: 'prod_6', createdAt: '2025-07-19T09:21:25.000Z', updatedAt: '2025-07-19T09:21:25.000Z' },
]

// ---- Products ----
export const dummyProducts: Product[] = [
    {
        id: 'prod_1',
        name: 'Modern table lamp',
        description: "Modern table lamp with a sleek design. Perfect for any room, made of high-quality materials, comes with a lifetime warranty.",
        mrp: 40,
        price: 29,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80&auto=format'],
        category: 'Decoration',
        storeId: 'store_1',
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData.filter(r => r.productId === 'prod_1'),
        createdAt: '2026-09-10T00:00:00.000Z',
        updatedAt: '2026-09-10T00:00:00.000Z',
    },
    {
        id: 'prod_2',
        name: 'Smart speaker gray',
        description: 'Compact smart speaker with rich, room-filling sound and voice assistant support.',
        mrp: 39,
        price: 29,
        images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80&auto=format'],
        category: 'Electronics',
        storeId: 'store_1',
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData.filter(r => r.productId === 'prod_2'),
        createdAt: '2026-09-09T00:00:00.000Z',
        updatedAt: '2026-09-09T00:00:00.000Z',
    },
    {
        id: 'prod_3',
        name: 'Smart watch white',
        description: 'Track your fitness, notifications, and more with this sleek smartwatch.',
        mrp: 45,
        price: 29,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80&auto=format'],
        category: 'Electronics',
        storeId: 'store_1',
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData.filter(r => r.productId === 'prod_3'),
        createdAt: '2026-09-08T00:00:00.000Z',
        updatedAt: '2026-09-08T00:00:00.000Z',
    },
    {
        id: 'prod_4',
        name: 'Wireless headphones',
        description: '50 hours of playtime, crystal-clear sound with active noise cancellation.',
        mrp: 42,
        price: 29,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&auto=format'],
        category: 'Electronics',
        storeId: 'store_1',
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData.filter(r => r.productId === 'prod_4'),
        createdAt: '2026-09-07T00:00:00.000Z',
        updatedAt: '2026-09-07T00:00:00.000Z',
    },
    {
        id: 'prod_5',
        name: 'Wireless earbuds',
        description: 'Compact true wireless earbuds with deep bass and quick charging.',
        mrp: 34,
        price: 24,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80&auto=format'],
        category: 'Electronics',
        storeId: 'store_1',
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData.filter(r => r.productId === 'prod_5'),
        createdAt: '2026-09-06T00:00:00.000Z',
        updatedAt: '2026-09-06T00:00:00.000Z',
    },
    {
        id: 'prod_6',
        name: 'Bluetooth speaker mini',
        description: 'Portable mini speaker, perfect for on-the-go listening with long battery life.',
        mrp: 25,
        price: 19,
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80&auto=format'],
        category: 'Electronics',
        storeId: 'store_1',
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData.filter(r => r.productId === 'prod_6'),
        createdAt: '2026-09-05T00:00:00.000Z',
        updatedAt: '2026-09-05T00:00:00.000Z',
    },
]