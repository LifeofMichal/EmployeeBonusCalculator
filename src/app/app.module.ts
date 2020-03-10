import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { BonusCalculatorComponent } from './bonus-calculator/bonus-calculator.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        EmployeesComponent,
        EmployeeCreateComponent,
        EmployeeUpdateComponent,
        BonusCalculatorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: 'home', component: HomeComponent },
            { path: '', component: EmployeesComponent, pathMatch: 'full' },
            { path: 'employee/create', component: EmployeeCreateComponent },
            { path: 'employee/update/:id', component: EmployeeUpdateComponent },
            { path: 'bonus', component: BonusCalculatorComponent }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
