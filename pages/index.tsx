import "tailwindcss/tailwind.css";
import CoinTable from "../components/CoinTable";
import CoinTableModal from "../components/CoinTableModal";
import { useState } from "react";
import CoinTitle from "../components/CoinTitle";
import CoinDetails from "../components/CoinDetails";
import Coin from "../data/Coin";

export default function Home({ coins }) {
  const [open, setOpen] = useState(false);
  const [coinData, setCoinData] = useState(Coin);

  function closeModal() {
    setOpen(false);
  }

  const openModal = async (coinId) => {
    setOpen(true);
    const req = await fetch(`/api/coins/${coinId}`);
    const coinData = await req.json();
    setCoinData(coinData);
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

export async function getStaticProps() {
  const req = await fetch(`http://localhost:3000/api/coins`);
  const coins = await req.json();
  return { props: { coins } };
}
