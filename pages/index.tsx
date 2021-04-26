import "tailwindcss/tailwind.css";
import CoinTable from "../components/CoinTable";
import CoinTableModal from "../components/CoinTableModal";
import { useState } from "react";
import CoinTitle from "../components/CoinTitle";
import CoinDetails from "../components/CoinDetails";
import Coin from "../data/Coin";
import { getCoinRemote, getCoinsLocal, getCoinsRemote } from "../utils/api";

export default function Home({ coins }) {
  const [open, setOpen] = useState(false);
  const [coinData, setCoinData] = useState(Coin);

  function closeModal() {
    setOpen(false);
  }

  const openModal = async (coinId) => {
    setOpen(true);
    // Get data (SSR or SSG)
    // const data = await getCoinLocal(coinId);
    const data = await getCoinRemote(coinId);
    setCoinData(data.props.coinData);
  };

  return (
    <div className={"flex justify-center"}>
      <div className={"py-6 align-middle inline-block"}>
        <CoinTable data={coins} openModal={openModal} />
        <CoinTableModal
          open={open}
          closeModal={closeModal}
          title={<CoinTitle coin={coinData} />}
        >
          <CoinDetails coin={coinData} />
        </CoinTableModal>
      </div>
    </div>
  );
}

// Used for SSR
// export async function getServerSideProps() {
//   return getCoinsLocal();
// }

// Used for SSG
export async function getStaticProps() {
  return getCoinsRemote();
}
