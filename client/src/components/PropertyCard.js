import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  //const { price, emi, sqft, address, image, type } = props.property;
  const property = props.property;

  console.log(property);
  return (
    <div className="border rounded-lg p-4 m-4 w-72 cursor-pointer hover:bg-slate-100">
      <Link to={"/property/" + property.id}>
        <img className="w-full h-1/2" src={property.image} alt="Property" />
        <div className="mt-4">
          <p className="text-lg font-semibold">Price: ₹{property.price}</p>
          <p>EMI: ₹{property.emi}</p>
          <p>Sqft: {property.sqft} sqft</p>
          <p>Type: {property.type}</p>
          <p>Address: {property.address}</p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
