import { Routes } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { todolistComponent } from './Components/todolist/todolist.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { AboutUsComponent } from './Components/aboutUs/aboutUs.component';
import { ContactUsComponent } from './Components/ContactUs/ContactUs.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { HomeComponent } from './Components/Home/Home.component';

export let AppRouts: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'Cart', component: ProductCardComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'todolist', component: todolistComponent },
  { path: '**', component: NotfoundComponent },
];
