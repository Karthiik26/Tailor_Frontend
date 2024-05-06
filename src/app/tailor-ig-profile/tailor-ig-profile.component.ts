import { Component, OnInit } from '@angular/core';
import { TailorService } from '../service/Tailor/tailor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tailor-ig-profile',
  templateUrl: './tailor-ig-profile.component.html',
  styleUrls: ['./tailor-ig-profile.component.css']
})
export class TailorIgProfileComponent implements OnInit{

  constructor(private tailor : TailorService){}

  Tailordata:any;

  ngOnInit(): void {
    this.tailor.FetchingTailorsById().subscribe({
      next:(value)=> {
        console.log(value);
        this.Tailordata=value;
      },error:(err) =>{
        console.log(err);
        
      },
    });
  }

  Side1:boolean=true;
  Side2:boolean=false;
  Side3:boolean=false;

  Myaccount(){
    this.Side1=true;
    this.Side2=false;
    this.Side3=false;
  }

  UpdateAccount(){
    this.Side2=true;
    this.Side1=false;
    this.Side3=false;
  }
  UpdateTheTailor(data:any){
    console.log(data);
    let tailor = localStorage.getItem('TailorLoggin');
    let id = tailor && JSON.parse(tailor)._id;
    
    this.tailor.UpdateTailor(id, data).subscribe({
      next:(value) => {
        console.log(value);
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
          title: `${value}`
        });
      },error:(err) => {
        console.log(err);
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
          icon: 'error',
          title: `${err}`
        });
      },
    })
  }
  
  UpdatePaassword(){
    this.Side3=true;
    this.Side1=false;
    this.Side2=false;
  }
  ChangePWD(oldpwd:any , newpwd:any){
    console.log(oldpwd);
    console.log(newpwd);
    let tailor = localStorage.getItem('TailorLoggin');
    let id = tailor && JSON.parse(tailor)._id;
    // let data = {oldpwd : oldpwd, newpwd : newpwd}
    this.tailor.Chnagepass(id,oldpwd,newpwd).subscribe({
      next:(value) => {
        console.log(value);
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
          title:  `${value}`
        });
      },error:(err) => {
        console.log(err);
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
          icon: 'error',
          title: `${err}`
        });
      },
    })
  }

}
