require('colors');
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirm,
        mostrarListadoChecklist
    } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/manipularArchivo');
const Tareas = require('./Models/tareas');

console.clear();

const main = async() => {
    
    let opt = ''
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        //Listar tareas del archivo (DB)
        tareas.cargarTareasFromDB(tareasDB);
    }
    do{

        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //crear tareas
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                
                break;
            case '2':
                //Listar tareas
                // console.log( tareas.listadoArray );
                tareas.listarTareasCompletadas();
                
                break;
            case '3':
                // Tareas completadas
                tareas.listarPendientesCompletadas( true );
                break;     
            case '4':
                // Tareas pendientes
                tareas.listarPendientesCompletadas( false );
                break;
            case '5':
                // Completar tareas
                const ids = await mostrarListadoChecklist( tareas.listadoArray );
                tareas.modificarEstadoTarea(ids);
                break;
            case '6':
                // Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArray );
                if ( id !== '0' ) {
                    const resulConfirm = await confirm('¿Está seguro?');
                    if (resulConfirm) {
                        tareas.borraTarea(id);
                        console.log('Se eliminó con exito!');
                    }else{
                        console.log('La tarea está asalvo.');
                    }
                }
                break;           
        }

        // guardarDB( tareas.listadoArray );

        await pausa();

    }while (opt !== '0') {
        
    }
}

main();