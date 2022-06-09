import { Component, OnInit } from '@angular/core';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';
import { InformacionService } from 'src/app/service/informacion.service';

@Component({
  selector: 'app-informacion-count',
  templateUrl: './informacion-count.component.html',
  styleUrls: ['./informacion-count.component.scss']
})
export class InformacionCountComponent implements OnInit 
{
  private _subscriptions: Subscription[] = [];
  public loadingInformacion = false;
  public informacioncount : any;
  public display = false;


  constructor(private informacionService : InformacionService ) { }

  ngOnInit(): void {
    this.loadInformacion();
  }

  private async loadInformacion(){
    this.loadingInformacion = true;
  try {
    const infoCount = await this.informacionService.obtenerInformacionCount().toPromise();
    console.log("Componente",  infoCount);
    this.informacioncount = infoCount;
    this.loadingInformacion = false;
    this._subscriptions.push( infoCount);
  } catch (error) {
    console.log(error);
  }
}

}
