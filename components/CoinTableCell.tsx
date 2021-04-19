import "tailwindcss/tailwind.css";

const CoinTableCell = (props) => {
  return (
    <td className={"px-6 py-4 whitespace-nowrap text-center"}>
      {props.children}
    </td>
  );
};

export default CoinTableCell;
