import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'pcs-product-card-carousel',
    templateUrl: './product-card-carousel.component.html',
    styleUrls: ['./product-card-carousel.component.scss'],
})
export class ProductCardCarouselComponent implements AfterViewInit {
    @Input() title!: string;
    @Input() products: Product[] = [];

    @ViewChild('cards') cards!: ElementRef<HTMLDivElement>;
    @ViewChild('beforeArrow') beforeArrow!: MatButton;
    @ViewChild('nextArrow') nextArrow!: MatButton;

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.disableArrowsIfNeeded();
        this.changeDetector.detectChanges();
    }

    scrollLeft(cards: HTMLDivElement) {
        cards.scrollLeft = cards.scrollLeft - cards.offsetWidth * 0.5;
    }

    scrollRight(cards: HTMLDivElement) {
        cards.scrollLeft = cards.scrollLeft + cards.offsetWidth * 0.5;
    }

    disableArrowsIfNeeded() {
        if (this.cards.nativeElement.scrollLeft <= 0) {
            this.beforeArrow.disabled = true;
            this.nextArrow.disabled = false;
            return;
        }
        if (
            this.cards.nativeElement.scrollLeft >=
            this.cards.nativeElement.scrollWidth -
                this.cards.nativeElement.offsetWidth
        ) {
            this.beforeArrow.disabled = false;
            this.nextArrow.disabled = true;
            return;
        }

        this.beforeArrow.disabled = false;
        this.nextArrow.disabled = false;
    }
}
