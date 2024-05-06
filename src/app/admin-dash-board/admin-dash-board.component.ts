import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';
import { TailorService } from '../service/Tailor/tailor.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements AfterViewInit {

  constructor(
    private clothservice : ClothService,
    private Tailorservice : TailorService,
    private loginservice : LoginService){}

  @ViewChildren('leftBar', { read: ElementRef }) leftBars: QueryList<ElementRef<HTMLDivElement>> | any;
  @ViewChildren('rightBar', { read: ElementRef }) rightBars: QueryList<ElementRef<HTMLDivElement>> | any;

  progressBars = [
    { value: 25 },
    { value: 60 },
    // Add more progress bars as needed with different values
  ];

  ngAfterViewInit() {
    this.progressBars.forEach((progress, index) => {
      const left = this.leftBars.toArray()[index];
      const right = this.rightBars.toArray()[index];

      if (progress.value > 0) {
        if (progress.value <= 50) {
          right.nativeElement.style.transform = `rotate(${this.percentageToDegrees(progress.value)}deg)`;
        } else {
          right.nativeElement.style.transform = 'rotate(180deg)';
          left.nativeElement.style.transform = `rotate(${this.percentageToDegrees(progress.value - 50)}deg)`;
        }
      }
    });
  }

  private percentageToDegrees(percentage: number): number {
    return (percentage / 100) * 360;
  }


  ngOnInit(){
    this.FetchingClothArray();
    this.FetchingTailors();
    this.FetchingData();
    this.GettingAppointmentLength()
  }


  // cLOTH Stock
  TotalStock:any;
  FetchingClothArray() {
let localstorage = localStorage.getItem('AdminLoggin');
let AdminId = localstorage ? JSON.parse(localstorage)._id : null;
console.log(AdminId);

    this.clothservice.GettingCloth(AdminId).subscribe(
      {
        next: (res: any) => {
          console.log("resonspse in cloth image");
          console.log(res);
          // this.ClothData = res;
          this.TotalStock=res.length;
        }, 
        error(err) {
          console.log(err);

        },
      }
    );
  }

  // Tailors
  TailorsLength:any;
  FetchingTailors() {
    this.Tailorservice.FetchingTailors().subscribe({
      next: (value:any) => {
        console.log("Tailors");
        console.log(value);
        this.TailorsLength = value.length;
      }, error: (err) => {
        console.log(err);
      },
    })
  }

  // Users
  UserData:any;
  Userlength:any;
  FetchingData(){
    this.loginservice.UserFetching().subscribe({
      next:(value)=> {
        console.log(value);
        this.UserData=value;
        for (let i = 0; i < this.UserData.length; i++) {
          const element = this.UserData[i];
          this.Userlength=this.UserData.length
        }
      },error:(err)=> {
        console.log(err);
      },
    })
  }


  AppointmentLength:any
  GettingAppointmentLength(){
      this.Tailorservice.GettingAppointmentsLength().subscribe(res=>{
        console.log(res);
        this.AppointmentLength=res.totalAppointments;
      });
  }



}
