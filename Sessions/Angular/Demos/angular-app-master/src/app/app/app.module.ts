import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MoneyPipe } from '../Pipes/money.pipe';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { todolistComponent } from './Components/todolist/todolist.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { AppRouts } from './app.route';
import { InitComponent } from './Components/init/init.component';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { CheckImagePipe } from '../Pipes/CheckImage.pipe';
import { CutTextPipe } from '../Pipes/CutText.pipe';
import { AboutUsComponent } from './Components/aboutUs/aboutUs.component';
import { ContactUsComponent } from './Components/ContactUs/ContactUs.component';
import { HomeComponent } from './Components/Home/Home.component';
import { ProductbyIdComponent } from './Components/productbyId/productbyId.component';

@NgModule({
  // childern
  declarations: [
    NavbarComponent,
    FooterComponent,
    todolistComponent,
    ProductListComponent,
    ProductCardComponent,
    MoneyPipe,
    InitComponent,
    NotfoundComponent,
    CheckImagePipe,
    CutTextPipe,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    ProductbyIdComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(AppRouts),
  ],
  bootstrap: [InitComponent],
  exports: [CheckImagePipe, CutTextPipe],

  // providers: [],
})
export class AppModule {}
