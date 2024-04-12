import { Card, CardContent, CardHeader } from "client/src/@/components/ui/card";
import locationIcon from "../../assets/location.svg";

export const Tag = ({ text }: { text: string }) => {
  return (
    <span className="bg-gray-200 text-gray-800 rounded-full py-1 px-2 inline-flex items-center	 text-center">
      {text}
    </span>
  );
};
export const ListingCard = ({
  onClick,
  listing,
  variant = "default",
}: {
  onClick?: any;
  variant?: "add" | "default";
  listing?: any;
}) => {
  return (
    <Card
      onClick={onClick}
      className={`w-1/4 min-w-[300px] transition-transform duration-300 transform ${variant === "default" ? "hover:scale-105" : ""} hover:cursor-pointer`}
    >
      {listing?.href && (
        <CardHeader>
          <img className="h-34" src={listing.href} />
        </CardHeader>
      )}
      {variant === "add" ? (
        <CardContent className="h-full flex justify-center items-center">
          <img
            src="https://img.icons8.com/color/240/add--v1.png"
            alt="add--v1"
          />
        </CardContent>
      ) : (
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
      )}
    </Card>
  );
};
