export default function Timer({ timer }: { timer: number }) {
  return (
    <div className="text-3xl text-Beige">
      <span>{Math.floor(timer / 600) % 10}</span>
      <span>{Math.floor(timer / 60) % 10}</span>
      <span>:</span>
      <span>{Math.floor((timer / 10) % 6)}</span>
      <span>{Math.floor(timer) % 10}</span>
    </div>
  );
}
