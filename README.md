# SIGR - Sistema Integral de Gestión de Restaurante

Sistema de gestión para restaurantes con autenticación por roles, gestión de pedidos, reservas, menú y reportes.

## Tecnologías
- Node.js 18 + Express
- JWT para autenticación
- Docker
- GitHub Actions (CI/CD)

## Instalación local

```bash
npm install
cp .env.example .env
npm start
```

## Ejecutar pruebas

```bash
npm test
```

## Docker

```bash
docker-compose up --build
```

## Endpoints principales

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /health | Estado del sistema | No |
| POST | /api/auth/login | Iniciar sesión | No |
| GET | /api/auth/perfil | Perfil del usuario | Sí |
| GET | /api/menu | Lista del menú | No |
| GET | /api/pedidos | Lista de pedidos | Sí |
| POST | /api/pedidos | Crear pedido | Sí |
| GET | /api/reservas | Lista de reservas | Sí |
| POST | /api/reservas | Crear reserva | Sí |
| GET | /api/reportes/ventas | Reporte de ventas | Sí |

## Usuarios de prueba

| Email | Password | Rol |
|-------|----------|-----|
| admin@sigr.com | admin123 | administrador |
| mesero@sigr.com | mesero123 | mesero |
| cliente@sigr.com | cliente123 | cliente |

## Pipeline CI/CD

El pipeline tiene 4 etapas:
1. **Build** - Instala dependencias y verifica estructura
2. **Test** - Ejecuta pruebas unitarias e integración
3. **Docker Build** - Construye y verifica imagen Docker
4. **Deploy** - Despliega en producción (solo rama main)
