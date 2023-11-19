import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ReceiptComponent } from '../receipt/receipt.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('receipt', { static: false }) receipt!: ReceiptComponent;
  receiptModel: receiptModel = new receiptModel();
  productlist: any = [];
  selectedProductList: any = [];
  grandTotal = 0;
  itemTotal = 0;
  value: any = 0;
  vatTax: any = 0;
  discount: any = 0;
  vatTaxTotal = 0;
  discountTotal = 0;
  finalTotal = 0;

  constructor(private service: CommonService) { }

  ngOnInit(): void {
    this.service.getData().subscribe(res => {
      this.productlist = res;
    })
  }

  selectProduct(product: any) {
    this.service.getProducts().subscribe(res => {
      this.selectedProductList = res;
      this.grandTotal = this.service.getTotalPrice().total;
      this.itemTotal = this.service.getTotalPrice().itemTotal;
    })
    this.service.addtoCart(product);
  }

  handleMinus(item: any) {
    if (item.quantity == 1) {
      item.quantity = 1;
    } else {
      item.quantity--;
    }
    this.grandTotal = this.service.getTotalPrice().total;
    this.itemTotal = this.service.getTotalPrice().itemTotal;
    this.vatTaxTotal = (Number(this.vatTax) / 100) * this.grandTotal;
    this.discountTotal = (Number(this.discount) / 100) * this.grandTotal;
    return item.quantity
  }

  handlePlus(item: any) {
    // this.service.getTotalPrice();
    item.quantity++;
    this.grandTotal = this.service.getTotalPrice().total;
    this.itemTotal = this.service.getTotalPrice().itemTotal;
    this.vatTaxTotal = (Number(this.vatTax) / 100) * this.grandTotal;
    this.discountTotal = (Number(this.discount) / 100) * this.grandTotal;
    return item.quantity
  }

  vatTaxfunction() {
    this.vatTaxTotal = (Number(this.vatTax) / 100) * this.grandTotal;
  }

  discountfunction() {
    this.discountTotal = (Number(this.discount) / 100) * this.grandTotal;
  }

  removeItem(item: any) {
    this.service.removeCartItem(item);
  }

  emptycart() {
    this.vatTax = 0;
    this.discount = 0
    this.discountTotal = 0;
    this.vatTaxTotal = 0;
    this.service.removeAllCart();
  }

  openModal() {
    this.receiptModel.totalitem = this.itemTotal;
    this.receiptModel.total = this.grandTotal + this.vatTaxTotal + this.discountTotal;
    this.receiptModel.vat = this.vatTax;
    this.receiptModel.discount = this.discount;
    setTimeout(() => {
      this.receipt.open(this.receiptModel, this.selectedProductList);
    }, 100);
  }

  clearData() {
    this.vatTax = 0;
    this.discount = 0
    this.discountTotal = 0;
    this.vatTaxTotal = 0;
    this.service.removeAllCart();
  }
}

export class receiptModel {
  "list": any;
  "totalitem": any;
  "total": any;
  "vat": any;
  "discount": any;
}