const bcrypt = require('bcrypt');

async function verifyHash(){
    const myPassword = '123QABC';
    const hashCreated = '$2b$10$6cV6XBlY.vfzty4UvLaEu.l2ReW/H32kb4u9qds0bOIqQ0n7jYtQe'
    //const hash = await bcrypt.hash(myPassword, 10);
    const isMath = await bcrypt.compare(myPassword, hashCreated);
    console.log(isMath);
}

verifyHash();