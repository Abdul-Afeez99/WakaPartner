import React from "react";
import { geoApify } from "../API";
import { Link } from "react-router-dom";


const allCategories = {
  hotel: "accommodation.hotel",
  shopping_mall: "commercial.shopping_mall",
  resturant: "catering.restaurant",
  attraction: "tourism.attraction",
};
  

export const SearchResults = ({ placeId }) => {
  const [filter, setFilter] = React.useState("hotel");
  const { data, isLoading, isError, error } = geoApify.places.useQuery({
    enabled: placeId.length > 0,
    variables: {
      placeId,
      category: filter,
    },
  });

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {data?.features?.map((feature, i) => (
          <Card
            key={i}
            name={feature.properties.name}
            address={feature.properties.formatted}
            placeId={feature.properties.place_id}
            filter = {filter}
          />
        ))}
      </div>
    </>
  );
};

function Filter({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center pb-9">
      {Object.keys(allCategories).map((category) => {
        const present = filter === category;
        return (
          <Tag
            active={present}
            onClick={() => {
              setFilter(category);
            }}
            key={category}
          >
            {category}
          </Tag>
        );
      })}
    </div>
  );
}
function Tag({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border w-[300px] rounded-2xl h-[50px] text-black font-bold ${active ? "bg-yellow-500" : "bg-transparent"}`}
    >
      {children}
    </button>
  );
}

function Card({ name, address, placeId, filter }) {
  return (
    <Link to={`/detail/${placeId}`}>
      <div className="relative h-[400px] w-[300px] rounded-md">
        <img
          src= {`https://source.unsplash.com/random/${filter}&${placeId}`}
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">{name}</h1>
          <p className="mt-2 text-sm text-gray-300">
           {address}
          </p>
          <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
            View Profile &rarr;
          </button>
        </div>
      </div>
    </Link>
  );
}

