import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

interface UserSignup {
  Email: String,
  Firstname: String,
  Lastname: String,
  Username: any,
  Phone: Number,
  Password: any
}

interface UserLogin {
  Email: EmailValidator,
  Username: String,
  Passsword: any
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  // <div * ngIf="old?.invalid && (old?.dirty || old?.touched)" class="text-danger" >
  // <div * ngIf="old?.errors?.['required']" > Old Password is required.< /div>
  //   < div * ngIf="old?.errors?.['minlength']" > Old Password must be at least 8 characters long.< /div>
  //     < /div>

constructor(
  private formbuilder: FormBuilder,
  private route: Router,
  private LoginService: LoginService,
  private http: HttpClient
) { }

  async LoginSuccess() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast',
    }
  });

  await Toast.fire({
    icon: 'success',
    title: 'Your Logged SuccessFullyy'
  });
}

  async LoginFailed() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast',
    }
  });

  await Toast.fire({
    icon: 'success',
    title: 'Login Failed'
  });
}

  async InValiedPassword() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast',
    }
  });

  await Toast.fire({
    icon: 'error',
    title: 'Invalid Password'
  });
}

  async UserNotFound() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast',
    }
  });

  await Toast.fire({
    icon: 'error',
    title: 'User Not Found Sign Up To Access'
  });
}

// login
formData: any = { UserName: '', Password: '' };
UsersLocalStorage: any;
Loginmsg: any;
apiData: any;
LoginForm() {
  this.LoginService.UserLogin(this.formData.UserName, this.formData.Password).subscribe(
    {
      next: (res) => {
        console.log(res);
        this.apiData = res;
        if (this.apiData.UserName && this.apiData.Password) {
          this.UsersLocalStorage = localStorage.setItem('isLoggedIn', JSON.stringify(res));
          if (this.UsersLocalStorage) {
            localStorage.setItem('isLoggedIn', 'true');
          }
          console.log('API Response ', this.apiData);
          this.LoginSuccess()
          setTimeout(() => {
            this.route.navigate(['/']);
            this.Loginmsg = '';
          }, 2500);
        }
        else if (this.apiData.result === 'Invalid password') {
          localStorage.setItem('isLoggedIn', 'false');
          console.log('Invalid password');
          this.Loginmsg = "Invalid password";
          this.InValiedPassword()
          setTimeout(() => {
            this.Loginmsg = '';
          }, 3000);
        }
        else if (this.apiData.result === 'User Not Found') {
          localStorage.setItem('isLoggedIn', 'false');
          console.log('User Not Found');
          this.Loginmsg = "User Not Found...!!!! Please SignUp";
          setTimeout(() => {
            this.Loginmsg = '';
          }, 3000);
        }
        else {
          this.Loginmsg = "** SignUp To Access ** ";
          console.log('SignUp To Access');
          this.UserNotFound();
          setTimeout(() => {
            this.Loginmsg = '';
          }, 3000);
        }
      },
      error: (error) => {
        this.UserNotFound();
        this.Loginmsg = "User Not Found...!!!! Please Login";
        console.log("this is error", error);
      }
    }
  );
}

forgetpwdlink() {
  // this.resetpwd=true;
}

// routing
logindiv: boolean = true;
signup: boolean = false;
resetpwd: boolean = false;

signupbtn() {
  this.signup = true;
  this.logindiv = false;
}

Loginbtn() {
  this.logindiv = true;
  this.signup = false;
}

// reset pwd
ResetPassword(resetdata: any) {

}

// signup
// User Signup 
signupsuccess: any = '';
signupexist: any = '';
signupfaild: any = '';

SignupForm(signupdata: UserSignup) {
  this.http.post<any>('https://tailor-backend-hqfi.onrender.com/Signup', signupdata, { observe: 'response' }).subscribe(
    (response: HttpResponse<any>) => {
      console.log(response);
      if (response.status === 200 && response.body) {
        const responseBody = response.body;
        // Access properties of the response body object
        if (responseBody.successs) {
          console.log('Registration successful:', responseBody.msg);
          this.signupsuccess = 'Registration successful ';
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              popup: 'colored-toast-3',
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Registration successfull'
          });
          setTimeout(() => {
            this.signupsuccess = '';
            this.logindiv = true;
            this.signup = false;
          }, 3500);
          this.logindiv = true;
        } else {
          const errors = response.body.msg.errors;
          if (errors) {
            // Handle each error type separately
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
            if (errors.UserName && errors.Email && errors.Phone) {
              // All three errors exist
              console.log('All three errors:', errors.UserName.message, errors.Email.message, errors.Phone.message);
              Toast.fire({
                icon: 'error',
                title: 'Username , Phone and Email are already taken'
              });
            } else if (errors.UserName && errors.Email) {
              // Username and Email errors
              console.log('Username and Email errors:', errors.UserName.message, errors.Email.message);
              Toast.fire({
                icon: 'error',
                title: 'Username and Email are already taken'
              });
            } else if (errors.UserName && errors.Phone) {
              // Username and Phone errors
              console.log('Username and Phone errors:', errors.UserName.message, errors.Phone.message);
              Toast.fire({
                icon: 'error',
                title: 'Username and Phone are already taken'
              });
            } else if (errors.Email && errors.Phone) {
              // Email and Phone errors
              console.log('Email and Phone errors:', errors.Email.message, errors.Phone.message);
              Toast.fire({
                icon: 'error',
                title: 'Email and Phone are already taken'
              });
            } else if (errors.UserName) {
              // Only Username error
              console.log('Username error:', errors.UserName.message);
              Toast.fire({
                icon: 'error',
                title: errors.UserName.message
              });
            } else if (errors.Email) {
              // Only Email error
              console.log('Email error:', errors.Email.message);
              Toast.fire({
                icon: 'error',
                title: errors.Email.message
              });
            } else if (errors.Phone) {
              // Only Phone error
              console.log('Phone error:', errors.Phone.message);
              Toast.fire({
                icon: 'error',
                title: errors.Phone.message
              });
            }
          }
          this.signupexist = 'Registration failed User Already Exist';
          setTimeout(() => {
            this.signupexist = '';
          }, 3500);
          this.logindiv = true;
          this.signup = true;
        }
      } else {
        console.error('Unexpected response:', response);
        this.signupfaild = 'Unexpected response Try Again';
        setTimeout(() => {
          this.signupfaild = '';
        }, 3500);
        this.logindiv = true;
        this.signup = true;
      }
    });
}

}
