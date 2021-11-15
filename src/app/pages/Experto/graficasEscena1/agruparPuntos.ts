import { BasicChart } from "./basico";
export class agruparPuntos extends BasicChart {
    
    
    constructor(subtitle?: string) {
        super({
          chart: {
            type: 'line',
            height: '500px'
          },
          title: {
            text: 'Promedio entre Categorías'
          },
          subtitle: {
            text: subtitle
          }
        })
    }

    

    

}

