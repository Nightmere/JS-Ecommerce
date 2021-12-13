const modalAbrir = document.getElementById("modalAbrir")
const modalCerrar = document.getElementById("modalCerrar")
const modalContainer = document.getElementById("container-modal")
const modalCarrito = document.getElementById("modal")

modalAbrir.addEventListener ("click", () => {
    modalContainer.classList.toggle("modal-active")
})

modalCerrar.addEventListener ("click", () => {
    modalContainer.classList.toggle("modal-active")
})

modalContainer.addEventListener ("click", () => {
    modalCerrar.click()
})

modal.addEventListener ("click", (event) => {
event.stopPropagation()
})