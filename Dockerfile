# Usa una imagen con Java 21
FROM eclipse-temurin:21-jdk

# Expone el puerto
EXPOSE 8080

# Directorio de trabajo
WORKDIR /root

# Copia los archivos de Maven y descarga dependencias
COPY pom.xml /root
COPY .mvn /root/.mvn
COPY mvnw /root
RUN ./mvnw dependency:go-offline

# Copia el código fuente y construye el .jar
COPY src /root/src
RUN ./mvnw clean package -DskipTests

# Copia el .jar generado y lo renombra a app.jar
COPY target/login-0.0.1-SNAPSHOT.jar app.jar

# Copia wait-for-it.sh al contenedor y lo hace ejecutable
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

# Comando de inicio: espera a MySQL y luego arranca la app
ENTRYPOINT ["./wait-for-it.sh", "mysql_database:3306", "--timeout=60", "--strict", "--", "java", "-jar", "app.jar"]
