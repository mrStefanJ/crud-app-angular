import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  educations: any[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    education: ['', Validators.required],
    company: ['', Validators.required],
    experience: ['', [Validators.required, Validators.min(0)]],
    package: ['', [Validators.required, Validators.min(0)]],
    });
  }

  

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onFormSubmit() {
    console.log(this.empForm.get('email')?.errors); 
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee deleted!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    } else {
      this.empForm.markAllAsTouched();
    }
  }
}
