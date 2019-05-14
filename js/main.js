//VARIABLES

const formulario = document.getElementById('formulario');
const listaLink = document.getElementById('listaLink');
let links = [];

//CLASES

class Link{

  constructor(nombre,url){
    this.nombre = nombre,
    this.url = url
  }

}

//esta clase almacena en el localstorage
class Store{

  //guarda los link en el localstorage
  static guardarStore(){
   localStorage.setItem('links',JSON.stringify(links));
   Store.leerStore();
  }

  //lee los link del localstorage y lo muestra en el DOM
  static leerStore(){
    listaLink.innerHTML = '';
    links = JSON.parse(localStorage.getItem('links'));
    if(links === null){
        links = [];
    } else {
        links.forEach((link) => UI.mostrarLink(link));
    }
  }

  //elimina el link del DOM y del localstorage
  static eliminarStore(link){
   links.forEach((elemento,index) =>{
     if(elemento.nombre === link){
        links.splice(index,1);
        Store.guardarStore();
     }
   });
  }

}

//esta clase manipula en DOM
class UI{

  //este metodo muestra los link en el DOM
  static mostrarLink(link){
    listaLink.innerHTML += `
    <div class="alert alert-primary row" role="alert">
      <p class="col">${link.nombre}</p>
      <a href="${link.url}" target="_blank" class="btn btn-primary estado">visitar</a>
      <button class="btn btn-danger col ml-4">eliminar</button>
    </div>         
    `;
  }

  //muestra un mensaje en el DOM
  static mostrarMensaje(mensaje,tipo){
    let div = document.createElement('div');
    div.className = `alert alert-${tipo}`;
    div.appendChild(document.createTextNode(mensaje));

    const container = document.querySelector('section');
    container.insertBefore(div,document.querySelector('.jumbotron'));
    setTimeout(() => {
      div.remove()
    },3000);
  }

}

//EVENTOS

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    //obtenemos los datos 
    let linkTexto = document.getElementById('nombre').value;
    let linkUrl = document.getElementById('url').value;

     
    //valida que los campos esten completos
    if(linkTexto === '' || linkUrl === ''){
     //mostramos un mensaje al usuario para que llene todos los campos
     UI.mostrarMensaje('completa todos los campos por favor','danger');

    } else {
      //creamos un objeto con la clase Link
      let link = new Link(linkTexto,linkUrl);
       
      //agregamos el objeto link al array links
      links.push(link);
      
      //guardamos en el localstorage
      Store.guardarStore();
  
      formulario.reset();
      UI.mostrarMensaje('el link se agrego correctamente','success');
    }

});

//mostramos los link guardados cuando el DOM cargue
document.addEventListener('DOMContentLoaded',Store.leerStore);

//detectamos el evento del boton eliminar
listaLink.addEventListener('click',(e) => {
  if(e.target.innerHTML === 'eliminar'){
    let linkId = e.target.previousElementSibling.previousElementSibling.innerHTML;
    Store.eliminarStore(linkId);
    UI.mostrarMensaje('se acaba de eliminar un link','success');
  }
});
