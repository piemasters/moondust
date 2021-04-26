import CoinGecko from "coingecko-api";
import { formatCoinData } from "../../../utils/formatting";

export default async (req, res) => {
  const coinGeckoClient = new CoinGecko();
  const coinRawData = await coinGeckoClient.coins.fetch(req.query.coin);
  const coinData = formatCoinData(coinRawData);
  res.status(200).json(JSON.stringify(coinData));
};
