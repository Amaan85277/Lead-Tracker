
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}




//listen to click
//when clicked, log out youtube's URL
tabBtn.addEventListener("click", function () {
    // console.log(tabs[0].url);

    //grab the url of the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


//renders the given parrameter on teh screen
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // console.log(leads[i]) 
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
       `
        // console.log(listItems)
    }
    ulEl.innerHTML = listItems
}


// listen for double clicks on the delete button
//when double clicked, clear localstorage, myleads and DOM
deleteBtn.addEventListener("dblclick", function () {
    // console.log("double clicked on delete button")
    localStorage.clear()
    myLeads = []
    //as myleads is null,  redering it gives null too
    render(myLeads)
})



inputBtn.addEventListener("click", function () {
    // console.log("'SAVE INPUT' button is clicked!")
    myLeads.push(inputEl.value)
    inputEl.value = ""

    //save myleads array to local storage by stringifying it
    // console.log(typeof myLeads)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // console.log(localStorage.getItem("myLeads"))

    render(myLeads)
})



