
let state = {
	puzzle:'mr mojo risin',
	goodLetters:[],
	badLetters:[],

};

const setState = (nextState)=>{
	state = {...state, ...nextState };
	console.log(state);
	render();
};

const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const render = () =>{
	let newPuzzle = '';
	for(let i = 0; i < (state.puzzle.length); i++){
		newPuzzle += `<span class="${state.puzzle[i] === ''? 'space':''}">`+
		                state.puzzle[i]+
		              '</span>';
	}

	document.querySelector('.puzzle').innerHTML = newPuzzle;

	let newButtons = '';
	for(let i=0; i <(alphabet.length); i++){
		if( ( state.goodLetters.indexOf( alphabet[i] ) === -1 ) && 
			(state.badLetters.indexOf( alphabet[i] )=== -1 ) ) {
			newButtons += `<button onclick="guessLetter('${alphabet[i]}')">${alphabet[i]}</button>`;
		}
		
	}
	document.querySelector('.buttons').innerHTML = newButtons;

};

render();


function guessLetter(letter){
	if(state.puzzle.includes(letter)){
		//Good Guess
		const newGoodLetters = state.goodLetters.concat(letter)
		setState({
			goodLetters:newGoodLetters,
		});
	}else{
		//bad guess
		const badLetters = state.badLetters.concat(letter)
		setState({
			badLetters:badLetters,
		});
	}
	
}



function setNextPuzzle(){
	setState({
		puzzle:document.querySelector('.next-puzzle').value,
	});
	puzzle:document.querySelector('.next-puzzle').value='';
}



// Change the Puzzle so the game will have a new word.
//setTimeout(()=> setState({
//	puzzle:'jim morrison'
//}), 5000);