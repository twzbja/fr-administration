
## Options de Configurations

Elles sont les suivantes :
***
*   **Les données nécessaires à la connexion à la base de données comprennent le nom d'utilisateur, le mot de passe, le nom de la base de données, l'adresse IP et le port.**

*   **LLes services utilisent divers ports tels que POSTGRES_PORT, API_PORT, WEB_PORT, NGINX_PORT, RABBITMQ_PORT, QUARKUS_PORT, CADVISOR_PORT, PROMETHEUS_PORT et GRAFANA_PORT.**

*   **Les adresses IP associées aux services comprennent API_HOST et POSTGRES_HOST.**

*   **Les informations de connexion à RabbitMQ nécessitent une URL, un nom d'utilisateur et un mot de passe.**

*   **Les fichiers de configuration pour les services se trouvent à différents emplacements, notamment dans les fichiers de configuration de Nginx, Cadvisor et Grafana.**

*   **Les options de redémarrage sont définies pour chaque service.**

*   **Les commandes d'exécution pour les services varient, par exemple, avec npm run start:dev, npm run start, etc.**

*   **Les services ont des dépendances les uns envers les autres. Par exemple, le service API dépend du service DB et RabbitMQ.**

*   **Chaque service nécessite le montage de volumes spécifiques.**





