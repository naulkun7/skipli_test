import CountryCode from "../../assets/CountryCodes.json";

type Props = {};
const Input = (props: Props) => {
  return (
    <form action="submit" className="flex gap-x-4">
      <select name="countryNumber">
        {CountryCode.map((country) => (
          <option key={country.code} value={country.code}>
            {country.code} ({country.dial_code})
          </option>
        ))}
      </select>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </form>
  );
};
export default Input;
