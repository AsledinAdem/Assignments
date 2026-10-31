export type Country = { name: string; code: string; dialCode: string };

type CountryCodesResponse = {
  error?: boolean;
  data?: Array<{
    name?: string;
    code?: string;
    dial_code?: string;
  }>;
};

// used if the API is down, so the form still works
export const DEFAULT_COUNTRIES: Country[] = [
  { name: "Lebanon", code: "LB", dialCode: "+961" },
];

let cache: Country[] | null = null; // so we only call the API once

export async function fetchCountries(): Promise<Country[]> {
  if (cache) return cache;

  const res = await fetch(
    "https://countriesnow.space/api/v0.1/countries/codes",
  );
  if (!res.ok) throw new Error("Could not load countries");
  const response: CountryCodesResponse = await res.json();
  if (response.error || !Array.isArray(response.data)) {
    throw new Error("Invalid country list");
  }

  const list: Country[] = response.data
    .filter(
      (country): country is { name: string; code: string; dial_code: string } =>
        Boolean(country.name && country.code && country.dial_code),
    )
    .map((country) => ({
      name: country.name,
      code: country.code,
      dialCode: country.dial_code,
    }));

  if (list.length === 0) throw new Error("Country list is empty");

  if (!list.some((country) => country.code === "LB")) {
    list.push(DEFAULT_COUNTRIES[0]);
  }
  list.sort((a, b) => a.name.localeCompare(b.name));

  cache = list;
  return list;
}
