const searchApi = 'https://api.jikan.moe/v4/anime?q='
const apiLink = "https://api.jikan.moe/v4/anime?page=1"

const main = document.getElementById("section")
const form = document.getElementById("form")
const search = document.getElementById("query")

// const openModal = document.querySelector(".card")
// const closeModal = document.querySelector(".close")
// const modal = document.querySelector(".modal")

function openModal (clickedId){
    document.querySelector(`#m${clickedId}`).showModal()
}

function closeModal (clickedId) {
    if(clickedId.length > 2){
        id = clickedId[1] + clickedId[2]
    }else{
        id = clickedId[1]
    }
    document.querySelector(`#m${id}`).close()
}

// openModal.addEventListener("click", () =>{
//     modal.showModal()
// })


// closeModal.addEventListener("click", () => {
//     modal.close()
// })

getMovies(apiLink)

function getMovies(url){
    fetch(url)
        .then(res => res.json() )
        .then(data => {
            console.log(data)

            data.data.forEach((element, i) => {
                // set ids
                const id = `${i}`
                const mId = `m${id}`
                const bId = `b${id}`

                //create cards
                const divCard = document.createElement('div')
                divCard.setAttribute("class","card")
                divCard.setAttribute("id",id)
                divCard.setAttribute("onClick","openModal(this.id)")

                const divRow = document.createElement('div')
                divRow.setAttribute("class", "row")

                const divCol = document.createElement('div')
                divCol.setAttribute("class","column")

                const image = document.createElement('img')
                image.setAttribute("class","center thumbnail")


                const title = document.createElement('h3')

                //add content for card
                title.innerHTML = `${element.title}`
                image.src = element.images.jpg.large_image_url
                console.log(image.src)

                //append cards
                divCard.appendChild(image)
                divCard.appendChild(title)
                divCol.appendChild(divCard)
                divRow.appendChild(divCol)

                main.appendChild(divRow)

                //create modals
                const modalRow = document.createElement("dialog")
                modalRow.setAttribute("class","modal")
                modalRow.setAttribute("id",mId)

                const modalNav = document.createElement("div")
                modalNav.setAttribute("class","d-nav")

                const modalTitle = document.createElement("h4")

                const modalButton = document.createElement("button")
                modalButton.setAttribute("class","button close")
                modalButton.setAttribute("id", bId)
                modalButton.setAttribute("onClick","closeModal(this.id)")

                const modalBody = document.createElement("div")
                modalBody.setAttribute("class","d-body")

                const modalImage = document.createElement("img")
                modalImage.setAttribute("class","d-img")

                const modalDesc = document.createElement("p")

                //add content for modal
                modalTitle.innerHTML = `${element.title}`
                modalImage.src = element.images.jpg.large_image_url
                modalDesc.innerHTML = `${element.synopsis}`
                modalButton.innerHTML = "Close"

                //append modals
                modalNav.appendChild(modalTitle)
                modalNav.appendChild(modalButton)
                modalBody.appendChild(modalImage)
                modalBody.appendChild(modalDesc)
                modalRow.appendChild(modalNav)
                modalRow.appendChild(modalBody)

                main.appendChild(modalRow)


            })
        })

}

form.addEventListener("submit", (e) => {
    e.preventDefault()
     main.innerHTML = "" //essentially clears the page on event submit

    const searchItem = search.value

    if(searchItem){
        getMovies(searchApi + searchItem)
    }
})
