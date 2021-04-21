import "tailwindcss/tailwind.css";

const CoinTableHeader = (props) => {
  return (
    <th
      scope="col"
      className={
        "px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider"
      }
    >
      {props.children}
    </th>
  );
};

export default CoinTableHeader;
