
let state = {
	puzzle:'mr mojo risin',
	goodLetters:[],
	badLetters:[],
	gameStatus: 'playing',

};

const setState = (nextState)=>{
	state = {...state, ...nextState };
	render();
};

const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


const render = () =>{
	const gallow = document.querySelector('.gallow');
	gallow.className = gallow.className.replace(/mistake-\d/,'');
	gallow.classList.add('mistake-'+(state.badLetters.length));


// Rendering all the word in hidden mode. Will see the letter if user guess right.
	let newPuzzle = '';
	for(let i = 0; i < (state.puzzle.length); i++){
		let letterToRender = '';
		if( state.goodLetters.indexOf(state.puzzle[i]) !== -1){
			letterToRender = state.puzzle[i];
		}

		newPuzzle += `<span class="${state.puzzle[i] === ' '? 'space':''}">`+
		                letterToRender+
		              '</span>';
	}
	document.querySelector('.puzzle').innerHTML = newPuzzle;


// Rendering all the bad letters to the Screen 
	let newBadLetters = '';
	for(let i = 0; i < (state.badLetters.length); i++){
		newBadLetters += `<span class="bad-letters">${state.badLetters[i]}</span>`;
	}
	// Rendering the The bad letters to user screen.
	document.querySelector('.bad-letters').innerHTML = newBadLetters;


// Rendering the buttons to the screen.
	let newButtons = '';
	for(let i=0; i <(alphabet.length); i++){
		if( ( state.goodLetters.indexOf( alphabet[i] ) === -1 ) && 
			(state.badLetters.indexOf( alphabet[i] )=== -1 ) ) {
			newButtons += `<button onclick="guessLetter('${alphabet[i]}')">${alphabet[i]}</button>`;
		}
		
	}
	document.querySelector('.buttons').innerHTML = newButtons;

	if( state.gameStatus === 'over' ){
		document.querySelector('.game-status-message').innerHTML = '<div class="lose-message">You lost the game</div>';
	}else if( state.gameStatus === 'playing' ) {
		document.querySelector('.game-status-message').innerHTML = '';
	}else if( state.gameStatus === 'winning'){
		document.querySelector('.game-status-message').innerHTML = '<div class="win-message"> You are a winnner my friend!</div>'
	}
};

render();


function guessLetter(letter){
	if ( state.gameStatus === 'playing'){

		if(state.puzzle.includes(letter)){
			//Good Guess
			const newGoodLetters = state.goodLetters.concat(letter)
			setState({
				goodLetters:newGoodLetters,
			});
			// Figure out if they are winning 
			let lettersRemaining = state.puzzle.replace(/\s/g, '');
			for(let i =0; i < (state.goodLetters.length); i++){
				lettersRemaining = lettersRemaining.replace(new RegExp(state.goodLetters[i], 'g'),'');
			}
			if( lettersRemaining === ''){
				setState({
					gameStatus:'winning',
				});
			}
			console.log(lettersRemaining)
		}else{
			//bad guess
			const badLetters = state.badLetters.concat(letter)
			setState({
				badLetters:badLetters,
			});

		if (state.badLetters.length >= 6){
			setState({
				gameStatus:'over',
			});
		}
	}
	}
	
}



function setNextPuzzle(){
	setState({
		puzzle:document.querySelector('.next-puzzle').value,
		goodLetters: [],
		badLetters: [],
		gameStatus: 'playing',
	});
	puzzle:document.querySelector('.next-puzzle').value='';
}



// Change the Puzzle so the game will have a new word.
//setTimeout(()=> setState({
//	puzzle:'jim morrison'
//}), 5000);