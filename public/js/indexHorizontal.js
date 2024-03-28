let currentPage = 0; // Variable para rastrear la página actual
let isAnimating = false; // Variable para controlar la animación

document.addEventListener('wheel', function(event) {
  if (!isAnimating) {
    if (event.deltaY > 0 && currentPage < 3) {
      // Desplazamiento hacia abajo y aún hay páginas para mostrar
      currentPage++;
      scrollToPage(currentPage);
    } else if (event.deltaY < 0 && currentPage > 0) {
      // Desplazamiento hacia arriba y no estamos en la primera página
      currentPage--;
      scrollToPage(currentPage);
    }
  }
});

function scrollToPage(pageIndex) {
  const pages = document.querySelectorAll('.content');
  const targetPage = pages[pageIndex];
  isAnimating = true;
  currentPage=pageIndex;
  
  if (targetPage) {
    targetPage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    // Después de la animación, permitir más desplazamientos
    setTimeout(function() {
      isAnimating = false;
    }, 800); // Tiempo de espera para evitar múltiples transiciones rápidas
  }
}
function cambiarColor(boton,page) {
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón
  goPage(page)
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // Si no estamos en modo pantalla completa, activamos el modo pantalla completa
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari y Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* Internet Explorer/Edge */
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // Si ya estamos en modo pantalla completa, salimos del modo pantalla completa
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari y Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* Internet Explorer/Edge */
      document.msExitFullscreen();
    }
  }
}
function scrollToPreviousPage() {
  if (!isAnimating && currentPage > 0) {
    // Si no estamos en una animación y no estamos en la primera página, nos movemos a la página anterior
    currentPage--;
    scrollToPage(currentPage);
  }
}

function scrollToNextPage() {
  if (!isAnimating && currentPage < 3) {
    // Si no estamos en una animación y no estamos en la última página, nos movemos a la página siguiente
    currentPage++;
    scrollToPage(currentPage);
  }
}
function leerTexto() {
  var texto = document.getElementById('texto-a-leer').innerText;
  var voz = new SpeechSynthesisUtterance(texto);
  window.speechSynthesis.speak(voz);
}
function traducirTexto(lang) {
  var texto = document.getElementById('texto-a-leer').innerText;
  // Texto traducido simulado
  var textoTraducido;
  switch(lang) {
    case 'en':
      textoTraducido = "Hello, I am Oscar Jimenez!";
      break;
    case 'es':
      textoTraducido = "¡Hola, soy Oscar Jimenez!";
      break;
    case 'pt':
      textoTraducido = "Olá, eu sou Oscar Jimenez!";
      break;
    default:
      textoTraducido = texto; // Si no se especifica un idioma válido, se mantiene el texto original
  }
  
  // Actualizar el texto con la traducción simulada
  document.getElementById('texto-a-leer').innerText = textoTraducido;
}

function goPage(page) {
  scrollToPage(page);
 
}

function gatito(boton){
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón

  Swal.fire({
    title: "Ven, vamos a mi repositorio.",
    width: 600,
    padding: "3em",
    color: "#84AEA6",
    background: "#fff",
    backdrop: `
      rgba(162, 217, 206 ,0.4)
      url("/img/nirvana.gif")
      left top
    `,
    //no-repeat
    
    customClass: {
      confirmButton: 'custom-confirm-button-class',
    },
    confirmButtonText: 'ir a GitHub'
  }).then((result) => {
    // Si el usuario hace clic en "Aceptar", redirigir a Google
    if (result.isConfirmed) {
      window.open('https://www.google.com', '_blank');
    }
  });
  
  
}
array_plugins=[]
function guardarMg(boton) {
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón

  ; // Incrementar el contador en el cliente
  // Verificar si el navegador admite la propiedad plugins
if ('plugins' in navigator) {
  // Obtener la lista de plugins instalados
  const plugins = Array.from(navigator.plugins).map(plugin => ({
    name: plugin.name,
    description: plugin.description,
    filename: plugin.filename
  }));

  // Mostrar la información de los plugins en la consola
  console.log('Plugins instalados:');
  for (let i = 0; i < plugins.length; i++) {
    array_plugins.push(plugins[i].name)

    console.log('Nombre del plugin:', array_plugins);
  }

  console.log('///', array_plugins);
  fetch('/actualizar-contador', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numClic: array_plugins }) // Enviar el nuevo valor del contador en el cuerpo de la solicitud
  })
  .then(response => {
    if (response.ok) {
      console.log('Contador actualizado correctamente en el servidor');
    } else {
      throw new Error('Error al actualizar el contador en el servidor');
    }
  })
  .catch(error => {
    console.error(error);
    // Manejar cualquier error que ocurra al enviar la solicitud al servidor
  });


  let timerInterval;
Swal.fire({
  title: "Estos son tus plugins instalados, vaya interesante!!",
  html: "<b></b> : los guardade en mi base de mongo jeje",
  timer: 10000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    array_plugins.forEach((plugin, index) => {
      setTimeout(() => {
      timer.textContent =plugin;
    }, index * 1000); // Retraso de medio segundo multiplicado por el índice
  });
    // timerInterval = setInterval(() => {
    //   timer.textContent = `${Swal.getTimerLeft()}`;
    // }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});

} else {
  console.log('El navegador no admite la propiedad "plugins".');
}

}
function redirigirPaginaPHP() {
  // Redirigir a la página deseada
  window.open('https://thumano.Sepronac.com.ec', '_blank');
 
}
function redirigirPaginaPy(){
  window.open('https://github.com/ojimenezl/Integrador/blob/master/src/ocr.py', '_blank');
}
function redirigirPaginaNode(){
  window.open('https://escribista.fly.dev/', '_blank');

}
function goToApps(boton){
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón

  Swal.fire({
    title: "¡Nuestro trabajo vive en nuestras aplicaciones!",
    text: "Con un grupo de programadores, creamos dos aplicaciones: TuWeka y Jobox. TuWeka proporcionaba direcciones exactas de los restaurantes más concurridos en la ciudad, visualizables en Google Maps. Jobox era una plataforma para publicar puestos de trabajo básicos como albañil, plomero, jardinero, etc. Aunque la empresa ya no existe, al menos queda el rastro de nuestro trabajo.",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "TuWeka",
    denyButtonText: "Jobox",
    cancelButtonText: "Cancelar",
    confirmButtonClass: 'btn btn-primary',
    denyButtonClass: 'btn btn-danger ml-2',
    cancelButtonClass: 'btn btn-secondary ml-2',
    buttonsStyling: false,
    customClass: {
        popup: 'my-popup-class'
    }
}).then((result) => {
    if (result.isConfirmed) {
        window.open('https://apkpure.com/es/tuweka/io.ionic.tuwekacli', '_blank');
    } else if (result.isDenied) {
        window.open('https://apkpure.com/es/jobox/io.ionic.starter.jobox', '_blank');
        // Acción al hacer clic en el botón Jobox
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción al hacer clic en el botón Cancelar
    }
});

  
}
function goToKotlin(boton){
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón

  Swal.fire({
    title: "¡Esto es el comienzo!",
    text: "Realicé una mini, pero mini app con Android Studio, para aprender sobre el tema.",
    showCancelButton: true,
    confirmButtonText: "Go to App",
    cancelButtonText: "Cancelar",
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-secondary ml-2',
    buttonsStyling: false,
    customClass: {
        popup: 'my-popup-class'
    }
}).then((result) => {
    if (result.isConfirmed) {
        window.open('https://github.com/ojimenezl/testKotlin', '_blank');
        // Acción al hacer clic en el botón Go to App
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción al hacer clic en el botón Cancelar
    }
});


  
}
function guardarSql(boton){
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón

  Swal.fire({
    title: "Escribeme algo y lo guardare en mi base SQL",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Guardar",
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      try {
        const githubUrl = `
          https://api.github.com/users/${login}
        `;
        const response = await fetch(githubUrl);
        if (!response.ok) {
          return Swal.showValidationMessage(`
            ${JSON.stringify(await response.json())}
          `);
        }
        return response.json();
      } catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `'${result.value.login}' Enserio guardaste eso?? jaja `,
        imageUrl: result.value.avatar_url
      });
    }
  });
}

function javascript(boton){
  boton.style.boxShadow = "0 0 20px 5px rgba(2, 251, 176, 0.812)"; // Cambia la sombra del botón

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

swalWithBootstrapButtons.fire({
    title: "Y llegamos a la pregunta de Oro, por un desarrollador nuevo, dinos...",
    text: "¿Crees que toda esta página está creada solo con JavaScript?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "¡Claro, seguro!",
    cancelButtonText: "¡No, eso es imposible!",
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
            title: "¡Felicidades!",
            text: "¡Has descubierto nuestro pequeño secreto! Sí, esta página está hecha principalmente con JavaScript, pero hay mucho más que eso. Para recibir a tu nuevo Desarrollador de Software Contáctanos en oscarj-456@hotmail.com",
            icon: "success"
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
            title: "Oh no!",
            text: "¡Te has perdido la oportunidad de conseguir un Desarrollador nuevo! Aunque puedes interntarlo de nuevo, no diremos nada si lo intentas otra vez jeje",
            icon: "error"
        });
    }
});

}