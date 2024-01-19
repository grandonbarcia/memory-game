'use client';

import React from 'react';

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          bg-Sage
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
        type="button"
        onClick={() => setShowModal(true)}
      >
        Menu
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="flex flex-col relative p-6 flex-auto">
                  <button
                    className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          bg-Sage
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
                  >
                    restart
                  </button>
                  <button
                    className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
                  >
                    new game
                  </button>
                  <button
                    className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
                  >
                    {' '}
                    resume game
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
