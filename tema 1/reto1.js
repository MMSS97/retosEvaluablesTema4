const fs = require('fs')


let persona = {name:"Jose Antonio",
            surname:"Arribas Pacios",
            age: 14
}

fs.writeFile('personas.json', JSON.stringify(persona, null, 2), 'utf8', (error) =>{
    fs.readFile('personas.json',('utf8'),(error, data) => {
        let persona = JSON.parse(data);
        console.log ('nombre:', persona.name)
        console.log('salió según lo planeado')   
    })
}
)