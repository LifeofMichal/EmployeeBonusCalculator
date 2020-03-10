import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { EmployeeService } from '../services/employee.service'
import { Employee } from '../models/Employee'
import { formatDate } from '../utils/formatDate'

@Component({
    selector: 'app-employee-update',
    templateUrl: './employee-update.component.html',
    styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent {
    updateEmployeeForm: FormGroup
    public employeeData: Employee
    id: number
    firstName: string
    lastName: string
    startDate: string
    hours: number

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.employeeData = history.state
        this.firstName = 'firstName'
        this.lastName = 'lastName'
        this.startDate = 'startDate'
        this.hours = 0

        this.updateEmployeeForm = this.formBuilder.group({
            postId: this.employeeData.id,
            firstName: [this.employeeData.firstName, [Validators.required]],
            lastName: [this.employeeData.lastName, [Validators.required]],
            startDate: [this.employeeData.employmentStartDate, [Validators.required]],
            hours: [this.employeeData.registeredHours, [Validators.required]]
        });

        if (!this.employeeData.firstName) this.router.navigate(['/employees'])
    }

    updateEmployee() {
        let employee: Employee = {
            id: this.employeeData.id,
            firstName: this.updateEmployeeForm.get(this.firstName).value,
            lastName: this.updateEmployeeForm.get(this.lastName).value,
            employmentStartDate: this.updateEmployeeForm.get(this.startDate).value,
            registeredHours: +this.updateEmployeeForm.get('hours').value
        }

        const { id, firstName, lastName, employmentStartDate, registeredHours } = employee


        if (firstName && lastName && employmentStartDate && registeredHours) {
            console.log("Employee is: ", employee)
            this.employeeService.updateEmployee(employee)
                .subscribe(() => {
                    this.employeeService.getEmployees()
                    this.router.navigate(['/employees'])
                })
        } else {
            alert(`Data did not register`)
        }
    }

    maxDate() {
        return formatDate(new Date())
    }

    cancel() {
        this.router.navigate(['/employees']);
    }
}

