import "tailwindcss/tailwind.css";
import { formatCurrency, formatPercent } from "../../utils/formatting";
import Table from "../Common/Table";

const CoinTableCell = (props) => {
  return (
    <td className={"px-6 py-4 whitespace-nowrap text-center"}>
      {props.children}
    </td>
  );
};

const CoinTable = ({ data, openModal }) => {
  return (
    <Table headerValues={["Rank", "Coin", "Price", "24h", "Market Cap"]}>
      {data.map((coin) => (
        <tr
          key={coin.id}
          onClick={() => openModal(coin.id)}
          className="hover:cursor-pointer hover:bg-gray-100"
        >
          <CoinTableCell>
            <div className="text-sm text-gray-900">{coin.market_cap_rank}</div>
          </CoinTableCell>
          <CoinTableCell>
            <div className={"flex items-center"}>
              <div className={"flex-shrink-0 h-6 w-6 mr-2"}>
                <img
                  src={coin.image}
                  alt={coin.symbol.toUpperCase()}
                  className={`w-6 h-6`}
                />
              </div>
              <div className={"text-sm font-medium text-gray-900"}>
                {coin.symbol.toUpperCase()}
              </div>
            </div>
          </CoinTableCell>
          <CoinTableCell>
            <div className="text-sm text-gray-900">
              {formatCurrency(coin.current_price)}
            </div>
          </CoinTableCell>
          <CoinTableCell>
            <div
              className={`text-sm ${
                coin.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formatPercent(coin.price_change_percentage_24h)}
            </div>
          </CoinTableCell>
          <CoinTableCell>
            <div className={"text-sm text-gray-900"}>
              {formatCurrency(coin.market_cap)}
            </div>
          </CoinTableCell>
        </tr>
      ))}
    </Table>
  );
};

export default CoinTable;
