const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');

const secciones = document.querySelectorAll('.seccion');

//Obtenemos el indice de la seccion activa
let indexSeccionActiva;

//Accedemos al primer elemento "a" y obtenemos el tamaño para el indicador
let tamanioIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = `${tamanioIndicador}px`;

const observer = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting){
            //Obtenemos cual es la seccion que esta entrando en pantalla
            // console.log(`La entrada ${entrada.target.id} esta intecerctando`);

            //Tomamos la lista de secciones y las transformamos en un arreglo con un operador spread 
            //y luego obtenemos el index de la seccion activa (que esta en pantalla)
            indexSeccionActiva = [...secciones].indexOf(entrada.target);
            
            indicador.style.transform = `translateX(${tamanioIndicador * indexSeccionActiva}px)`;
        }
    })
},{
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.2
});

//Asignamos un observador al hero para ocultar el indicador
observer.observe(document.getElementById('hero'));
//Asignamos un observador a cada una de las secciones.
secciones.forEach(seccion => observer.observe(seccion)); 



//Evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
    //Calculamos el nuevo tamaño que deberia tener el indicador.
    tamanioIndicador = menu.querySelector('a').offsetWidth;

    //Cambiamos el tamaño del indicador.
    indicador.style.width = `${tamanioIndicador}px`;

    //Volvemos a posicionar el indicador.
    indicador.style.transform = `translateX(${tamanioIndicador * indexSeccionActiva}px)`;
 }

window.addEventListener('resize', onResize);
