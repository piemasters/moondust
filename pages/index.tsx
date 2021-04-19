import CoinGecko from "coingecko-api";
import "tailwindcss/tailwind.css";

const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;

  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);

  return (
    <div>
      <table className={"min-w-full divide-y divide-gray-200"}>
        <thead className={"bg-gray-50"}>
          <tr>
            <th
              scope="col"
              className={
                "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              }
            >
              Symbol
            </th>
            <th
              scope="col"
              className={
                "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              }
            >
              Price
            </th>
            <th
              scope="col"
              className={
                "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              }
            >
              24H Change
            </th>
            <th
              scope="col"
              className={
                "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              }
            >
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody className={"bg-white divide-y divide-gray-200"}>
          {data.map((coin) => (
            <tr key={coin.id}>
              <td className={"px-6 py-4 whitespace-nowrap"}>
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
              </td>
              <td className={"px-6 py-4 whitespace-nowrap"}>
                <div className={"text-sm  text-gray-900"}>
                  {coin.current_price}
                </div>
              </td>
              <td className={"px-6 py-4 whitespace-nowrap"}>
                <div
                  className={`text-sm ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                </div>
              </td>
              <td className={"px-6 py-4 whitespace-nowrap"}>
                <div className={"text-sm text-gray-900"}>
                  {formatDollar(coin.market_cap, 12)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const params = { order: CoinGecko.ORDER.MARKET_CAP_DESC };
  const result = await coinGeckoClient.coins.markets({ params });
  return {
    props: {
      result,
    },
  };
}
