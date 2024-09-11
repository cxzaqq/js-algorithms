import TrieNode from "./TrieNode";

const HEAD_CHARACTER = "*";

export default class Trie {
  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const isComplete = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
    }

    return this;
  }

  deleteWord(word) {
    const depthFirstDelete = (currentNode, charIndex = 0) => {
      if (charIndex >= word.length) {
        // 문자가 단어의 범위를 벗어나면 리턴
        return;
      }

      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);

      if (!nextNode) {
        return;
      }

      depthFirstDelete(nextNode, charIndex + 1);

      // 마지막 문자는 지워지지 않으니 마지막 문자를 isComplete false 처리
      if (charIndex === word.length - 1) {
        nextNode.isCompleteWord = false;
      }

      currentNode.removeChild(character);
    };

    depthFirstDelete(this.head);

    return this;
  }

  suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word);

    if (!lastCharacter) {
      return null;
    }

    return lastCharacter.suggestChildren();
  }

  doesWordExist(word) {
    const lastCharacter = this.getLastCharacterNode(word);

    return !!lastCharacter && lastCharacter.isCompleteWord;
  }

  getLastCharacterNode(word) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null;
      }

      currentNode = currentNode.getChild(characters[charIndex]);
    }

    return currentNode;
  }
}
