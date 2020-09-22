import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  formClient:FormGroup;
  nowDate: Date;
 
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private _clientService: ClientService) { 
    this.nowDate= new Date();
    this.formClient=this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      age:[{value: '', disabled: true}]
    })
  }

  ngOnInit() {
    
  }

  saveClient(){
    if(this.formClient.invalid) return;
    console.log('data a guardar');
    console.log(this.formClient.value);
    
    
    let obj=this.formClient.value;
    delete obj['age'];
    this._clientService.createClient(obj).then(()=>{
      this._snackBar.open('Se registró correctamente', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
      });
      this.clearForm();
      }
    ).catch((error)=>{
      console.log(error);
    })
  }

  calculateAge(){
    let age=this._clientService.calculateAge(this.formClient.get('birthday').value);
    this.formClient.patchValue({age});
  }
  
  clearForm() {
    this.formClient.reset({
      name:'',
      lastname:'',
      birthday:'',
      age:''
    })
  }
}
