import { ChangeEvent } from "react";

import CountryCode from "../../assets/CountryCodes.json";

type Props = {
  type: string;
  value?: string;
  setValue: (value: any) => void;
  countryCode?: string;
  setCountryCode: (countryCode: string) => void;
};

const Input = ({
  type,
  value,
  setValue,
  countryCode,
  setCountryCode,
}: Props) => {
  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {type === "phone" && (
        <div className="flex gap-10">
          <select
            name="countryNumber"
            onChange={handleCountryCodeChange}
            value={countryCode}
          >
            {CountryCode.map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.code} ({country.dial_code})
              </option>
            ))}
          </select>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your phone number"
            value={value}
            onChange={handleValueChange}
          />
        </div>
      )}
      {type === "email" && (
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your email"
          value={value}
          onChange={handleValueChange}
        />
      )}
      {type === "accessCode" && (
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your access code"
          value={value}
          onChange={handleValueChange}
        />
      )}
    </>
  );
};
export default Input;
