import React from "react";
import useSWR from "swr";

export interface CarBrandsProps {
  country: "Germany" | "France" | "Italy";
}

export interface MyApiError {
  message: string;
}

export function CarBrands({ country }: CarBrandsProps) {
  const { isValidating, error, data } = useSWR<string[], MyApiError>(
    `/api/cars/${country.toLocaleLowerCase()}`
  );

  return (
    <>
      <h5>Car Brands from {country}</h5>
      {isValidating && !error ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}

      {!data?.length && !isValidating && !error ? (
        <div>No Data to Show</div>
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}
