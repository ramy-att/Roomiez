import { ListingCard } from "../../components/listingCard/ListingCard";
import { listings } from "../../samples";

export const Main = () => {
  return (
    <div className="gap-10 pt-10 pb-10 flex justify-center flex-wrap ">
      {listings.map((listing) => (
        <ListingCard key={listing.description} listing={listing} />
      ))}
    </div>
  );
};
