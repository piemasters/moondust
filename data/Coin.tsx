const Coin = {
  name: "Coin",
  image: "",
  link: "",
  description: "A description",
  price: {
    ranges: ["1D", "7D", "30D", "200D"],
    percentages: [0, 0, 0, 0],
    asCurrency: [0, 0, 0, 0],
    low: "£0.00",
    high: "£0.00",
  },
  popularity: {
    upVotes: 0,
    redditSubscribers: "0",
    redditComments: "0",
    rank: "0",
    stars: "0",
  },
};

export default Coin;
