import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../../components/Events/EventCard";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Layout/Loader";
import Footer from "../../components/Layout/Footer";
import styles from "../../styles/styles";

export const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
        <div className={`${styles.section}`}>
          
          {(allEvents?.length !== 0) ? <EventCard active={true} data={allEvents && allEvents[0]}/>: <h1 className="text-center w-full pt-[100px] pb-[100px] text-[20px]">
            Không có sự kiện nào!
          </h1>}
          
        </div>
        <Footer />
        </div>
      )}
    </>
  );
};


