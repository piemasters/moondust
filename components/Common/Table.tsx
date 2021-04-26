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

const CoinTable = ({ children, headerValues }) => {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 shadow">
        <thead className="bg-gray-50">
          <tr>
            {headerValues.map((val, index) => (
              <CoinTableHeader key={index}>{val}</CoinTableHeader>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export default CoinTable;
