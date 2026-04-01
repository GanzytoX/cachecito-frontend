# ⚡ Cachecito AI

<p align="center">
  <img src="public/favicon.svg" width="80" height="80" alt="Cachecito AI Logo" />
</p>

<p align="center">
  <em>Plataforma avanzada de negociación autónoma impulsada por Inteligencia Artificial.</em>
</p>

---

## 🎯 Sobre el Proyecto
**Cachecito AI** es una plataforma moderna diseñada para la creación, personalización e interacción con Agentes de IA autónomos. Especializada en flujos de negociación y asistencia inteligente, la aplicación permite definir la identidad y el "cerebro" de cada agente, facilitando una comunicación fluida y estratégica en tiempo real.

Desarrollado bajo una arquitectura robusta (FSD), el proyecto prioriza la **consistencia visual de alto nivel**, un rendimiento ultra-rápido y una experiencia de usuario premium basada en principios de diseño minimalista.

## 🚀 Tecnologías y Herramientas

- **Core**: React 19 + TypeScript (Strict Mode).
- **Comunicación en Tiempo Real**: Socket.io (Interacción bidireccional con agentes).
- **Build Pipeline**: Vite (Optimización de assets y HMR instantáneo).
- **Sistema de Diseño**: Tailwind CSS v4 (Utilidades modernas y variables CSS nativas).
- **Aesthetics**: Glassmorphism, Micro-animaciones, Tabler Icons.
- **Arquitectura**: Feature-Sliced Design (FSD).

## 📂 Arquitectura: Feature-Sliced Design (FSD)

El proyecto sigue estrictamente el estándar [Feature-Sliced Design](https://feature-sliced.design/) para garantizar mantenibilidad y escalabilidad:

- **`src/app/`**: Configuración global, proveedores y estilos base (`index.css`).
- **`src/pages/`**: Vistas de alto nivel y composición de módulos (`/chat`, `/contacts`, `/settings`).
- **`src/features/`**: Funcionalidades de negocio (ej. `auth-form`, `chat-message-input`).
- **`src/entities/`**: Modelos de dominio y almacenamiento persistente (`user`, `message`).
- **`src/shared/`**: UI Kit genérico, utilidades de API y lógica compartida.

## 🛠 Instalación y Desarrollo

### 1. Clonar repositorio
```bash
git clone https://github.com/GanzytoX/cachecito-frontend.git
cd cachecito-frontend
```

### 2. Configurar Entorno
Crea un archivo `.env` basado en `.env.example`:
```env
VITE_API_BASE_URL=http://<YOUR_BACKEND_IP>:<PORT>
```

### 3. Iniciar Proyecto
```bash
npm install
npm run dev
```

## 🌟 Funcionalidades Clave
1. **Creación de Agentes**: Formulario de registro enfocado en definir la identidad y personalidad táctica de la IA.
2. **Chat en Tiempo Real**: Interfaz de mensajería optimizada con estados de escritura ("thinking", "analyzing") y persistencia local.
3. **Diseño Consistente**: Sistema de componentes unificado (`PageHeader`, `ListTile`) con colores de marca coherentes (Tan/Brown theme).
4. **Despliegue Automatizado**: CI/CD configurado con GitHub Actions para despliegue continuo en VPS con Nginx y Node 22.

---

## 👨‍💻 Autores
- [**GanzytoX**](https://github.com/GanzytoX)
- [**Joaquower**](https://github.com/Joaquower)

> [!TIP]
> *Proyecto optimizado para producción, con tipografía Inter y un sistema de diseño basado en variables CSS para máxima flexibilidad.*
