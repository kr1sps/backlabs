import type {Product, Category, PaginatedResponse, ProductFilter} from '../../../shared/types'
import {filterProducts, sortProducts, paginateProducts, SortOption} from '../logic/productFilters'

// Генерируем моковые категории
const mockCategories: Category[] = [
    {
        id: 'cat1',
        name: 'Ноутбуки',
        description: 'Портативные компьютеры',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'cat2',
        name: 'Смартфоны',
        description: 'Мобильные телефоны',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'cat3',
        name: 'Аксессуары',
        description: 'Чехлы, наушники, зарядки',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

// Генерируем моковые товары
const mockProducts: Product[] = [
    {
        id: 'prod1',
        name: 'Ноутбук Acer Aspire 5',
        description: 'Ноутбук с процессором Intel Core i5, 8 ГБ ОЗУ, SSD 512 ГБ',
        price: 54990,
        stock: 15,
        categoryId: 'cat1',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'ACER-ASP5-001',
        isActive: true,
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString(),
    },
    {
        id: 'prod2',
        name: 'MacBook Air 13"',
        description: 'Apple M1, 8 ГБ ОЗУ, SSD 256 ГБ',
        price: 89990,
        stock: 8,
        categoryId: 'cat1',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'APPLE-MBA-001',
        isActive: true,
        createdAt: new Date('2024-01-10').toISOString(),
        updatedAt: new Date('2024-01-10').toISOString(),
    },
    {
        id: 'prod3',
        name: 'Смартфон Samsung Galaxy S23',
        description: 'Флагманский смартфон с отличной камерой',
        price: 74990,
        stock: 22,
        categoryId: 'cat2',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'SAMS-S23-001',
        isActive: true,
        createdAt: new Date('2024-02-01').toISOString(),
        updatedAt: new Date('2024-02-01').toISOString(),
    },
    {
        id: 'prod4',
        name: 'iPhone 15 Pro',
        description: 'Apple A17 Pro, 256 ГБ',
        price: 124990,
        stock: 5,
        categoryId: 'cat2',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'APPLE-IP15P-001',
        isActive: true,
        createdAt: new Date('2024-02-15').toISOString(),
        updatedAt: new Date('2024-02-15').toISOString(),
    },
    {
        id: 'prod5',
        name: 'Наушники Sony WH-1000XM5',
        description: 'Беспроводные наушники с шумоподавлением',
        price: 32990,
        stock: 30,
        categoryId: 'cat3',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'SONY-WHXM5-001',
        isActive: true,
        createdAt: new Date('2024-01-20').toISOString(),
        updatedAt: new Date('2024-01-20').toISOString(),
    },
    {
        id: 'prod6',
        name: 'Чехол для iPhone 15 Pro',
        description: 'Силиконовый чехол MagSafe',
        price: 3990,
        stock: 100,
        categoryId: 'cat3',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'CASE-IP15-001',
        isActive: true,
        createdAt: new Date('2024-02-10').toISOString(),
        updatedAt: new Date('2024-02-10').toISOString(),
    },
    {
        id: 'prod7',
        name: 'Ноутбук Lenovo ThinkPad X1',
        description: 'Бизнес-ноутбук с Intel Core i7',
        price: 119990,
        stock: 0,
        categoryId: 'cat1',
        imageUrls: ['https://via.placeholder.com/300'],
        sku: 'LENOVO-TPX1-001',
        isActive: true,
        createdAt: new Date('2024-01-05').toISOString(),
        updatedAt: new Date('2024-01-05').toISOString(),
    },
]

class MockProductService {
    private products: Product[] = mockProducts
    private categories: Category[] = mockCategories

    async getCategories(): Promise<Category[]> {
        await this.delay(200)
        return [...this.categories]
    }

    async getProducts(
        filter?: ProductFilter,
        sort?: SortOption
    ): Promise<PaginatedResponse<Product>> {
        await this.delay(300)

        let filtered = this.products.filter(p => p.isActive)

        if (filter) {
            filtered = filterProducts(filtered, filter)
        }

        if (sort) {
            filtered = sortProducts(filtered, sort)
        }

        const page = filter?.page || 1
        const limit = filter?.limit || 12

        return paginateProducts(filtered, page, limit)
    }

    async getProductById(id: string): Promise<Product | null> {
        await this.delay(200)
        const product = this.products.find(p => p.id === id && p.isActive)
        return product || null
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export const mockProductService = new MockProductService()