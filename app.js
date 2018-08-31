/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// Empieza la partida
init();

// Acción de clicar sobre el botón tirar dado
document.querySelector('.btn-roll').addEventListener('click', function() {

  // Comprobamos si es una partida activa
  if (gamePlaying) {

    //1. Obtener random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Mostrar el resiltado
    var diceDOM = document.querySelector('.dice');
    // Muestra dado
    diceDOM.style.display = 'block';
    // Asignamos la imagen correspondiente
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Añadir resultado al marcador total si el resultado del dado no es 1
    if (dice !== 1) {

      // Añadimos resultado
      roundScore += dice;

      // Igualamos el marcador de la tirada al valor del dado
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {

      // Turno del siguiente jugador
      nextPlayer()

    }
  }
});

// Almacenamos el resultado de la tirada en el marcador total
document.querySelector('.btn-hold').addEventListener('click', function() {

    // Comprobamos si la partida está activa
    if (gamePlaying) {

      // 1. Añadimos el current score al total score
      scores[activePlayer] += roundScore;

      // 2. Actualizamos la UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

      // 3. Comprobar si el jugador ha ganado la partida
      if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

        // Ocultamos el dado
        document.querySelector('.dice').style.display = 'none';

        // Añadimos clase
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        // Termina la partida
        gamePlaying = false;

      } else {

        // Siguiente jugador
        nextPlayer()

      }
    }
});

function nextPlayer () {
  // Cambia de jugador
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Reformateamos el marcador a 0
  roundScore = 0;

  // Reseteamos los marcadores a 0
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  // Cambiamos el puntero que indica el turno del jugador
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  // Volvemos a ocultar el dado
  document.querySelector('.dice').style.display = 'none';
}

// Funcionalidad nnueva partida
document.querySelector('.btn-new').addEventListener('click', init);

// Inicializa el juego
function init () {

  // Reseteamos a 0 los marcadores
  scores = [0, 0];

  // Reiniciamos los jugadores
  activePlayer = 0;

  // Marcador a 0
  roundScore = 0;

  // Variable de estado
  gamePlaying = true;

  // Iniciamos los marcadores de los jugadores a 0
  for (var i = 0; i < scores.length; i++) {
    document.getElementById('score-' + i).textContent = 0;
    document.getElementById('current-' + i).textContent = 0;
    document.querySelector('#name-' + i).textContent = 'Player ' + (i + 1);
    document.querySelector('.player-' + i + '-panel').classList.remove('winner');
    document.querySelector('.player-' + i + '-panel').classList.remove('active');
  }

  // Oculta el dado
  document.querySelector('.dice').style.display = 'none';

  // Jugador activo
  document.querySelector('.player-0-panel').classList.add('active');
}



