import React, { useContext } from "react";
import { store } from "../../../utils/context/store";

export default function DetailUser() {
  const context = useContext(store);
  const { dispatch, state } = context;
  const { detailUser, number } = state;

  return (
    <div>
      <h1>Detail User Number {number}</h1>
      <div>
        <p>{detailUser.name}</p>
        <p>{detailUser.email}</p>
        <p>{detailUser.phone}</p>
      </div>
    </div>
  );
}
