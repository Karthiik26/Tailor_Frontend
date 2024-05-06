import { Component } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from "@angular/router";
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent {

  constructor(
    private service: CommonService,
    private router: Router,
    private service2: AddressService,
  ) { }

  values: any;
  responseData: any;
  city: any;
  state: any;

  fetchDataOnInput(data: any) {
    this.service.getData(data).subscribe((res) => {
      this.values = data;
      this.responseData = res;

      if (this.responseData && this.responseData.length > 0) {
        this.city = this.responseData[0]?.PostOffice[0]?.Block || '';
        this.state = this.responseData[0]?.PostOffice[0]?.State || '';
      }
    },
      (error) => {
        console.error('Error fetching data:', error);
      });

  }

  PhoneNumberFetch: any;
  UserIdFetch: any;
  inputField: any;
  ngOnInit() {
    // Method to check conditions and blank out the input fields
    if (this.values == '') {
      this.inputField = '';
    }

    // fetching details
    this.FetchingUsersDetails();
  }

  msgAddress: any;
  AdressSubmitForm(Formvalue: any) {
    this.service2.AddAddress(this.UserIdFetch, Formvalue).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.msgAddress = "Address Added SuccessFullyy!!!!!!!"
          setTimeout(() => {
            this.msgAddress='';
            this.router.navigate(['CheckOutProduct']);
          }, 3500);
        }
      },
      error(err) {
        console.log(err);
      },
    })
  }

  Redirecting() {
    // setTimeout(() => {
    //   this.router.navigate(['CheckOutProduct']);
    // }, 2000);
  }


  FetchingUsersDetails() {
    if (localStorage.getItem('isLoggedIn')) {
      let user = localStorage.getItem('isLoggedIn');
      let data = user && JSON.parse(user)._id;
      console.log(data);
      this.UserIdFetch = data;
      this.service2.FetchingData(data).subscribe({
        next: (value: any) => {
          // console.log("address"+value.Phone);
          this.PhoneNumberFetch = value.Phone;
        },
        error: (err) => {
          console.log(err);

        }
      })

    }
  }



}
