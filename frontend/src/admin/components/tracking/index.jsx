import React, { useEffect, useState } from "react";
import axios from "axios";

const Tracking = () => {
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const apiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkN2VhYzExMC1kYmEwLTExZWQtOGNjMi03NTAxNWU4YTgxZjIiLCJzdWJJZCI6IjY0M2FjMDYyMDA3NTlmN2IwNTJiMjhiYSIsImlhdCI6MTY4MTU3MTkzOH0.on_SjQByjaFFnXUjUfdwikW9pfLCIWErN8iSmZ3V-d8";
    const trackingUrl = "https://parcelsapp.com/api/v3/shipments/tracking";
    const shipments = [
      {
        trackingId: "92001901755477300210710061",
        language: "en",
        country: "United States",
      },

      // ...
    ];

    const initiateTracking = async () => {
      try {
        const response = await axios.post(trackingUrl, { apiKey, shipments });
        const { uuid } = response.data;
        console.log("aAAAAAAAAAAAA");
        console.log(response.data);
        setUuid(uuid);
      } catch (error) {
        console.error(error);
      }
    };

    initiateTracking();
  }, []);

  useEffect(() => {
    const checkTrackingStatus = async () => {
      try {
        const response = await axios.get(
          `https://parcelsapp.com/api/v3/shipments/tracking?uuid=${uuid}&apiKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkN2VhYzExMC1kYmEwLTExZWQtOGNjMi03NTAxNWU4YTgxZjIiLCJzdWJJZCI6IjY0M2FjMDYyMDA3NTlmN2IwNTJiMjhiYSIsImlhdCI6MTY4MTU3MTkzOH0.on_SjQByjaFFnXUjUfdwikW9pfLCIWErN8iSmZ3V-d8`
        );
        const { done } = response.data;
        if (done) {
          console.log("Tracking complete");
          console.log(response.data);
        } else {
          console.log("Tracking in progress...");
          setTimeout(checkTrackingStatus, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (uuid) {
      checkTrackingStatus();
    }
  }, [uuid]);

  return <div>Tracking</div>;
};

export default Tracking;
