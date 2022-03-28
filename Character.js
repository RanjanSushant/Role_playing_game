import {
  createNewDOMElement,
  getDicePlaceHolder,
  getDiceRoll,
  getPercentage,
} from "./utils.js";

// function Character(characterDetails) {
//   Object.assign(this, characterDetails);

//   this.maxHealth = this.health;

//   let diceDivs = getDicePlaceHolder(this.diceCount);

//   let healthValue = createNewDOMElement("b", "", {
//     textContent: this.health,
//   });

//   this.getHealthBar = function () {
//     const percent = getPercentage(this.health, this.maxHealth);

//     const healthBarOuterDiv = createNewDOMElement("div", "health-bar-outer", {
//       textContent: "",
//     });

//     const innerHealthClassList =
//       percent < 26 ? "health-bar-inner danger" : "health-bar-inner";
//     const innerHealthStyle = `width: ${percent}%;`;

//     const healthBarInnerDiv = createNewDOMElement("div", innerHealthClassList, {
//       style: innerHealthStyle,
//     });

//     healthBarOuterDiv.replaceChildren(healthBarInnerDiv);

//     return healthBarOuterDiv;
//   };

//   this.updateDice = function () {
//     this.currentDiceScore = getDiceRoll(this.diceCount);
//     diceDivs = this.currentDiceScore.map((score) =>
//       createNewDOMElement("div", "dice", {
//         textContent: score,
//       })
//     );
//   };

//   this.takeDamage = function (attackScoresArray) {
//     const totalAttackScore = attackScoresArray.reduce(
//       (total, currentScore) => total + currentScore,
//       0
//     );

//     this.health -= totalAttackScore;

//     if (this.health <= 0) {
//       this.health = 0;
//       this.isDead = true;
//     }

//     healthValue.textContent = this.health;
//     // console.log(getPercentage(this.health, this.maxHealth));
//   };

//   this.createCharacter = function () {
//     const healthBarDiv = this.getHealthBar();

//     const characterCardDiv = createNewDOMElement("div", "character-card");

//     const characterName = createNewDOMElement("h4", "name", {
//       textContent: this.name,
//       src: "",
//     });

//     const characterImg = createNewDOMElement("img", "avatar", {
//       src: this.avatar,
//     });

//     const characterHealthDiv = createNewDOMElement("div", "health", {
//       textContent: "health: ",
//     });
//     characterHealthDiv.appendChild(healthValue);

//     const diceContainerDiv = createNewDOMElement("div", "dice-container");

//     diceContainerDiv.append(...diceDivs);

//     characterCardDiv.append(
//       characterName,
//       characterImg,
//       characterHealthDiv,
//       healthBarDiv,
//       diceContainerDiv
//     );

//     return characterCardDiv;
//   };
// }

class Character {
  constructor(characterDetails) {
    Object.assign(this, characterDetails);

    this.maxHealth = this.health;

    this.diceDivs = getDicePlaceHolder(this.diceCount);

    this.healthValue = createNewDOMElement("b", "", {
      textContent: this.health,
    });
  }

  getHealthBar() {
    const percent = getPercentage(this.health, this.maxHealth);

    const healthBarOuterDiv = createNewDOMElement("div", "health-bar-outer", {
      textContent: "",
    });

    const innerHealthClassList =
      percent < 26 ? "health-bar-inner danger" : "health-bar-inner";
    const innerHealthStyle = `width: ${percent}%;`;

    const healthBarInnerDiv = createNewDOMElement("div", innerHealthClassList, {
      style: innerHealthStyle,
    });

    healthBarOuterDiv.replaceChildren(healthBarInnerDiv);

    return healthBarOuterDiv;
  }

  updateDice() {
    this.currentDiceScore = getDiceRoll(this.diceCount);
    this.diceDivs = this.currentDiceScore.map((score) =>
      createNewDOMElement("div", "dice", {
        textContent: score,
      })
    );
  }

  takeDamage(attackScoresArray) {
    const totalAttackScore = attackScoresArray.reduce(
      (total, currentScore) => total + currentScore,
      0
    );

    this.health -= totalAttackScore;

    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
    }

    this.healthValue.textContent = this.health;
    // console.log(getPercentage(this.health, this.maxHealth));
  }

  createCharacter() {
    const healthBarDiv = this.getHealthBar();

    const characterCardDiv = createNewDOMElement("div", "character-card");

    const characterName = createNewDOMElement("h4", "name", {
      textContent: this.name,
      src: "",
    });

    const characterImg = createNewDOMElement("img", "avatar", {
      src: this.avatar,
    });

    const characterHealthDiv = createNewDOMElement("div", "health", {
      textContent: "health: ",
    });
    characterHealthDiv.appendChild(this.healthValue);

    const diceContainerDiv = createNewDOMElement("div", "dice-container");

    diceContainerDiv.append(...this.diceDivs);

    characterCardDiv.append(
      characterName,
      characterImg,
      characterHealthDiv,
      healthBarDiv,
      diceContainerDiv
    );

    return characterCardDiv;
  }
}

export default Character;
