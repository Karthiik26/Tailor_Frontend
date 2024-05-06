import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private router: Router, private LoginService: LoginService) { }


  formData: any = { AdminEmail: '', AdminPassword: '' };
  AdminLocalStorage: any;
  Loginmsg: any;
  apiData: any;
  // AdminSubmit() {
  //   this.LoginService.AdminLogin(this.formData.AdminEmail, this.formData.AdminPassword).subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res);
  //         this.apiData = res;

  //         if (this.apiData.AdminEmail && this.apiData.AdminPassword) {
  //           this.AdminLocalStorage = localStorage.setItem('AdminLoggin', JSON.stringify(res));
            
  //           if (this.AdminLocalStorage) {
  //             localStorage.setItem('AdminLoggin', 'true');
  //           }
  //           console.log('API Response ', this.apiData);
  //           this.Loginmsg = "Your Logged In Successfullyy";
  //           setTimeout(() => {
  //             this.Loginmsg = '';
  //             this.router.navigate([`/AdminDashboard`]);
  //           }, 3500);
  //         }
  //         else if (this.apiData.result === 'User Not Founded') {
  //           localStorage.setItem('AdminLoggin', 'false');
  //           console.log('User Not Found');
  //           this.Loginmsg = "Not Found";
  //           setTimeout(() => {
  //             this.Loginmsg = '';
  //           }, 3000);
  //         }
  //         else {
  //           // alert("SIGN UP For Further Process");
  //           this.Loginmsg = "Check Again This Is Not Correct";
  //           setTimeout(() => {
  //             this.Loginmsg = '';
  //           }, 3000);
  //         }
  //       },
  //       error: (error) => {
  //         this.Loginmsg = "User Not Found...!!";
  //         console.log("this is error", error);
  //       }
  //     }
  //   );
  // }


  AdminSubmit() {
    this.LoginService.AdminLogin(this.formData.AdminEmail, this.formData.AdminPassword).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.apiData = res;
  
          if (this.apiData.AdminEmail && this.apiData.AdminPassword) {
            localStorage.setItem('AdminLoggin', JSON.stringify(res));
            console.log('API Response ', this.apiData);
            this.Loginmsg = "You are logged in successfully.";
            setTimeout(() => {
              this.Loginmsg = '';
              this.router.navigate(['/AdminDashboard']);
            }, 3500);
          } else if (this.apiData.result === 'User Not Found') {
            localStorage.setItem('AdminLoggin', 'false');
            console.log('User Not Found');
            this.Loginmsg = "User not found.";
            setTimeout(() => {
              this.Loginmsg = '';
            }, 3000);
          } else {
            this.Loginmsg = "Please check your credentials.";
            setTimeout(() => {
              this.Loginmsg = '';
            }, 3000);
          }
        },
        error: (error) => {
          this.Loginmsg = "User not found.";
          console.log("Error:", error);
        }
      }
    );
  }
  


}