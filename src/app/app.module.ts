import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DesignComponent } from './design/design.component';
import { TailorComponent } from './tailor/tailor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TailorProfileComponent } from './tailor-profile/tailor-profile.component';
import { TailorNavComponent } from './tailor-nav/tailor-nav.component';
import { TailorDesignUpdateComponent } from './tailor-design-update/tailor-design-update.component';
import { TailorDesignPostComponent } from './tailor-design-post/tailor-design-post.component';
import { TailorAppointmentsComponent } from './tailor-appointments/tailor-appointments.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { TailorLoginComponent } from './tailor-login/tailor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminInventryComponent } from './admin-inventry/admin-inventry.component';
import { AdminTailorManageComponent } from './admin-tailor-manage/admin-tailor-manage.component';
import { AdminUserManageComponent } from './admin-user-manage/admin-user-manage.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AdminAddInventryComponent } from './admin-add-inventry/admin-add-inventry.component';
import { AdminInventryUpdateComponent } from './admin-inventry-update/admin-inventry-update.component';
import { AdminTailorUpdateComponent } from './admin-tailor-update/admin-tailor-update.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { TailorConfirmedAppointmentComponent } from './tailor-confirmed-appointment/tailor-confirmed-appointment.component';
import { CheckoutProductsComponent } from './checkout-products/checkout-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAddressComponent } from './user-address/user-address.component';
import { HttpClientModule } from '@angular/common/http';
import { TailorViewComponent } from './tailor-view/tailor-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { UsersSaveMeasurementComponent } from './users-save-measurement/users-save-measurement.component';
import { UsersSaveAppointmentsComponent } from './users-save-appointments/users-save-appointments.component';
import { UsersSaveOrdersComponent } from './users-save-orders/users-save-orders.component';
import { TailorIgProfileComponent } from './tailor-ig-profile/tailor-ig-profile.component';
import { RouterModule } from "@angular/router";
import { SuccessfullpaymentComponent } from './successfullpayment/successfullpayment.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    DesignComponent,
    TailorComponent,
    AppointmentComponent,
    MeasurementsComponent,
    AddtocartComponent,
    UserProfileComponent,
    TailorProfileComponent,
    TailorNavComponent,
    TailorDesignUpdateComponent,
    TailorDesignPostComponent,
    TailorAppointmentsComponent,
    AdminDashBoardComponent,
    TailorLoginComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    AdminInventryComponent,
    AdminTailorManageComponent,
    AdminUserManageComponent,
    ManageOrdersComponent,
    AdminAddInventryComponent,
    AdminInventryUpdateComponent,
    AdminTailorUpdateComponent,
    AdminUserUpdateComponent,
    TailorConfirmedAppointmentComponent,
    CheckoutProductsComponent,
    UserAddressComponent,
    TailorViewComponent,
    ProductViewComponent,
    UsersSaveMeasurementComponent,
    UsersSaveAppointmentsComponent,
    UsersSaveOrdersComponent,
    TailorIgProfileComponent,
    SuccessfullpaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
