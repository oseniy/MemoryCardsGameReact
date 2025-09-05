import png1 from "../../assets/imgs/1.webp";
import png2 from "../../assets/imgs/2.webp";
import png3 from "../../assets/imgs/3.webp";
import png4 from "../../assets/imgs/4.webp";
import png5 from "../../assets/imgs/5.webp";
import png6 from "../../assets/imgs/6.webp";
import png7 from "../../assets/imgs/7.webp";
import png8 from "../../assets/imgs/8.webp";
import png9 from "../../assets/imgs/9.webp";
import png10 from "../../assets/imgs/10.webp";
import png11 from "../../assets/imgs/11.webp";
import png12 from "../../assets/imgs/12.webp";

const imgs = [png1, png2, png3, png4, png5, png6, png7, png8, png9, png10, png11, png12];

const colors = [ 
    "#FFD1DC", "#B5EAD7", "#C7CEEA", "#E2F0CB", 
    "#FFDAC1", "#B2E2F1", "#F8C8DC", "#D5E6ED", 
    "#F3E6DD", "#D4A5C3", "#A8D8B9", "#FFE5B4" 
];

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function createCards(totalPairs) {

    const shuffledImgs = shuffleArray(imgs).slice(0, totalPairs);
    const shuffledColors = shuffleArray(colors).slice(0, totalPairs);

    const cardsData = Array.from({length: totalPairs}).map((_, i) => ({
        img: shuffledImgs[i],
        color: shuffledColors[i],
        value: values[i]
    }))

    const pairedCardsData = cardsData.flatMap(card => [card, { ...card }]);

    const finalCards = shuffleArray(pairedCardsData); 
    
    return finalCards;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

