import Timer from './Timer';

export default function SinglePlayer({
  timer,
  moves,
}: {
  timer: number;
  moves: number;
}) {
  return (
    <div className="w-full flex justify-center gap-5 text-center px-5">
      <div className="w-1/2 md:w-80 bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
        <div className="text-2xl text-Yellow">Time</div>
        <Timer timer={timer} />
      </div>
      <div className="w-1/2 md:w-80 bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
        <div className="text-2xl text-Yellow">Moves </div>
        <div className="text-3xl text-Beige">{moves}</div>
      </div>
    </div>
  );
}
