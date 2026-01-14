export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
  }>;
}

export const getWeatherTip = (weatherData: WeatherData | null, units: string): string[] => {
  if (!weatherData) return [];

  const tips: string[] = [];
  const temp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  const tempForComparison = units === "imperial" ? (temp - 32) * (5 / 9) : temp;
  const feelsLikeForComparison =
    units === "imperial" ? (feelsLike - 32) * (5 / 9) : feelsLike;
  const windSpeedKmh =
    units === "imperial" ? windSpeed * 1.60934 : windSpeed * 3.6;

  if (weatherCondition.includes("thunderstorm")) {
    tips.push(
      "Stay indoors if possible — thunderstorms can be dangerous. Avoid open areas and tall objects. ",
    );
  }

  if (weatherCondition.includes("snow")) {
    tips.push(
      "Dress in layers and wear waterproof boots — snowy conditions can make roads slippery. ",
    );
  }

  if (
    weatherCondition.includes("rain") ||
    weatherCondition.includes("drizzle")
  ) {
    tips.push(
      "Carry a light waterproof jacket — rain showers can pop up suddenly. ",
    );
  }

  if (weatherCondition.includes("fog") || weatherCondition.includes("mist")) {
    tips.push(
      "Drive carefully with low beam lights — visibility is reduced in foggy conditions. ",
    );
  }

  if (tempForComparison < -10) {
    tips.push(
      "Extremely cold weather — wear multiple layers, gloves, and a warm hat to protect from frostbite. ",
    );
  } else if (tempForComparison < 0) {
    tips.push(
      "Freezing temperatures — bundle up with a warm coat and watch for icy sidewalks. ",
    );
  } else if (tempForComparison < 10) {
    tips.push(
      "Chilly weather — a jacket or sweater is recommended, especially in the morning and evening. ",
    );
  }

  if (tempForComparison > 30) {
    tips.push(
      "Very hot day — stay hydrated, wear light clothing, and avoid prolonged sun exposure. ",
    );
  } else if (tempForComparison > 25) {
    tips.push(
      "Warm weather — sunscreen and sunglasses are recommended if you'll be outside for a while. ",
    );
  }

  if (
    tips.length < 3 &&
    Math.abs(tempForComparison - feelsLikeForComparison) > 5
  ) {
    if (feelsLike < temp) {
      tips.push(
        "Wind chill makes it feel colder — dress warmer than the temperature suggests. ",
      );
    } else {
      tips.push(
        "High humidity makes it feel warmer — it may feel warmer than the actual temperature. ",
      );
    }
  }

  if (tips.length < 3 && humidity > 80) {
    tips.push(
      "High humidity today — expect muggy conditions and consider indoor activities. ",
    );
  }

  if (tips.length < 3 && windSpeedKmh > 40) {
    tips.push(
      "Very windy conditions — secure loose objects and be careful when walking outside. ",
    );
  } else if (tips.length < 3 && windSpeedKmh > 25) {
    tips.push(
      "Moderate winds expected — hold onto your hat and be careful with umbrellas. ",
    );
  }

  if (tips.length < 3 && weatherCondition.includes("clear")) {
    if (tempForComparison >= 15 && tempForComparison <= 25) {
      tips.push(
        "Perfect weather for outdoor activities — enjoy the beautiful clear skies! ",
      );
    } else {
      tips.push(
        "Clear skies today — great visibility for sightseeing and outdoor plans. ",
      );
    }
  }

  if (tips.length < 3 && weatherCondition.includes("clouds")) {
    tips.push(
      "Cloudy conditions — no need for sunglasses, but check back for weather changes. ",
    );
  }

  if (tips.length === 0) {
    tips.push(
      "Pleasant weather conditions — dress comfortably and enjoy your day! ",
    );
  }

  return tips.slice(0, 3);
};
