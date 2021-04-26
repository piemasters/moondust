import "tailwindcss/tailwind.css";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const CoinModalTitle = ({ coin }) => {
  return (
    <a
      href={coin.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center outline-none"
    >
      <img src={coin.image} alt={coin.name} className={`w-8 h-8 mr-2`} />

      <h1 className="text-xl font-bold">{coin.name}</h1>
      <ExternalLinkIcon className="h-5 w-5 text-blue-500 ml-1" />
    </a>
  );
};

export default CoinModalTitle;
