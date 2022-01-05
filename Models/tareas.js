const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    constructor(){
        this._listado = {};
    }
    cargarTareasFromDB( tareas) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }    

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    get listadoArray() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    listarTareasCompletadas() {

        console.log();
        this.listadoArray.forEach( (tarea, i) => {
            const index = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) 
                                ? 'Completado'.green 
                                : 'Pendiente'.red
            console.log(`${ index } ${ desc } :: ${ estado }`)
        });

    }

    listarPendientesCompletadas( completadas = true ) {

        let contador = 0;
        console.log();
        this.listadoArray.forEach( (tarea, i) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) 
                                ? 'Completado'.green 
                                : 'Pendiente'.red
            
            if ( completadas ) {
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ ( contador + '.' ).green } ${ desc } :: ${ completadoEn }`);
                }
            }else{
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ ( contador + '.' ).green } ${ desc } :: ${ estado }`);
                }
            }
        });
    }
    
    modificarEstadoTarea( ids = [] ){

        ids.forEach( id=>{

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArray.forEach( tarea =>{

            if ( !ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

    borraTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

}

module.exports = Tareas;