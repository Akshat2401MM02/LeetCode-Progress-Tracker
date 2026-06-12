const problemInput = document.querySelector("#problemName");
const difficultyInput = document.querySelector("#difficulty");
const topicInput = document.querySelector("#topic");
const addBtn = document.querySelector("#addBtn");
const problemsDiv = document.querySelector("#problems");

addBtn.addEventListener("click", () => {

    const problemName = problemInput.value;
    const difficulty = difficultyInput.value;
    const topic = topicInput.value;

    if(problemName === "" || difficulty === "" || topic === ""){
        alert("Please fill all fields");
        return;
    }

    if(problemsDiv.textContent === "No problems added yet"){
        problemsDiv.innerHTML = "";
    }

    const emptyMessage = document.querySelector("#emptyMessage");

    if(emptyMessage){
        emptyMessage.remove();
    }

    const problemCard = document.createElement("div");

    problemCard.innerHTML = `
        <h3>${problemName}</h3>
        <p><strong>Difficulty:</strong> ${difficulty}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <hr>
    `;

    problemsDiv.appendChild(problemCard);

    problemInput.value = "";
    difficultyInput.selectedIndex = 0;
    topicInput.value = "";
});