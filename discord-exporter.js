
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
    this.#searchResults = this.#searchResultFactory();

    return this.#searchResults;
  }

  #searchResultElements() {
    return this.#el.querySelectorAll(':scope > div[role="group"]');
  }

  #searchResultFactory() {
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