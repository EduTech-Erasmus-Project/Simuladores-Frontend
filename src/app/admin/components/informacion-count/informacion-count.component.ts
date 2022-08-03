import { Component, OnInit } from '@angular/core';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';
import { InformacionCount } from 'src/app/model/InformacionCount';
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
  public informacioncount : InformacionCount;
  public display = false;


  constructor(private informacionService : InformacionService ) { }

  ngOnInit(): void {
    this.loadInformacion();
  }

  private loadInformacion(){
    this.loadingInformacion = true;
    this.informacionService.obtenerInformacionCount()
    .subscribe(res=>{
      this.informacioncount=res;
    });
}

}
