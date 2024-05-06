import { Component, Input } from '@angular/core';
import { ClothService } from './service/Admin/cloth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private clothservice: ClothService) {
    // localStorage.setItem("isLoggedIn", "false");
    // localStorage.setItem("AdminLoggin", "false");
    // localStorage.setItem("TailorLoggin", "false");
  }

  ngOnInit() {
  }

  OnActivate() {
    window.scroll(0, 0);
  }


}
