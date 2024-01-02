export default function Timer({ timer }: { timer: number }) {
  return (
    <div className="text-3xl text-Beige">
      <span>{Math.floor((timer / 1000) % 60)}</span>
      <span>{Math.floor((timer / 100) % 10)}</span>
      <span>:</span>
      <span>{Math.floor((timer / 10) % 6)}</span>
      <span>{Math.floor(timer) % 10}</span>
    </div>
  );
}
