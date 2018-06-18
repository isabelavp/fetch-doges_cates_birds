window.onload = () => {
	var logo = document.getElementById('logo');
	var boton = document.getElementById('btn');
	boton.addEventListener('click',function() {
		logo.style.display = 'block';
		obtenerDoges();
});

  var logo2 = document.getElementById('logo2');
	var botonDos = document.getElementById('btnDos');
	botonDos.addEventListener('click', function() {
		logo.style.display = 'block';
		obtenerGatos();
});

	var logo3 = document.getElementById('logo3');
	var botonTres = document.getElementById('btnTres');
	botonTres.addEventListener('click', function() {
		logo.style.display = 'block';
		dogesYCatesEnParalelo();
});

};

//La función puede ser llamada desde cualquier parte
function obtenerDoges() {
  var xhttp = new XMLHttpRequest(); //Objeto que representa la petición (request)
  xhttp.onreadystatechange = () => { //Evento cuando el estado haya cambiado (cuando esté listo) Se ejecutará cuando esté lista, cuando reciba la respuesta
    if (xhttp.readyState == 4 && xhttp.status == 200) { //Todas las respuestas “200 y algo” serán respuestas satisfactorias
      const dogeResponse = JSON.parse(xhttp.responseText); //No usar funciones flechas cuando usamos this.  usar json punto stringify cuando tratemos con objetos 
      const dogeReceptorDiv = document.getElementById("dogeReceptor");
      for (let dogeIndex = 0; dogeIndex < dogeResponse.length; dogeIndex++) {
        const dogeImg = document.createElement('img'); //Aquí "almaceno" las imágenes
        dogeImg.src = dogeResponse[dogeIndex];
        dogeReceptorDiv.appendChild(dogeImg);
      }
    }
  };
  xhttp.onerror = () => {

  }
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true", true); //Con GET sólo se accede a datos, NO se envían (Cuando se hace Login, se debería hacer con POST, no con GET). Va el verbo (GET) y luego la petición (URL)
  xhttp.send(); //Aquí se ejecuta la petición

  /*
   * Podemos seguir ejecutando código acá mientras esperamos la respuesta
   */
  //console.log("Holi soy doge");
  
}



// Acá vamos a poner la función para obtener info de gatos
function obtenerGatos() {
  // Fetch retorna una promesa
  fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`) //Recibe la URL donde se va a hacer la consulta
    .then((response) => { //Este then es de la promesa del fetch
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Mala respuesta de gatitos");
      }
    }).then((catesJson) => { //recibimos el JSON en este punto
      //Este then es de la promesa de response.json()
      const cateReceptorDiv = document.getElementById("cateReceptor");
      for (let cateIndex = 0; cateIndex < catesJson.length; cateIndex++) {
        const cateImg = document.createElement('img'); //Aquí "almaceno" las imágenes
        cateImg.src = catesJson[cateIndex];
        cateReceptorDiv.appendChild(cateImg);
      }
    })
    .catch((error) => {
      console.error("Holi soy un error " + error);
    });
}



function dogesYCatesEnParalelo() {
  Promise.all([
    fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`),
    fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true`),
    fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/birds?count=10&urls=true&httpsUrls=true`)
  ]).then((responses) => {
    return Promise.all(
      responses.map(
        (response) => {
          return response.json();
        }
      )
    );
  }).then((catesDogesJson) => {
    console.log("Respuesta en paralelo > " + JSON.stringify(catesDogesJson));
    const animalReceptorDiv = document.getElementById("animalReceptor");
    catesDogesJson.forEach((jsonElement)=>{
        jsonElement.forEach((animal)=>{
            const animalImg = document.createElement("img");
            animalImg.src = animal;
            animalReceptorDiv.appendChild(animalImg);
        });
    }); 
    //Con forEach*/
    /*
    for (let i = 0; i < catesDogesJson.length; ++i) {
      for (let j = 0; j < catesDogesJson[i].length; ++j) {
        const animalImg = document.createElement("img");
        animalImg.src = catesDogesJson[i][j];
        animalReceptorDiv.appendChild(animalImg);
      }
    }*/
  }).catch((error) => {

  });
}



//perros gatos y pajaros en paralelo


/*
window.onload = () => {
  obtenerDoges();
  dogesYcatesEnParalelo();
};

//La función puede ser llamada desde cualquier parte
function obtenerDoges() {
  var xhttp = new XMLHttpRequest(); //Objeto que representa la petición (request)
  xhttp.onreadystatechange = () => { //Evento cuando el estado haya cambiado (cuando esté listo) Se ejecutará cuando esté lista, cuando reciba la respuesta
    if (xhttp.readyState == 4 && xhttp.status == 200) { //Todas las respuestas “200 y algo” serán respuestas satisfactorias
      const dogeResponse = JSON.parse(xhttp.responseText); //No usar funciones flechas cuando usamos this.  usar json punto stringify cuando tratemos con objetos 
      const dogeReceptorDiv = document.getElementById("dogeReceptor");
      for (let dogeIndex = 0; dogeIndex < dogeResponse.length; dogeIndex++) {
        const dogeImg = document.createElement('img'); //Aquí "almaceno" las imágenes
        dogeImg.src = dogeResponse[dogeIndex];
        dogeReceptorDiv.appendChild(dogeImg);
      }
    }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true", true) 
  //Con GET sólo se accede a datos, NO se envían (Cuando se hace Login, se debería hacer con POST, no con GET). Va el verbo (GET) y luego la petición (URL)
  xhttp.send(); //Aquí se ejecuta la petición

  /*
   * Podemos seguir ejecutando código acá mientras esperamos la respuesta
   */
   /*
  console.log("Holi soy doge");
}
// Acá vamos a poner la función para obtener info de gatos
function obtenerGatos() {
	fetch("https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true", true)
    //para imprimir valores que quiero meter en la api "https://cors-anywhere.herokuapp.com/http://shibe.online/api ${"cats"}  /shibes?count=10&urls=true&httpsUrls=true", true
    //este then es de la promesa de fetch
    .then((response) => { //si se cumple la promesa y se resive la respuesta, fetch cuando recibe un error del servidor no falla porque recibio una respuesta
      if(response.ok){
      	return response.json();

    }  else {
    	console.log("los gatitos no pudieron ser descargados");
    	throw new Error("Mala respuesta de gatitos");
    }
  //si retorno una promesa y esta no se cumplio, debo hacer otro then para anidar esa promesa que no se cumplio
   //este then es de la promesa de json
    }).then((catesJson) =>{ //recibimos el json en este punto
    	console.log("JSON recibido>" + JSON.stringify(catesJson));
      const cateReceptorDiv = document.getElementById("cateReceptor");
      for (let cateIndex = 0; cateIndex < cateResponse.length; cateIndex++) {
        const cateImg = document.createElement('img'); //Aquí "almaceno" las imágenes
        cateImg.src = catesJson[cateIndex];
        cateReceptorDiv.appendChild(cateImg);

    }
})
    .catch((error) =>{

    });  //catch es el fallo, el error de fetch sale cuando murio la conexionc
}


function dogesYcatesEnParalelo(){

	Promise.all([
		fetch("https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true"),
		fetch("https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true") 
		]).then((responses) =>{
			return Promise.all(
				responses.map(
					(response)=>{
						return response.json();
					}
				)
    );

				}).then((catesDogesJson)=>{

					console.log("respuesta en paralelo >" + JSON.stringify(catesDogesJson));
					const animalReceptorDiv = document.getElementById("animalReceptor");
					catesDogesJson.forEach((jsonElement)=>{
						const animalImg = document.createElement("img");
						animalImg.src = animal;
						animalReceptorDiv.appendChild(animalImg);

					})

					/*  con for solo

					for (let i=0; i< catesDogesJson.length; i++){
	for(let j= 0; j < catesDogesJson[i]length; j++){
		const animalImg = document.createElement("img");
						animalImg.src = animal;
						animalReceptorDiv.appendChild(animalImg);

	
	}
					}  
				

		}).catch((error)=>{

		});
}
*/