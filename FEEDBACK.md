# Feedback del Proyecto Pokedex

Estimado equipo de Talana,

Adjunto el feedback de la prueba que realicé. A pesar de que aún quedan aspectos por mejorar, he decidido enviarlo de manera anticipada debido a compromisos laborales que me impiden continuar hoy. Inicié la prueba ayer, aprovechando el feriado, a pesar de que la tarea fue asignada el miércoles a las 19:00 horas.

## Resumen

En este proyecto desarrollado con Vue.js existen oportunidades de mejora, como en la experiencia de usuario, el rendimiento y la calidad del código.

## Puntos Fuertes

- **Modularidad:** El proyecto está bien organizado en componentes y composables, lo que facilita el mantenimiento.
- **Gestión de Estado:** El uso de Pinia para manejar el estado global es efectivo y limpio.
- **Carga de Datos:** La carga incremental de Pokémon es una buena práctica para mejorar el rendimiento inicial.

## Áreas de Mejora

### Experiencia del Usuario

- **Retroalimentación al Usuario:** Implementar notificaciones más informativas y visuales para acciones como agregar Pokémon al equipo.
- **Accesibilidad:** Asegurar que la aplicación cumpla con los estándares de accesibilidad, utilizando atributos ARIA y siguiendo las pautas WCAG.
- **Carga Inicial:** Mejorar carga inicial y preloaders. Hay partes donde no se implementó.
- **Mensajes de acciones:** Añadir más mensajes que avisen al usuario de acciones realizadas o acciones están en proceso (por ejemplo, al eliminar un pokemon del team).

### Rendimiento

- **Optimización de Consultas:** Implementar un mecanismo de caché para evitar consultas redundantes a la API y mejorar el tiempo de respuesta.
- **Observador de Intersección:** Ajustar la configuración del observador de intersección para anticipar el desplazamiento del usuario y cargar datos de forma más eficiente.

### Calidad del Código

- **Manejo de Errores:** Mejorar el manejo de errores, mostrando mensajes claros al usuario y registrando errores para facilitar la depuración.
- **Pruebas:** Implementar pruebas unitarias para garantizar la calidad del código y facilitar los cambios futuros.
- **Estilos:** Establecer una guía de estilos y utilizar un linter para mantener la consistencia del código. Definir una paleta de colores, tipografía y espaciado para toda la aplicación.
- **Separación de Responsabilidades:** Separar aún más la lógica de presentación de la lógica de negocio.
- **Ordenación en componentes:** Dejar en el mismo orden declaraciones / hooks / watchers / .... / methods.
- **Separación de interfaces:** Separar las interfaces que definen esquemas para pokemon y team.

## Recomendaciones Específicas

- **Notificaciones:** Utilizar componentes de notificación para mostrar mensajes de confirmación y error de manera más visual y atractiva.
- **Observador de Intersección:** Configurar el observador para que se active antes de que el elemento entre en la viewport, para mejorar la experiencia.
- **Manejo de Errores:** Crear un componente de error personalizado para mostrar mensajes amigables al usuario.
- **Pruebas:** Escribir pruebas unitarias para componentes, composables y funciones auxiliares.
- **Estilos:** Definir una paleta de colores, tipografía y espaciado para toda la aplicación.
- **Carga:** Añadir carga inicial y preloaders.
- **Caché:** Adición de mecanismo de caché para evitar llamadas innecesarias a la API.
- **Tailwind:** Utilización de Tailwind para facilitar la modularidad en estilos.
- **Limpieza de código:** Se hace necesario un doble check para eliminar código innecesario.
- **Mejora de estilos:** Mejora general de estilos y responsividad.

## Conclusión

Fue un proyecto estimulante que me permitió reencontrarme con vue, ya que llevo 2 meses trabajando con angular.

Debido a las limitaciones de tiempo impuestas por mi trabajo actual, no pude dedicarle todo el tiempo que hubiera deseado. Esto impidió explorar algunas ideas a profundidad, sin embargo, pude identificar varias áreas de mejora.
