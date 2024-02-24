const url = new URL(location.href)
const animeId = url.searchParams.get("id")
const animeTitle = url.searchParams.get("title")
console.log(url)

const apiLink = "https://anime-db-six.vercel.app/api/v1/reviews/"

const main = document.getElementById("section")
const title = document.getElementById("title")

title.innerText = animeTitle


returnReviews(apiLink)

function returnReviews(url){
    fetch(url + "movie/" + animeId)
        .then(res => res.json() )
        .then(data => {
            console.log(data)

            data.forEach((review) => {

                //create cards
                const divCard = document.createElement('div')
                divCard.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p> <strong>Review: </strong>${review.review} </p>
                            <p> <strong>User: </strong>${review.user} </p>
                            <p> <a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a> <a href="#" onclick="deleteReview('${review._id}')">Delete</a> </p>
                        </div>
                    </div>
                </div>
                `


                main.appendChild(divCard)

            })
        })

}

function editReview(id, review, user) {
    const element = document.getElementById(id)
    const reviewInputId = "review" + id
    const userInputId = "user" + id
    console.log(element)

    element.innerHTML = `
        <p>
        <strong>Review: </strong>
        <input type="text" id="${reviewInputId}" value="${review}">
    </p>
    <p>
        <strong>User: </strong>
        <input type="text" id="${userInputId}" value="${user}">
    </p>
    <p>
        <a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">Save</a>
    </p>
    `

}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value
    const user = document.getElementById(userInputId).value

    if(id) {
        fetch(apiLink + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
          .then(res => {
            console.log(res)
            location.reload()
          })
    } else {
        fetch(apiLink + "new", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": animeId})
        }).then(res => res.json())
          .then(res => {
            console.log(res)
            location.reload()
          })
    }


}

function deleteReview(id) {
    fetch(apiLink + id, {
        method: "DELETE"
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload()
      })
}
