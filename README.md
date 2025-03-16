# Destacados | invoice | powip

Una solución para ofrecer información relevante y actualizada sobre la empresa, junto con un resumen claro de sus pedidos. 

## Configuración con Docker  🚀

Para construir y ejecutar la aplicación en un contenedor Docker, utiliza los siguientes comandos:


1. **Construir la imagen Docker** 📦  
```bash
docker build -t info-seguimiento-app .
```

2. **Ejecutar el contenedor en segundo plano, mapeando el puerto 3000 y asignándole un nombre** 🐳
```bash
docker run -d -p 3200:3000 --name info-seguimiento-container info-seguimiento-app
```

Accede a la aplicación en http://localhost:3000 y disfruta de tu proyecto de seguimiento e información empresarial. 😎