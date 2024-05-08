import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../service/address.service';
import { WindowRefService } from '../PaymentService/window-ref.service';
import { HttpClient } from '@angular/common/http';
import { ClothService } from '../service/Admin/cloth.service';
import { OrdersService } from '../service/Orders-Admin/orders.service';

@Component({
  selector: 'app-checkout-products',
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.css'],
  providers: [WindowRefService]
})
export class CheckoutProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private service: AddressService,
    private clothservice: ClothService,
    private window_ref: WindowRefService,
    private http: HttpClient,
    private orderservice : OrdersService) { }

  AdressConfirm01: boolean = true;
  PaymentConfirm02: boolean = false;
  DetailConfirm03: boolean = false;
  ThankYouPage: boolean = false;
  Image:any='assets/LOGO-03/LOGO-06.png'

  ProgressSteper1() {
    // this.AdressConfirm01 = true;
    // this.PaymentConfirm02 = false;
    // this.DetailConfirm03 = false;
  }
  AddressNextBtn() {
    // this.AdressConfirm01 = false;
    // this.PaymentConfirm02 = !this.PaymentConfirm02;
  }

  FinalAddres: any;
  GettingAddressCheckout: any
  GotoPaymentOption(data: any) {
    let user = localStorage.getItem('isLoggedIn');
    let userid = user && JSON.parse(user)._id;
    this.FinalAddres = data;
    this.service.GettingParticularAddress(userid, data).subscribe({
      next: (value) => {
        console.log(value);
        this.GettingAddressCheckout = value;
        this.FetchingCartData();
        this.GettingTotalGprice();
        this.GettingDeliveryTime();
      }, error: (err) => {
        console.log(err);

      },
    })
    setTimeout(() => {
      this.DetailConfirm03 = true;
      this.AdressConfirm01 = false;

    }, 1000);
    console.log(data);

  }
  ProgressSteper2() {
    // this.AdressConfirm01 = false;
    // this.PaymentConfirm02 = true;
    // this.DetailConfirm03 = false;
  }
  confirmPayment() {
    // this.AdressConfirm01 = false;
    // this.PaymentConfirm02 = false;
    // this.DetailConfirm03 = true;
  }
  PaymentOptionprev() {
    // this.AdressConfirm01 = true;
    // this.PaymentConfirm02 = false;
    // this.DetailConfirm03 = false;
  }
  PaymentOptionnext2() {
    // this.DetailConfirm03 = true;
    // this.AdressConfirm01 = false;
    // this.PaymentConfirm02 = false;
  }
  Paymentnext() {
    // this.AdressConfirm01 = false;
    // this.PaymentConfirm02 = false;
    // this.DetailConfirm03 = true;
  }
  ProgressSteper3() {
    this.DetailConfirm03 = true;
    this.AdressConfirm01 = false;
    this.PaymentConfirm02 = false;
  }
  ConfirmOrderPrev() {
    this.AdressConfirm01 = true;
    this.PaymentConfirm02 = false;
    this.DetailConfirm03 = false;

  }

  // upi form
  PaymentDetails(upivalues: any) {
    console.log(upivalues);
  }

  shiftingtodetailpage() {
    setTimeout(() => {
      this.AdressConfirm01 = false;
      this.PaymentConfirm02 = false;
      this.DetailConfirm03 = true;
    }, 2000);
  }

  checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  checkbox4: boolean = false;
  checkbox5: boolean = false;
  atLeastOneChecked: boolean = false;

  updateButtonState() {
    this.atLeastOneChecked = this.checkbox2 || this.checkbox1 || this.checkbox3 || this.checkbox4 || this.checkbox5;
  }

  // address upadate
  AddressId: any;
  AdressUpdateForm(updateform: any) {
    console.log(updateform);
    let user = localStorage.getItem('isLoggedIn');
    let data2 = user && JSON.parse(user)._id;
    this.service.UpdatingAddress(data2, this.AddressId, updateform).subscribe(
      {
        next: (res) => {
          console.log("update address " + res);
          this.FetchingUsersDetails();
        },
        error(err) {
          console.log(err);
        },
      }
    )
  }
  Redirecting() {
    this.router.navigate(['CheckOutProduct']);
  }


  ngOnInit() {
    this.FetchingUsersDetails();
  }

  UserIdFetch: any;
  UserPhone1: any;
  Address: any;
  UserValue: any;
  UsersFirstName: any;
  UsersLastName: any;

  FetchingUsersDetails() {
    if (localStorage.getItem('isLoggedIn')) {
      let user = localStorage.getItem('isLoggedIn');
      let data = user && JSON.parse(user)._id;
      // console.log(data);
      this.UserIdFetch = data;
      this.service.FetchingData(data).subscribe({
        next: (value: any) => {
          // console.log("address"+value.Phone);
          this.Address = value.Address;
          this.UserPhone1 = value.Phone;
          this.UserValue = value.Phone;
          this.UsersFirstName = value.FirstName;
          this.UsersLastName = value.LastName;
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }

  // deleting Address
  DeleteAddress(data: any) {
    this.service.DeletingAddress(this.UserIdFetch, data).subscribe({
      next: (res) => {
        console.log("One Address Is Deleted" + res);
        this.FetchingUsersDetails();
      },
      error(err) {
        console.log(err);

      },
    })
  }

  // getting edit id data
  GettingAddres: any;
  userphone: any;
  GettingEditId(data: any) {
    this.AddressId = data;
    console.log("addres id " + data);
    this.service.GettingParticularAddress(this.UserIdFetch, data).subscribe({
      next: (res) => {
        console.log("getting address " + res);
        this.GettingAddres = res;
        this.userphone = this.UserPhone1;
      },
      error(err) {
        console.log(err);
      },
    });

  }

  FetchingCartItems: any;
  FetchingCartData() {
    let user = localStorage.getItem('isLoggedIn');
    let data = user && JSON.parse(user)._id;
    this.clothservice.FetchingCart(data).subscribe({
      next: (value) => {
        this.FetchingCartItems = value;
        // console.log(value);
      }, error: (err) => {
        console.log(err);
      },
    })
  }

  getImageSource(imageData: any): string {
    if (imageData && imageData.data) {
      return `data:${imageData.contentType};base64,${imageData.data}`;
    }
    return '';
  }

  // Getting ClothTotal
  GettingTotal: any;
  GettingTotal2: any;
  GettingTotalGprice() {
    let user = localStorage.getItem('isLoggedIn');
    let data = user && JSON.parse(user)._id;
    this.clothservice.UpdatingPrice().subscribe({
      next: (value) => {
        console.log(value);
        this.GettingTotal = value;
        this.GettingTotal2 = Math.floor(value.TotalPriceOfCart.grandTotal);
        console.log(this.GettingTotal2);

      }, error: (err) => {
        console.log(err);
      },
    })
  }

  DeliveryDate: any;
  GettingDeliveryTime() {
    this.clothservice.GettingTime().subscribe({
      next: (value: any) => {
        // console.log("date response",value.date);
        // console.log("date response",value.day);
        this.DeliveryDate = value;
        this.DeliveryDate = value;
      }, error: (err) => {
        console.log("date error", err);

      },
    });
  }

  // PaymentIntegration------------------------------------------------------------------ RAZORPAY
  orderid: any;
  createRazpayOrder() {
    this.http.post(`https://tailor-backend-hqfi.onrender.com/CreateOrder`, { amount: this.GettingTotal2 }).subscribe({
      next: (res: any) => {
        console.log("Order Response created", res.orderId);
        this.orderid = res.orderId;
      }, error(err) {
        console.log(err);
      },
    })
    this.payWithRazor(this.orderid);
  }

  paymentId: any
  payWithRazor(orderId: any) {
    const options: any = {
      key: 'rzp_test_wDVNW8y10MiLay',
      amount: this.GettingTotal2 * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'DARJEE WEB', // company name or product name
      description: 'Explore Your Fashion From Here By Online',  // product description
      image: this.Image, // company logo or product image
      order_id: orderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#CC00CC'
      }
    };

    options.handler = ((response: any, error: any) => {
      options.response = response;
      const paymentId = response.razorpay_payment_id;
      this.http.post('https://tailor-backend-hqfi.onrender.com/Success', { orderId, paymentId }).subscribe({
        next: (value: any) => {
          console.log("Suucess Response", value);
          console.log("Suucess Response", value.paymentId);
          this.PaymentPostingIntoDb(value.paymentId);
          this.paymentId = value.paymentId;
        }, error: (err) => {
          console.log("Failed Response", err);
        }
      })
    });

    options.modal.ondismiss = (() => {
      console.log('Transaction cancelled.');
      alert('Payment Cancelled')
    });
    const rzp = new this.window_ref.nativeWindow.Razorpay(options);
    rzp.open();
  }

  AdminId=`65d39b492eb8902cd2166247`;

  PaymentPostingIntoDb(PaymentId: any) {
    this.clothservice.CreatingOrder(this.FinalAddres, PaymentId, this.orderid, this.GettingTotal2).subscribe({
      next: (value: any) => {
        console.log("successfullyy Inserted In to db", value);
        this.clothservice.setGettingClothData(this.paymentId);
        this.clothservice.setGettingClothData2(this.orderid);
        this.orderservice.GettingOrderDetails(this.AdminId);
        this.router.navigate(['Thank-You']);
        this.GettingOrdersDetails();
      }, error: (err) => {
        console.log("failed to update in db", err);
      },
    });
  }

  GettingOrdersDetails(){
   this.orderservice.GettingOrderDetails(this.AdminId).subscribe((res)=>{
     console.log(res);
     this.orderservice.setGettingClothData(res);
   });
 }


 
}
