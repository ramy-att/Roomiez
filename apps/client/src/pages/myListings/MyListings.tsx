import { useSelector } from "react-redux";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { myListings } from "../../samples";
import { useNavigate } from "react-router-dom";

export const MyListings = () => {
  const username = useSelector((state) => state.auth.name);
  const navigate = useNavigate();

  const onClickHandler = (idx: number) => {
    //   navigate(``)
  };

  return (
    <div className="pt-10 pb-10 pl-20">
      <h1 className="text-3xl font-bold mb-8">
        View Your Listings here, {username}!
      </h1>
      <div className="gap-10 pb-10 flex flex-wrap ">
        {myListings.map((listing, idx) => (
          <ListingCard
            onClick={() => onClickHandler(idx)}
            key={listing.description}
            listing={listing}
          />
        ))}
        <ListingCard
          // onClick={} --> Omar, use this onClick
          variant="add"
        />
      </div>
    </div>
  );
};
