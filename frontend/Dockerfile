# ---------- Etapa 1: Construcción ----------
FROM node:18-alpine AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos el proyecto para producción
RUN npm run build


# ---------- Etapa 2: Servidor Nginx ----------
FROM nginx:alpine

# Eliminamos la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos nuestro archivo de configuración personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos generados por Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto que servirá el frontend
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
