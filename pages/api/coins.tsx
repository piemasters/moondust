import CoinGecko from "coingecko-api";

export default async (req, res) => {
  const coinGeckoClient = new CoinGecko();
  const coins = await coinGeckoClient.coins.markets({
    vs_currency: "gbp",
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  });
  res.status(200).json(JSON.stringify(coins.data));
};
