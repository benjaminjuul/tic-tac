        /*
            
            Stuff to handle ;-):
            1. Make the fields clickable (player0 uses "X", player1 "0")
            2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
            3. Avoid that used fields can be played again and implement feedback like "Field already taken" (alert();)
            4. Check for winning combinations
            5. Implement feedback to the players (winning or game is a draw)
            6. End the game, avoid further playing
            7. Add a "Play again button"
            8. Implement "eternal" game statistics (using local storage!)
            9. Style the game as fancy and responsive as you can ;-)
            
            */

        // global game variables
        var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playerScore1, playerScore2, draw;


        playerScore1 = 0;
        playerScore2 = 0;
        draw = 0;

        localStorage.getItem('playerScoreX');
        localStorage.getItem('playerScoreO');
        localStorage.getItem('draw');


        if (localStorage.getItem('Player1') !== 0) {
            playerScore1 = Number(localStorage.getItem('Player1'));
        }
        
        if (localStorage.getItem('Player2') !== 0) {
            playerScore2 = Number(localStorage.getItem('Player2'));
        }
        
        if (localStorage.getItem('Draw') !== 0) {
            draw = Number(localStorage.getItem('Draw'));
        }


        player = 0;


        fields = [];
        fields = document.getElementsByTagName('td');
        console.log(fields);

        fieldsPlayed = [];
        fieldsPlayer0 = [];
        fieldsPlayer1 = [];

        playButton = document.getElementById('playAgain').addEventListener('click', playAgain);
        clearButton = document.getElementById('clear').addEventListener('click', clear);


        msg = document.getElementById('msg');

   
        document.getElementById('player1').innerHTML = 'Player X: ' + Number(localStorage.getItem('Player1'));
        document.getElementById('player2').innerHTML = 'Player O: ' + Number(localStorage.getItem('Player2'));
        document.getElementById('draw').innerHTML = 'Draw: ' + Number(localStorage.getItem('Draw'));
       
        const scoreboard = document.querySelector('.score');
        const table = document.querySelector('.table');
       



        function clear() {
      
            localStorage.clear();
            window.location.reload(true);
        };

        function showScoreboard(){
            scoreboard.style.display = 'block';
        }
        function removeTable(){
            table.style.display = 'none';
        }


        for (let i = 0; i < fields.length; i++) {
            fields[i].addEventListener('click', play);
        }

        function play() {
            // game core mechanics, marking the fields
            // field.addEventListener('click', play);¨
            if (fieldsPlayed.includes(this.id)) {
                alert('No can do!')
            }
            console.log("u called me");
            if (player === 0 && !fieldsPlayed.includes(this.id)) {
                this.innerHTML = 'X';
                this.style.color = 'blue';
                fieldsPlayer0.push(parseInt(this.id));
                player = 1
            } else if (player === 1 && !fieldsPlayed.includes(this.id)) {
                this.innerHTML = 'O';
                this.style.color = 'red';
                fieldsPlayer1.push(parseInt(this.id));
                player = 0;
            }
            fieldsPlayed.push(this.id);
            console.log(fieldsPlayed);

            win();
        }

        function win() {
            // analyzing field choices, winning conditions, feedback
            if (
                fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) || 
                fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
                fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) || 
                fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
                fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
                fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) || 
                fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
                fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7) 
            ) {
                // Player 0 won!
                msg.innerHTML = 'Player X won!'
                // Adding +1 to our player X if he wins. Then we store it to our localStorage 
                playerScore1++;
                gameOver();
                gameStats();
                showScoreboard();
                removeTable();

            } else if (
                fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) || 
                fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
                fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) || 
                fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
                fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
                fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) || 
                fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
                fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)
            ) {
                // Player 1 won!
                msg.innerHTML = 'Player O won!';
                // Adding +1 to our player 0 if he wins. Then we store it to our localStorage 
                playerScore2++;
                gameOver();
                gameStats();
                showScoreboard();
                removeTable();  

            } else if (fieldsPlayed.length == 9) {
                // game is a draw  
                msg.innerHTML = 'It\'s a draw';
                draw++; 
                gameOver();
                gameStats();
                showScoreboard();
                removeTable();
            }
        }

        function gameOver() {
            // ending the game 
            for (let i = 0; i < fields.length; i++) {
                fields[i].removeEventListener('click', play)
            }
        }

        function playAgain() {
            // restart the game
            window.location.reload(true);
        }


        function gameStats() {
            // game stats using local storage

            localStorage.setItem('Player1', playerScore1);
	        localStorage.setItem('Player2', playerScore2);
	        localStorage.setItem('Draw', draw);

	        localStorage.Player1 = Number(localStorage.Player1);
	        localStorage.Player2 = Number(localStorage.Player2);
	        localStorage.Draw = Number(localStorage.Draw);

         
	        document.getElementById('player1').innerHTML = 'Player X: ' + localStorage.Player1;
	        document.getElementById('player2').innerHTML = 'Player O: ' + localStorage.Player2;
	        document.getElementById('draw').innerHTML = 'Draw: ' + localStorage.Draw;
        }






        