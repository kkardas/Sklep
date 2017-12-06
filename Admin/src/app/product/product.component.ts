import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from "../product.service";
import {DiscountService} from "../discount.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  products: Array<Product>;
  productToAdd: Product;
  zdj: string;

  constructor(private productService: ProductService,
              public discountService: DiscountService) {
    this.products = new Array<Product>();
    this.productToAdd = new Product('', '', 0, '', new Array<string>(), '');
    this.zdj = '';
  }

  ngOnInit() {
    this.getProducts();
  }

  public updateInDatabase(product: Product) {
    this.productService.updateInDatabase(product)
      .subscribe();
  }

  public deleteFromDatabase(id: string) {
    this.productService.deleteFromDatabase(id)
      .subscribe(product => this.handleSuccess());
  }

  public addToDatabase() {
    this.productToAdd.zdjecie = this.zdj.split(' ');
    this.productService.addToDatabase(this.productToAdd)
      .subscribe(product => this.handleSuccess());
    this.productToAdd = new Product('', '', 0, '', new Array<string>(), '');
    this.zdj = '';
  }

  private handleSuccess() {
    this.getProducts();
  }

  public addToDiscount(id: string) {
    this.discountService.addToDiscount(id);
  }

  public addPromotion() {
    this.discountService.addPromotion()
      .subscribe();
  }

  public getProducts() {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }
}
