import { useSelector } from "react-redux";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const MyListings = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = (id: string) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      axios
        .get(`http://localhost:4000/listing/user/${user.id}/owner`)
        .then((res) => {
          setMyListings(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col pt-10 pb-10 pl-20">
      <h1 className="text-3xl font-bold mb-8">
        View Your Listings here, {user.name}!
      </h1>
      <div className="gap-10 pb-10 flex flex-row flex-wrap ">
        {myListings?.length ? (
          myListings.map((listing, idx) => (
            <ListingCard
              onClick={() => onClickHandler(listing._id)}
              key={listing.description}
              listing={listing}
            />
          ))
        ) : (
          <h2 className="text-xl flex w-full justify-center font-bold mb-4">
            Need a roommate? Create a listing!
          </h2>
        )}
        {isLoading && <ListingCard variant="loading" />}
        <ListingCard
          // onClick={} --> Omar, use this onClick
          variant="add"
        />
      </div>
    </div>
  );
};
