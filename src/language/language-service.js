const { LinkedList, _Node } = require('../linked-list');

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
      .select('*')
      .where({ language_id });
  },
  // do I need one for the start of the list? language is only table with head column -- 
  getLanguageDbHead(db, language_id) {
    return db
      .from('language')
      .select('head')
      .where({ language_id });
  },


  // Linked List?????? populate one here then make it do stuff in the router? 
  // linkedList(words, head) {}
  // Using the array of words taken from the database, we find each consecutive word
  // in the list based on either the head value(for the start of the list) or the next value of each word,
  // inserting each word to the end of the list
createLinkedList(words, head) {
  const list = new LinkedList()
  
  this.getLanguageDbHead(db, language_id)
    .then(head => {
      list.insertAfter(head);
      console.log(list.head.value)
    })
  return list
}








};

module.exports = LanguageService;
