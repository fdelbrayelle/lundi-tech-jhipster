# Lundi technique - JHipster

Ce dépôt contient les [slides](https://github.com/fdelbrayelle/lundi-tech-jhipster/blob/master/slides) et la [démo](https://github.com/fdelbrayelle/lundi-tech-jhipster/blob/master/demo) du midi technique effectué le lundi 7 octobre 2019 en interne à Ippon Technologies Lille.

Le sujet est centré sur l'outil JHipster qui permet de générer des applications web modernes. Après une courte présentation de ce qu'il est possible de faire et générer (frontend avec Angular ou React, backend avec Spring Boot notamment), une démo a été effectuée pour générer un monolithe et la possibilité de générer des microservices a été développée.

Les supports peuvent être librement modifiés et réutilisés. Les slides ont également été [exportés au format PDF](https://github.com/fdelbrayelle/lundi-tech-jhipster/blob/master/slides/presentation.pdf).

## Étapes de la démo

- Supprimer le dossier si existant : `rm -rf demo`
- Vérifier les versions de jhipster, node et java
- Créer le dossier "demo" : `mkdir demo && cd demo`
- Générer un monolithe via JHipster : `jhipster`
- Constater que le dépôt git local a été initialisé : `ls .git`
- Constater la présence d'un README : `cat README.md`
- Ouvrir le projet généré dans IntelliJ (ou tout autre IDE) : `idea . &`, `code . &`, ...
- Présenter l'architecture des fichiers (REST, services, repositories...)
- Lire le fichier Yeoman qui permet de ne pas répondre à nouveau aux questions du générateur : `cat .yo-rc.json`
- Lire le formateur de fichiers : `cat .editorconfig`
- Lancer l'application : `./mvnw` et `npm start`
- Tester l'application : `gio open http://localhost:9000`
- Génération d'un modèle objet via [JDL Studio](https://start.jhipster.tech/jdl-studio) : `jhipster import-jdl ../jhipster-jdl-demo.jh`
- Génération d'une entité seule : `jhipster entity <nom_entite>`
- Lire certaines entités du dossier caché .jhipster : `ls .jhipster`
- Constater que Java 11 est compatible avec JHipster 6 : mettre "11" en valeur pour `java.version` à 11 dans le `pom.xml` à la racine puis lancer un `./mvnw`
- Présenter quelques fichiers de configuration : `ls src/main/resources` (configuration générale par environnement, Liquibase...)
- Présenter la possibilité de générer un livrable WAR ou JAR
- Vérifier l'absence de Dockerfile : `ls src/main/docker` (depuis JHipster 6 avec l'utilisation de [Jib](https://github.com/GoogleContainerTools/jib))
- Utiliser Sonar : `docker-compose -f src/main/docker/sonar.yml up` puis `./mvnw sonar:sonar -Dsonar.host.url=http://localhost:9001` et `gio open http://localhost:9001`
- Générer une image Docker : `./mvnw -Pprod verify jib:dockerBuild` (démon local Docker) ou `./mvnw -Pprod verify jib:build` (avec Docker Hub)
- Utiliser Kubernetes : `cd .. && mkdir k8s && cd k8s && jhipster kubernetes` puis suivre les instructions listées à l'écran
- Déployer sur Heroku : `heroku login` puis `jhipster heroku` et `heroku logs` ...mais aussi sur Google Cloud Platform, non montré dans la démo :(
- Présenter les possibilités offertes pour les microservices
- Utiliser docker-compose : `cd .. && mkdir docker-compose && cd docker-compose && jhipster docker-compose` puis `docker-compose up`
