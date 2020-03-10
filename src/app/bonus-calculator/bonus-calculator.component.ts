import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms'
import { Employee, EmployeeWithBonus } from '../models/Employee'
import { EmployeeService } from '../services/employee.service'
import { yearsHiredCalculator } from '../utils/calculateHiredYears'
import { loyalityFactorCalculator } from '../utils/calculateLoyalityFactor'
import { debitPointsCalculator } from '../utils/calculateDebitPoints'
import { bonusInSEKCalculator } from '../utils/calculateBonusInSEK'

@Component({
    selector: 'app-bonus-calculator',
    templateUrl: './bonus-calculator.component.html',
    styleUrls: ['./bonus-calculator.component.scss']
})

export class BonusCalculatorComponent implements OnInit {
    employeesWithBonus: EmployeeWithBonus[]
    netto: number = 100000
    bonusPool: number = this.netto * 0.05
    totalDebitPoints: number = 0
    length: number = 0

    constructor(
        private employeeService: EmployeeService
    ) { }

    ngOnInit() {
        this.getEmployees()
    }

    getEmployees() {
        this.employeeService.getEmployeesWithBonus().subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].years = yearsHiredCalculator(result[i].employmentStartDate)
                result[i].loyality = loyalityFactorCalculator(result[i].employmentStartDate)
                result[i].debitPoints = debitPointsCalculator(result[i].loyality, result[i].registeredHours)
                this.totalDebitPoints = this.totalDebitPoints + result[i].debitPoints
            }
            for (let i = 0; i < result.length; i++) {
                result[i].bonus = bonusInSEKCalculator(this.bonusPool, result[i].debitPoints, this.totalDebitPoints)
            }
            this.employeesWithBonus = result
        })
    }
}
