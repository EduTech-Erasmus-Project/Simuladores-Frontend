import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "src/environments/environment";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {
    //console.log("pipe", value);
    //console.log(environment.WS_PATH.replace('/api/', value));
    return value ? environment.WS_PATH.replace('/api/', value) :'assets/img/noimage.png';
  }

}
