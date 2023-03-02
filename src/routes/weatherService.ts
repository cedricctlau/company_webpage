import Reply from "../models/reply";

class WetherService {
	constructor() {}

	getWeather = async (): Promise<Reply> => {
		const res = await fetch(
			"https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc"
		);
		const weather = await res.json();
		return { success: true, outcome: { weather } };
	};
}
