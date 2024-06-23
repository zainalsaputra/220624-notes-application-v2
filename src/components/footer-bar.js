class NoteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <p>© ${new Date().getFullYear()} Notes Application</p>
    `
  }
}
customElements.define('note-footer', NoteFooter)
