## NOTRE ARCHITECTURE

Notre architecture est caracterisé par les points suivants:  
* elle est ```dockerisé``` :  Cela facilite la mise en production de notre application en resolvant les problemes d'incompatibilité de dependances entre le milieu de developpement et de production
* elle est ```microservice``` :  Cela nous permet de gagner en modularité, en scalabilité et de facilité les mises à jours de notre application : on pourra faire des mises à jour dans le milieu de production sans coupure du service
* elle admet un ```microservice gateway``` :  L'ajout d'une gateway permet de sécuriser notre application en empechant l'accès direct aux ressources de notre application
* elle utilise un ```UN MOM``` pour decoupler certains microservice :  Cela nous permet d'unifier le service d'envoie de mail en chargeant un seul microservice à cette tache.

## ARCHITECTURE POSSIBLE ET LEURS COMPROMIS

***
* ***architecture non dockerisé*** :  cela pourrait poser beaucoup de probleme d'incompatibilité de dependance dans le milieu de production.  L'application peut bien marché dans le milieu de developpement et une fois dans le milieu de production bugger ou mal fonctionner à cause des incompatibilité eventuel de dependance.
* ***architecture monolite*** :   Cela faciliterais les test de l'applications mais rendra difficile la mise en echelle et les mise à jour de notre application . Il serais difficile de faire une mise à jour sans coupure du service
* ***une architecture sans gateway*** :   Cela laissera trop de ports ouvert et exposera nos differents api au grand public et facilitera les attacques sur notre application.
* ***une architecture sans MOM*** :   Cela rendrais l'unification du service d'envoie de mail impossible

