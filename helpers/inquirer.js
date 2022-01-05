const { read } = require('fs');
const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log('+----------------------+'.green);
    console.log(`${ '|'.green } ${ 'Selecione una opción'.white} ${ '|'.green }`);
    console.log('+----------------------+\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question) 
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'.red;
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) =>{

        let index = `${ i + 1 }`.green; 
        return{
            value: tarea.id,
            name: `${ index } ${ tarea.desc }`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const question = {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }

    const { id } = await inquirer.prompt(question);
    return id;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) =>{

        let index = `${ i + 1 }`.green; 
        return{
            value: tarea.id,
            name: `${ index } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    })

    const question = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecione',
        choices
    }

    const { ids } = await inquirer.prompt(question);
    return ids;
}
const confirm = async( message ) =>{
    const questions = {
        type: 'confirm',
        name: 'confirm',
        message
    }

    const { confirm } = await inquirer.prompt(questions);
    return confirm;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoChecklist,
    confirm
}