# API for managment Auth of users
Para correr localmente este proyecto, se necesita una base de datos mongoDB
```
docker-compose up -d
```

* El -d, significa __detached__

* La URL de MongoDB Local: 
```
    mongodb://localhost:27017/testAuth
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Reconstruir los modulos de node y levantar el servidor de node con express
```
    npm i || npm install
```

