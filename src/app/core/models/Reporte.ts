import * as moment from "moment";
import { Reporte } from "../interfaces/Reporte";
import { environment } from "src/environments/environment";

export class ReportePdf {
  public pageOrientation: "portrait" | "landscape" = "portrait";
  private reporte: Reporte;

  constructor(reporte: Reporte) {
    this.reporte = reporte;
  }

  private footer = (currentPage, pageCount) => {
    return {
      layout: "noBorders",
      margin: [20],
      table: {
        alignment: "center",
        headerRows: 1,
        widths: ["*", "*"],
        body: [
          [
            {
              text: moment().format("DD-MM-YYYY"),
            },
            {
              text: currentPage.toString() + " de " + pageCount,
              alignment: "center",
            },
          ],
        ],
      },
    };
  };

  private get header() {
    let header = {
      alignment: "center",
      margin: [50, 15, 50, 0],
      layout: "noBorders",
      table: {
        alignment: "center",
        widths: ["auto", "*", "*"],
        body: [
          [
            {
              image: "erasmus-logo",
              alignment: "right",
              height: 60,
              width: 60,
            },
            {
              image: "ups-logo",
              height: 60,
              width: 140,
              alignment: "right",
              //fit: [75, 75],
            },
            {
              image: "uda-logo",
              height: 60,
              width: 60,
              alignment: "right",
            },
          ],
        ],
      },
    };
    return header;
  }

  public docDefinition() {
    // if (!this._data) {
    //   throw new Error("No data to generate report");
    // }

    const docDefintion = {
      pageOrientation: this.pageOrientation,
      header: this.header,
      footer: this.footer,
      content: [
        {
          alignment: "center",
          margin: [5, 5, 5, 15],
          layout: "noBorders",
          style: "table",
          table: {
            alignment: "center",
            headerRows: 6,
            widths: ["*", "auto", "*", "auto", "*"],
            body: [
              [
                {
                  image: "perfil",
                  height: 75,
                  width: 75,
                  alignment: "center",
                  rowSpan: 6,
                },
                { text: "Nombre:", alignment: "right" },
                {
                  text:
                    (this.reporte.usuario.nombre || "") +
                    " " +
                    (this.reporte.usuario.apellido || ""),
                  alignment: "left",
                },
                {
                  text: "Fecha de nacimiento:",
                  alignment: "right",
                },
                {
                  text: moment(this.reporte.usuario.fechaNacimiento).format(
                    "DD-MM-YYYY"
                  ),
                  alignment: "left",
                },
              ],
              [
                {},
                { text: "Genero:", alignment: "right" },
                { text: this.reporte.usuario.genero || "-", alignment: "left" },
                { text: "Correo:", alignment: "right" },
                { text: this.reporte.usuario.email, alignment: "left" },
              ],
              [
                {},
                { text: "Dirección:", alignment: "right" },
                {
                  text:
                    (this.reporte.usuario.pais || "-") +
                    " - " +
                    (this.reporte.usuario.ciudad || "-") +
                    " - " +
                    (this.reporte.usuario.direccion || "-"),
                  alignment: "left",
                },
                { text: "Telefono:", alignment: "right" },
                {
                  text: this.reporte.usuario.telefono || "-",
                  alignment: "left",
                },
              ],
              [
                {},
                { text: "Estado civil:", alignment: "right" },
                {
                  text: this.reporte.usuario.estadoCivil || "-",
                  alignment: "left",
                },
                { text: "Etnia:", alignment: "right" },
                { text: this.reporte.usuario.etnia || "-", alignment: "left" },
              ],
              [
                {},
                { text: "Nivel de educación:", alignment: "right" },
                {
                  text: this.reporte.usuario.nivelDeFormacion || "-",
                  alignment: "left",
                },
                { text: "Carrera Universitaria:", alignment: "right" },
                {
                  text: this.reporte.usuario.carreraUniversitaria || "-",
                  alignment: "left",
                },
              ],
              [
                {},
                { text: "Estudios previos:", alignment: "right" },
                {
                  text: this.reporte.usuario.estudiosPrevios || "-",
                  alignment: "left",
                },
                {},
                {},
              ],
            ],
          },
        },
        {
          text: "Informe de resultados:",
          alignment: "left",
          fontSize: 12,
          bold: true,
        },
        {
          text: "Competencia: " + this.reporte.competencia.titulo,
          alignment: "center",
          fontSize: 12,
          bold: true,
        },

        {
          layout: "headerLineOnly",
          margin: [5, 15, 5, 15],
          table: {
            headerRows: 1,
            widths: ["*", "*", "auto", "auto", "*"],

            body: [
              [
                "Nivel",
                "Estado",
                "Fecha de aprobación",
                { text: "Calificación Final", alignment: "right" },
                { text: "Intentos", alignment: "right" },
              ],

              ...this.reporte.competencia.niveles.map((nivel: any) => [
                { text: nivel.label },
                { text: nivel.estado },
                { text: nivel?.fecha ? moment(nivel.fecha).format("DD-MM-YYYY") : "--/--/----" },
                { text: nivel.calificacion, alignment: "right" },
                { text: nivel.intentos, alignment: "right" },
              ]),
            ],
          },
        },

        {
          text: "Reumen de Actividades:",
          alignment: "left",
          fontSize: 12,
          bold: true,
        },

        // ...this.reporte.competencia.niveles.map((nivel:any) => {
        //   return {
        //     text: nivel.label,
        //     alignment: "center",
        //     fontSize: 12,
        //     bold: true,
        //   };
        // }),

        {
          text: this.reporte.competencia.niveles[0].label,
          alignment: "center",
          fontSize: 12,
          bold: true,
        },

        {
          layout: "headerLineOnly",
          margin: [5, 15, 5, 15],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "*", "*", "*"],

            body: [
              [
                { text: "Intento", alignment: "right" },
                "Preguntas Correctas",
                "Fecha",
                { text: "Timepo", alignment: "right" },
                { text: "Nota", alignment: "right" },
              ],

              ...this.reporte.competencia.niveles[0].actividades.map(
                (intento: any, idx: number) => [
                  { text: idx + 1, alignment: "right" },
                  {
                    text:
                      intento.preguntasCorrectas + "/" + intento.totalPreguntas,
                  },
                  { text: moment(intento.fecha).format("DD-MM-YYYY") },
                  { text: intento.tiempoTotal + " Min.", alignment: "right" },
                  { text: intento.calificacion, alignment: "right" },
                ]
              ),
            ],
          },
        },

        {
          text: this.reporte.competencia.niveles[1].label,
          alignment: "center",
          fontSize: 12,
          bold: true,
        },

        {
          layout: "headerLineOnly",
          margin: [5, 15, 5, 15],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "*", "*", "*"],

            body: [
              [
                { text: "Intento", alignment: "right" },
                "Preguntas Correctas",
                "Fecha",
                { text: "Timepo", alignment: "right" },
                { text: "Nota", alignment: "right" },
              ],

              ...this.reporte.competencia.niveles[1].actividades.map(
                (intento: any, idx: number) => [
                  { text: idx + 1, alignment: "right" },
                  {
                    text:
                      intento.preguntasCorrectas + "/" + intento.totalPreguntas,
                  },
                  { text: moment(intento.fecha).format("DD-MM-YYYY") },
                  { text: intento.tiempoTotal + " Min.", alignment: "right" },
                  { text: intento.calificacion, alignment: "right" },
                ]
              ),
            ],
          },
        },

        {
          text: this.reporte.competencia.niveles[2].label,
          alignment: "center",
          fontSize: 12,
          bold: true,
        },

        {
          layout: "headerLineOnly",
          margin: [5, 15, 5, 15],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "*", "*", "*"],

            body: [
              [
                { text: "Intento", alignment: "right" },
                "Preguntas Correctas",
                "Fecha",
                { text: "Timepo", alignment: "right" },
                { text: "Nota", alignment: "right" },
              ],

              ...this.reporte.competencia.niveles[2].actividades.map(
                (intento: any, idx: number) => [
                  { text: idx + 1, alignment: "right" },
                  {
                    text:
                      intento.preguntasCorrectas + "/" + intento.totalPreguntas,
                  },
                  { text: moment(intento.fecha).format("DD-MM-YYYY") },
                  { text: intento.tiempoTotal + " Min.", alignment: "right" },
                  { text: intento.calificacion, alignment: "right" },
                ]
              ),
            ],
          },
        },
      ],
      images: {
        "erasmus-logo":environment.HOST + "/assets/img/logos/EduTech.png",
        "ups-logo": environment.HOST + "/assets/img/logos/UPSLarge.png",
        "uda-logo": environment.HOST + "/assets/img/logos/UDAzu.png",
        "perfil": this.reporte?.usuario?.img
          ? environment.WS_PATH.replace("/api/", this.reporte.usuario.img)
          : environment.HOST + "/assets/img/noimage.png",
      },

      styles: {
        table: {
          //margin: [0, 0, 0, 0],
          fontSize: 11,
        },
        tableHeader: {
          bold: false,
          //margin: [0, 25 / 3, 0, 0],
        },
        tableCell: {
          margin: [0, 100, 0, 0],
        },
        // sectionHeader: {
        //   bold: true,
        //   decoration: 'underline',
        //   fontSize: 14,
        //   margin: [0, 15, 0, 15],
        // },
      },
      pageMargins: [30, 100, 30, 30],
    };

    return docDefintion;
  }
}
