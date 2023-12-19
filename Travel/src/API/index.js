import { router } from "react-query-kit";

export const  allCategories = {
  hotel: "accommodation.hotel",
  shopping_mall: "commercial.shopping_mall",
  resturant: "catering.restaurant",
  attraction: "tourism.attraction",
};
  

export const weather = router("weather", {
  getWeather: router.query({
    fetcher: async (variables) => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${variables.lat}&longitude=${variables.lon}`
      );
      return await res.json();
    },
  }),
});

export const geoApify = router("geoapify", {
  autoComplete: router.query({
    fetcher: async ({ query }) => {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${import.meta.env.VITE_API_KEY}&limit=8&lang=en`
      );
      return await res.json();
    },
  }),
  places: router.query({
    fetcher: async ({ placeId, category}) => {
      const url = new URL("https://api.geoapify.com/v2/places");

      url.searchParams.append("categories", allCategories[category]);
      url.searchParams.append("limit", "20");
      url.searchParams.append("filter", `place:${placeId}`);
      url.searchParams.append(
        "apiKey",
        import.meta.env.VITE_API_KEY
      );

      const res = await fetch(url.href);
      return await res.json();
    },
  }),
  getPlacebyId: router.query({
    fetcher: async ({ placeId }) => {
      const url = new URL(
        `https://api.geoapify.com/v2/place-details/?id=${placeId}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const res = await fetch(url.href);
      return await res.json();
    },
  }),
});