# Kumojin Event Manager / Gestionnaire d'Évènement Kumojin

## Database /  Base de Données
### Database Architecture Diagram / Architecture de la Base de Données
![DB Diagram](docs/kmj-test-db-diagram.png)
### Database Connection / Connexion à la Base de Données


## Client / Client
### Launching Client / Lancement du Client
### Running Client Tests / Exécution des Tests du Client


## Server / Serveur

### Installation / Installation

```bash
$ npm install
```

### Launching Server / Lancement du Serveur

The server is configured to launch on port ```8000```.

Le server est configuré au port  ```8000```.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running Server Tests / Exécution des Tests du Serveur

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Swagger 

Swagger docs are accessible at ```/api/v1.0/docs``` once the server is launched.

La documentation swagger peut être accèdé à ```/api/v1.0/docs```, une fois que le serveur est lancé.

Locally / Localement: http://localhost:8000/api/v1.0/docs.