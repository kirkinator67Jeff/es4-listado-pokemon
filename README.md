# Pokedex Interactiva

Aplicación web desarrollada con React que permite explorar un listado de varios Pokémon desde [PokeAPI](https://pokeapi.co), con funcionalidades de búsqueda, favoritos y bloqueo de elementos

## Integrantes

- Andru Colque
- Nicolás Pérez

## Demo en línea

[Ver aplicación desplegada](https://taller-react-pokeapi.vercel.app)

## Funcionalidades

- Listado de Pokémon con imágenes obtenidas desde PokeAPI
- Barra de búsqueda con filtrado en tiempo real (sin distinguir mayúsculas/minúsculas)
- Marcar y quitar favoritos, visibles en un panel lateral
- Bloquear y desbloquear elementos (se excluyen automáticamente de las búsquedas)
- Estadísticas de totales, favoritos y bloqueados
- Persistencia de favoritos y bloqueados en `localStorage`
- Diseño responsivo (móvil, tablet y escritorio)
- Manejo de estados de carga y error al consumir la API

## Tecnologías utilizadas

- [React](https://react.dev) (componentes funcionales + hooks)
- [Vite](https://vitejs.dev) como bundler
- CSS puro para el diseño responsivo
- [PokeAPI](https://pokeapi.co) como fuente de datos
- Despliegue en [Vercel](https://vercel.com)
