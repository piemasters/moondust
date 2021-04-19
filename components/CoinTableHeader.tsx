import "tailwindcss/tailwind.css";

const CoinTableHeader = ({ headerText }) => {
  return (
    <th
      scope="col"
      className={
        "px-6 py-3 text-left text-xs font-medium text-gray-500 text-center uppercase tracking-wider"
      }
    >
      {headerText}
    </th>
  );
};

export default CoinTableHeader;
