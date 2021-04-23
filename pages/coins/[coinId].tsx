import CoinGecko from "coingecko-api";
import CoinTitle from "../../components/CoinTitle";
import CoinDetails from "../../components/CoinDetails";

const CoinPage = ({ coinData }) => {
  return (
    <div className={"flex justify-center"}>
      <div className={"py-6 align-middle inline-block  max-w-lg"}>
        <CoinTitle coin={coinData} />
        <CoinDetails coin={coinData} />
      </div>
    </div>
  );
};

export default CoinPage;

export async function getStaticProps(context) {
  const req = await fetch(
    `http://localhost:3000/api/coins/${context.params.coinId}`
  );
  const coinData = await req.json();
  return { props: { coinData } };
}

export async function getStaticPaths() {
  const coinGeckoClient = new CoinGecko();

  const coins = await coinGeckoClient.coins.markets({
    vs_currency: "gbp",
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  });

  return {
    paths: coins.data.map((coin) => ({
      params: { coinId: coin.id },
    })),
    fallback: false,
  };
}
