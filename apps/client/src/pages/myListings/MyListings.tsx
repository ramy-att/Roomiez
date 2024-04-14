import React, { useState } from 'react';  // Import useState
import { useSelector } from "react-redux";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { myListings } from "../../samples";
import { useNavigate } from "react-router-dom";
import CreateListingModal from './create-listings'; // Make sure to import CreateListingModal

export const MyListings = () => {
  const username = useSelector((state) => state.auth.name);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

  const onClickHandler = (idx: number) => {
    navigate(`${idx}`);
  };

  const openModal = () => setIsModalOpen(true);  // Function to open the modal
  const closeModal = () => setIsModalOpen(false);  // Function to close the modal

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
          onClick={openModal}  // Set this to open the modal
          variant="add"
        />
      </div>
      <CreateListingModal open={isModalOpen} onClose={closeModal} /> 
    </div>
  );
};
