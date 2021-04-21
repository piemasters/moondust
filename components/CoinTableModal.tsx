import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  ExternalLinkIcon,
  UserGroupIcon,
  StarIcon,
  HashtagIcon,
} from "@heroicons/react/solid";
import "tailwindcss/tailwind.css";

import CoinTableHeader from "./CoinTableHeader";
import CoinTableCell from "./CoinTableCell";

const CoinTableModal = ({
  coinData,
  open,
  setOpen,
  formatCurrency,
  formatPercent,
}) => {
  const cancelButtonRef = useRef();

  const percentCell = (val) => {
    return (
      <span className={val > 0 ? "text-green-500" : "text-red-500"}>
        {formatPercent(val)}
      </span>
    );
  };

  const currencyCell = (val) => {
    return (
      <span className={val > 0 ? "text-green-500" : "text-red-500"}>
        {formatCurrency(val)}
      </span>
    );
  };

  function closeModal() {
    setOpen(false);
  }

  const coin = {
    name: coinData.name,
    image: coinData.image.small,
    link: coinData.links.homepage[0],
    description: coinData.description.en,
    price: {
      ranges: ["1D", "7D", "30D", "200D"],
      percentages: [
        coinData.market_data.price_change_percentage_24h,
        coinData.market_data.price_change_percentage_7d,
        coinData.market_data.price_change_percentage_30d,
        coinData.market_data.price_change_percentage_200d,
      ],
      asCurrency: [
        coinData.market_data.price_change_percentage_24h_in_currency.gbp,
        coinData.market_data.price_change_percentage_7d_in_currency.gbp,
        coinData.market_data.price_change_percentage_30d_in_currency.gbp,
        coinData.market_data.price_change_percentage_200d_in_currency.gbp,
      ],
      low: coinData.market_data.low_24h.gbp,
      high: coinData.market_data.high_24h.gbp,
    },
    popularity: {
      upVotes: coinData.sentiment_votes_up_percentage,
      redditSubscribers: coinData.community_data.reddit_subscribers.toLocaleString(),
      redditComments: Math.round(
        coinData.community_data.reddit_average_comments_48h
      ).toLocaleString(),
      rank: coinData.coingecko_rank,
      stars: coinData.developer_data.stars.toLocaleString(),
    },
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="coin-detail-modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-300 opacity-70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                <a
                  href={coin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"flex items-center"}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className={`w-8 h-8 mr-2`}
                  />

                  <h1 className="text-xl font-bold">{coin.name}</h1>
                  <ExternalLinkIcon className="h-5 w-5 text-blue-500 ml-1" />
                </a>
              </Dialog.Title>
              <div className="mt-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: coin.description,
                  }}
                  className="max-h-28 overflow-auto mb-4 text-sm text-gray-500"
                />

                <div>
                  <h2 className="text-lg font-medium mb-4">Price Change</h2>
                  <div className="flex mb-4">
                    <div className="flex-1 text-center font-medium">
                      24h Low:
                      <span className="text-red-500 ml-2 ">
                        {formatCurrency(coin.price.low)}
                      </span>
                    </div>
                    <div className="flex-1 text-center font-medium">
                      24h High:
                      <span className="text-green-500 ml-2 ">
                        {formatCurrency(coin.price.high)}
                      </span>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {coin.price.ranges.map((range, index) => (
                          <CoinTableHeader key={index}>{range}</CoinTableHeader>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        {coin.price.percentages.map((percentage, index) => (
                          <CoinTableCell key={index}>
                            <div className="text-sm">
                              {percentCell(percentage)}
                            </div>
                          </CoinTableCell>
                        ))}
                      </tr>
                      <tr>
                        {coin.price.asCurrency.map((currency, index) => (
                          <CoinTableCell key={index}>
                            <div className="text-sm">
                              {currencyCell(currency)}
                            </div>
                          </CoinTableCell>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="text-lg font-medium mb-4">Popularity</h2>
                  <div className="text-md font-medium">Today's Sentiment</div>
                  <div className="h-3 relative max-w-xl rounded-full overflow-hidden mb-2">
                    <div className="w-full h-full bg-red-500 absolute" />
                    <div
                      className="h-full bg-green-500 absolute"
                      style={{ width: `${coin.popularity.upVotes}%` }}
                    />
                  </div>
                  <div className="flex items-center">
                    <HashtagIcon className="h-5 w-5 mr-1" />
                    <div className="text-md font-medium mr-1">
                      {coin.popularity.rank}
                    </div>
                    <div className="text-sm text-gray-500">CoinGecko rank</div>
                  </div>
                  <div className="flex">
                    <UserGroupIcon className="h-5 w-5 text-red-500 mr-1" />
                    <div className="text-md font-medium mr-2 ">
                      {coin.popularity.redditSubscribers}
                    </div>
                    <div className="text-sm text-gray-500">
                      Reddit subscribers
                    </div>
                  </div>
                  <div className="flex align-baseline">
                    <AnnotationIcon className="h-5 w-5 text-red-500 mr-1" />
                    <div className="text-md font-medium mr-2">
                      {coin.popularity.redditComments}
                    </div>
                    <div className="text-sm text-gray-500">
                      Reddit comments per hour
                    </div>
                  </div>
                  <div className="flex">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                    <div className="text-md font-medium mr-2">
                      {coin.popularity.stars}
                    </div>
                    <div className="text-sm text-gray-500">Github stars</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-row-reverse w-full">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CoinTableModal;
