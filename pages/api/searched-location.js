import axios from "axios";

export default async (req, res) => {
    const { search } = req.query;

    try {
        const geoUrl = `https://api.radar.io/v1/geocode/forward?query=${search}`;
        const geoPayload = { headers: { "Authorization": process.env.MAPQUEST_KEY } };
        const geoResponse = await axios.get(geoUrl, geoPayload);
        const geoData = geoResponse.data.addresses[0];
        const city = geoData.neighborhood ? geoData.neighborhood : geoData.city;
        const region = geoData.state;
        const country = geoData.country;
        const lat = geoData.latitude;
        const lng = geoData.longitude;
    
        res.status(200).json({ city, region, country, lat, lng });
    } catch (error) {
        res.status(404).send("Location not found");
    }
}