document.addEventListener("DOMContentLoaded", function() {
  let form = document.querySelector("#hog-form")
  form.addEventListener('submit', createHog)

  fetchHogs()
})


function fetchHogs() {
  fetch('http://localhost:3000/hogs/')
  .then(response => response.json())
  .then(data => { data.forEach(hog=> render(hog))
  })
}

function render(hog){
  let container = document.querySelector("#hog-container")

  let div = document.createElement("div")
  div.className = "hog-card"
  div.id = `hog-${hog.id}`
  container.appendChild(div)

  let h2 = document.createElement("h2")
  h2.innerText = hog.name
  div.appendChild(h2)

  let image = document.createElement("img")
  image.setAttribute('src', `${hog.image}`)
  div.appendChild(image)

  let p = document.createElement("p")
  p.innerText = `Speicalty: ${hog.specialty}`
  div.appendChild(p)

  let p2 = document.createElement("p")
  p2.innerText = `Weight as a ratio of hog to LG: ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`
  div.appendChild(p2)

  let p3 = document.createElement("p")
  p3.innerText = `Highest medal achieved: ${hog["highest medal achieved"]}`
  div.appendChild(p3)

  let p4 = document.createElement("p")
  p4.innerText = "Greased?"
  div.appendChild(p4)

  let check = document.createElement("INPUT")
  check.setAttribute("type", "checkbox")
  if (hog.greased === true) {
      check.checked = true
    } else {
      check.checked = false
    }
  check.id = hog.id
  check.addEventListener('change', checkFunction)
  p4.appendChild(check)

  let deleteBtn = document.createElement("button")
  deleteBtn.innerText = "Delete"
  deleteBtn.id = hog.id
  deleteBtn.addEventListener('click', deleteHog)
  div.appendChild(deleteBtn)
}

function createHog(event) {
  event.preventDefault()
  let name = event.currentTarget.name.value
  let specialty = event.currentTarget.specialty.value
  let medal = event.currentTarget.medal.value
  let weight = event.currentTarget.weight.value
  let img = event.currentTarget.img.value
  let greased = event.currentTarget.greased.checked

  let data =
  {'name': name,
  'specialty': specialty,
  'greased': greased,
  'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weight,
  'highest medal achieved': medal,
  'image': img
  }
  fetch('http://localhost:3000/hogs/', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  .then(response=> response.json())
  .then(json=> {
    render(json)
  })
}

function deleteHog(event) {
  event.preventDefault()
  let id = event.currentTarget.id
  fetch(`http://localhost:3000/hogs/${id}`, {
    method: "DELETE"
  })
  .then((response) => {
    document.getElementById(`hog-${id}`).remove()
  })
}

function checkFunction(event) {
  let id = event.currentTarget.id
  if (event.currentTarget.checked) {
    fetch(`http://localhost:3000/hogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
      greased: true})
    })
    .then(response => response.json())
    .then(json=> {console.log(json)
    })
  }
  else {
    fetch(`http://localhost:3000/hogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
      greased: false})
    })
    .then(response => response.json())
    .then(json=> {console.log(json)
    })
  }
}
