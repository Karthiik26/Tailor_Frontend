import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TailorService } from '../service/Tailor/tailor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tailor-login',
  templateUrl: './tailor-login.component.html',
  styleUrls: ['./tailor-login.component.css']
})
export class TailorLoginComponent {

  constructor(
    private router: Router,
    private TailorService : TailorService
  ) { }

  // login
  formData: any = { TailorName: '', TailorPassword: '', TailorEmail: '' };
  UsersLocalStorage: any;
  Loginmsg: any;
  apiData: any;
  TailorsLocalStorage:any;
  
  TailorSubmit() {
    this.TailorService.Login(this.formData.TailorName, this.formData.TailorPassword, this.formData.TailorEmail).subscribe(
      {
        next: (res:any) => {
          console.log(res);
          this.apiData = res;
          
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-left',
            // iconColor: 'white',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          if (this.apiData.TailorName && this.apiData.TailorPassword && this.apiData.TailorEmail) {

            this.TailorsLocalStorage = localStorage.setItem('TailorLoggin', JSON.stringify(res));
            if (this.TailorsLocalStorage) {
              localStorage.setItem('TailorLoggin', 'true');
            }
            console.log('API Response ', this.apiData);
            // this.Loginmsg = "** Your Logged In **";
            Toast.fire({
              icon: 'success',
              title: 'Tailor Logged In Successfully'
            });
            setTimeout(() => {
              this.Loginmsg = '';
              this.router.navigate(['TailorIg']);
            }, 2500);
          }
          else if (this.apiData.result === 'User Not Founded') {
            localStorage.setItem('isLoggedIn', 'false');
            console.log('User Not Found');
            // this.Loginmsg = "User Not Found...!!!! Please SignUp";
            Toast.fire({
              icon: 'error',
              title: 'User Not Found...!!!! Contact To Admin'
            });
            setTimeout(() => {
              this.Loginmsg = '';
            }, 3000);
          }
          else {  
            // alert("SIGN UP For Further Process");
            this.Loginmsg = "** SignUp To Access ** ";
            Toast.fire({
              icon: 'error',
              title: 'User Not Found...!!!! Contact To Admin'
            });
            setTimeout(() => {

            }, 3000);
          }
        },
        error: (error:any) => {
          // this.Loginmsg = "User Not Found...!!!!";
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-left',
            // iconColor: 'white',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: 'error',
            title: 'User Not Found...!!!! Contact To Admin'
          });
          console.log("this is error", error);
        }
      }
    );
  }


  GettingTailorValues(Data: any) {

  }

}
