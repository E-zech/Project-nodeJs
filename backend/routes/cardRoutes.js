import getAllCards from '../handlers/card/getAllCards.js';
import getMyCards from '../handlers/card/getMyCards.js';
import getCard from '../handlers/card/getCard.js';
import createCard from '../handlers/card/createCard.js';
import editCard from '../handlers/card/editCard.js';
import likeCard from '../handlers/card/likeCard.js';
import deleteCard from '../handlers/card/deleteCard.js';
import changeBizNumber from '../handlers/card/changeBizNumber.js';

export default function cardRoutes(app) {
    getAllCards(app);
    getMyCards(app);
    getCard(app);
    createCard(app);
    editCard(app);
    likeCard(app);
    deleteCard(app);
    changeBizNumber(app);
}; 