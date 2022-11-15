function elt(type, props, ...children) {
  const element = document.createElement(type);
  if (props) Object.assign(element, props);
  for (const child of children) {
    if (typeof child != "string") element.appendChild(child);
    else element.appendChild(document.createTextNode(child));
  }
  return element;
}
const passWords = ["Rolnik", "to", "naprawdę", "fajna", "sprawa", "Szkoła", "życie", "zabawa"];
const passwordWrappers = [...document.getElementsByClassName("input__wrapper")]
for(const [index, word] of Object.entries(passWords)) {
  const wrapper = passwordWrappers[index];
  for(const char of [...word]) {
    const block = elt("input", {
      type: "text",
      classList: "input__block",
      maxLength: 1
    });
    block.addEventListener("keyup", event => {
      if(event.keyCode === 8 && event.target.value === "") {
        const sibling = event.target.previousElementSibling;
        if(sibling === null) {
          const previousWrapper = event.target.parentNode.previousElementSibling;
          previousWrapper?.querySelector(".input__block:last-child")?.focus();
        } else {
          sibling?.focus();
        }
      }  
      if(
        !((event.keyCode >= 65 && event.keyCode <= 90) || 
        (event.keyCode >= 48 && event.keyCode <= 57))
      ) {
        return;
      }
      const sibling = event.target.nextElementSibling;
      if(sibling === null) {
        const nextWrapper = event.target.parentNode.nextElementSibling;
        nextWrapper?.querySelector(".input__block")?.focus();
      } else {
        sibling?.focus();
      }
    })
    wrapper.appendChild(block);
  }
}
const check = document.getElementById("check");
check.addEventListener("click", e => {
  const providedWords = []
  for(const wrapper of passwordWrappers) {
    const characters = [...wrapper.getElementsByClassName("input__block")].map(block => block.value);
    providedWords.push(characters.join(""));
  }
  if(providedWords.join(" ") === passWords.join(" ")) {
    check.style.backgroundColor = "green";
    check.value = "Gratulacje! Dobra odpowiedź!"
  } else {
    check.style.backgroundColor = "red";
    check.value = "Zła odpowiedź!"

  }
})