export interface Product {
    name: string;
    imageUrl: string;
    price: number;
    variants?: string[];
    description: string;
    producer: string;
}
