## Prequis
* Avoir installer docker-compose et docker
```
https://www.youtube.com/watch?v=T2QFG9O4NaQ

```

* Pour utiliser notre application , il faut :
Cloner le projet sur le gitlab de l'istic:
```
$ git clone https://gitlab.istic.univ-rennes1.fr/kangora/numerisation-gestion-des-associations-version2.git

```

## Démarrage de l'application
***

* Pour démarrer l'application en ***mode de développement***, exécutez la commande suivante à partir de la racine de votre projet :
Cela démarrera tous les services définis dans le fichier docker-compose.yml et les rendra disponibles à l'adresse IP de votre ordinateur sur les ports configurés.
```
$ docker-compose up
```

* Pour démarrer l'application en ***mode de production***, vous pouvez utiliser la commande suivante pour construire les images et les démarrer :
```
$ docker-compose -f docker-compose.prod.yml up --build
```

## Arrêt de l'application

Pour arrêter l'application, utilisez la commande  
```docker-compose down ```

## Accès à l'application 
(```https://localhost:80/```: Donne accès a notre page NGINX)
***
* ***Cree le premier utilisateur admin*** : Nous avons proceder ainsi pour que le repertoire ne sois pas trop lourd a telecharger
 aller sur le terminale apres avoir lancé docker-compose up et saisir 
```curl -X POST -d 'firstname=admin&lastname=admin&age=30&password=admin&email=admin@gmail.com' http://localhost:3000/users/```  
 se connecter avec username = admin ; password= admin

* ***se connecter à l'application*** :  
 aller sur ```https://localhost/web```  
 se connecter avec username = admin ; password= admin

* ***creation de user*** :  
depuis Home, vous verrez deux grands bouttons. Cliquer sur ```User``` pour ajouer des users en donnant leur firstname , lastname, age, password et email 

* ***creation d'association*** :   
depuis home cliquer sur ```Association``` pour creer une association en saisisant le nom de l'association et en saisissant les id des users appartenant à l'association.
Automatiquement à la création de l'association un mail est envoyé à chaque pour lui souhaité la bienvenu dans l'association.

* ***attribution de role aux membre d'une association*** :  
depuis le Home cliquer sur ```Association``` ensuite cliquer sur un association pour laquelle vous voulez affecter des roles à ces memebres, cliquer sur les memebres concerner automatiquement un champ role apparait, saisir son role et valider. Ici aussi le memembre recoit un mail lui donnant le role qui lui a été affecté.

* ***creation de proces verbal pour une association*** :  
depuis le Home cliquer sur ```Association``` et suivre les instructions pour creer un proces verbal pour une association

## Modes de développement et de production
***
Il existe deux modes de fonctionnement pour cette application : le mode de développement et le mode de production.

Le mode de développement est destiné à être utilisé pour les développeurs qui souhaitent travailler sur le code source de l'application. Il utilise les fichiers de configuration de développement et les options de redémarrage "unless-stopped" pour faciliter le développement.

Le mode de production est destiné à être utilisé pour déployer l'application sur un serveur de production. Il utilise les fichiers de configuration de production et les options de redémarrage "always" pour garantir la disponibilité de l'application.
