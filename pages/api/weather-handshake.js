import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=51.5072&lon=-0.1275&units=imperial&appid=${process.env.WEATHER_KEY}`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send("Can't connect to API");
    }
}

