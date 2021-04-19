import CoinGecko from "coingecko-api";
import styles from "../styles/Home.module.css";

const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th> Symbol </th>
            <th> Price </th>
            <th> 24H Change </th>
            <th> Market Cap </th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.current_price}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{coin.market_cap}</td>
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
