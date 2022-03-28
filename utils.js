function createNewDOMElement(
  elemType = "div",
  elemClasses = "",
  elemAttrib = {}
) {
  const newDOMElement = document.createElement(elemType);
  if (elemClasses.length > 0) {
    newDOMElement.className = elemClasses;
  }

  if (Object.values(elemAttrib).length > 0) {
    for (const attribute in elemAttrib) {
      newDOMElement[attribute] = elemAttrib[attribute];
    }
  }

  return newDOMElement;
}

const getDiceRoll = (diceCount) =>
  new Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);

const getDicePlaceHolder = (diceCount) =>
  new Array(diceCount)
    .fill(0)
    .map(() => createNewDOMElement("div", "placeholder-dice"));

const getPercentage = (remainingHealth, maximumHealth) =>
  (remainingHealth / maximumHealth) * 100;

export { createNewDOMElement, getDiceRoll, getDicePlaceHolder, getPercentage };
