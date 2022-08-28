import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'pcs-product-card-carousel',
    templateUrl: './product-card-carousel.component.html',
    styleUrls: ['./product-card-carousel.component.scss'],
})
export class ProductCardCarouselComponent {
    @Input() title!: string;
    @Input() products: Product[] = [];

    scrollLeft(cards: HTMLDivElement) {
        cards.scrollLeft = cards.scrollLeft - cards.offsetWidth * 0.5;
    }

    scrollRight(cards: HTMLDivElement) {
        cards.scrollLeft = cards.scrollLeft + cards.offsetWidth * 0.5;
    }

    disableArrowsIfNeeded(
        cards: HTMLDivElement,
        before: MatButton,
        after: MatButton
    ) {
        if (cards.scrollLeft <= 0) {
            before.disabled = true;
            after.disabled = false;
            return;
        }
        if (cards.scrollLeft >= cards.scrollWidth - cards.offsetWidth) {
            before.disabled = false;
            after.disabled = true;
            return;
        }

        before.disabled = false;
        after.disabled = false;
    }
}
