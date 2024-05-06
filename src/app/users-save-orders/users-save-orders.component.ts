import { Component } from '@angular/core';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-users-save-orders',
  templateUrl: './users-save-orders.component.html',
  styleUrls: ['./users-save-orders.component.css']
})
export class UsersSaveOrdersComponent {

  constructor(private addressservice : AddressService){}

  GettingOrders:any;
  ngOnInit(){
    this.FetchingUsersDetails();
  }

  HideShow1:boolean=false;
  HideShow2:boolean=true;

  FetchingUsersDetails() {
    if (localStorage.getItem('isLoggedIn')) {
      let user = localStorage.getItem('isLoggedIn');
      let data = user && JSON.parse(user)._id;
      this.addressservice.FetchingData(data).subscribe({
        next: (value: any) => {
          console.log(value.OrderConfirmation);
          this.GettingOrders=value.OrderConfirmation;
          if (value.OrderConfirmation.length) {
            console.log(value.OrderConfirmation.length>=1);
            this.HideShow1=true;
            this.HideShow2=false;
          }else {
            this.HideShow1=false;
            this.HideShow2=true;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
