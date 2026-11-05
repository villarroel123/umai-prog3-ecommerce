# TP 4 · Ecommerce de productos personalizables

Proyecto de Programación 3. La consigna fue convertir una base con administración de productos y categorías en una tienda online: catálogo público, personalización de productos, carrito, favoritos, usuarios, checkout, órdenes persistidas y panel administrativo.

En esta entrega, la tienda está orientada a sets de uñas. La interfaz permite recorrer productos y categorías, elegir opciones de diseño, agregar productos al carrito y avanzar con una compra.

## Tecnologías

- Next.js 16 y React 19
- MongoDB y Mongoose
- Tailwind CSS 4
- Context API para carrito, favoritos y usuario activo

## Funcionalidades y secciones

| Sección | Función |
| --- | --- |
| `/` | Inicio y catálogo de productos. |
| `/categories` y `/category/[idcat]` | Listado de categorías y productos por categoría. |
| `/products/[idproduct]` | Detalle del producto, personalización, cantidad, carrito y favoritos. |
| `/cart` | Revisión del carrito y modificación de cantidades. |
| `/favorites` | Productos favoritos; se sincronizan con MongoDB al iniciar sesión. |
| `/register` y `/login` | Registro e inicio de sesión. |
| `/checkout` | Datos de contacto y entrega, creación de la orden y confirmación. |
| `/user` y `/user/orders/[orderId]` | Datos del usuario e historial y detalle de sus órdenes. |
| `/dashboard` | Resumen de ventas, órdenes recientes, usuarios recientes y stock bajo. |
| `/dashboard/products` | Administración de productos y categorías. |
| `/dashboard/orders` y `/dashboard/order/[id]` | Listado y detalle administrativo de órdenes, con cambio de estado. |

Los productos pueden asociarse a varias categorías. Sus imágenes se guardan en `public/images/products/` y la base de datos conserva el nombre del archivo. El carrito distingue las combinaciones de personalización elegidas para un producto. Los datos se gestionan mediante rutas API y modelos de Mongoose.

## Cómo ejecutar el proyecto

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Copiar `env.example` a `.env.local` y completar `MONGODB_URI` con la conexión a MongoDB. No subir credenciales al repositorio.

3. Iniciar el servidor:

   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000).

Para probar las funciones con datos persistidos, la base configurada debe estar disponible y contener productos y categorías. Se pueden cargar desde `/dashboard/products`.

## Organización del código

- `src/app/`: páginas, rutas API y acciones.
- `src/components/` y `src/containers/`: componentes de la interfaz.
- `src/contexts/`: estado global de carrito, favoritos y usuario.
- `src/models/`: modelos de productos, categorías, usuarios y órdenes.
- `src/lib/`: conexión a MongoDB y consultas reutilizables.
- `public/images/products/`: imágenes locales de los productos.

## Uso de inteligencia artificial

**Consentimiento y reflexión:** Utilicé IA de forma puntual como apoyo para ordenar la estructura de carpetas y orientar la conexión con la base de datos.
