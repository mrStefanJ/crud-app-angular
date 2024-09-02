import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/employees';

  constructor(private _http: HttpClient) { }

  addEmployee(data: any) {
    return this._http.post(`${this.baseUrl}`, data);
  }

  getEmployee(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  
  updateEmployee(id: string, data: any){
    return this._http.put(`${this.baseUrl}/${id}`, data)
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this._http.get<boolean>(`${this.baseUrl}/check-email?email=${email}`);
  }
}
