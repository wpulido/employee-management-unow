# Employee Management System

Este es un sistema de gestión de empleados desarrollado con **Next.js 15**, **React**, **TypeScript**, **Node.js**, **Express**, **MongoDB** y **Turborepo**.

## 📌 Tecnologías Utilizadas
- **Frontend**: Next.js 15, React, TypeScript, Flowbite-React
- **Backend**: Node.js, Express, MongoDB, TypeScript
- **Autenticación**: JSON Web Tokens (JWT), Cookies HTTPOnly
- **Monorepo**: Turborepo

## 📂 Estructura del Proyecto
```
/employee-management-system
│── apps
│   ├── client (Frontend - Next.js 15)
│   ├── server (Backend - Express.js)
│── packages
│   ├── config (Configuraciones compartidas)
│── .env
│── package.json
│── turbo.json
```

## 🚀 Instalación y Configuración
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/employee-management-system.git
cd employee-management-system
```
### 2️⃣ Instalar dependencias
```bash
npm install
```
### 3️⃣ Configurar variables de entorno (`.env` en el directorio raíz) - SE PONEN LOS VALORES POR PROPÓSITOS DE LA PRUEBA ÚNICAMENTE.
```env
MONGO_URI=mongodb+srv://wistrepdev:b8La7edujPIp5Ow8@employees.fsijg.mongodb.net/?retryWrites=true&w=majority&appName=employees
JWT_SECRET=JWT_SECRET
NODE_ENV=development
API_BASE_URL=http://localhost:5001
```
### 4️⃣ Generar JWT SECRET
```bash
ts-node ./generateJwtSecret.ts
```
### 5️⃣ Iniciar el proyecto
```bash
npm run dev
```
Esto iniciará tanto el frontend como el backend con Turborepo.

## 🔥 API Routes

### 🔐 **Autenticación** (`/api/auth`)
| Método | Endpoint     | Descripción |
|--------|-------------|-------------|
| POST   | `/login`    | Inicia sesión y genera un token de acceso. |
| POST   | `/register` | Registra un nuevo usuario. |
| GET    | `/logout`   | Cierra la sesión y elimina la cookie. |

### 👥 **Empleados** (`/api/employees`)
| Método | Endpoint            | Descripción |
|--------|---------------------|-------------|
| GET    | `/`                 | Obtiene todos los empleados. |
| POST   | `/`                 | Crea un nuevo empleado. |
| PUT    | `/:id`              | Actualiza un empleado por su ID. |
| DELETE | `/:id`              | Elimina un empleado por su ID. |

### 🏢 **Posiciones** (`/api/positions`)
| Método | Endpoint   | Descripción |
|--------|-----------|-------------|
| GET    | `/`       | Obtiene la lista de posiciones disponibles. |

## 🛠️ Funcionalidades
✅ Autenticación de usuarios con JWT y cookies seguras.
✅ CRUD de empleados.
✅ Búsqueda y filtrado de empleados.
✅ Gestión de posiciones.
✅ Diseño responsivo con Flowbite-React.
✅ Monorepo con Turborepo para mejor administración del código.

## 📌 Notas Importantes
- Se requiere MongoDB para almacenar los datos de empleados y usuarios.
- El backend debe estar corriendo para que el frontend funcione correctamente.
- Las API routes en Next.js (`/api/*`) actúan como un proxy hacia el backend.

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**.

---
Desarrollado por Wistremiro Pulido 🚀