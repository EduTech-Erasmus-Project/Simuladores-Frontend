import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ComentarioService {
  constructor(private http: HttpClient) {}

  comentarios(idActividad: number): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "comentarios/" + idActividad
    );
  }

  comentar(comentario: any): Observable<any> {
    return this.http.post<any>(environment.WS_PATH + "comentar/", comentario);
  }
}
