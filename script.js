const problemInput = document.querySelector("#problemName");
const difficultyInput = document.querySelector("#difficulty");
const addBtn = document.querySelector("#addBtn");
const problemsDiv = document.querySelector("#problems");
const tagButtons = document.querySelectorAll(".tag-btn");

let selectedTags = [];
let problems = JSON.parse(localStorage.getItem("problems")) || [];

function saveProblems() {
    localStorage.setItem("problems", JSON.stringify(problems));
}

function renderProblems() {
    problemsDiv.innerHTML = "";

    if (problems.length === 0) {
        problemsDiv.innerHTML = "<p>No problems added yet</p>";
        return;
    }

    problems.forEach((problem, index) => {
        const card = document.createElement("div");
        card.classList.add("problem-card");

        const tags = problem.tags || [];

        const tagsHTML = tags.map(tag => {
            return `<span class="topic-tag">${tag}</span>`;
        }).join("");

        card.innerHTML = `
            <h3>${problem.name}</h3>
            <p><strong>Difficulty:</strong> ${problem.difficulty}</p>
            <div class="tags-list">${tagsHTML}</div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        problemsDiv.appendChild(card);
    });
}

tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const topic = btn.dataset.topic;

        if (selectedTags.includes(topic)) {
            selectedTags = selectedTags.filter(tag => tag !== topic);
            btn.classList.remove("active");
        } else {
            selectedTags.push(topic);
            btn.classList.add("active");
        }
    });
});

addBtn.addEventListener("click", () => {
    const problemName = problemInput.value.trim();
    const difficulty = difficultyInput.value;

    if (problemName === "" || difficulty === "" || selectedTags.length === 0) {
        alert("Please enter problem name, difficulty and select at least one topic");
        return;
    }

    const newProblem = {
        name: problemName,
        difficulty: difficulty,
        tags: [...selectedTags]
    };

    problems.push(newProblem);
    saveProblems();
    renderProblems();

    problemInput.value = "";
    difficultyInput.selectedIndex = 0;
    selectedTags = [];

    tagButtons.forEach(btn => btn.classList.remove("active"));
});

problemsDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.dataset.index;
        problems.splice(index, 1);
        saveProblems();
        renderProblems();
    }
});

renderProblems();