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
    price: {
      ranges: ["1D", "7D", "30D", "200D"],
      percentages: [
        coinRawData?.market_data?.price_change_percentage_24h ?? "-",
        coinRawData?.market_data?.price_change_percentage_7d ?? "-",
        coinRawData?.market_data?.price_change_percentage_30d ?? "-",
        coinRawData?.market_data?.price_change_percentage_200d ?? "-",
      ],
      asCurrency: [
        coinRawData?.market_data?.price_change_percentage_24h_in_currency
          ?.gbp ?? "-",
        coinRawData?.market_data.price_change_percentage_7d_in_currency?.gbp ??
          "-",
        coinRawData?.market_data.price_change_percentage_30d_in_currency?.gbp ??
          "-",
        coinRawData?.market_data.price_change_percentage_200d_in_currency
          ?.gbp ?? "-",
      ],
      low: coinRawData?.market_data?.low_24h?.gbp
        ? formatCurrency(coinRawData.market_data.low_24h.gbp)
        : "-",
      high: coinRawData?.market_data?.high_24h?.gbp
        ? formatCurrency(coinRawData.market_data.high_24h.gbp)
        : "-",
    },
    popularity: {
      upVotes: coinRawData?.sentiment_votes_up_percentage ?? "-",
      redditSubscribers: coinRawData?.community_data.reddit_subscribers
        ? coinRawData.community_data.reddit_subscribers.toLocaleString()
        : "-",
      redditComments: coinRawData?.community_data?.reddit_average_comments_48h
        ? Math.round(
            coinRawData.community_data.reddit_average_comments_48h
          ).toLocaleString()
        : "-",
      rank: coinRawData?.coingecko_rank ?? "-",
      stars: coinRawData?.developer_data?.stars
        ? coinRawData.developer_data.stars.toLocaleString()
        : "-",
    },
  };
};
