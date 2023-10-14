
const pickColorForm = document.getElementById("pick-color-form")

renderColors('https://www.thecolorapi.com/scheme?hex=24B1E0&mode=monochrome')

pickColorForm.addEventListener("submit", e =>{
  e.preventDefault()
  const color = document.getElementById("color")
  const mode = document.getElementById("mode")

  //Here we are taking what the user selected and with that we define the right path in the API
  const colorHex = color.value
  const path = `
    https://www.thecolorapi.com/scheme?hex=${colorHex.substring(1)}&mode=${mode.value}
  `

  renderColors(path)
})


function renderColors(path){
  fetch(path)
  .then(res => res.json())
  .then(scheme => {
    const colorsDiv = document.getElementById("colors")
    const colorsArray = scheme.colors
    let html = ""
    for(let color of colorsArray){
      html += `
      <div class="color-div">
        <img src="${color.image.bare}" alt="${color.name.value}" class="color-img">
        <p>${color.hex.value}</p>
      </div>
      `
    } 
    colorsDiv.innerHTML = html
  })
}
