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
    wrapper.appendChild(block);
  }
}