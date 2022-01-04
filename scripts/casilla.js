// let objCasillas =[
//     {
//         id : 1,
//         avatar : "https://ibb.co/nnLrvCJ"
//     }
// ]

window.addEventListener("DOMContentLoaded", function () {//todo lo que debe esperar a que se cargue la pagina se mete en esta función
    //Entorno:
    let jugando = true;
    
    let template=null;//aqui va la tematica escogida con los avatares 
    let turno = 1;
    const marcador = {//se llamaba ranking pero le he cambiado el nombre a marcador porque el ranking es el numero de partidas ganadas por un jugador, marcador es de la serie de partidas actual
        partidasJ1: 0,
        partidasJ2: 0,
        partidasEmpate:0,
        totalPartidas: 0    
    }

    const jugador1 = {
        nombre: '',
        //avatar: '' el avatar se coge del template, 
    }

    const jugador2 = {
        nombre: '',
        //avatar: ''
    }

    const templates = {
        
        clasico: {
            avatar1: './img/circulo.gif',
            avatar2: './img/equis.gif',
            background: 'gray'
        },
        matrix: {
            avatar1: './img/neo.png',
            avatar2: './img/trinity.png',
            background: 'red'
        }
    }


    //Funcion comprobación

    //con el evento change muestro el avatar cogido en el select
    const selectElement = document.querySelector('#selectAvatar1');
    selectElement.addEventListener('change', (event) => {
        //const jugador = document.querySelector('#jugador1');
        //jugador.innerHTML = '<img src="'+`${event.target.value}`+'" height="80">';//${} string template no se necesita usar el + para concatenar

        const selectedTemplate = event.target.value; //value seleccionado por el usuario cuando cambia la opción del select, si el selectedTemplate es vacio da error
        const jugadorDiv1 = document.querySelector('#j1Imagen');
        const jugadorDiv2 = document.querySelector('#j2Imagen');
        //si no se selecciona ningun template se deja todo sin imagenes y sin color de fondo
        if(selectedTemplate==''){
            jugadorDiv1.innerHTML='';
            jugadorDiv2.innerHTML='';
            document.querySelector('body').style.backgroundColor = 'white';
            template=null;
        }else{
            const templateInfo = templates[selectedTemplate];//no se usa la notación del punto porque es dinámico y no se sabe cual es la temática que se va a escoger
            //actualiza info de jugadores
            //jugador1.avatar = templateInfo.avatar1;
            //jugador2.avatar = templateInfo.avatar2;
            template=templateInfo;
            //Actualizar imagen que se muestra en la configuracion
        
            jugadorDiv1.innerHTML = `<img src="${template.avatar1}" height="80">`;

            jugadorDiv2.innerHTML = `<img src="${template.avatar2}" height="80">`;

            //actualizar el background
            document.querySelector('body').style.backgroundColor = templateInfo.background;
        }
    });
    
    document.querySelector('#iniciarPartido').addEventListener('click', function() {
        document.getElementById('errores').innerHTML='';
        //validar que se haya seleccionado un template
        let hayErrores=false;
        if(!template){
            hayErrores=true;
            document.getElementById('errores').innerHTML+='No se puede iniciar la partida si no se ha seleccionado una temática<br/>';
        }
        //validar que los nombres se hayan colocado
        let regex = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;
        let nomJ1 = document.querySelector('#j1').value;
        let nomJ2 = document.querySelector('#j2').value;
        if(!regex.test(nomJ1)){
            hayErrores=true;
            document.getElementById('errores').innerHTML+='No se puede iniciar el juego sin haber establecido un nombre correcto de entre 3 y 16 caracteres para jugador 1<br/>';
        }
        if(!regex.test(nomJ2)){
            hayErrores=true;
            document.getElementById('errores').innerHTML+='No se puede iniciar el juego sin haber establecido un nombre correcto de entre 3 y 16 caracteres para jugador 2<br/>';
        }
        

        if (!hayErrores){
            //se debe asignar los nombres a los jugadores
            jugador1.nombre=document.getElementById('j1').value;
            jugador2.nombre=document.getElementById('j2').value;

            //desaparecer la seccion de configuracion
                document.querySelector('#seccionConfiguracion').style.display='none';
            // aparecer el tablero y asignar el turno inicial
            document.querySelector('.tablero').style.display='block';
        } 
        
        /*
        Cuando un jugador hace click en una casilla
        1) valido si no se ha jugado ya
        
        2) Cambio el fondo de la casilla por el avatar de ese jugador y cambio de turno
        */
        let arrayCasillas = document.querySelectorAll('.casilla'); 
        for(let i=0;i<arrayCasillas.length;i++){
            arrayCasillas[i].addEventListener('click',function(event){
                //miro si la casilla esta blanca, es decir si no se ha jugado
                if(event.target.style.backgroundImage==''){
                    let rutaImagen=null;
                    if(turno==1){
                        rutaImagen="url("+template.avatar1+")";
                        turno=2;
                    }else{
                        rutaImagen="url("+template.avatar2+")";
                        turno=1;
                    }
                    event.target.style.backgroundImage=rutaImagen;
                }
                //AQUI PROBABLEMENTE DEBA HACER UN TRY CATCH THROW
                comprobacion();
            })
        }
        

        //3) compruebo si ya se ha ganado o no, la funcion devuelve 1 si ha ganado el jug1, 2 si haganado el jg2, 0 si es un empate y null si se puede seguir jugando
        function comprobacion (){
            let ganador=null;
            let imagenGanadora=null;
            //aunque las no jugadas tienen una imagen blanca de fondo, esta imagen viene de una regla css por que no es accesible haciendo .style.backgroundImage. Las no jugadas devuelven vacio por no tener inline styles


            //En este bloque de 8 if compruebo si las imagenes o el avatar de una serie de casillas son iguales, en caso que lo sean se identifica como la imagen ganadora y el jugador asociado a esa imagen es el ganador
            if(document.getElementById('c1').style.backgroundImage!=''&&document.getElementById('c1').style.backgroundImage==document.getElementById('c2').style.backgroundImage && document.getElementById('c2').style.backgroundImage==document.getElementById('c3').style.backgroundImage){
                imagenGanadora=document.getElementById('c1').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c4').style.backgroundImage!=''&&document.getElementById('c4').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c6').style.backgroundImage){
                imagenGanadora=document.getElementById('c4').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c7').style.backgroundImage!=''&&document.getElementById('c7').style.backgroundImage==document.getElementById('c8').style.backgroundImage && document.getElementById('c8').style.backgroundImage==document.getElementById('c9').style.backgroundImage){
                imagenGanadora=document.getElementById('c7').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c1').style.backgroundImage!=''&&document.getElementById('c1').style.backgroundImage==document.getElementById('c4').style.backgroundImage && document.getElementById('c4').style.backgroundImage==document.getElementById('c7').style.backgroundImage){
                imagenGanadora=document.getElementById('c1').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c2').style.backgroundImage!=''&&document.getElementById('c2').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c8').style.backgroundImage){
                imagenGanadora=document.getElementById('c2').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c3').style.backgroundImage!=''&&document.getElementById('c3').style.backgroundImage==document.getElementById('c6').style.backgroundImage && document.getElementById('c6').style.backgroundImage==document.getElementById('c9').style.backgroundImage){
                imagenGanadora=document.getElementById('c3').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c1').style.backgroundImage!=''&&document.getElementById('c1').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c9').style.backgroundImage){
                imagenGanadora=document.getElementById('c1').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(document.getElementById('c3').style.backgroundImage!=''&&document.getElementById('c3').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c7').style.backgroundImage){
                imagenGanadora=document.getElementById('c3').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }

            //basado en la imagen ganadora, se determina quien ha ganado
            if(imagenGanadora!=null){//SI NO HAY IMAGEN GANADORA, NO HA GANADO NADIE
                console.log('ig='+imagenGanadora);
                console.log('av1='+template.avatar1);
                if(template.avatar1==imagenGanadora){
                    ganador=1;
                }else{
                    ganador=2;
                }
            }
            
            let todasLasCasillas=document.querySelectorAll('.casilla');
            let hayBlancas=false;
            for(let i=0;i<todasLasCasillas.length;i++){
                if(todasLasCasillas[i].style.backgroundImage==''){
                    hayBlancas=true;
                    break;//paro cuando hay una blanca y salgo
                }  
            }
            
            //un empate es cuando estan todas las casillas llenas y no hay ganador 
            if (imagenGanadora==null && !hayBlancas){
                ganador=0;
            }
            console.log('ganador= '+ganador);
            return ganador;
        }
        
        //TERMINAR EL JUEGO
        let ganador = comprobacion();
        //5) Si ha ganado o empatado, finalizo juego
        if(ganador==1||ganador==2||ganador==0){
            //¿como finalizo el juego?
            if(ganador==0){
                document.getElementById('aviso').innerHTML='Es un empate';    
            }else{
                document.getElementById('aviso').innerHTML='El ganador es el jugador '+ganador;
            return;//para salir de la funcion
            }
            
        }


    });



    


    /*
    
    
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






    
    // var casilla = document.querySelector('#c1');
    // casilla.onclick = asignarAvatar;


    // function asignarAvatar(){
    //     const selectCasilla = document.querySelector('#c1');
    //     selectCasilla.addEventListener('click', function(){
    //         var imagen = document.getElementById('#j1Imagen')
    //         selectCasilla.style.backgroundImage = turno.avatar;
    //     });
    //     //falta poenr el tamaño y asociar a que sea la seleccionada
    // }


});

// https://ibb.co/QvP3k9c
//https://ibb.co/nnLrvCJ