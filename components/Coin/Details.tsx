import "tailwindcss/tailwind.css";
import {
  AnnotationIcon,
  HashtagIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { formatPercent } from "../../utils/formatting";
import Table from "../Common/Table";

const CoinTableCell = (props) => {
  return (
    <td className={"px-6 py-4 whitespace-nowrap text-center"}>
      {props.children}
    </td>
  );
};

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
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: coin.description,
        }}
        className="mb-4 overflow-auto text-sm text-gray-500 max-h-28"
      />

      <div>
        <h2 className="mb-4 text-lg font-medium">Price Change</h2>
        <div className="flex mb-4">
          <div className="flex-1 font-medium text-center">
            24h Low:
            <span className="ml-2 text-red-500 ">{coin.price.low}</span>
          </div>
          <div className="flex-1 font-medium text-center">
            24h High:
            <span className="ml-2 text-green-500">{coin.price.high}</span>
          </div>
        </div>

        <Table headerValues={coin.price.ranges}>
          <>
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
          </>
        </Table>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Popularity</h2>
        <div className="font-medium text-md">Today's Sentiment</div>
        <div className="relative h-3 max-w-xl mb-2 overflow-hidden rounded-full">
          <div className="absolute w-full h-full bg-red-500" />
          <div
            className="absolute h-full bg-green-500"
            style={{ width: `${coin.popularity.upVotes}%` }}
          />
        </div>
        <div className="flex items-center">
          <HashtagIcon className="w-5 h-5 mr-1" />
          <div className="mr-1 font-medium text-md">{coin.popularity.rank}</div>
          <div className="text-sm text-gray-500">CoinGecko rank</div>
        </div>
        <div className="flex">
          <UserGroupIcon className="w-5 h-5 mr-1 text-red-500" />
          <div className="mr-2 font-medium text-md">
            {coin.popularity.redditSubscribers}
          </div>
          <div className="text-sm text-gray-500">Reddit subscribers</div>
        </div>
        <div className="flex align-baseline">
          <AnnotationIcon className="w-5 h-5 mr-1 text-red-500" />
          <div className="mr-2 font-medium text-md">
            {coin.popularity.redditComments}
          </div>
          <div className="text-sm text-gray-500">Reddit comments per hour</div>
        </div>
        <div className="flex">
          <StarIcon className="w-5 h-5 mr-1 text-yellow-500" />
          <div className="mr-2 font-medium text-md">
            {coin.popularity.stars}
          </div>
          <div className="text-sm text-gray-500">Github stars</div>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
