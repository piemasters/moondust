import "tailwindcss/tailwind.css";
import CoinDetails from "./Details";

const CoinModalContent = ({ coin, closeModal }) => {
  return (
    <div className="mt-6">
      <CoinDetails coin={coin} />

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

export default CoinModalContent;
