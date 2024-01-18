## Comment nous avons assuré le minimun de port exposé en production pour la sécurité de notre application:

Nous avons assuré la sécurité de notre application à travers les aspects suivants:
***
1. ***la création d'un sous reseau dans le docker-compose pour isoler l'ensemble de nos microservices dans le demon du docker compose*** : 
Cela permet de ne pas faire tourner nos microservice dans le reseau par defaut du demon du docker-compose et donc d'avoir nos microservice bien isolé dans le docker-compose.Notre application sont donc sécurisée vis à vis des autres applications qui tournent dans le demon du docker-compose.
2. ***la non exposition des ports des differents microservices à l'exterieur du docker-compose*** :
Cela permet aux clients externes de ne pas avoir directement accès à nos microservices qui tournent dans le docker compose ainsi cela securise notre application vis à vis des client externes
3.  ***l'exposition du seul port 80 du microservice Nginx et des redirections vers les resources que nous souhaitons partager depuis l'e xterieur du docker-comopose*** :
dans notre docker-compose le seul port exposé à l'exterieur est le port 80 , c'est par ce port les clients externes passe pour avoir accés à la fois au front de notre application et egalement aux documentations nos api.
Plus manifestement :
* On redirige l'adresse: localhost:80/web  vers l'addresse: localhost:4200
* On redirige l'addresse: localhost:80/api vers la documentation de l'api du microservice de numerisation-des-associations qui a pour addresse: localhost:3000/api
