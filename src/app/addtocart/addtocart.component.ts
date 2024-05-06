import { Component, Input } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';
import { BehaviorSubject } from 'rxjs';
import { data } from 'jquery';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent {

  constructor(private Clothservice: ClothService) { }

  async RemoveToCart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1400,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast',
      }
    });

    await Toast.fire({
      icon: 'error',
      title: 'One Item Removed From Your '
    });
  }
  @Input() item = 0;

  CartItems: any[] = [];
  CartLength: number = 0;
  clothnumber: any = 0;
  totalItems: any;
  DisplayHideShow: boolean = false;
  DisplayHideShow2: boolean = true;
  ngOnInit() {
    this.GettingClothItems();
    this.GettingTotalPrice();
    let get = localStorage.getItem('isLoggedIn');
    this.UserId = get && JSON.parse(get)._id;
  }
  UserId: any;
  TotalAmount: any
  private cartCountSubject = new BehaviorSubject<number>(0);

  Totalqantity: any;
  price: any;

  getImageSource(imageData: any): string {
    if (imageData && imageData.data) {
      return `data:${imageData.contentType};base64,${imageData.data}`;
    }
    return '';
  }

  ParticularClothId: any;
  GettingTotal: any;
  addingquantity(formData: any, ClothId: any) {
    let get = localStorage.getItem('isLoggedIn');
    let UserId = get && JSON.parse(get)._id;
    this.UserId = UserId;
    this.ParticularClothId = data;
    this.Clothservice.UpdatingQuantity(UserId, ClothId, formData).subscribe({
      next: (value) => {
        console.log(value);
        this.GettingClothItems();
      },
      error: (err) => {
        console.log("Quantity err", err);
        this.GettingClothItems();
        this.GettingTotalPrice();
      },
    });
  }

  GettingTotalPrice() {
    this.Clothservice.UpdatingPrice().subscribe({
      next: (res) => {
        console.log("Price value", res);
        this.GettingTotal = res.TotalPriceOfCart;
      }, error: (err) => {
        console.log("price err", err);
      },
    })
  }
  ClothPrice: any;
  ClothQuantity: any;
  ArayClothId: any;
  ProductVal: any;
  GettingClothItems() {
    let data = localStorage.getItem('isLoggedIn');
    let userid = data && JSON.parse(data)._id;
    this.Clothservice.FetchingCart(userid).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.CartItems = res;
          console.log("Array Items", this.CartItems);
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            this.ClothPrice = element.ClothPrice;
            this.ClothQuantity = element.ClothQuantity;
            this.ArayClothId = element.ClothId;
          }
          this.ProductVal = { ClothPrice: this.ClothPrice, ClothQuantityUser: this.ClothQuantity }
          console.log(res.length);
          this.clothnumber = res.length;
          if (this.clothnumber >= 1) {
            this.DisplayHideShow = true;
            this.DisplayHideShow2 = false;
            this.clothnumber = res.length;
          } else {
            setTimeout(() => {
              this.DisplayHideShow = false;
              this.DisplayHideShow2 = true;
            }, 1500);
            this.clothnumber = res.length;
          }
        },
        error: (err) => {
          console.log(err);
        },
      }
    )
  }

  increaseValue(data: any) {
    if (data.ClothQuantityUser < data.ClothQuantities) {
      data.ClothQuantityUser++;
    }
  }

  decreaseValue(data: any) {
    if (data.ClothQuantityUser > 1) {
      data.ClothQuantityUser--;
    }
  }

  RemoveCartItem(ClothId: String) {
    console.log(ClothId);
    let data = localStorage.getItem('isLoggedIn');
    let userid = data && JSON.parse(data)._id;

    this.Clothservice.RemovingClothItem(userid, { ClothId }).subscribe({
      next: (value) => {
        console.log(value);
        if (value) {
          this.RemoveToCart();
          this.GettingClothItems();
        }
        this.GettingClothItems();
        this.GettingTotalPrice();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  Returning: any;
  ReturningOutput(Data: any) {
    return Data.ClothPrice * Data.ClothQuantityUser;
  }

  totalPrice: any;
  calculateTotal(data: any) {
    this.totalPrice = this.ReturningOutput(data);
  }


  // Assuming this.CartItems is the array containing the data
  calculateSubtotal(): number {
    return this.CartItems.reduce((acc, item) => acc + (item.ClothPrice * item.ClothQuantityUser), 0);
  }

  calculateSalesTax(subtotal: number, taxRate: number): number {
    return subtotal * (taxRate / 100); // Assuming taxRate is in percentage
  }

  calculateGrandTotal(subtotal: number, salesTax: number): number {
    return subtotal + salesTax;
  }



}
