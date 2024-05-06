import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TailorService } from '../service/Tailor/tailor.service';
import { ClothService } from '../service/Admin/cloth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.component.html',
  styleUrls: ['./tailor.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TailorComponent {

  constructor(private Tailorservice: TailorService, private cloth: ClothService, private route : Router) { }


  ngOnInit() {
    this.FetchingTailors();
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

  TakeAppointment(data: any) {
    console.log(data);
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-left',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast-3',
      }
    });
    Toast.fire({
      icon: 'info',
      title: "Remember Your Tailor Name Before You Are Taking Appointment "+data.TailorName,
    });

    setTimeout(() => {
      this.route.navigate([`/Appoinment/${data._id}`]);
    }, 3000);
  }

  
  ProcedForSwing(data: any) {
    console.log(data);
    // this.FetchingTailorsById();
  }

  // FetchingTailorsById() {
  //   this.Tailorservice.FetchingTailorsById().subscribe({
  //     next: (value: any) => {
  //       console.log("FetchingTailorsById",value);
  //     }, error: (err) => {
  //       console.log(err);

  //     },
  //   })
  // }

  GettingTailor(Data: any) {
    console.log(Data);
    this.cloth.setGettingClothData(Data);
  }


  // Fetching Image
  getImageSource(imageData: any): string {
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

}
