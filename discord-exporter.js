
let SearchResultExporter = class {
  /** @type {HTMLElement} */
  #el;
  /** @type {SearchResult[]} */
  #searchResults;

  /**
   * 
   * @param {HTMLElement} el 
   */
  constructor(el) {
    this.#el = el;
    this.#searchResults = this.#getSearchResults();

    return this.#searchResults;
  }

  #searchResultElements() {
    return this.#el.querySelectorAll(':scope > div[role="group"]');
  }

  #getSearchResults() {
    return Array.from(this.#searchResultElements())
      .map(el => new SearchResult(el));
  }
};

let SearchResult = class {
  /** @type {string} */
  channelName;
  /** @type {Message[]} */
  messages;
  /** @type {HTMLElement} */
  #el

  constructor(el) {
    this.#el = el;
    this.channelName = this.#getChannelName();
    this.messages = this.#getMessages();
  }

  #getChannelName() {
    const selector = ':scope > div[class*="channelSeparator"]';
    const el = this.#el.querySelector(selector);
    return el.innerText;
  }

  #getMessages() {
    const parentSelector = ':scope > div[class*="searchResult"]';
    const childSelector = '> div[class*="searchResultMessage"]';
    const selector = `${parentSelector} ${childSelector}`;
    const els = this.#el.querySelectorAll(selector);

    return Array.from(els).map(el => new Message(el));
  }
};

let Message = class {
  /** @type {string} */
  avatarImageUrl;
  /** @type {string} */
  username;
  /** @type {string} */
  date;
  /** @type {string} */
  message;
  /** @type {HTMLElement} */
  #el;

  constructor(el) {
    this.#el = el;
  }
};

let searchElement = document.getElementById('search-results');
let results = new SearchResultExporter(searchElement);