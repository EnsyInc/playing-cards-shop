import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'pcs-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    products: Product[] = [
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 1',
            price: 50.12,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 2',
            price: 26.02,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 3',
            price: 50.12,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 4',
            price: 26.02,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 5',
            price: 50.12,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 6',
            price: 26.02,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 7',
            price: 50.12,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 8',
            price: 26.02,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 9',
            price: 50.12,
            producer: 'Bicycle',
        },
        {
            description: 'asdasda',
            imageUrl: 'adasdas',
            name: 'Deck of cards 10',
            price: 26.02,
            producer: 'Bicycle',
        },
    ];
}
