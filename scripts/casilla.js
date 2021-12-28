// let objCasillas =[
//     {
//         id : 1,
//         avatar : "https://ibb.co/nnLrvCJ"
//     }
// ]

window.addEventListener("DOMContentLoaded", function () {//todo lo que debe esperar a que se cargue la pagina se mete en esta función
    //Entorno:
    let jugando = true;
    
    let template;//aqui va la tematica escogida con los avatares 
    let turno = '';
    const ranking = {
        partidasJ1: 0,
        partidasJ2: 0,
        partidasEmpate:0,
        totalPartidas: 0    
    }

    const jugador1 = {
        nombre: '',
        avatar: ''
    }

    const jugador2 = {
        nombre: '',
        avatar: ''
    }

    const templates = {
        clasico: {
            avatar1: './img/circulo.gif',
            avatar2: './img/equis.gif',
            background: './img/equis.gif'
        },
        matrix: {
            avatar1: './img/neo.png',
            avatar2: './img/trinity.png',
            background: './img/trinity.png'
        }
    }


    const templatesarray = [
        {
            avatar1: './img/circulo.gif',
            avatar2: './img/equis.gif',
            background: 'cyan'
        },
        {
            avatar1: './img/neo.png',
            avatar2: './img/trinity.png',
            background: 'gray'
        }
    ]

    //Funcion comprobación

    
    
    //esto no funciona
    // function asignarAvatar(){
    //     let avatar = document.getElementById("selectAvatar").value;
        
    //     document.getElementById("jugador1").innerHTML = "<img src='"+avatar+">";// le meto al div la imagen cogida en el select         
    // }

    //con el evento change muestro el avatar cogido en el select
    const selectElement = document.querySelector('#selectAvatar1');
    selectElement.addEventListener('change', (event) => {
        //const jugador = document.querySelector('#jugador1');
        //jugador.innerHTML = '<img src="'+`${event.target.value}`+'" height="80">';//${} string template no se necesita usar el + para concatenar

        const selectedTemplate = event.target.value; //valor seleccionado por el usuario cuando cambio la opcion

        const templateInfo = templates[selectedTemplate];

        //actualiza info de jugadores
        jugador1.avatar = templateInfo.avatar1;
        jugador2.avatar = templateInfo.avatar2;

        //Acturalizar imagen que se muestra en la configuracion
        const jugadorDiv1 = document.querySelector('#jugador1');
        jugadorDiv1.innerHTML = `<img src="${jugador1.avatar}" height="80">`;

        const jugadorDiv2 = document.querySelector('#jugador2');
        jugadorDiv2.innerHTML = `<img src="${jugador2.avatar}" height="80">`;

        //actualizar el background
        document.querySelector('body').style.backgroundColor = templateInfo.background;

    });
    
    document.querySelector('#iniciarPartido').addEventListener('click', function() {

        //validar que se haya seleccionado un template
        //validar que los nombres se hayan colocado
        // asignar los nombres a los jugadores
        //desaparecer la seccion de configuracion
        // aparecer el tablero y asignar el turno inicial
    })



    /*
    Cuando un jugador hace click en una casilla
    1) valido si no se ha jugado ya
    2) Cambio el fondo de la casill apor el avatar de ese jugador
    3) a partir dle tercer click compruebo si ya se ha ganado o no    
    4) Si ha ganado o empatado, finalizo juego
    5) Si no ha ganado o empatado, cambio de turno
    */

    /**
     * Finalizar juego
     * 1) actualizar ranking
     * 2) Mostrar opcion de revancha o inicio
     * 3) si el usuario hace click en revancha --> Reinicar partida
     * 4) si no, volvemos a la pagina inicial de configuracion de usuarios y tablero oculto
     */

    /**
     * Reiniciar partida
     * 1) limpiar casillas
     * 2) reiniciar turno
     */






    
    var casilla = document.querySelector('#c1');
    casilla.onclick = asignarAvatar;


    function asignarAvatar(){
        const selectCasilla = document.querySelector('#c1');
        selectCasilla.addEventListener('click', function(){
            var imagen = document.get
            selectCasilla.style.backgroundImage = turno.avatar;
        });
        //falta poenr el tamaño y asociar a que sea la seleccionada
    }


});

// https://ibb.co/QvP3k9c
//https://ibb.co/nnLrvCJ