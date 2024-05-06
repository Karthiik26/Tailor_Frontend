import { Component, Input } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent {

  constructor(private clothservice: ClothService, private route: Router) { }

  @Input() item = 0;

  cssimageItem: any = false;
  ClothData: any;
  AdminId: any;
  ClothAdda: any;
  clothnumber: any;

  ngOnInit(): void {
    this.FetchingClothImageArray();
    this.FetchingClothArray();
    this.GettingClothItems();
  }

  // fetching cloth images
  FetchingClothImageArray() {
    let localstorage = localStorage.getItem('AdminLoggin');
    let AdminId = localstorage && JSON.parse(localstorage)._id;
    console.log(AdminId);
    this.AdminId = AdminId;
    this.clothservice.FetchingAllImages(AdminId).subscribe(
      {
        next: (res: any) => {
          console.log("resonspse in cloth image");
          console.log(res);
          this.ClothData = res;
        },
        error(err) {
          console.log(err);

        },
      }
    );
  }

  getImageSource(imageData: any): string {
    if (imageData && imageData.data) {
      return `data:${imageData.contentType};base64,${imageData.data}`;
    }
    return '';
  }

  FetchingClothArray() {
    this.clothservice.GettingCloth(this.AdminId).subscribe(
      {
        next: (res) => {
          console.log('Cloth Array');
          console.log(res);
          this.ClothAdda = res;
          for (let i = 0; i < this.ClothAdda.length; i++) {
            const element = this.ClothAdda[i];
          }
        },
        error: (err) => {
          console.log(err);

        },
      }
    )
  }

  GettingClothDataInProductView: any;
  GettingClothIdFromClick: any;
  GetClothId(ClothId: any) {

    this.clothservice.GettingClothDataByClothId(ClothId).subscribe({
      next: (res) => {
        console.log(res);
        console.log(ClothId);
        this.GettingClothIdFromClick = ClothId;
        this.clothservice.setGettingClothData(this.GettingClothIdFromClick);
        // this.GettingClothDataInProductView=res;
        this.route.navigate(['ProductView']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // ClothDataId:any;
  GettingId(Data: any) {
    console.log(Data);
    let val = this.clothservice.setGettingClothData(Data);
    this.route.navigate(['ProductView']);
  }

  showcart: boolean = true;
  AddtoCartBtn: boolean = false;
  AddToCartItemId: any;
  AddToCart(data: any) {
    console.log(data);
    this.AddToCartItemId = data;
    let Localdata = localStorage.getItem('isLoggedIn');
    let userid = Localdata && JSON.parse(Localdata)._id;
    this.clothservice.AddtoCart(userid, data).subscribe({
      next: (value: any) => {
        console.log('data' + value);
        console.log('Item added to cart successfully');
        if (value.status === 200 && value.message === 'Item added to cart successfully') {
          console.log('data' + value);
          console.log('Item added to cart successfully');
        }
          // Handle each error type separately
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              popup: 'colored-toast-3',
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Item added to cart successfully'
          });
          this.GettingAllCloths();
          this.GettingClothItems();
          this.GettingTotalPrice();
      },
      error: (error) => {
        if (error.status === 400 && error.error.message === 'Item already exists in the cart') {
          console.log('Item Present in cart');
          // Handle each error type separately
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              popup: 'colored-toast-3',
            }
          });
          Toast.fire({
            icon: 'info',
            title: 'Item Present in cart'
          });
          this.GettingAllCloths();
          this.GettingTotalPrice();
        }

      },
    })
  }

  Elementdata: any;

  GettingAllCloths() {
    let data = localStorage.getItem('isLoggedIn');
    let userid = data && JSON.parse(data)._id;
    this.clothservice.FetchingCart(userid).subscribe(
      {
        next: (res: any) => {
          console.log('response cloths', res);
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            console.log(element.ClothId);
            this.Elementdata = element.ClothId;
          }
          if (this.Elementdata == this.AddToCartItemId) {
            // this.AddtoCartBtn = true;
            this.showcart = true;
          }

        },
        error: (err) => {
          console.log(err);

        },
      }
    )
  }

  // UpdatingPrice
  GettingTotalPrice() {
    this.clothservice.UpdatingPrice().subscribe({
      next: (res) => {
        console.log("Price value", res);
      }, error: (err) => {
        console.log("price err", err);
      },
    })
  }

  ClothIdsss: any;
  GettingClothItems() {
    let data = localStorage.getItem('isLoggedIn');
    let userid = data && JSON.parse(data)._id;
    this.clothservice.FetchingCart(userid).subscribe(
      {
        next: (res: any) => {
          this.ClothIdsss = res.ClothId;
          console.log(res.length);
          this.clothnumber = res.length;

        },
        error: (err) => {
          console.log(err);

        },
      }
    )
  }


}
