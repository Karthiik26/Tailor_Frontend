import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../service/address.service';
import { ClothService } from '../service/Admin/cloth.service';
import { OrdersService } from '../service/Orders-Admin/orders.service';

@Component({
  selector: 'app-successfullpayment',
  templateUrl: './successfullpayment.component.html',
  styleUrls: ['./successfullpayment.component.css']
})
export class SuccessfullpaymentComponent {

  constructor(private router : Router,private service: AddressService, private cloth : ClothService, private orderservice : OrdersService ){}

  Redirecttodesign() {
    this.GettingOrdersDetails();
    this.router.navigate(['Design']);
  }
  
  Data1:any;
  Data2:any;
  ngOnInit(){
    this.FetchingUsersDetails();
    this.Data1 = this.cloth.GetData();
    this.Data2 = this.cloth.GetData2();
    // setTimeout(() => {
    //   this.router.navigate(['/']);
    //   this.GettingOrdersDetails();
    // }, 5000);
  }

  FetchingUsersDetails() {
    if (localStorage.getItem('isLoggedIn')) {
      let user = localStorage.getItem('isLoggedIn');
      let data = user && JSON.parse(user)._id;
      this.service.FetchingData(data).subscribe({
        next: (value: any) => {
          console.log(value.OrderConfirmation);
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }

  GettingOrdersDetails(){
    let user = localStorage.getItem('AdminLoggin');
     let data = user && JSON.parse(user)._id;
   this.orderservice.GettingOrderDetails(data).subscribe((res)=>{
     console.log(res);
   });
 }


}
