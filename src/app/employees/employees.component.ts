import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: Observable<Employee[]>

    constructor(
        private employeeService: EmployeeService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getEmployees()
    }

    getEmployees() {
        this.employees = this.employeeService.getEmployees()
    }

    edit(employee: Employee) {
        this.router.navigate([`/employee/update/${employee.id}`], { state: employee })
    }

    deleteEmployee(eId, eFN) {
        const confirmDeletion = confirm(`Do you want to get rid of ${eFN ? eFN : "John Doe"}?`)

        if (confirmDeletion)
            this.employeeService.deleteEmployee(eId)
                .subscribe((data) => this.getEmployees())
    }

}
