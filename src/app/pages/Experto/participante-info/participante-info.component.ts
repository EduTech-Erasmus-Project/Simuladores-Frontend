import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ScrollPanel } from 'primeng/scrollpanel';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ActividadInterface } from 'src/app/model/Actividad';
import { Comentario, ComentarioInterface } from 'src/app/model/Comentario';
import { DiscapacidadParticipanteInterface } from 'src/app/model/DiscapacidadParticipante';
import { ExperienciaLaboralInterface } from 'src/app/model/ExperienciaLaboral';
import { Participante, ParticipanteAceptacionTabla } from 'src/app/model/Participante';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

@Component({
    selector: 'app-participante-info',
    templateUrl: './participante-info.component.html',
    styleUrls: ['./participante-info.component.css']
})
export class ParticipanteInfoComponent implements OnInit {

    // PARA LA GRAFICA
    lineData: any;
    barData: any;
    pieData: any;
    radarData: any;
    // PARA LA TABLA 
    customers: Customer[];
    representatives: Representative[];
    statuses: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    //Parametros de URL 
    public correoResponsableDatos: string;
    public ejercitario: number;
    public correoParticipante: string;
    public participanteInformacion: ParticipanteAceptacionTabla;
    public experienciaParticipanteInformacion: ExperienciaLaboralInterface[];
    public discapacidadParticipanteInformacion: DiscapacidadParticipanteInterface[];
    public actividadesParticipanteEjercitario: ActividadInterface[];
    public newComentarioParticipanteEjercitario: string = "";
    public actividadSeleccionada: ActividadInterface;
    public listadoComentariosActividad: ComentarioInterface[];
    public comentarioPariticipanteHabilitar = false;
    public habilitarComentarioNuevo = false;

    

    constructor(private _Activatedroute: ActivatedRoute,
        private usuarioService: InformacionParticipanteService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.informacionUsuario();
        //Recuperacion valores por URL 
        this.correoResponsableDatos = this._Activatedroute.snapshot.paramMap.get("correo");
        this.ejercitario = Number(this._Activatedroute.snapshot.paramMap.get("idEjercitario"));
        this.correoParticipante = this._Activatedroute.snapshot.paramMap.get("correoEstudiante");
        //Informacion del participante para el formulario
        this.obtenerInformacionParticipante();
        this.obtenerExperienciaLaboralParticipante();
        this.obtenerDiscapacidadesDelParticipante();
        //Para la tabla de intentos
        this.tablaEstudiantesIntentos();
        // PARA LA GRAFICA 
        this.graficaVSnotaVStimepo();
        this.graficaRadarSpiderman();
    }

    graficaVSnotaVStimepo(){
        //ATRIBUTOS PARA LA GRAFICA
        var labelsIntentosNotasTiempo =  [];
        var valuesIntentosNotas =  [];
        var valuesIntentosTiempo =  [];

        this.usuarioService.recuperarParticipantesIntentosEjercitario(this.correoParticipante, this.ejercitario)
        .then(actividades => {
            actividades.forEach(actividadLabel => {
                const datepipe: DatePipe = new DatePipe('en-US')
                let formattedDate = datepipe.transform(actividadLabel.fechaDeActividad, 'YYYY-MM-dd')
                labelsIntentosNotasTiempo.push(formattedDate)
                valuesIntentosNotas.push(actividadLabel.calificacionActividad)
                valuesIntentosTiempo.push(actividadLabel.tiempoTotalResolucionEjercitario)
            });
           
            
            if(this.selGrafica1.value == "Tiempo"){  
                
                this.lineData = {
                    labels: labelsIntentosNotasTiempo,
                    datasets: [
                        {
                            label: 'Tiempo',
                            data: valuesIntentosTiempo,
                            fill: false,
                            backgroundColor: 'rgb(66, 201, 225)',
                            borderColor: 'rgb(149, 225, 102)'
                        }
        
                    ]
                };
            }else{
                this.lineData = {
                    labels: labelsIntentosNotasTiempo,
                    datasets: [
                        {
                            label: 'Nota',
                            data: valuesIntentosNotas,
                            fill: false,
                            backgroundColor: 'rgb(66, 201, 225)',
                            borderColor: 'rgb(149, 225, 102)'
                        }
        
                    ]
                };
            }
            
        });

        

    }

    graficaRadarSpiderman(){
        var discapacidadesParticipante = []
        var gradodiscapacidadesParticipante = [0,0,0,0,0]
        this.usuarioService.obtenerDiscapacidadesDelParticipante(this.correoParticipante)
            .then(discapacidades => {
                
                discapacidades.forEach(discapacidad => {
                    discapacidadesParticipante.push(discapacidad.tipoDiscapacidad);
                    if(discapacidad.tipoDiscapacidad == 'Visual'){
                        gradodiscapacidadesParticipante[0] = discapacidad.gradoDeDiscapacidad
                    }else if(discapacidad.tipoDiscapacidad == 'Intelectual'){
                            gradodiscapacidadesParticipante[1] = discapacidad.gradoDeDiscapacidad
                    }else if(discapacidad.tipoDiscapacidad == 'Fisica'){
                        gradodiscapacidadesParticipante[2] = discapacidad.gradoDeDiscapacidad
                    }else if(discapacidad.tipoDiscapacidad == 'Auditiva'){
                        gradodiscapacidadesParticipante[3] = discapacidad.gradoDeDiscapacidad
                    }else if(discapacidad.tipoDiscapacidad == 'Otros'){
                        gradodiscapacidadesParticipante[4] = discapacidad.gradoDeDiscapacidad
                    }
                });
                
                this.radarData = {
                    labels: ['Visual', 'Intelectual', 'Física', 'Auditiva', 'Otros'],
                    datasets: [
                        {
                            label: discapacidadesParticipante,
                            backgroundColor: 'rgba(202, 106, 199,0.8)',
                            borderColor: 'rgba(66, 201, 225)',
                            pointBackgroundColor: 'rgb(149, 225, 10)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(149, 225, 102)',
                            data: gradodiscapacidadesParticipante
                        },
        
                    ]
        
        
                };
            });

        
    }

    informacionUsuario() {
        this.participanteInformacion = {
            id: 0,
            email: "",
            password: "",
            nombre: "",
            apellido: "",
            telefono: "",
            pais: "",
            ciudad: "",
            direccion: "",
            estado: "",
            fechaNacimiento: "",
            carreraUniversitaria: "",
            genero: "",
            numeroDeHijos: 0,
            estadoCivil: "",
            etnia: "",
            estudiosPrevios: "",
            codigoEstudiante: "",
            nivelDeFormacion: "",
            aceptacionPendianteResponsable: "",
            responsable: null
        };

        this.actividadSeleccionada = {
            idActividad: 0,
            comentario: "",
            tiempoInicio: "",
            tiempoFin: "",
            tiempoTotalResolucionEjercitario: 0,
            fechaDeActividad: "",
            totalRespuestasCorrectasIngresadasParticipante: 0,
            numeroTotalDeRespuestasContestadasPorElParticipante: 0,
            numeroTotalDePreguntasDelEjercitario: 0,
            calificacionActividad: 0,
            ActividadPorEjercitario_id: 0,
            ActividadDeParticipante_id: 0,
        }
    }

    obtenerInformacionParticipante() {
        this.usuarioService.obtenerInformacionUsuario(this.correoParticipante)
            .toPromise()
            .then(usuario => usuario as ParticipanteAceptacionTabla)
            .then(participante => this.participanteInformacion = participante);
    }

    obtenerExperienciaLaboralParticipante() {
        this.usuarioService.obtenerExperienciaLaboralUsuario(this.correoParticipante)
            .then(experiencia => this.experienciaParticipanteInformacion = experiencia);

    }

    obtenerDiscapacidadesDelParticipante() {
        this.usuarioService.obtenerDiscapacidadesDelParticipante(this.correoParticipante)
            .then(discapacidad => this.discapacidadParticipanteInformacion = discapacidad);

    }

    // METODO DE TABLA 
    tablaEstudiantesIntentos(): void {
        ///// PARA LA TABLA 
        this.usuarioService.recuperarParticipantesIntentosEjercitario(this.correoParticipante, this.ejercitario)
            .then(actividades => {
                this.actividadesParticipanteEjercitario = actividades;
                this.loading = false;
            });
    }

    clear(table: Table) {
        table.clear();
    }

    //Comentarios y feedBack
    verActvidadPariticipante(actividad: ActividadInterface) {
        this.habilitarComentarioNuevo = true;
        this.actividadSeleccionada = actividad;
        this.usuarioService.obtenerComentariosActividadRealizada(actividad.idActividad)
            .then(comentarios => this.listadoComentariosActividad = comentarios);
        if (actividad.comentario != null) {
            this.comentarioPariticipanteHabilitar = true;
        } else {
            this.comentarioPariticipanteHabilitar = false;
        }
    }

    agregarComentario(scroll: ScrollPanel) {
        let date: Date = new Date();
        var comentarioNuevo: Comentario = new Comentario(this.newComentarioParticipanteEjercitario, date, this.actividadSeleccionada);
        console.log("aqiiiiiiiiii")
        this.confirmationService.confirm({
            key: 'agregarComentario',
            message: 'Agregar nuevo Comentario',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
               
                this.usuarioService.agregarNuevoComentarioActividadParticipante(comentarioNuevo)
                this.listadoComentariosActividad.unshift(
                    {
                        idComentario :  0,
                        comentario: this.newComentarioParticipanteEjercitario, 
                        fechaComentario: date.toDateString(),
                        comentarioActividad_id: 0
                    });
                scroll.refresh()
                this.messageService.add({ key: 'addComentTOAST', severity: 'success', summary: 'Comentario agregado', detail: 'El comentario a sido agregado correctamente' });
                
            },
            reject: () => {
                this.messageService.add({ key: 'addComentTOAST', severity: 'error', summary: 'Acción Cancelada', detail: 'La acción no se llevo a cabo' });
            }
        });
        
    }

    // PARA SELECT DE GRAFICA tIPO DE DISCAPACIDAD GENERAL 
    selGrafica1: any = {name: 'Notas', value: 'Notas'};

    opciones: any[] = [
        { name: 'Notas', value: 'Notas' },
        { name: 'Tiempo', value: 'Tiempo' }
    ];

    ////////


}
