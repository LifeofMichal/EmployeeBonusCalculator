import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee, EmployeeToAdd, EmployeeWithBonus } from '../models/Employee'
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    dbUrl: string
    apiUri: string

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    }

    constructor(private http: HttpClient) {
        this.dbUrl = "http://localhost:3000/"
        this.apiUri = "consultants/"
    }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.dbUrl}${this.apiUri}`)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    getEmployeesWithBonus(): Observable<EmployeeWithBonus[]> {
        return this.http.get<EmployeeWithBonus[]>(`${this.dbUrl}${this.apiUri}`)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    addNewEmployee(employee: EmployeeToAdd): Observable<EmployeeToAdd> {
        return this.http.post<Employee>(`${this.dbUrl}${this.apiUri}`, JSON.stringify(employee), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.patch<Employee>(`${this.dbUrl}${this.apiUri}${employee.id}`, JSON.stringify(employee), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    deleteEmployee(eId: number): Observable<Employee> {
        return this.http.delete<Employee>(`${this.dbUrl}${this.apiUri}${eId}`)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
