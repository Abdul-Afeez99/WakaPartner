import React from "react";
import { geoApify } from "../API";

export const Hero = ({ placeId, setPlaceId }) => {
  const [value, setValue] = React.useState("");
  const { isLoading, isError, data } = geoApify.autoComplete.useQuery({
    enabled: value.length > 2,
    variables: {
      query: value,
    },
  });
  const [focused, setFocused] = React.useState(false);
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl  text-center">
          <h2 className="mt-8 text-3xl font-bold leading-tight text-black sm:text-4xl lg:mt-12 lg:text-5xl">
            Join <span className="border-b-8 border-yellow-300">5,482</span>{" "}
            other Travelers
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-gray-600 md:mt-10 lg:text-xl">
            Plan your next trip with WakaPartner.
          </p>

          <form action="#" method="POST" className="mx-auto mt-12 max-w-xl">
            <div className="flex flex-col items-center sm:flex-row sm:justify-center">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                  onFocus={() => setFocused(true)}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                />
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Search
                </button>
              </div>
            </div>
            {focused && (
              <div className="relative  w-full h-10 z-20">
                <ul className="absolute top-0 left-0 right-0">
                  {data?.features?.map((feature) => {
                    return (
                      <li
                        key={feature.properties.place_id}
                        className="flex w-full max-w-sm items-center space-x-2 mx-auto"
                      >
                        <button
                          onClick={() => {
                            console.log("clicked");
                            setFocused(false);
                            setValue(feature.properties.formatted);
                            setPlaceId(feature.properties.place_id);
                          }}
                          type="button"
                          className="flex h-10 w-80 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-yellow-500 focus:outline-none text-black"
                        >
                          {feature.properties.formatted}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
