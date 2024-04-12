import { useNavigate } from "react-router-dom";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { listings } from "../../samples";

export const Listings = () => {
  const navigate = useNavigate();

  const onClickHandler = (idx: number) => {
    console.log("heree");
    navigate(`${idx}`);
  };

  return (
    <div className="gap-10 pt-10 pb-10 flex justify-center flex-wrap ">
      {listings.map((listing, idx) => (
        <ListingCard
          onClick={() => onClickHandler(idx)}
          key={listing.description}
          listing={listing}
        />
      ))}
    </div>
  );
};
