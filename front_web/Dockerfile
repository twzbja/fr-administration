# Stage de construction
FROM node:16 as build

WORKDIR /twzbja/front_web/src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm install -g @angular/cli@15.0.4

COPY . .

# Build de l'application Angular
RUN npm run build

# Stage de production
FROM nginx:latest

# Copie des fichiers de build depuis le stage de construction vers le serveur Nginx
COPY --from=build /dist/* /usr/share/nginx/html/

# Configuration Nginx directement dans le Dockerfile
RUN echo ' \
    worker_processes 1;\n \
    events {\n \
        worker_connections 1024;\n \
    }\n \
    http {\n \
        include mime.types;\n \
        default_type application/octet-stream;\n \
        sendfile on;\n \
        server {\n \
            listen 80;\n \
            location / {\n \
                root /usr/share/nginx/html;\n \
                index index.html;\n \
            }\n \
            location /front {\n \
                alias /usr/share/nginx/html;\n \
                try_files $uri $uri/ /index.html;\n \
            }\n \
            location /api {\n \
                # Configurez cela selon vos besoins\n \
                proxy_pass http://backend:3000;\n \
                proxy_set_header Host $host;\n \
                proxy_set_header X-Real-IP $remote_addr;\n \
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n \
            }\n \
            error_page 404 /index.html;\n \
        }\n \
    }' > /etc/nginx/nginx.conf

# Expose le port 80, le port par défaut pour le trafic HTTP
EXPOSE 80

# Commande pour démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
