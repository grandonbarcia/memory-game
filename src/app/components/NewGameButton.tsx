export default function NewGameButton({
  createNewGame,
}: {
  createNewGame: () => void;
}) {
  return (
    <button
      className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
        
       rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
      onClick={createNewGame}
    >
      new game
    </button>
  );
}
