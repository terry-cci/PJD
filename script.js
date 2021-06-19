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
  } else {
    result.player = RESULT_ID.win;
    result.bot = RESULT_ID.lose;
  }

  return result;
}

function render(result) {
  for (const player in result) {
    const slot = document.querySelector(`.slot#${player}`);
    slot.innerHTML = "";
    slot.appendChild(slotImages[slots[player]][result[player]].cloneNode());
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
