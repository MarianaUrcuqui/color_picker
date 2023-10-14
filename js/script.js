
const pickColorForm = document.getElementById("pick-color-form")
const colorsDiv = document.getElementById("colors")


renderColors('https://www.thecolorapi.com/scheme?hex=24B1E0&mode=monochrome')

pickColorForm.addEventListener("submit", e =>{
  e.preventDefault()
  const color = document.getElementById("color")
  const mode = document.getElementById("mode")

  //Here we are taking what the user selected 
  //and with that we define the right path in the API
  const colorHex = color.value
  const path = `
    https://www.thecolorapi.com/scheme?hex=${colorHex.substring(1)}&mode=${mode.value}
  `
  renderColors(path)
})

//This event listener allows the user to copy the hex value 
//when they click either the image or the hex value
colorsDiv.addEventListener("click", e => {
  if(e.target.dataset.hex){
    const hexValue = e.target.dataset.hex
    navigator.clipboard.writeText(hexValue);
  }
})

//------------------------
//----- functions --------
//------------------------ 

function renderColors(path){
  fetch(path)
  .then(res => res.json())
  .then(scheme => {
    const colorsArray = scheme.colors
    let html = ""
    for(let color of colorsArray){
      const colorHex = color.hex.value
      html += `
      <div class="color-div">
        <img src="${color.image.bare}" alt="${color.name.value}" class="color-img" data-hex="${colorHex}">
        <p data-hex="${colorHex}">${colorHex}</p>
      </div>
      `
    } 
    colorsDiv.innerHTML = html
  })
}
