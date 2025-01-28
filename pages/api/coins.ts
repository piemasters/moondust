import axios from "axios";
import CoinGecko from "coingecko-api";

export default async (req, res) => {
  const coinGeckoClient = new CoinGecko();
  // const coins = await coinGeckoClient.coins.markets({
  //   vs_currency: "gbp",
  //   order: CoinGecko.ORDER.MARKET_CAP_DESC,
  // });
  const coins = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100"
  );
  console.log(coins);
  res.status(200).json(JSON.stringify(coins.data));
};
