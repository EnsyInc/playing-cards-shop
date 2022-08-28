import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'pcs-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    product: Product = {
        description: 'asdasda',
        imageUrl: 'adasdas',
        name: 'Deck of cards 1',
        price: 50.12,
        producer: 'Bicycle',
    };
}
