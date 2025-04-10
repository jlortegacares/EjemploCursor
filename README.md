# Proyecto NestJS con Arquitectura Hexagonal

Este proyecto es una implementación de una API REST utilizando NestJS y siguiendo los principios de la Arquitectura Hexagonal (también conocida como Ports and Adapters).

## 🏗️ Arquitectura

El proyecto está estructurado siguiendo los principios de la Arquitectura Hexagonal:

```
src/
├── application/          # Capa de aplicación
│   ├── dtos/           # Objetos de transferencia de datos
│   ├── mappers/        # Mapeadores entre capas
│   ├── services/       # Servicios de aplicación
│   └── use-cases/      # Casos de uso
├── domain/             # Capa de dominio
│   ├── entities/       # Entidades del dominio
│   ├── interfaces/     # Interfaces (puertos)
│   ├── value-objects/  # Objetos de valor
│   └── exceptions/     # Excepciones del dominio
├── infrastructure/     # Capa de infraestructura
│   ├── config/        # Configuraciones
│   ├── controllers/   # Controladores (adaptadores primarios)
│   ├── persistence/   # Implementaciones de persistencia
│   └── adapters/      # Otros adaptadores
└── shared/            # Código compartido
```

## 🚀 Tecnologías

- NestJS
- TypeScript
- MongoDB (con Mongoose)
- Arquitectura Hexagonal
- ESLint & Prettier

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- MongoDB

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd proyecto-hexagonal
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. Iniciar el servidor de desarrollo:
```bash
pnpm run start:dev
```

## 🛠️ Scripts Disponibles

- `pnpm run start:dev`: Inicia el servidor en modo desarrollo
- `pnpm run build`: Compila el proyecto
- `pnpm run start:prod`: Inicia el servidor en modo producción
- `pnpm run lint`: Ejecuta el linter
- `pnpm run lint:fix`: Corrige errores de linting
- `pnpm run format`: Formatea el código
- `pnpm run test`: Ejecuta las pruebas unitarias
- `pnpm run test:e2e`: Ejecuta las pruebas end-to-end

## 📝 API Endpoints

### Clientes (Customers)

- `POST /customers`: Crear un nuevo cliente
- `GET /customers`: Obtener todos los clientes
- `GET /customers/:id`: Obtener un cliente por ID
- `PUT /customers/:id`: Actualizar un cliente
- `DELETE /customers/:id`: Eliminar un cliente

## 🧪 Testing

El proyecto incluye:
- Pruebas unitarias con Jest
- Pruebas e2e con Supertest
- Configuración de cobertura de código

## 📚 Documentación

La documentación de la API está disponible en:
- Swagger UI: `/api-docs` (cuando el servidor está en ejecución)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- Tu Nombre - [@tutwitter](https://twitter.com/tutwitter)

## 🙏 Agradecimientos

- NestJS Team
- MongoDB Team
- Comunidad de Arquitectura Hexagonal 