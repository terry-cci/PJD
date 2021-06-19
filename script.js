const score = {
  player: 0,
  bot: 0,
};

const slots = {
  player: null,
  bot: null,
};

const AVAILABLE_SHOOT_ID = ["paper", "scissor", "rock"];
const RESULT_ID = {
  win: "win",
  lose: "lose",
  draw: "draw",
};
const DEFEAT_BY = {
  paper: "scissor",
  scissor: "rock",
  rock: "paper",
};

const slotImages = {};

function preload() {
  AVAILABLE_SHOOT_ID.forEach((shoot) => {
    slotImages[shoot] = {};

    for (const key in RESULT_ID) {
      const result = RESULT_ID[key];
      const img = new Image();
      img.src = `./images/${shoot}-${result}.png`;
      slotImages[shoot][result] = img;
    }
  });
}

function shoot(player, value) {
  slots[player] = value;
}

function judge() {
  const result = {
    player: undefined,
    bot: undefined,
  };

  if (slots.player === slots.bot) {
    result.player = result.bot = RESULT_ID.draw;
  } else if (DEFEAT_BY[slots.player] === slots.bot) {
    result.player = RESULT_ID.lose;
    result.bot = RESULT_ID.win;
  } else if (slots.player === DEFEAT_BY[slots.bot]) {
    result.player = RESULT_ID.win;
    result.bot = RESULT_ID.lose;
  }

  for (const player in result) {
    if (result[player] != undefined && result[player] != RESULT_ID.lose) {
      score[player]++;
    }
  }

  return result;
}

function render(result) {
  for (const player in result) {
    if (result[player] !== undefined) {
      const slot = document.querySelector(`.slot#${player}`);
      const oldImg = slot.querySelector("img");
      const newImg = slotImages[slots[player]][result[player]].cloneNode();
      if (oldImg) {
        oldImg.src = newImg.src;
      } else {
        slot.innerHTML = "";
        slot.appendChild(newImg);
      }
    }
  }

  for (const player in score) {
    const span = document.querySelector(`#score #${player}`);
    span.innerText = score[player];
  }
}

[...document.querySelectorAll("#control button")].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    shoot("player", btn.id);
    shoot(
      "bot",
      AVAILABLE_SHOOT_ID[Math.floor(Math.random() * AVAILABLE_SHOOT_ID.length)]
    );

    render(judge());
  });
});

preload();
render();
