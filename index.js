import characterData from "./data.js";
import Character from "./Character.js";
import { createNewDOMElement } from "./utils.js";

const monstersArray = ["orc", "demon", "goblin"];

const disableAttack = () =>
  document.getElementById("attack-button").removeEventListener("click", attack);

const enableAttack = () =>
  document.getElementById("attack-button").addEventListener("click", attack);

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  // console.log(nextMonsterData);
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function endGame() {
  let endGameMessage = "";
  let endEmoji = "☠☠";

  const endGameDiv = createNewDOMElement("div", "end-game");

  if (monster.isDead && hero.isDead) {
    endGameMessage = "No victors - all creatures are dead";
  } else if (monster.isDead) {
    endEmoji = "🧙‍♂️🔮";
    endGameMessage = `The ${hero.name} is victorious`;
  } else {
    endGameMessage = `The Monsters win at ${monster.name}`;
  }

  const titleH1 = createNewDOMElement("h1", "", {
    textContent: "GAME OVER!!!",
  });
  const messageH2 = createNewDOMElement("h2", "", {
    textContent: endGameMessage,
  });
  const emojiP = createNewDOMElement("p", "end-emoji", {
    textContent: endEmoji,
  });

  endGameDiv.append(titleH1, messageH2, emojiP);
  document.querySelector("body").replaceChildren(endGameDiv);
}

function attack() {
  hero.updateDice();
  monster.updateDice();
  hero.takeDamage(monster.currentDiceScore);
  monster.takeDamage(hero.currentDiceScore);
  renderCharacters();

  if (hero.isDead) {
    disableAttack();
    setTimeout(endGame, 1500);
  } else if (monster.isDead) {
    disableAttack();
    if (monstersArray.length > 0) {
      setTimeout(() => {
        monster = getNewMonster();
        enableAttack();
        renderCharacters();
      }, 1500);
    } else {
      disableAttack();
      setTimeout(endGame, 1500);
    }
  }
}

function renderCharacters() {
  const heroCharacter = hero.createCharacter();
  const monsterCharacter = monster.createCharacter();
  document.getElementById("hero")?.replaceChildren(heroCharacter);
  document.getElementById("monster")?.replaceChildren(monsterCharacter);
}

const hero = new Character(characterData.wizard);
let monster = getNewMonster();

renderCharacters();
enableAttack();
