import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AddressService } from '../service/address.service';
import { ClothService } from '../service/Admin/cloth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() nameinp = '';
  @Input() UserImg: any;

  constructor(private addreservice: AddressService, private loginservice: LoginService, private clothser: ClothService) { }

  @Output() updateProfile: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.UserProfile();
    this.clothser.setGettingClothData(this.UserProfile());
  }

  // Display
  ShowMyProfile: boolean = true;
  // Update profile
  ShowUpdate: boolean = false;
  // Chnage password
  ShowChange: boolean = false;

  // Update Account
  myAccount() {
    this.ShowMyProfile = false;
    this.ShowUpdate = true;
    this.ShowChange = false;
  }

  // Update passsword
  Update() {
    this.ShowMyProfile = false;
    this.ShowUpdate = false;
    this.ShowChange = true;
  }

  // Display 
  Display() {
    this.ShowMyProfile = true;
    this.ShowUpdate = false;
    this.ShowChange = false;

  }

  GettingData: any;
  GettingAddress: any;
  username: any;
  UserImage: any;
  GettingAddressfinal: any[] = []; // Initialize GettingAddressfinal as an empty array
  AddressData: any;

  UserProfile() {
    let user = localStorage.getItem('isLoggedIn');
    let data = user && JSON.parse(user)._id;

    this.addreservice.FetchingData(data).subscribe({
      next: (value: any) => {
        console.log(value.UserImage);
        this.GettingData = value;
        this.GettingAddress = value.Address;
        this.username = value.FirstName;
        this.UserImage = value.UserImage;
        // Reset GettingAddressfinal as an empty array before populating it
        this.GettingAddressfinal = [];
        for (let i = 0; i < this.GettingAddress.length; i++) {
          const element = this.GettingAddress[i];
          this.GettingAddressfinal.push(element); // Push each element to GettingAddressfinal
        }

        console.log(this.GettingAddressfinal);

        // Access a specific element by index, for example, index 0 (the first element)
        if (this.GettingAddressfinal.length > 0) {
          const firstElement = this.GettingAddressfinal[0];
          console.log('First element:', firstElement);
          this.AddressData = firstElement;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  UpdateUserval(Data: any) {
    console.log(Data);
    // console.log(Image.data); // Add this line for debugging

    // if (!Image || !Image.files || Image.files.length === 0) {
    //   console.error('Image is undefined or has no files');
    //   return;
    // }

    let data = localStorage.getItem('isLoggedIn');
    let UserId = data && JSON.parse(data)._id;
    // const imageFile = Image.data.files[0];

    this.loginservice.UserUpdate(UserId, Data).subscribe({
      next: (value) => {
        console.log(value);
        this.UserProfile();
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-left',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: 'success',
          title: 'Your Details Are Updated Successfully'
        });

        // this.updateProfile.emit();
        // this.UserProfile();

      }, error: (err) => {
        console.log(err);
      },
    });
  }

  // Fetching Image
  getImageSource(imageData: any): string {
    if (!imageData || !imageData.data || !imageData.data.data || !imageData.contentType) {
      return '';
    }

    // Convert the raw image data to base64
    const base64String = this.arrayBufferToBase64(imageData.data.data);
    if (base64String) {
      return `data:${imageData.contentType};base64,${base64String}`;
    }
    return '';
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = new Uint8Array(buffer);
    const bytes: number[] = [];

    binary.forEach(byte => bytes.push(byte));

    return btoa(String.fromCharCode.apply(null, bytes));
  }


  UpdatePassword(data2: any) {
    console.log(data2);
    const data = localStorage.getItem('isLoggedIn');
    const UserId = data ? JSON.parse(data)._id : null;
    if (UserId) {
      const postData = { oldpassword: data2.old, newpassword: data2.newpass };
      this.loginservice.UpdatingPassword(UserId, postData).subscribe(
        (res) => {
          console.log(res);
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              popup: 'colored-toast',
            }
          });
          if (res.message) {
            Toast.fire({
              icon: 'success',
              title: res.message
            });
          }
        },
        (error) => {
          console.error('Error:', error);
          if (error.error.message) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-left',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              customClass: {
                popup: 'colored-toast',
              }
            });
            Toast.fire({
              icon: 'error',
              title: error.error.message
            }); 
          }
        }
      );
    }
  }


}
