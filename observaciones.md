Querida Agus, 

Felicitaciones por tan excelente trabajo. Qué orgullo verlo funcionando: parece hecha por alguien con muchisima mas experiencia que vos. En general todo funciona bien, el comportamiento es fluido, no hay efectos secundarios inesperados, esta pagina esta lista para ser publicada y usada. 

Corrigiendo tu trabajo a veces me senti algo hincha... lo cierto es que te estoy corrigiendo detalles, te hago sugerencias para que tu codigo sea mejor, pero son mis intentos de tener *algo* para decirte, lo mas minimo! Es poco lo que se puede decir ante codigo de esta calidad. Estas mas que lista para desafios mas grandes, para no solamente hacer cosas con tu codigo sino preocuparte por la calidad del mismo, por la arquitectura, por la abstraccion. No solo ya sos una desarrolladora front end, sos una desarrolladora front end lista para el proximo paso en su aprendizaje. Que alegria me da poder ver codigo como este. 

Tu HTML es correcto, el uso de etiquetas semanticas preciso y adecuado, la accesibilidad siempre presente. Me encantó lo bien que usaste BEM para los nombres de clases y lo prolijo que se ve todo gracias a eso tanto en el SASS como en el JS. Con respecto al SASS, esta impecable: perfecto uso de variables y mixins, me encantaron algunas funciones como padding. 

Tu proyecto en Github tiene una descripcion mas que perfecta, amigable y clara. Puede ser que hayas borrado las branches? Se que tu codigo las tuvo en su momento, ahora ya no. Entiendo que no es muy halagador tener las branches con todo el codigo que borramos ahi en github, pero no es buena practica borrarlas, ya que siempre podemos necesitar algo que tuvimos ahi. Tampoco me permite evaluar bien como hiciste los PR y las distintas funcionalidades. Como me consta que en algun momento estuvieron, te doy credito parcial por eso, pero intenta que no ocurra de nuevo (y no borres tus branches en proyectos laborales a menos que te lo digan: esa es decision del lider del equipo). 

Con respecto al proyecto en si, hay muy poquitas cosas a mejorar. Te las menciono aunque me sienta hincha, solo porque quiero que este proyecto este publicado, y quiero que cause la mejor impresion posible:

- En celulares muy pequeños (360px para abajo), no se llega a leer todo el texto de "Ingresa tu busqueda". Quiza quieras reducir el tamaño del texto en mobile. 
- En modo odscuro, el texto del input sigue en color negro y es muy dificil ver lo que se esta buscando. 
- El loader es una GRAN adicion, pero no esta presente cuando se cargan los comics de un personaje. Seria una buena adicion ahi. 
- Una etiqueta form permitiria mayor accesibilidad, y ademas poder buscar al apretar enter. 
- Desafio super extra, pero muy bienvenido: cuando estoy en celulares y me voy muy hacia abajo en la busqueda de un comic, al hacer click en ese comic termino "abajo" en lugar de volver hacia arriba para ver el titulo y la informacion principal. Eso es porque el navegador recuerda en que parte del scroll estoy, y no lo vuelve hacia arriba. Si queres averiguar como controlar el scroll en JS, seria un buen desafio lograr que tenga un comportamiento mas amigable. 

El problema mas grave, y por suerte el mas facil de arreglar, es el comportamiento de tu boton de "volver". Si doy "volver", por un segundo veo la seccion de personajes. Eso es porque `resultsSection` no se oculta. 
En la funcion `returnButton.onclick` podriamos agregar `hide(resultsSection)`. Y luego, en la funcion del fetch, agregamos `show(resultsSection)` para que se vuelva a mostrar, esta vez con la data correspondiente. 

Notá que al buscar un comic, hacer click en personajes, y luego hacer click en el boton de volver atras, seguimos viendo el titulo como "personajes" aunque estemos viendo comics. `createComicsCards` deberia cambiar el titulo de la seccion. 

Con respecto a tu codigo, me impresiona realmente la altisima calidad (ya se que te lo dije mil veces). Las funciones auxiliares son excelentes y es muy facil seguir tu codigo y entender todo lo que esta pasando. Como ya dijimos que estas lista para desafios mejores, sí te quiero mencionar que la mayoria de tus funciones son impuras, es decir, dependen de variables fuera de su scope, tienen efectos secundarios por fuera de su scope, y ante el mismo input pueden retornar distinto output. 
Por ejemplo, pensemos en la funcion `thereIsInput`:
```js
const thereIsInput = () => {
  if (searchBar.value) {
    return true;
  }
};
```

Esta funcion no es pura porque siempre recibe el mismo input (undefined, porque no tiene parametros) pero puede retornar cosas diferentes (true o undefined, dependiendo del valor de searchBar). Para volverla pura, simplemente le pasamos toda la informacion necesaria por parametros: 

```js
const thereIsInput = (searchBar) => {
  if (searchBar.value) {
    return true;
  }
};
```

Y al llamar a thereIsInput, le pasamos el parametro: 
```js
 thereIsInput(searchBar) 
```

Yo se que es una diferencia muy sutil, y a la larga es lo mismo porque igual estamos usando las variables globales, pero la practica de usar funciones puras tiene ventajas. Nuestro codigo es mas testeable (eventualmente aprenderas sobre unit testing y veras esta ventaja), mas atomizable, y las funciones se vuelven mas reutilizables. 

Mas alla de estos puntos, insisto en que tu codigo es fantastico: solo te hago estas observaciones para que quede aun mejor. 

Felicitaciones nuevamente, y segui asi! 


  ✅ Respeta la consigna
  ✅ Respeta el diseño dado
  ✅ Respeta el funcionamiento
  ✅ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✅ Uso de variables (SASS)

  ✅ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅ Nombres de branchs adecuados

  ✅ Componentización de estilos (SASS)
  ✅ Funciones pequeñas
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✅ Reutilización de lógica / funciones
  ✅ Commits con mensajes adecuados
  ❌ Un PR por funcionalidad, fix o mejora
  ❌ PRs con buenos títulos

Nota final: **10**
