import { Activity } from '../constants/activities';

export type ActivityQuality = 'Good' | 'Moderate' | 'Bad' | 'Low' | 'N/A';

export const getActivityQuality = (
  activityId: string,
  windSpeed?: number | null,
  humidity?: number | null,
  aqi?: number | null
): ActivityQuality => {
  switch (activityId) {
    case "wind":
      if (!windSpeed || windSpeed < 3) return "Good";
      if (windSpeed < 7) return "Moderate";
      return "Bad";

    case "air_quality":
      if (!aqi) return "Moderate";
      if (aqi === 1 || aqi === 2) return "Good";
      if (aqi === 3) return "Moderate";
      return "Bad";

    case "humidity":
      if (!humidity || humidity < 40 || humidity > 70) return "Bad";
      if (humidity < 50 || humidity > 60) return "Moderate";
      return "Good";

    case "running":
    case "cycling": {
      const windQuality = !windSpeed || windSpeed < 5 ? 1 : windSpeed < 10 ? 2 : 3;
      const aqiQuality = aqi || 2;
      const avgQuality = (windQuality + aqiQuality) / 2;

      if (avgQuality <= 1.5) return "Good";
      if (avgQuality <= 2.5) return "Moderate";
      return "Bad";
    }

    case "driving":
      if (!windSpeed || windSpeed < 7) return "Good";
      if (windSpeed < 12) return "Moderate";
      return "Bad";

    case "fishing":
      if ((windSpeed && windSpeed > 7) || (humidity && humidity > 80)) return "Bad";
      if ((windSpeed && windSpeed > 4) || (humidity && humidity > 65)) return "Moderate";
      return "Good";

    case "golf":
      if ((!windSpeed || windSpeed < 3) && (!humidity || humidity < 70)) return "Good";
      if ((!windSpeed || windSpeed < 7) && (!humidity || humidity < 80)) return "Moderate";
      return "Bad";

    default:
      return "Moderate";
  }
};

export interface ActivityData {
  value: string;
  quality: ActivityQuality;
}

export interface WeatherDataForActivity {
  wind: {
    speed: number;
  };
  main: {
    humidity: number;
  };
}

export const buildActivityData = (
  activity: Activity,
  weatherData: WeatherDataForActivity,
  aqi: number | null | undefined,
  units: string,
  getWindSpeedUnit: (units: string) => string,
): ActivityData => {
  switch (activity.id) {
    case "wind": {
      const windKmh = Math.round(weatherData.wind.speed * 3.6);
      const windUnit = getWindSpeedUnit(units);
      return {
        value: `${windKmh}${windUnit}`,
        quality: getActivityQuality("wind", weatherData.wind.speed),
      };
    }

    case "air_quality": {
      const quality = getActivityQuality("air_quality", null, null, aqi);
      return {
        value: aqi ? quality : "N/A",
        quality,
      };
    }

    case "humidity": {
      return {
        value: `${weatherData.main.humidity}%`,
        quality: getActivityQuality(
          "humidity",
          null,
          weatherData.main.humidity,
        ),
      };
    }

    case "tree_pollen":
    case "mold":
      return {
        value: "Low",
        quality: "Low",
      };

    case "running":
    case "cycling":
    case "driving":
    case "fishing":
    case "golf": {
      const quality = getActivityQuality(
        activity.id,
        weatherData.wind.speed,
        weatherData.main.humidity,
        aqi,
      );
      return {
        value: quality,
        quality,
      };
    }

    default:
      return {
        value: "N/A",
        quality: "Moderate",
      };
  }
};
