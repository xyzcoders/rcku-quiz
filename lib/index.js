function elt(type, props, ...children) {
  const element = document.createElement(type);
  if (props) Object.assign(element, props);
  for (const child of children) {
    if (typeof child != "string") element.appendChild(child);
    else element.appendChild(document.createTextNode(child));
  }
  return element;
}
async function getCourseFullName(path) {
  const res = await fetch(`/get_course_full_name.php?path=${path}`);
  const data = await res.json();
  return await data.full_name;
}
async function* getQuestion(category = "matematyka") {
  const res = await fetch(`/get_question.php?question=${category}`);
  const data = await res.json();
  const questions = Object.entries(data);

  let question_number = 0;
  let question_total = questions.length;
  questionTotalIndicator = question_total;
  
  try {
    for (const [question, question_data] of questions) {
      question_number++;
      const answers = question_data.answers; 
      yield await {
        question: question, 
        answers: answers,
        has_image: question_data.has_image,
        img: question_data.img, 
        number: question_number, 
        total: question_total
      };
    }
  } finally {
    yield await {
      done: true
    }
  }
  
}
function cleanForm(all = false) {
  result.textContent = "";
  formInputs.innerHTML = "";
  if(document.querySelector(".question__img") !== null) {
    questionWrapper.removeChild(document.querySelector(".question__img"));
  }
  if(all){
    questionTitle.textContent = ""
  }
}
function displaySummary() {
  cleanForm(true);
  let password = ""
  switch(category) {
    case "matfiz":
      password += "Rolnik";
    break;
    case "informatyk":
      password += "Szkoła";
    break;
    case "oze":
      password += "to";
    break;
    case "hotelarstwo":
      password += "fajna";
    break;
    case "turystyka":
      password += "sprawa";
    break;
    case "ekonomista":
      password += "naprawdę";
    break;
    case "gastronomia":
      password += "życie";
    break;
    case "obce":
      password += "zabawa";
    break;
  }
  document.getElementById("main").style.display = "block";
  result.style.cssText = `
    display: grid;
    justify-items: center;
    row-gap: 5px;
    text-align: center
  `;
  if(correctAnswerCount < questionTotalIndicator) {
    result.textContent = `Odpowiedziano dobrze na ${correctAnswerCount} z ${questionTotalIndicator}`;
  } else {
    result.textContent = `Gratulacje! Udało ci się poprawnie odpowiedzieć na wszystkie pytania.`;
    result.appendChild(elt("p", {}, "Otrzymane hasło zapisz/zapamiętaj:"))
    result.appendChild(elt("h1", {
      classList: ["result__password"]
    }, password));
  }
  buttonWrapper.style.display = "none";
}
function generateInputs(answers) {
  const answersElements = [];
  for (const [answer, is_correct] of Object.entries(answers)) {
    const input = elt("input", {
      "type": "radio",
      "is_correct": is_correct,
      "name": "question"
    });
    const label = elt("label", {
      classList: ["label"]
    }, input, answer);
    answersElements.push(label);
  }
  return answersElements;
}
function displayForm(question_data) {
  const {question, answers, has_image, img} = question_data;
  submitButton.value = "Sprawdź";
  submitButton.style.pointerEvents = "all";
  submitButton.style.backgroundColor = "rgb(49, 121, 255)";
  questionTitle.textContent = question;
  cleanForm();
  if(has_image) {
    questionWrapper.appendChild(elt("img", {
      src: `../images/${img}`,
      classList: ["question__img"]
    }))
  }
  const answersElements = generateInputs(answers);
  formInputs.append(...answersElements);
}
async function generateForm(generator) {
  const question_data = await generator.next();
  if(question_data.value.number + 1 > question_data.value.total) {
    nextQuestion.value = "Podsumowanie"
  }
  if(question_data.value?.done) {
    displaySummary();
    return;
  }
  displayForm(question_data.value);
  const title = question_data.value.question;
  questionTitle.textContent = title;
}

const form = document.getElementById("form");

const buttonWrapper = document.getElementById("form__buttons")
const formInputs = document.getElementById("form__inputs")
const nextQuestion = document.getElementById("question__next");
const submitButton = document.getElementById("question__check");
const questionTitle = document.getElementById("question__title");
const questionWrapper = document.getElementById("question__wrapper");
const courseWrapper = document.getElementById("course__wrapper");
const courseName = document.getElementById("course__name");
const result = document.getElementById("result");

let correctAnswerCount = 0;
let questionTotalIndicator = 0;
const category = new URL(window.location).pathname.slice(1).replace("/", "");
const generator = getQuestion(category);
let submitted = false;
generateForm(generator);
window.onload = async () => {
  courseName.textContent = await getCourseFullName(category);
};
form.addEventListener("submit", e => {
  e.preventDefault()
  const input = formInputs.querySelector("input[type=radio]:checked");
  if (input !== null) {
    submitted = true;
    if(input.is_correct) {
      submitButton.style.backgroundColor = "green";
      submitButton.value = "Dobra odpowiedź";
    } else {
      submitButton.style.backgroundColor = "red";
      submitButton.value = "Zła odpowiedź";
    }
    if(nextQuestion.classList.contains("question__next--disabled")) {
      nextQuestion.classList.toggle("question__next--disabled");
    }
  }
});
nextQuestion.addEventListener("click", e => {

  const input = formInputs.querySelector("input[type=radio]:checked");
  if(!submitted) {
    return;
  }
  correctAnswerCount += Number(input.is_correct);
  submitted = false;
  nextQuestion.classList.toggle("question__next--disabled");
  generateForm(generator);
});
