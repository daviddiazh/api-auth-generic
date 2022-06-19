const bcrypt = require('bcrypt');

async function hash(){
    const myPassword = '123QABC';
    const hash = await bcrypt.hash(myPassword, 10);
    console.log(hash);
}

hash();