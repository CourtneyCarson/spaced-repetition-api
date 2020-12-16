const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

// get next word I think... 
languageRouter
  .get('/head', async (req, res, next) => {
    // using get'/' as example for setup
    try {
      // only works in brackets - expect payload to be an array of objects, forces type of variable to be an array
      const [nextWord] = await LanguageService.getNextWord(
        req.app.get('db'),
        req.language.id,
      );
      // expected from front end: 
      // "nextWord": "Testnextword",
      // "wordCorrectCount": 222,
      // "wordIncorrectCount": 333,
      // "totalScore": 999

      res.json({
        // access nextWord from above & the column headers from migrations file
        nextWord: nextWord.original,
        wordCorrectCount: nextWord.correct_count,
        wordIncorrectCount: nextWord.incorrect_count,
        //have to access through req since nextWord is accessing only the words table
        totalScore: req.language.total_score
      });
      next();
    }
    catch (error) {
      next(error);
    }
  });

languageRouter
  .post('/guess', async (req, res, next) => {
 // get words from database
    // go to start of word list
    // create list of words
    // check guess - memory value
    // if guess is correct save to db?? 


    // try {
    //   const [checkGuess] = await LanguageService.checkGuess(
    //     req.app.get('db'),
    //     req.language.id,
    //   );
    // };


  });

module.exports = languageRouter;
