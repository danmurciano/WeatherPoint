const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://weather-point.vercel.app/"
    : "http://localhost:3000";

export default baseUrl;
