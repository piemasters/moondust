import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { getCoinRemote, getCoinsRemote } from "../../utils/api";
import CoinModalTitle from "../../components/Coin/ModalTitle";
import CoinDetails from "../../components/Coin/Details";

const CoinPage = ({ coinData }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"flex justify-center"}>
      <div className={"py-6 align-middle inline-block  max-w-xl"}>
        <CoinModalTitle coin={coinData} />
        <CoinDetails coin={coinData} />
      </div>
    </div>
  );
};

export default CoinPage;

// Used for SSR
// export async function getServerSideProps(context) {
//   return getCoinLocal(context.params.coinId);
// }

// Used for SSG
export async function getStaticProps(context) {
  return getCoinRemote(context.params.coinId);
}

export async function getStaticPaths() {
  const coinsData = await getCoinsRemote();
  let coins = coinsData.props.coins;
  // Only generate first 3 coin pages due to API restriction
  coins.length = 3;
  return {
    paths: coins.map((coin) => ({
      params: { coinId: coin.id },
    })),
    fallback: true,
  };
}
