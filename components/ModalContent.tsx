import "tailwindcss/tailwind.css";
import { Dialog } from "@headlessui/react";

const ModalContent = ({ title, content, closeModal }) => {
  return (
    <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
      <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </Dialog.Title>

      {content}

      <div className="mt-4 flex flex-row-reverse w-full">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={closeModal}
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
