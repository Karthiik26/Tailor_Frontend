import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DesignComponent } from './design/design.component';
import { TailorComponent } from './tailor/tailor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TailorProfileComponent } from './tailor-profile/tailor-profile.component';
import { TailorDesignUpdateComponent } from './tailor-design-update/tailor-design-update.component';
import { TailorDesignPostComponent } from './tailor-design-post/tailor-design-post.component';
import { TailorAppointmentsComponent } from './tailor-appointments/tailor-appointments.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { TailorLoginComponent } from './tailor-login/tailor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
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
import { UserAddressComponent } from './user-address/user-address.component';
import { TailorViewComponent } from './tailor-view/tailor-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { UsersSaveAppointmentsComponent } from './users-save-appointments/users-save-appointments.component';
import { UsersSaveMeasurementComponent } from './users-save-measurement/users-save-measurement.component';
import { UsersSaveOrdersComponent } from './users-save-orders/users-save-orders.component';
import { loginGuardGuard } from './AUTHGUARD/login-guard.guard';
import { adminLoginGuard } from './AUTHGUARD/admin-login.guard';
import { tailorLoginGuard } from './AUTHGUARD/tailor-login.guard';
import { TailorIgProfileComponent } from './tailor-ig-profile/tailor-ig-profile.component';
import { SuccessfullpaymentComponent } from './successfullpayment/successfullpayment.component';

const routes: Routes = [
  // Users Interface
  {
    component: LoginComponent,
    path: 'Login'
  },
  {
    component: HomeComponent,
    path: '',
    canActivate: [loginGuardGuard]
  },
  {
    component: AboutUsComponent,
    path: 'Aboutus',
    canActivate : [loginGuardGuard]
  },
  {
    component: DesignComponent,
    path: 'Design',
    canActivate : [loginGuardGuard]
  },
  {
    component: TailorComponent,
    path: 'Tailor',
    canActivate : [loginGuardGuard]
  },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    component : AppointmentComponent,
    path : 'Appoinment/:_id',
    canActivate : [loginGuardGuard]
  },
  {
    component : MeasurementsComponent,
    path : 'Measurements',
    canActivate : [loginGuardGuard]
  },
  {
    component : AddtocartComponent,
    path : 'AddToCart',
    canActivate : [loginGuardGuard]
  },
  {
    component : UserProfileComponent,
    path : 'UserProfile',
    canActivate : [loginGuardGuard]
  },
  {
    component : CheckoutProductsComponent,
    path : 'CheckOutProduct',
    canActivate : [loginGuardGuard]
  },
  {
    component : UserAddressComponent,
    path :'UsersAddress',
    canActivate : [loginGuardGuard]
  },
  {
    component : ProductViewComponent,
    path : 'ProductView',
    canActivate : [loginGuardGuard]
  },
  {
    component : UsersSaveAppointmentsComponent,
    path : 'SavedAppointment',
    canActivate : [loginGuardGuard]
  },
  {
    component : UsersSaveMeasurementComponent,
    path : 'SavedMeasurement',
    canActivate : [loginGuardGuard]
  },
  {
    component : UsersSaveOrdersComponent,
    path : 'UsersOrders',
    canActivate : [loginGuardGuard]
  },
  {
    component : TailorViewComponent,
    path : 'TailorVeiw',
    canActivate :[loginGuardGuard]
  },
  {
    component : TailorIgProfileComponent,
    path : 'TailorIg',
    canActivate :[tailorLoginGuard]
  },
  // Tailors interface
  {
    component : TailorProfileComponent,
    path : 'TailorDetails',
    canActivate :[tailorLoginGuard]
  },
  {
    component : TailorDesignUpdateComponent,
    path : 'TalorDesignUpdate',
    canActivate :[tailorLoginGuard]
  },
  {
    component : TailorDesignPostComponent,
    path : 'TailorDesignPost',
    canActivate :[tailorLoginGuard]
  },
  {
    component : TailorAppointmentsComponent,
    path : 'TailorApproveAppointments',
    canActivate :[tailorLoginGuard]
  },
  {
    component : TailorLoginComponent,
    path : 'TailorLogin'
  },
  {
    component : TailorConfirmedAppointmentComponent,
    path : 'ConfirmedAppointment',
    canActivate :[tailorLoginGuard]
  },


  // Admin Login
  {
    component: AdminDashBoardComponent,
    path :'AdminDashboard',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminLoginComponent,
    path : 'Admin'
  },
  {
    component : AdminInventryComponent,
    path : 'AllInventry',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminTailorManageComponent,
    path : 'ManageTailors',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminUserManageComponent,
    path : 'ManageUser',
    canActivate : [adminLoginGuard]
  },
  {
    component : ManageOrdersComponent,
    path : 'ManageOrders',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminAddInventryComponent,
    path : 'AddInventry',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminInventryUpdateComponent,
    path : 'UpdateInventry',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminTailorUpdateComponent,
    path : 'TailorUpdate',
    canActivate : [adminLoginGuard]
  },
  {
    component : AdminUserUpdateComponent,
    path : 'UserUpdate',
    canActivate : [adminLoginGuard]
  },
  {
    component : SuccessfullpaymentComponent,
    path : 'Thank-You',
    canActivate : [loginGuardGuard]
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
