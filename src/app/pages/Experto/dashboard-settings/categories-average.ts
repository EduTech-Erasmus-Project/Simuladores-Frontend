import { BasicChart } from "./basic-chart";

export class CategoriesAverage extends BasicChart {

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
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%e. %b',
            year: '%b'
          },
          tickmarkPlacement: 'on',
          title: {
              enabled: true,
              text: 'Fecha'
          }
        },
        yAxis: {
          labels: {
              format: '{value}%'
          },
          title: {
              enabled: true,
              text: 'Promedio [%]'
          }
        },
        tooltip: {
          pointFormat: `
          <table> 
            <tr>
              <td><strong>
                  <span style="color:{black};">{series.name}:
              </strong></td>
              <td><strong> 
                {point.y:.1f}%</span></strong>
              </strong></td>
            </tr>
            <tr>
              <td>Perceptible:</td>
              <td>{point.perceivable:,.0f}%</td>
            </tr>
            <tr>
              <td>Operable:</td>
              <td>{point.operable:,.0f}%</td>
            </tr>
            <tr>
              <td>Comprensible:</td>
              <td>{point.understandable:,.0f}%</td>
            </tr>
            <tr>
              <td>Robusto:</td>
              <td>{point.robust:,.0f}%</td>
            </tr>
          </table>
          `,
          useHTML: true,
          split: false
        },
        plotOptions: {
          area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            },
            accessibility: {
                pointDescriptionFormatter: function (point: any) {
                    return (point.index + 1) + ', ' + point.category + ', ' +
                        point.y + ' millions, ' + point.percentage + '%, ' +
                        point.series.name;
                }
            }
          }
        }

      });
    }

    addSerie(
      name: string, average: number[], dates: number[], perceivable: number[],
      operable: number[], understandable: number[], robust: number[]
    ): void {
      
      let serie: any = {
        name: name,
        data: []
      };

      average.forEach( (value:number, index: number) => {
        let serieDataValues: Object = {
          y: value,
          x: dates[index],
          perceivable: perceivable[index],
          operable: operable[index],
          understandable: understandable[index],
          robust: robust[index]
        };

        serie.data.push(serieDataValues);
      });

      this.addSerieToChart(serie);
    }
}