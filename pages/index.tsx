import "tailwindcss/tailwind.css";
import { useState } from "react";
import Coin from "../data/Coin";
import { getCoinRemote, getCoinsRemote } from "../utils/api";
import CoinTable from "../components/Coin/Table";
import Modal from "../components/Common/Modal";
import CoinModalTitle from "../components/Coin/ModalTitle";
import CoinModalContent from "../components/Coin/ModalContent";

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
        <Modal
          open={open}
          closeModal={closeModal}
          title={<CoinModalTitle coin={coinData} />}
        >
          <CoinModalContent coin={coinData} closeModal={closeModal} />
        </Modal>
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
