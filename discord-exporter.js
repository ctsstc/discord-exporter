
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
    const selector = ':scope > div[class*="channelSeparator-"]';
    const el = this.#el.querySelector(selector);
    return el.innerText;
  }

  #getMessages() {
    const parentSelector = ':scope > div[class*="searchResult"]';
    const childSelector = '> div[class*="searchResultMessage-"]';
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
  timestamp;
  /** @type {string} */
  message;
  /** @type {boolean} */
  isMainMessage;
  /** @type {HTMLElement} */
  #el;
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #headerEl;

  constructor(el) {
    this.#el = el;
    this.#container = this.#getContainer();
    this.#headerEl = this.#getHeaderEl();
    this.avatarImageUrl = this.#getAvatarImageUrl();
    this.username = this.#getUsername();
    this.timestamp = this.#getTimestamp();
    this.message = this.#getMessage();
    this.isMainMessage = this.#getIsMainMessage();
  }

  #getContainer() {
    const parentSelector = ':scope > div[class*="messageGroup"]';
    const childSelector = '> div[class*="contents-"]';
    const selector = `${parentSelector} ${childSelector}`;
    return this.#el.querySelector(selector);
  }

  #getHeaderEl() {
    const selector = ':scope > h2[class*="header"]';
    return this.#container.querySelector(selector);
  }

  #getAvatarImageUrl() {
    const selector = ':scope > img[class*="avatar-"]';
    const el = this.#container.querySelector(selector);
    return el.getAttribute('src');
  }

  #getUsername() {
    const selector = ':scope > span[class*="headerText"]';
    const el = this.#headerEl.querySelector(selector);
    return el.innerText;
  }

  #getTimestamp() {
    const selector = ':scope > span[class*="timestamp"]';
    const el = this.#headerEl.querySelector(selector);
    return el.innerText;
  }

  #getMessage() {
    const selector = ':scope > div[class*="markup-"]';
    const el = this.#container.querySelector(selector);
    return el.innerText;
  }

  #getIsMainMessage() {
    return this.#el.getAttribute('css').includes('hit-');
  }
};

let searchElement = document.getElementById('search-results');
let results = new SearchResultExporter(searchElement);