import React from "react";

export default function GameOver(props) {
  return ( props.show?
    <div id="gameOver">
      <div>Congratulations, you complete de game!</div>
      <button id="restart" onClick={props.handleRestart}>
        Play again
      </button>
    </div>:<></>
  );
}
