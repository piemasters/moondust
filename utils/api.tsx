import axios from "axios";
import CoinGecko from "coingecko-api";
import { formatCoinData } from "./formatting";

export const getCoinsLocal = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coins`);
  const coins = res.data;
  return { props: { coins }, revalidate: 30 };
};

export const getCoinLocal = async (coinId) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/coins/${coinId}`
  );
  const coinData = res.data;
  return { props: { coinData }, revalidate: 30 };
};

export const getCoinRemote = async (coinId) => {
  const coinGeckoClient = new CoinGecko();
  const coinRawData = await coinGeckoClient.coins.fetch(coinId);
  const coinData = formatCoinData(coinRawData);
  return { props: { coinData }, revalidate: 30 };
};

export const getCoinsRemote = async () => {
  const coinGeckoClient = new CoinGecko();
  const coins = await coinGeckoClient.coins.markets({
    vs_currency: "gbp",
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  });
  return { props: { coins: coins.data }, revalidate: 30 };
};
