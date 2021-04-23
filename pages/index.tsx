import CoinGecko from "coingecko-api";
import "tailwindcss/tailwind.css";
import CoinTable from "../components/CoinTable";
import CoinTableModal from "../components/CoinTableModal";
import { useState } from "react";
import CoinTitle from "../components/CoinTitle";
import CoinDetails from "../components/CoinDetails";
import { useRouter } from "next/router";
import { useContextualRouting } from "next-use-contextual-routing";
import Coin from "../data/Coin";

export default function Home(props) {
  const { data } = props.result;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { returnHref } = useContextualRouting();

  function closeModal() {
    router.push(returnHref);
  }

  let coin = Coin;

  return (
    <div className={"flex justify-center"}>
      <div className={"py-6 align-middle inline-block"}>
        <CoinTable data={data} />
        <CoinTableModal
          open={!!router.query.coinId}
          closeModal={closeModal}
          // title={<CoinTitle coin={coin} />}
          // content={<CoinDetails coin={coin} />}
        >
          <CoinDetails coin={coin} />
        </CoinTableModal>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const coinGeckoClient = new CoinGecko();

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
