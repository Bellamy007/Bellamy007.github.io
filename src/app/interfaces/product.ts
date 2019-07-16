export interface Product {
    productId: number;
    description: string;
    sku: string;
    unitPrice: number;
    amount?: number;
    productFinalPrice?: number;
}
