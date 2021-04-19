import "tailwindcss/tailwind.css";
import CoinTableHeader from "./CoinTableHeader";
import CoinTableCell from "./CoinTableCell";

const CoinTable = ({ data }) => {
  const formatPercent = (number) => `${Number(number).toFixed(2)}%`;

  const formatDollar = (number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(number);

  return (
    <table className={"min-w-full divide-y divide-gray-200 shadow"}>
      <thead className={"bg-gray-50"}>
        <tr>
          <CoinTableHeader headerText={"Rank"} />
          <CoinTableHeader headerText={"Coin"} />
          <CoinTableHeader headerText={"Price"} />
          <CoinTableHeader headerText={"24h"} />
          <CoinTableHeader headerText={"Market Cap"} />
        </tr>
      </thead>
      <tbody className={"bg-white divide-y divide-gray-200"}>
        {data.map((coin) => (
          <tr key={coin.id}>
            <CoinTableCell>
              <div className={"text-sm text-gray-900"}>
                {coin.market_cap_rank}
              </div>
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
              <div className={"text-sm text-gray-900"}>
                {formatDollar(coin.current_price)}
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
                {formatDollar(coin.market_cap)}
              </div>
            </CoinTableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
