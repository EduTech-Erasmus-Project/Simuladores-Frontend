import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private evt$: EventEmitter<boolean> = new EventEmitter();

  constructor(private http:HttpClient) { }


  obtenerInformacionCount() {
    return this.http.get<any>(environment.WS_PATH + "api/informacionCount/");
  }

  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event(){
    return this.evt$;
  }
}

