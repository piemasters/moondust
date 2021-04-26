import Coin from "../data/Coin";

export const formatPercent = (number) => `${Number(number).toFixed(2)}%`;

export const formatCurrency = (number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(number);

export const formatCoinData = (res) => {
  if (!res || !res.data) {
    return Coin;
  }
  const coinRawData = res.data;

  return {
    name: coinRawData?.name ?? "-",
    image: coinRawData?.image?.small ?? "-",
    link: coinRawData?.links?.homepage[0] ?? "-",
    description: coinRawData?.description?.en ?? "-",
    price: getCoinPriceDetails(coinRawData),
    popularity: getCoinPopularityDetails(coinRawData),
  };
};

const getCoinPriceDetails = (coin) => {
  return {
    ranges: ["1D", "7D", "30D", "200D"],
    percentages: [
      coin?.market_data?.price_change_percentage_24h ?? "-",
      coin?.market_data?.price_change_percentage_7d ?? "-",
      coin?.market_data?.price_change_percentage_30d ?? "-",
      coin?.market_data?.price_change_percentage_200d ?? "-",
    ],
    asCurrency: [
      coin?.market_data?.price_change_percentage_24h_in_currency?.gbp ?? "-",
      coin?.market_data.price_change_percentage_7d_in_currency?.gbp ?? "-",
      coin?.market_data.price_change_percentage_30d_in_currency?.gbp ?? "-",
      coin?.market_data.price_change_percentage_200d_in_currency?.gbp ?? "-",
    ],
    low: coin?.market_data?.low_24h?.gbp
      ? formatCurrency(coin.market_data.low_24h.gbp)
      : "-",
    high: coin?.market_data?.high_24h?.gbp
      ? formatCurrency(coin.market_data.high_24h.gbp)
      : "-",
  };
};

const getCoinPopularityDetails = (coin) => {
  return {
    upVotes: coin?.sentiment_votes_up_percentage ?? "-",
    redditSubscribers: coin?.community_data.reddit_subscribers
      ? coin.community_data.reddit_subscribers.toLocaleString()
      : "-",
    redditComments: coin?.community_data?.reddit_average_comments_48h
      ? Math.round(
          coin.community_data.reddit_average_comments_48h
        ).toLocaleString()
      : "-",
    rank: coin?.coingecko_rank ?? "-",
    stars: coin?.developer_data?.stars
      ? coin.developer_data.stars.toLocaleString()
      : "-",
  };
};
