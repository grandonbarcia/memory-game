export default function StartMenu() {
  function Title({ children }: { children: string }) {
    return <h3 className="text-2xl">{children}</h3>;
  }

  function Button({ children, width }: { children: string; width: string }) {
    return (
      <button
        type="button"
        className={`${width} py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
      >
        {children}
      </button>
    );
  }

  function StartButton({ children }: { children: string }) {
    return (
      <button
        type="button"
        className={`w-full py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
      >
        {children}
      </button>
    );
  }

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-Green gap-5">
      <h1 className="text-5xl">Memory</h1>
      <div className=" h-[30.25rem] w-[40.25rem] flex flex-col gap-5 bg-white rounded-2xl p-10">
        <div className="3">
          <Title>select theme</Title>
          <div className="flex justify-evenly">
            <Button width="w-2/3">numbers</Button>

            <Button width="w-2/3">icons</Button>
          </div>
        </div>
        <div>
          <Title>number of players</Title>
          <div className="flex justify-evenly">
            <Button width="w-1/5">1</Button>
            <Button width="w-1/5">2</Button>
            <Button width="w-1/5">3</Button>
            <Button width="w-1/5">4</Button>
          </div>
        </div>
        <div>
          <Title>Grid Size</Title>
          <div className="flex justify-evenly">
            <Button width="w-2/3">4 x 4</Button>

            <Button width="w-2/3">6 x 6</Button>
          </div>
        </div>
        <div>
          <StartButton>StartGame</StartButton>
        </div>
      </div>
    </section>
  );
}
