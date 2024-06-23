class FilterNote extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <select id="filterNotes">
            <option value="non-archived">Unarchived Notes</option>
            <option value="archived">Archived Notes</option>
        </select>
      `
  }
}
customElements.define('filter-note', FilterNote)
