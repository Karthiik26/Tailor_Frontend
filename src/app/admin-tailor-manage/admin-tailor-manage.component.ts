import { Component } from '@angular/core';
import { TailorService } from '../service/Tailor/tailor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-tailor-manage',
  templateUrl: './admin-tailor-manage.component.html',
  styleUrls: ['./admin-tailor-manage.component.css']
})
export class AdminTailorManageComponent {

  constructor(private Tailorservice: TailorService) { }

  ngOnInit() {
    this.FetchingTailors();
  }

  GettingTailorValues(data: any, image: any) {
    const imageFile = image.files[0];
    console.log(data);
    console.log(imageFile);
    this.Tailorservice.SignUp(data, imageFile).subscribe({
      next: (res) => {
        console.log(res);
        this.FetchingTailors();
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
          icon: 'success',
          title: 'One Tailor Is Into Our Family'
        });

      }, error: (err) => {
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
          title: 'Check Once Again & Change It Some Data Is Aleardy In Our System'
        });

      },

    })
  }

  Tailor: any;
  length: any;
  FetchingTailors() {
    this.Tailorservice.FetchingTailors().subscribe({
      next: (value) => {
        console.log(value);

        this.Tailor = value;
        for (let i = 0; i < this.Tailor.length; i++) {
          const element = this.Tailor[i];
          this.length = this.Tailor.length;
        }
      }, error: (err) => {
        console.log(err);

      },
    })
  }

  DeleteTailor(data: any) {
    this.Tailorservice.DeleteTailor(data).subscribe({
      next: (value) => {
        console.log(value);
        this.FetchingTailors();
      }, error: (err) => {
        console.log(err);

      },
    })
  }

  // GettingImage



}
