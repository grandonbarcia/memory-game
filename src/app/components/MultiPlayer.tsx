export default function Multiplayer({
  multiplayerScore,
}: {
  multiplayerScore: any;
}) {
  function PlayerBlock({
    score,
    turn,
    index,
  }: {
    score: number;
    turn: boolean;
    index: number;
  }) {
    return (
      <>
        <div>
          <div className="w-1/2 md:w-48 bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
            <div className="text-2xl text-Yellow">Player {index}</div>
            <div className="text-3xl text-Beige">{score}</div>
          </div>
          {turn && <div> Current Turn </div>}
        </div>
      </>
    );
  }
  return (
    <div className="w-full flex justify-center gap-5 text-center px-5">
      {multiplayerScore.map(
        (player: { score: number; turn: boolean }, index: number) => (
          <PlayerBlock
            score={player.score}
            turn={player.turn}
            index={index + 1}
          />
        )
      )}
    </div>
  );
}
