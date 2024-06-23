class NoteForm extends HTMLElement {
  _shadowRoot = null
  _style = null

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.customValidationTitleHandler =
      this.customValidationTitleHandler.bind(this)
    this.customValidationBodyHandler =
      this.customValidationBodyHandler.bind(this)
  }

  _updateStyle() {
    this._style.textContent = `
     .form-grid {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        display: grid;
        grid-gap: 15px;
      }

      h2 {
        color: #007bff; /* Warna judul form */
        text-align: center;
        margin-bottom: 20px;
      }

      .form-group {
        margin-bottom: 5px;
      }

      .input-title,
      textarea {
        width: 95%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }

      .add-note {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #009dff; 
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
        margin-top: 10px;
      }

      .add-note:hover {
        background-color: #0056b3; /* Warna tombol saat hover */
      }

      .validation-message {
          margin: 0;
          color: red;
      }

      `
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  connectedCallback() {
    this.render()
    this.setupEventListeners()
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
        <form id="noteForm" class="form-grid">
            <h2>Create Note</h2>
            <div class="form-group">
              <input class="input-title" type="text" id="title" name="title" placeholder="Enter Title" required />
            </div>
            <p id="titleValidation" class="validation-message" aria-live="polite"></p>
            <div class="form-group">
              <textarea id="body" name="body" rows="4" placeholder="Enter Body" required></textarea>
            </div>
            <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
            <input class="add-note" type="submit" value="Add Note">
        </form>
      `

    this._shadowRoot
      .querySelector('#noteForm')
      .addEventListener('submit', this.onSubmit.bind(this))
  }

  onSubmit(event) {
    event.preventDefault()
    const title = this._shadowRoot.querySelector('#title').value
    const body = this._shadowRoot.querySelector('#body').value

    const addNoteEvent = new CustomEvent('addNote', {
      detail: { title, body },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(addNoteEvent)

    this._shadowRoot.querySelector('#title').value = ''
    this._shadowRoot.querySelector('#body').value = ''
  }

  setupEventListeners() {
    const titleInput = this._shadowRoot.querySelector('#title')
    const bodyInput = this._shadowRoot.querySelector('#body')

    titleInput.addEventListener('input', this.customValidationTitleHandler)
    bodyInput.addEventListener('input', this.customValidationBodyHandler)
  }

  customValidationTitleHandler(event) {
    const titleInput = event.target
    const titleValidationMessage =
      this._shadowRoot.querySelector('#titleValidation')

    if (!titleInput.value.trim()) {
      titleValidationMessage.innerText = 'Title cannot be empty!'
    } else {
      titleValidationMessage.innerText = ''
    }
  }

  customValidationBodyHandler(event) {
    const bodyInput = event.target
    const bodyValidationMessage =
      this._shadowRoot.querySelector('#bodyValidation')

    if (!bodyInput.value.trim()) {
      bodyValidationMessage.innerText = 'Body cannot be empty!'
    } else {
      bodyValidationMessage.innerText = ''
    }
  }
}

customElements.define('note-form', NoteForm)
