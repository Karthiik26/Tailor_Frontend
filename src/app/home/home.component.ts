import { Component, OnInit } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';
import { Router } from '@angular/router';
import { OrdersService } from '../service/Orders-Admin/orders.service';
import { TailorService } from '../service/Tailor/tailor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clothservice: ClothService, private route: Router, private orders: OrdersService , private Tailorservice : TailorService
  ) { }

  private typedTextSpan!: HTMLElement;
  private cursorSpan!: HTMLElement;

  private textArray: string[] =
    [
      "Your Fashion Journey Starts Now!",
      "Tailor your style with us!",
      "Discover your one-of-a-kind style with our expert !",
      "Crafting Elegance, Tailoring Excellence!"
    ];
  private colorArray: string[] = ["yellow", "#00ff00", "#0000ff", "pink"]; // Array of colors
  private typingDelay: number = 100;
  private erasingDelay: number = 50;
  private newTextDelay: number = 1000;
  private textArrayIndex: number = 0;
  private charIndex: number = 0;


  ngOnInit() {
    this.typedTextSpan = document.querySelector(".typed-text")!;
    this.cursorSpan = document.querySelector(".cursor")!;

    if (this.textArray.length) {
      setTimeout(() => this.type(), this.newTextDelay + 250);
    }

    // Cloth Images
    this.FetchingClothArray();
    this.GettingOrdersDetails();
    this.FetchingTailors();
  }

  private type() {
    if (this.charIndex < this.textArray[this.textArrayIndex].length) {
      if (!this.cursorSpan.classList.contains("typing")) {
        this.cursorSpan.classList.add("typing");
      }
      this.typedTextSpan.textContent += this.textArray[this.textArrayIndex].charAt(this.charIndex);
      this.typedTextSpan.style.color = this.colorArray[this.textArrayIndex]; // Set color
      this.charIndex++;
      setTimeout(() => this.type(), this.typingDelay);
    } else {
      this.cursorSpan.classList.remove("typing");
      setTimeout(() => this.erase(), this.newTextDelay);
    }
  }

  private erase() {
    if (this.charIndex > 0) {
      if (!this.cursorSpan.classList.contains("typing")) {
        this.cursorSpan.classList.add("typing");
      }
      this.typedTextSpan.textContent = this.textArray[this.textArrayIndex].substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.erase(), this.erasingDelay);
    } else {
      this.cursorSpan.classList.remove("typing");
      this.textArrayIndex++;
      if (this.textArrayIndex >= this.textArray.length) {
        this.textArrayIndex = 0;
      }
      setTimeout(() => this.type(), this.typingDelay + 1100);
    }
  }
  AdminId: any =`65d39b492eb8902cd2166247`;
  GettingOrdersDetails() {
    this.orders.GettingOrderDetails(this.AdminId).subscribe({
      next: (value: any) => {
        console.log("Getting Orders", value);
      }, error: (err) => {
        console.log("order error", err);
      },
    })
  }

  getImageSource(imageData: any): string {
    if (imageData && imageData.data) {
      return `data:${imageData.contentType};base64,${imageData.data}`;
    }
    return '';
  }


  ClothAdda: any;
  ClothAdda2: any;
  ClothItemArray: any;

  FetchingClothArray() {
    this.clothservice.GettingCloth(this.AdminId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.ClothAdda = res;
          for (let i = 0; i < 11; i++) {
            console.log("data", this.ClothAdda[i]);
            this.ClothAdda2=this.ClothAdda[i];
        }
          for (let i = 0; i < this.ClothAdda.length; i++) {
            const element = this.ClothAdda[i];
            // console.log("data",this.ClothAdda[10]);
            this.ClothItemArray = element;
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
        // this.clothservice.setGettingClothData(this.GettingClothIdFromClick);
        // this.GettingClothDataInProductView=res;
        // this.route.navigate(['ProductView']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  GettingTailor(Data: any) {
    console.log(Data);
    this.clothservice.setGettingClothData(Data);
  }


  // ClothDataId:any;
  GettingId(Data: any) {
    console.log(Data);
    this.clothservice.setGettingClothData(Data);
    this.route.navigate(['ProductView']);
  }


  Tailor: any;
  length: any;
  FetchingTailors() {
    this.Tailorservice.FetchingTailors().subscribe({
      next: (value) => {
        console.log("Tailor", value);
        this.Tailor = value;
        // Verify that the tailor property is correctly populated
        console.log("Tailor Data:", this.Tailor);
      }, error: (err) => {
        console.log(err);

      },
    })
  }


  // Fetching Image
  getImageSource2(imageData: any): string {
    if (!imageData || !imageData.Data || !imageData.Data.data) {
      return '';
    }
    // Convert the raw image data to base64
    const base64String = this.arrayBufferToBase64(imageData.Data.data);
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

  MakeAppointment(){
    let data = localStorage.getItem('isLoggedIn');
    let user = data && JSON.parse(data)._id;
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast-main',
      }
    });
    Toast.fire({
      icon: 'question',
      title: 'Appointment',
      text : ' Try Our Appointments With Multiple Tailors '
    });
    setTimeout(() => {
      this.route.navigate([`/Appoinment/${user}`])
    }, 2500);
  }


}
