import React, { useState, useEffect } from "react";

interface Country {
  name: { common: string };
  currencies: { [key: string]: { name: string } }; // Структура для данных о валюте
}

export const Converter: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  // Функция для получения данных о странах и валютах
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,currencies"
      );
      const data: Country[] = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Ошибка загрузки стран:", error);
    }
  };

  // Запрос на список стран при загрузке компонента
  useEffect(() => {
    fetchCountries();
  }, []);

  // Обновление валюты при выборе страны
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find(
        (country) => country.name.common === selectedCountry
      );
      if (country && country.currencies) {
        const currencyKey = Object.keys(country.currencies)[0];
        setSelectedCurrency(country.currencies[currencyKey].name);
      }
    } else {
      setSelectedCurrency("");
    }
  }, [selectedCountry, countries]);

  return (
    <div className="converter">
      <label htmlFor="country-select">Выберите страну:</label>
      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">-- Выберите страну --</option>
        {countries.map((country, index) => (
          <option key={index} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>

      <div>
        <strong>Валюта:</strong> {selectedCurrency || "Не выбрана"}
      </div>
    </div>
  );
};
