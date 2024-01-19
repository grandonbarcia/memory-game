export default function RestartButton({
  restartGame,
}: {
  restartGame: () => void;
}) {
  return (
    <button
      className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
        bg-Sage
       rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
      onClick={restartGame}
    >
      restart
    </button>
  );
}
