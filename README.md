# ⚡ Cachecito Frontend

<p align="center">
  <em>Aplicación con arquitectura FSD para transacciones financieras y asistencia por IA.</em>
</p>

---

## 🎯 Sobre el Proyecto
**Cachecito** es una plataforma moderna para gestión financiera y comunicación interactiva con un bot basado en Inteligencia Artificial. Permite administrar transferencias (entradas/salidas), gestionar una libreta de contactos y ofrece un sistema interactivo de mensajería (Cachecito AI) que asiste al usuario en sus diferentes operaciones.

Este proyecto ha sido desarrollado bajo los **mejores estándares de la industria**, asegurando una arquitectura robusta preparada para escalabilidad de grado de producción, alta seguridad (Strict Type Checking) y una excelente experiencia de usuario (UX).

## 🚀 Tecnologías y Herramientas

- **Core**: React 19 + TypeScript (strict mode habilitado).
- **Build Pipeline**: Vite (Empaquetado ultra-rápido y optimización de assets).
- **Sistema de Diseño (Styling)**: Tailwind CSS v4 + Shadcn UI + Radix UI (Componentes accesibles y animaciones avanzadas).
- **Data Fetching/State**: SWR.
- **Patrón Arquitectónico**: Feature-Sliced Design (FSD).
- **Calidad de Código**: ESLint + Prettier compilando al guardado y revisiones continuas.

## 📂 Arquitectura: Feature-Sliced Design (FSD)

Para garantizar la mantenibilidad y evitar la deuda técnica del "código espagueti", el proyecto sigue estrictamente [Feature-Sliced Design](https://feature-sliced.design/):

- `src/app/`: Configuración global de la aplicación, inicializaciones y hojas de estilo globales (`index.css`).
- `src/pages/`: Componentes a nivel de ruta y ensamblaje de módulos completos (`/messages`, `/notifications`, `/contacts`, `/settings`).
- `src/features/`: Funcionalidades específicas del negocio y código acoplado (ej. lógica de envío en `messages`).
- `src/entities/`: Entidades del dominio, esquemas y tipos estáticos clave (`notification`, `message`, o `contact`).
- `src/shared/`: Componentes presentacionales sin estado de negocio (UI Kit genérico de interface), iconos SVG, variables de diseño y utilidades generales como el API Client o el Store en LocalStorage.

## 🛠 Instalación y Despliegue Local

### 1. Requisitos Previos
- Node.js (v20+ recomendado).
- Gestor de paquetes npm.

### 2. Clonar repositorio
```bash
git clone <url-del-repositorio>
cd cachecito-frontend
```

### 3. Variables de Entorno
La aplicación requiere definir el entorno y las direcciones backend. Crea un archivo `.env` en la raíz siguiendo el patrón de `.env.example`:
```env
VITE_API_BASE_URL=https://<tu_url_del_backend>
```

### 4. Instalar Dependencias
```bash
npm install
```

### 5. Iniciar Servidor de Desarrollo Local
```bash
npm run dev
```

### 6. Controles de Calidad (Scripts estandarizados)
El proyecto cuenta con comandos estrictos para mantener un nivel óptimo del Type Checking:
- **Verificar Tipos completos:** `npm run typecheck`
- **Asegurar Linter y Convenciones:** `npm run lint`
- **Formateador automático:** `npm run format`
- **Construir (Producción):** `npm run build`

## 🌟 Funcionalidades Integradas
1. **Cachecito AI (Asistente)**: Sistema de mensajería asíncrona renderizado de forma fluida con retención persistente.
2. **Alertas & Notificaciones**: Estructuras seguras para manejo de estados de `transfer_in`, `transfer_out`, `friend_request`, `security`, y más.
3. **Gestor de Contactos**: Arquitectura para manejar presencia/disponibilidad y transferencias a un click.
4. **Diseño Premium**: Interfaz moderna, soportada por variables CSS flexibles, accesibilidad WAI-ARIA y UI controlada por Radix Primitives.

---

## 👨‍💻 Autores
- [**GanzytoX**](https://github.com/GanzytoX)
- [**Gerlock**](https://github.com/Joaquower)

> [!NOTE]
> *Proyecto ensamblado para un alto desempeño, testeado y listo para evaluación o uso en Producción.*
