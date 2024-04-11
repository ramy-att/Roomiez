import { Card, CardContent, CardHeader } from "client/src/@/components/ui/card";
import locationIcon from "../../assets/location.svg";

const Tag = ({ text }: { text: string }) => {
  return (
    <span className="bg-gray-200 text-gray-800 rounded-full py-1 px-2 inline-flex items-center	 text-center">
      {text}
    </span>
  );
};
export const ListingCard = ({ listing }: { listing: any }) => {
  return (
    <Card
      key={listing.description}
      className="w-1/4 min-w-[300px] transition-transform duration-300 transform hover:scale-105 hover:cursor-pointer"
    >
      <CardHeader>
        <img className="h-34" src={listing.href} />
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2 mb-2">
          <img className="w-6" src={locationIcon} />
          {listing.location}
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          <Tag text={`$${listing.price}`} />
          {listing.tags.map((tag: string) => {
            return <Tag text={tag} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
};
