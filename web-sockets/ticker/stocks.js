const LETTERS = [
        'A','B','C','D','E','F','G','H','I','J','K','L',
        'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const getRandomNumber = max => Math.floor(Math.random() * max) + 1;

const getIndex = () => getRandomNumber(9);

const getPrice = () => {
    let dec = getRandomNumber(100);
    dec = dec < 10 ? dec + '0' : dec;
    return `${getRandomNumber(1000)}.${dec}`;
};

const getSymbol = () => `${LETTERS[getIndex()]}${LETTERS[getIndex()]}${LETTERS[getIndex()]}`;

const getDirection = () => (getRandomNumber(2) % 2 == 0) ? '+' : '-';

const getChange = () => {
    let dec = getRandomNumber(100);
    dec = dec < 10 ? dec + '0' : dec;
    return `${getRandomNumber(100)}.${dec}`;
};

module.exports  = {
    getStock: () => {
        return { 
            symbol: getSymbol(), 
            price: getPrice(), 
            direction: getDirection(),
            change: getChange()
        };
    }
};
