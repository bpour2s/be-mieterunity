// utils/geocode.js
import axios from "axios";

const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";

/**
 * Geokodiert eine Adresse und gibt die lat/lon zurück.
 * @param {string} street
 * @param {string} houseNr
 * @param {string} postalCode
 * @param {string} city
 * @param {string} country
 * @returns {Object} { lat, lon }
 */
export const geocodeAddress = async (street, houseNr, postalCode, city, country) => {
  const addressString = `${street}, ${houseNr}, ${postalCode}, ${city}, ${country}`;

  try {
    const response = await axios.get(NOMINATIM_API_URL, {
      params: {
        q: addressString,
        format: "json",
        addressdetails: 1,
        limit: 1,
        "User-Agent": "Mieterunity/1.0 (bahmanhmilani@googlemail.com)",
      },
    });

    if (response.data.length === 0) {
      throw new Error("Adresse konnte nicht geokodiert werden.");
    }

    const { lat, lon } = response.data[0];
    return { lat, lon };

  } catch (error) {
    console.error("Fehler bei der Geokodierung:", error.message);
    throw new Error("Fehler bei der Geokodierung.");
  }
};
