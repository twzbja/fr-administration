# PRESENTATION DES DIFFERENTS SERVICES DE L'ARCHITECTURE
***
Notre architecture est composées des  six servivices suivant:
*   **Nginx** : qui joue le role de getway pour l'ensemble des autres service
*   **Web** : qui est front-end de notre application ; c'est ce service qui fait l'interface entre les clients externes (les navigateurs et autres clients web)
*   **Numerisation-des-associations** : c'est l'api de base de notre application ; il fourni les endpoints necessaires à la gestion de la numerisation des associations ;
*   **SwaggerUI** : c'est l'interface de notre api, il permet de voir les differents endpoints que nous avons configurer et comment ceux-ci recoivent des parametres
*   **messageManager** : c'est un api supplementaire à notre application qui doit ouvrir les api necessaire à la gestion des messages brocast au sein d'une association.
*   **Rabbitmq** : qui joue le role de serveur de message oriented middleweare qui permet de decoupler le service chargé de la distribution des mails et les services envoyant ces mails 
*   **MessageSender** : c'est le microservice à base de quarkus qui gere l'envoie des mails aux destinataire
# DESCRIPTION DES DIFFERENTS SERVICES DE L'ARCHITECTURE
Decrivons ces microservices en terme de role, services offerts , services consommés :
## Nginx
***
* **Role** : Assure la sécurité de notre application : en fermant les ports d'accès directe aux differents microservices qui tournent dans notre application, ouvrant un port d'accès au front end qui le point d'entré de notre application et en faisant une redirection de monsite.fr sur localhost
* **Services Offerts** : securité et proxy reverse
* **Services Consommés** : neant
## Web
* **Role** : permet aux clients (navigateurs ...) de consommer l'ensembles des services offert par notre application qui est la gestion numerique des associations à travers des pages web .
* **Services Offerts** : la gestion graphique des associations: acces aux pages web permettat de gerer les associations 
* **Services Consommés** : l'api Numerisation-des-associations qui lui fournir les interfaces CRUD de gestion des associations , l'api MessageManager qui lui fourni les messages brodcast qui doivent etre affiché sur le profil des membres d'une association
## Numerisation-des-associations
* **Role** : fourni à travers des endpoint les interfaces CRUD des differents modules user , association , role et proces_verbal aux front-end web de l'application 
* **Services Offerts** : Interfaces CRUD(endpoint) des differents modules des classe metiers
* **Services Consommés** : Rabbitmq (pour envoyer indirectement des message de notifications des changement operés dans les associations aux differents membres de l'association comme la creation d'une association , l'attribution de role au membre d'une association) 
## SwaggerUI
* **Role** :  SwaggerUI est utilisé pour documenter les API REST, permettant aux développeurs de comprendre les endpoints disponibles, les paramètres d'entrée et les réponses attendues. Il permet également aux développeurs de tester les appels d'API directement à partir de l'interface de documentation. 
* **Services Offerts** : il offre une interface utilisateur pour visualiser et tester les API REST. Il génère également une documentation interactive qui peut être utilisée par les développeurs pour comprendre et utiliser les API.
* **Services Consommés** : il consomme les spécifications de l'API en utilisant OpenAPI, pour générer la documentation interactive. Il peut consomme également les API REST pour tester les appels et afficher les résultats.
## MessageManger
* **Role** : permet de sauvegarder les message brocast d'un membre de l'association envers les autres membres pour par la suite: envoyer ces message indirectement vers les mails des membres de l'associations et mettre ces messages à travers des endpoints à la disposition du front pour etre affiché sur les profils des membres de l'association
* **Services Offerts** : service d'envoie de message brocast ecris par un membre d'une association (sur les profils et mail des autres membres de l'association)
* **Services Consommés** : rabbitmq pour envoyer les mail sur une queue de rabbitmq
## Rabbitmq 
* **Role** : permet de decoupler les services qui envoie des mails et le reservice qui distribut ces mail.
* **Services Offerts** : une interface pour permettre au deux microservice precedent de pusher des messages sur des queues et une interface pour permettre au microservice quarkus de les consommer et les traiter  
* **Services Consommés** : neant 
## MessageSender
* **Role** : Se charge de dispacher les messages envoyés qu'il consomme sur les queues de rabbitmq ;
* **Services Offerts** : distribution de mail aux differents destinataires
* **Services Consommés** : rabbitmq pour consommer les messages à achever

