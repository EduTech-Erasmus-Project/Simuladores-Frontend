import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Rubrica } from "../core/interfaces/rubrica";

@Injectable({
  providedIn: 'root'
})
export class RubricaService {
 

  private evt$: EventEmitter<boolean> = new EventEmitter();

  get: any;
  constructor(private http: HttpClient) { }

   registroRubrica(data): Observable<any> {
    return this.http.post<any>(environment.WS_PATH + "registroRubrica/",data);
  }
  
  obtenerRubrica(id: number) {
    return this.http.get<any>(
      environment.WS_PATH + "recuperarRubrica/" + id
    );
  }

  
  editarRubrica(rubrica: Rubrica) {
    return this.http.put(environment.WS_PATH + "editarRubrica/", rubrica
    );
  }

obtenerListaRubrica(id : number) {
    return this.http.get<any>(
      environment.WS_PATH + "listaRubrica/" + id
    );
  }
  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event() {
    return this.evt$;
  }
 eliminarRubrica(id:Number) {
    return this.http.delete(environment.WS_PATH + "eliminarRubrica/"+ id
    );
}

}



