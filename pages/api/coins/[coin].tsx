import CoinGecko from "coingecko-api";
import { formatCurrency } from "../../../utils/formatting";

export default async (req, res) => {
  const coinGeckoClient = new CoinGecko();
  const coinRawData = await coinGeckoClient.coins.fetch(req.query.coin);
  const coinData = {
    name: coinRawData.data.name,
    image: coinRawData.data.image.small,
    link: coinRawData.data.links.homepage[0],
    description: coinRawData.data.description.en,
    price: {
      ranges: ["1D", "7D", "30D", "200D"],
      percentages: [
        coinRawData.data.market_data.price_change_percentage_24h,
        coinRawData.data.market_data.price_change_percentage_7d,
        coinRawData.data.market_data.price_change_percentage_30d,
        coinRawData.data.market_data.price_change_percentage_200d,
      ],
      asCurrency: [
        coinRawData.data.market_data.price_change_percentage_24h_in_currency
          .gbp,
        coinRawData.data.market_data.price_change_percentage_7d_in_currency.gbp,
        coinRawData.data.market_data.price_change_percentage_30d_in_currency
          .gbp,
        coinRawData.data.market_data.price_change_percentage_200d_in_currency
          .gbp,
      ],
      low: formatCurrency(coinRawData.data.market_data.low_24h.gbp),
      high: formatCurrency(coinRawData.data.market_data.high_24h.gbp),
    },
    popularity: {
      upVotes: coinRawData.data.sentiment_votes_up_percentage,
      redditSubscribers: coinRawData.data.community_data.reddit_subscribers.toLocaleString(),
      redditComments: Math.round(
        coinRawData.data.community_data.reddit_average_comments_48h
      ).toLocaleString(),
      rank: coinRawData.data.coingecko_rank,
      stars: coinRawData.data.developer_data.stars.toLocaleString(),
    },
  };
  res.statusCode = 200;
  res.json(coinData);
};
