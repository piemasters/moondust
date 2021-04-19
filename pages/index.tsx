import CoinGecko from "coingecko-api";
import "tailwindcss/tailwind.css";
import CoinTable from "../components/CoinTable";

const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;

  console.log(data[0]);

  return (
    <div className={"flex justify-center"}>
      <div className={"py-6 align-middle inline-block"}>
        <CoinTable data={data} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const result = await coinGeckoClient.coins.markets({
    vs_currency: "gbp",
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  });
  return {
    props: {
      result,
    },
  };
}
