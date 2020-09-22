import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ClientI } from 'src/app/models/client';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'lastname', 'birthday'];
  dataSource = new MatTableDataSource();
  public listClient:ClientI[];
  public promedio:number;
  constructor(
    private _clientService:ClientService
  ) {
    this.listClient=[];
    this.promedio=0;
  }

  ngOnInit() {
   this.listClients();
  }

  getData(){
    this.promedio=this._clientService.promAge;
  }

  listClients(){
    this._clientService.getClients().subscribe(
      (result)=> {
        this.listClient=[];
        result.forEach((element)=>{
          var f=this._clientService.toDateTime(element.payload.doc.data().birthday.seconds);
          this.listClient.push({
            id:element.payload.doc.id,
            name:element.payload.doc.data().name,
            lastname:element.payload.doc.data().lastname,
            birthday:f.getDate() + "/"+ f.getMonth()+ "/" +f.getFullYear()
          })
        });
        this.dataSource.data=this.listClient;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
