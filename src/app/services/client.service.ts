import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClientI } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  promAge:number;
  constructor(
    private firestore:AngularFirestore
  ) { 
    this.promAge=0;
    this.agePromClients();
  }

  public getClients():Observable<any>{
    return this.firestore.collection('clients').snapshotChanges();
  }

  public createClient(data){
    return this.firestore.collection('clients').add(data);
  }

  public calculateAge(birth){
    const today: Date = new Date();
    const birthDate: Date = new Date(birth);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  public agePromClients(){
    var res= this.firestore.collection('clients').snapshotChanges();
    var sum=0;
    var numberClients=0;
    var dateString;
    res.subscribe((result:any) => {
      result.forEach((element,index)=>{
        dateString=this.toDateTime(element.payload.doc.data().birthday.seconds);
        sum=sum+this.calculateAge(dateString);   
      });
      numberClients=result.length;
      this.promAge=sum/numberClients;
    })
  }

  toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

}
