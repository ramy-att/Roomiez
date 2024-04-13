import { useNavigate } from "react-router-dom";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "../../components/tag/Tag";

export const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = (id: string) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/listing`)
      .then((res) => {
        setListings(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="gap-10 pt-10 pb-10 flex justify-center flex-wrap ">
      {!isLoading
        ? listings?.map((listing, idx) => (
            <ListingCard
              onClick={() => onClickHandler(listing._id)}
              key={idx}
              listing={{
                ...listing,
                href: listing.imageUrl,
              }}
            />
          ))
        : [...Array(10)].map((_, index) => (
            <ListingCard key={index} variant="loading" />
          ))}
      <Tag text="hello" />
    </div>
  );
};
