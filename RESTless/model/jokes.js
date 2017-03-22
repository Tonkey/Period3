var jokes = [
  "A day without sunshine is like, night.",
  "At what age is it appropriate to tell my dog that he's adopted?",
  "I intend to live forever, or die trying"
];

function _getRandomJoke(){
    var randInt = Math.floor(Math.random()*jokes.length);

    return jokes[randInt];
};

function _addJoke(newJoke){
    jokes.push(newJoke);
};

module.exports = {
    allJokes : jokes,
    getRandomJoke : _getRandomJoke,
    addJoke : _addJoke
}