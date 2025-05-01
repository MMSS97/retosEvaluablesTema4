const fs = require('fs/promises')
const readline = require ('node:readline/promises')
const {stdin: input, stdout: output} = require('node:process')
const { findPackageJSON } = require('node:module')

let persona = {name:"Jose Antonio",
    surname:"Arribas Pacios",
    age: 14
}


// / usando then/catch



fs.writeFile('personas.json',JSON.stringify(persona))
.then( () => {
    return fs.readFile('personas.json', 'utf8')
})
.then(data=>{
    console.log(JSON.parse(data))
})
.catch(err=>{
    console.log(err)
})


///Usando async/await

async function personaAsync(){
    try {await fs.writeFile('persona.json',JSON.stringify(persona))
    const lecturaPersona = await fs.readFile('persona.json', 'utf8')
    console.log(JSON.parse(lecturaPersona))
    }
    catch (error) {
        console.log(error);
    }
    
}
personaAsync()



///usando readine/promises

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function nuevaPersona(){
    try{const nombre = await rl.question('dime tu nombre: ')
        const apellido = await rl.question('dime tus apellidos: ')
        const edad = await rl.question('dime tu edad: ')
        console.log(`guardadndo como \nname: ${nombre} \nsurname: ${apellido} \nage:  ${edad} years old `)
        const newPerson = {
            nombre, apellido, edad};
            let datos = [];
            try{
                const leerPersona = await fs.readFile('persona.json', 'utf8')
                datos = JSON.parse(leerPersona)}
                catch (error) {
                    if (error.code === 'ENOENT') {
                        console.log('Creando nuevo archivo de datos');
                    } else {
                        console.log('error al leer el archivo:', error);
                    }
                }
            
        datos.push(newPerson)
        await fs.writeFile('persona.json', JSON.stringify(datos))
        console.log('Datos guardados en persona.json');

        
    }catch (error){
        console.log('ocurrio un error', error)
    }
    finally {
        rl.close()
    }
}

nuevaPersona()