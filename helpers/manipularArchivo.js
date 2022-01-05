const fs = require('fs');

const paht = './db/data.json'

const guardarDB = ( data ) => {
    fs.writeFileSync(paht, JSON.stringify(data));
}

const leerDB = () => {
    if ( !fs.existsSync(paht) ) {
        return null;
    }
    const info = fs.readFileSync(paht, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}