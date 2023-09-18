import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ServiceDetailComponent } from "./components/service-detail/service-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'service/:index',
    component: ServiceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
      useHash: false,
      // scrollPositionRestoration: "enabled"
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
