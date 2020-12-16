const { LinkedList, _Node } = require('../linked-list')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  // write services for getting next word(original) 
  // id, language_id (from language table)
  //correct count for that word
  //total score for user
  getNextWord(db, language_id) {
    return db
      .from('word')
      .select(
        'language_id',
        'original',
        'translation',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  ///write services for guess   
  //Check if the submitted answer is correct by comparing it with the translation in the database.
  checkGuess(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  }



  // Linked List??????
  // linkedList(words, head) {

  // }





  // expected from front end: 
  // "nextWord": "Testnextword",
  // "wordCorrectCount": 222,
  // "wordIncorrectCount": 333,
  // "totalScore": 999

};

module.exports = LanguageService;
