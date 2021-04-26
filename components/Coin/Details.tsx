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
    </>
  );
};

export default CoinDetails;
