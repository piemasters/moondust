import "tailwindcss/tailwind.css";
import CoinTableHeader from "./CoinTableHeader";
import CoinTableCell from "./CoinTableCell";
import {
  AnnotationIcon,
  HashtagIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { formatPercent } from "../utils/formatting";

const CoinDetails = ({ coin }) => {
  const formatCurrency = (number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(number);

  const percentCell = (val) => {
    if (isNaN(val)) {
      return "-";
    }
    return (
      <span className={val > 0 ? "text-green-500" : "text-red-500"}>
        {formatPercent(val)}
      </span>
    );
  };

  const currencyCell = (val) => {
    if (isNaN(val)) {
      return "-";
    }
    return (
      <span className={val > 0 ? "text-green-500" : "text-red-500"}>
        {formatCurrency(val)}
      </span>
    );
  };

  return (
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
            <span className="text-red-500 ml-2 ">{coin.price.low}</span>
          </div>
          <div className="flex-1 text-center font-medium">
            24h High:
            <span className="text-green-500 ml-2">{coin.price.high}</span>
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
                  <div className="text-sm">{percentCell(percentage)}</div>
                </CoinTableCell>
              ))}
            </tr>
            <tr>
              {coin.price.asCurrency.map((currency, index) => (
                <CoinTableCell key={index}>
                  <div className="text-sm">{currencyCell(currency)}</div>
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
          <div className="text-md font-medium mr-1">{coin.popularity.rank}</div>
          <div className="text-sm text-gray-500">CoinGecko rank</div>
        </div>
        <div className="flex">
          <UserGroupIcon className="h-5 w-5 text-red-500 mr-1" />
          <div className="text-md font-medium mr-2">
            {coin.popularity.redditSubscribers}
          </div>
          <div className="text-sm text-gray-500">Reddit subscribers</div>
        </div>
        <div className="flex align-baseline">
          <AnnotationIcon className="h-5 w-5 text-red-500 mr-1" />
          <div className="text-md font-medium mr-2">
            {coin.popularity.redditComments}
          </div>
          <div className="text-sm text-gray-500">Reddit comments per hour</div>
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
  );
};

export default CoinDetails;
