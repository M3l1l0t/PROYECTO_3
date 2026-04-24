import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export const searchPhotos = async (query, page = 1) => {
  try {
    const res = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 30,
    });

    return res.response.results;
  } catch (error) {
    console.error("Unsplash error:", error);
    return [];
  }
};