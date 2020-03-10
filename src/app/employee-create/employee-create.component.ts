import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { EmployeeService } from '../services/employee.service'
import { EmployeeToAdd } from '../models/Employee'
import { formatDate } from '../utils/formatDate'

@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
    createForm: FormGroup
    firstName: string
    lastName: string
    startDate: string
    hours: number

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.firstName = 'firstName'
        this.lastName = 'lastName'
        this.startDate = 'startDate'
        this.hours = 0

        this.createForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            hours: ['', [Validators.required]]
        })
    }

    ngOnInit() { }

    createNewEmployee() {
        let employee: EmployeeToAdd = {
            firstName: this.createForm.get(this.firstName).value,
            lastName: this.createForm.get(this.lastName).value,
            employmentStartDate: this.createForm.get(this.startDate).value,
            registeredHours: +this.createForm.get('hours').value
        }

        const { firstName, lastName, employmentStartDate, registeredHours } = employee

        if (firstName && lastName && employmentStartDate && registeredHours) {

            this.employeeService.addNewEmployee(employee)
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
