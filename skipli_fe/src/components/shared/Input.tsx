import { ChangeEvent } from "react";

import CountryCode from "../../assets/CountryCodes.json";

type Props = {
  type: string;
  value?: string;
  setValue?: (value: any) => void;
  countryCode?: string;
  setCountryCode?: (countryCode: string) => void;
  placeholder?: string;
  options?: string[];
};

const Input = ({
  type,
  value,
  setValue,
  countryCode,
  setCountryCode,
  placeholder,
  options,
}: Props) => {
  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (setCountryCode) {
      setCountryCode(e.target.value);
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
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
      {type === "select" && options && (
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={value}
          onChange={handleSelectChange}
        >
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {type === "text" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder={placeholder}
          value={value}
          onChange={handleValueChange}
        />
      )}
    </>
  );
};
export default Input;
