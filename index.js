// Angel Higueros
// 20460
// Proyecto IA

const io = require('socket.io-client');
const { makeMove } = require('./IA/IA');

let port = 4000;
let url = `http://127.0.0.1:${port}`;
let tournamentId = '142857';

let socket = io(url);
console.log('Connecting to server...');

socket.on('connect', () => {
    console.log('Connected to server.');
    socket.emit("signin", {
        user_name: "Angel Higueros",
        tournament_id: tournamentId,
        user_role: "player"
    }
    )
});

socket.on("ok_signin", () => {
    console.log('Successfully signed in to tournament.');
});


socket.on("ready", (data) => {
    let { game_id, player_turn_id, board } = data;


    let movement = makeMove(board, player_turn_id);
    console.log(`Making move ${movement}`)
    socket.emit("play", {
        tournament_id: tournamentId,
        player_turn_id: player_turn_id,
        game_id: game_id,
        movement: movement
    });

});



socket.on("finish", (data) => {
    console.log("Game has finished");
    socket.emit("player_ready", {
        tournament_id: tournamentId,
        player_turn_id: data.player_turn_id,
        game_id: data.game_id
    });
});


module.exports = { socket };
