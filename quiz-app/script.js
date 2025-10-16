
const Questions = [{
  Question: "Who is the founder of Pakistan?",
  choices: ["Allama Iqbal", "Liaquat Ali Khan", "Quaid-e-Azam Muhammad Ali Jinnah", "Sir Syed Ahmed Khan"],
  answer: "Quaid-e-Azam Muhammad Ali Jinnah"
},
{
  Question: "Which city is known as the City of Lights in Pakistan?",
  choices: ["Lahore", "Islamabad", "Karachi", "Peshawar"],
  answer: "Karachi"
},
{
  Question: "What is the national flower of Pakistan?",
  choices: ["Rose", "Tulip", "Jasmine", "Sunflower"],
  answer: "Jasmine"
},
{
  Question: "Which is the highest mountain peak in Pakistan?",
  choices: ["Nanga Parbat", "K2", "Broad Peak", "Mount Everest"],
  answer: "K2"
}
        
  
]

const question = document.getElementById("question")
const choices = document.getElementById("choices")
const progress = document.getElementById("progress")
const nextbtn = document.getElementById("next-btn")
const quiz = document.getElementById("quiz")
const resetbtn = document.getElementById("restart-btn")
const timer = document.getElementById("timer")


let currentQuestionIndex= 0
let score = 0
let bestScore = localStorage.getItem("bestScore") ? parseInt(localStorage.getItem("bestScore")) :0
let timeLeft;
let timerId;
let wrongAnswer = 0;
let unanswered = 0;

function showquestion(){

    clearInterval(timerId)
    timeLeft = 15
    timer.textContent = "Time Left:" +timeLeft

 timerId = setInterval(() => {
        timeLeft--
        timer.textContent = "Time Left:" +timeLeft
           if(timeLeft === 0){
        clearInterval(timerId)
       Array.from(choices.children).forEach((choice)=>{
            if(choice.textContent === currentQuestion.answer){
                choice.style.backgroundColor = "green"
                
            }
              choice.disabled=true
           
                
             

        })
           unanswered++
        nextbtn.disabled= false
       }


    }, 1000);

    
 

    const currentQuestion = Questions[currentQuestionIndex]
    currentQuestion.choices.sort(()=> Math.random() - 0.5)
 question.textContent = currentQuestion.Question
    choices.textContent = ""
    let X = currentQuestionIndex 
let  Y = Questions.length
        document.getElementById("progress").textContent = `Question ${X + 1} of ${Y}`

    currentQuestion.choices.forEach((choice) => {
        const newbtn = document.createElement("button")
        newbtn.textContent = choice
        choices.append(newbtn)

        newbtn.addEventListener(("click"),()=>{
            if (choice === currentQuestion.answer){
                newbtn.style.backgroundColor = "green"
                score++
clearInterval(timerId);


               }
            else{
                newbtn.style.backgroundColor = "red"
                wrongAnswer++
                clearInterval(timerId);


                 }
            Array.from(choices.children).forEach((btn)=>{
            btn.disabled = true
         })

            Array.from(choices.children).forEach((btn)=>{
                       if(btn.textContent === currentQuestion.answer){
                      btn.style.backgroundColor = "green"
                        }

           nextbtn.disabled= false

 

})

        })
      
    });

    
 


}

  nextbtn.addEventListener("click",()=>{
          currentQuestionIndex++
         nextbtn.disabled=true

         quiz.classList.add("fade");
setTimeout(() => {
  quiz.classList.remove("fade");
  showquestion();
}, 200);

         if(currentQuestionIndex < Questions.length){
          showquestion()
         }
           else{
            quiz.style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("score").textContent = "Your score is " + score + " out of " +Questions.length;
          document.getElementById("correct").textContent= "✅ Correct:" + score
          document.getElementById("wrong").textContent= "❌ Wrong:" + wrongAnswer
          document.getElementById("unanswered").textContent= "⏰ Unanswered:" + unanswered
          document.getElementById("percentage").textContent= "📊 Percentage:" + (score / Questions.length) * 100
           
            resetbtn.classList.remove("hidden")

        if(score > bestScore){
            bestScore  = score
            localStorage.setItem("bestScore", bestScore)
        
        }
          document.getElementById("best-score").textContent = `Best Score is ${bestScore} out of ${Questions.length}`
            
           }

        })


        resetbtn.addEventListener("click",()=>{
            currentQuestionIndex = 0
            score = 0
            document.getElementById("result").style.display= "none"
            quiz.style.display = "block"
            wrongAnswer = 0
            unanswered = 0

        Questions.sort(()=> Math.random() - 0.5)
            showquestion()
             nextbtn.disabled=true

        })


        Questions.sort(()=> Math.random() - 0.5)
        
       

showquestion()
localStorage.removeItem("bestScore")
