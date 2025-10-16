const nameinput = document.getElementById("name-input")
const amountinput = document.getElementById("amount-input")
const addexpensebtn = document.getElementById("add-expense")
const expenselist = document.getElementById("expense-list")
const expenselistul = document.querySelector("#expense-list ul")
const totalAmount = document.getElementById("total-amount")
let total = 0
let arrayli = []


function addexpense(){
     if(nameinput.value.trim() === ""){
        alert("Please enter name")
    }

    else if(amountinput.value.trim() === "" || isNaN(amountinput.value)){
             alert("Please enter number")
    }

    else  {
        alert("All good processing now...")
    }


    const newli = document.createElement("li")
    const newbtn = document.createElement("button")
    newli.textContent = `${nameinput.value} - ${amountinput.value}`
    newbtn.textContent = "Delete"
    newli.append(newbtn)

    expenselistul.append(newli)
    const obtainedamount = parseFloat(amountinput.value)
    arrayli.push({Name: nameinput.value, Amount: obtainedamount})
    const stringarray = JSON.stringify(arrayli)
    localStorage.setItem("arrayli", stringarray)

    
    total = total + obtainedamount
    totalAmount.textContent = `Total: ${total}`


    newbtn.addEventListener("click",()=>{
        newli.remove()
        
        total = total - obtainedamount
        totalAmount.textContent = `Total: ${total}`
    })

    nameinput.value=""
    amountinput.value=""


}


if (localStorage.getItem("arrayli")){
    let parse = JSON.parse(localStorage.getItem("arrayli"))
    arrayli = parse
}

else {
    arrayli = []
}

arrayli.forEach((expense)=>{
const newli = document.createElement("li")
newli.textContent = `${expense.Name} - ${expense.Amount}`
const newbtn = document.createElement("button")
newbtn.textContent = "Delete"
newli.append(newbtn)
expenselistul.append(newli)
total = total + parseFloat(expense.Amount)
totalAmount.textContent = `Total: ${total}`


newbtn.addEventListener("click",()=>{
    newli.remove()
    total = total - parseFloat(expense.Amount)
    totalAmount.textContent = `Total: ${total}`

    arrayli = arrayli.filter((item)=>{
         return item!== expense
    })

    localStorage.setItem("arrayli", JSON.stringify(arrayli))
})
})


addexpensebtn.addEventListener("click",addexpense)

document.addEventListener("keydown", (e)=>{
if(e.key === "Enter") {
    addexpense(e)
}
})
