Como hacer levantar el proyecto en local:

# 1. Instalar dependencias
$ npm install

# 2. Levantar el local
$ npm run dev

Una vez ejecutado el segundo comando, accede a tu navegador favorito y pega en la barra de navegación la ruta http que se ha generado. En mi caso es: http://127.0.0.1:5173/

# Presentación
Lo primero que te encontrarás una vez que accedas a esa URL será el catálogo de Pokemons. Se cargan de 20 en 20 Pokemons pulsando sobre el botón de abajo de "Cargar más Pokemons".

# Buscar Pokemons
Si deseas buscar un Pokemon, puedes hacerlo mediante el primer Input donde pone "Buscar Pokemon..." y pulsando sobre el botón de la lupa para buscarlo. En primer lugar buscará sobre los Pokemons que se muestran en el catálogo, y si no está, lo buscará a través de una request mediante la API de Pokemons.
Si deseas volver al catálogo tal y como lo dejaste antes de pulsar sobre la búsqueda, pulsa sobre el botón de deshacer.

# Filtrar Pokemons
Se realiza a través de dos selectores, el primero el para elegir el campo con el que quieres filtrar y el segundo el valor que tiene ese campo elegido.
Cuando tengas ambos selectores rellenos, pulsa sobre el botón de la lupa para filtrar. Este filtrado se hace directamente a través de requests a la API de Pokemon.

# Detalle de Pokemons
Si pulsas sobre el nombre de cualquier pokemon en el catálogo, serás redirigido a los detalles del mismo. También puedes acceder al detalle directamente añadiendo a la URL del catálogo /pokemon/:id, este id puede ser el número que quieras dentro del número total de pokemons.
