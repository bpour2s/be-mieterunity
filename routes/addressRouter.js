

import { Router } from "express";
import ErrorResponse from '../utils/ErrorResponse.js'
import axios from 'axios';
import AddressModel from "../models/AddressModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

const addressRouter = Router();

//Hilfsfunktion die eine Adresse entgegennimmt 

const geocodeAddress = async (street, houseNr, postalCode, city, country) => {
  // Kombiniere die Adresse in einem String
  const addressQuery = `${street} ${houseNr} ${postalCode} ${city} ${country}`;

  // Stelle sicher, dass der String korrekt URL-kodiert wird
  const encodedQuery = encodeURIComponent(addressQuery);

  // Baue die URL für den Nominatim API Aufruf
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&addressdetails=1&limit=1`;

  try {
    // Warte 1 Sekunde zwischen den Anfragen, um das Rate Limit zu respektieren
    await sleep(1000);

    // Sende die Anfrage an die Nominatim API
    const response = await axios.get(nominatimUrl, {
      headers: {
        "User-Agent": "MieterUnity/1.0 (bahmanhmilani@googlemail.com)"
      }
    });

    if(!response.data){
      throw new ErrorResponse("Keine Daten gefunden!", 400)
    }
    // Überprüfe, ob Ergebnisse zurückgegeben wurden
    if (response.data && response.data.length > 0) {
      // Wähle das erste Ergebnis und extrahiere die Koordinaten
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error("Adresse konnte nicht geokodiert werden");
    }
  } catch (error) {
    console.error("Fehler bei der Geokodierung:", error.message);
    throw new Error("Geocoding failed: " + error.message);
  }
};

// Helferfunktion für sleep (um das Rate-Limit einzuhalten)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


addressRouter.get("/", getAll(AddressModel));
addressRouter.get("/:id", getOneById(AddressModel));
//addressRouter.post("/", createOne(AddressModel));
// POST-Route zum Erstellen einer neuen Adresse mit Geokodierung
addressRouter.post("/", async (req, res) => {
  const { street, houseNr, postalCode, city, country } = req.body;

  try {
    // Geokodierung der Adresse
    const { lat, lon } = await geocodeAddress(street, houseNr, postalCode, city, country);

  

    // Neue Adresse in der Datenbank speichern
    const newAddress = new AddressModel({
      street,
      houseNr,
      postalCode,
      city,
      country,
      lat,
      lon,
    });

  // Überprüfen, ob die Adresse bereits existiert
   const existingAddress = await AddressModel.findOne({
     street,
     houseNr,
     postalCode,
     city,
     country,
   });

 
   if (existingAddress) {
     throw new ErrorResponse("Diese Adresse existiert bereits.", 400);
   }

   
 
    const savedAddress = await newAddress.save();

    // Erfolgsantwort
    res.status(201).json({
      message: "Address created and geocoded successfully",
      savedAddress,
    });
  } catch (error) {
    // Fehlerbehandlung bei Geokodierung
    res.status(400).json({ message: error.message });
    
  }
});

// PUT-Route zum Aktualisieren einer Adresse mit Geokodierung
addressRouter.put("/:id", async (req, res) => {
  const { street, houseNr, postalCode, city, country } = req.body;

  try {
    // Geokodierung der Adresse
    const { lat, lon } = await geocodeAddress(street, houseNr, postalCode, city, country);

    // Aktualisierung der Adresse in der Datenbank
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      req.params.id,
      { street, houseNr, postalCode, city, country, lat, lon },
      { new: true }
    );

    // Erfolgsantwort
    res.status(200).json({
      message: "Address updated and geocoded successfully",
      updatedAddress,
    });
  } catch (error) {
    // Fehlerbehandlung bei Geokodierung
    res.status(400).json({ message: error.message });
  }
});

addressRouter.put("/:id", updateOne(AddressModel));
addressRouter.delete("/:id", deleteOne(AddressModel));

export default addressRouter;



