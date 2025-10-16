const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const Loading = document.getElementById("loading")
const message = document.getElementById("message")
const profileContainer = document.getElementById("profile-container")


function getUserData(username){

    const API = `https://api.github.com/users/${username}`
Loading.hidden = false;
message.textContent = ""
profileContainer.textContent =""

fetch(API)
.then((response)=>{
    
    if (!response.ok){
        throw new Error("user not found")
   }
else 
return response.json()

})

.then((data)=>{
   
    const img = document.createElement("img")
     const ul = document.createElement("ul")
    const Username = document.createElement("li")
    const Name = document.createElement("li")
    const Bio = document.createElement("li")
    const Followers = document.createElement("li")
    const PubicRepositories = document.createElement("li")

Username.textContent=`UserName: ${data.login}`
Name.textContent=`Name: ${data.name}`
Bio.textContent=`Bio: ${data.bio}`
Followers.textContent=`Followers: ${data.followers}`
PubicRepositories.textContent=`Public Repository: ${data.public_repos}`
img.src = `${data.avatar_url}`
img.width =120


ul.append(Username, Name,Bio,Followers, PubicRepositories)
profileContainer.append(img,ul)
ul.style.listStyle= "none"

 
})

.catch((errormessage)=>{
    message.textContent = "Invalid username"
})
.finally(()=>{
    Loading.hidden= true
}
    
)


}


searchBtn.addEventListener("click",()=>{
    if(searchInput.value.trim() === "")
    {
        alert("please Enter a username")
        return
    }

    else {
        getUserData(searchInput.value)
    }
})


document.addEventListener("keypress",(e)=>{
  

    if(e.key === "Enter"){
          if(searchInput.value.trim() === "")
    {
        alert("please Enter a username")
        return
    }
        getUserData(searchInput.value)
    }
})
