// let objCasillas =[
//     {
//         id : 1,
//         avatar : "https://ibb.co/nnLrvCJ"
//     }
// ]

window.addEventListener("DOMContentLoaded", function () {//todo lo que debe esperar a que se cargue la pagina se mete en esta función

    // let jugando = true;
    // let jugadorActual = "";
    // //let mensajeGanador = "El "++"ha ganado";
    // let jug1 = "jugador 1";
    // let jug2 = "jugador 2";
    
    //esto no funciona
    // function asignarAvatar(){
    //     let avatar = document.getElementById("selectAvatar").value;
        
    //     document.getElementById("jugador1").innerHTML = "<img src='"+avatar+">";// le meto al div la imagen cogida en el select         
    // }

    //con el evento change muestro el avatar cogido en el select
    const selectElement = document.querySelector('#selectAvatar1');
    selectElement.addEventListener('change', (event) => {
        const jugador = document.querySelector('#jugador1');
        jugador.innerHTML = '<img src="'+`${event.target.value}`+'" height="80">';
    });
    const selectElement2 = document.querySelector('#selectAvatar2');
    selectElement2.addEventListener('change', (event) => {
        const jugador = document.querySelector('#jugador2');
        jugador.innerHTML = '<img src="'+`${event.target.value}`+'" height="80">';
    });

});

// https://ibb.co/QvP3k9c
//https://ibb.co/nnLrvCJ