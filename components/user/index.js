import React from "react";

export default function ListUserComponent({
  users = [],
  onRowClick = () => {},
  counter = () => {},
  refresh = () => {},
}) {
  return (
    <div>
      <h1>List User</h1>
      <button onClick={() => refresh()}>Refresh</button>
      {users?.map((v) => {
        return (
          <>
            <div key={v.id} style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <p>{v.name}</p>
                <p>{v.email}</p>
                <p>{v.phone}</p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <button onClick={() => onRowClick(v)}>Detail</button>
                <button onClick={() => counter()}>Count</button>
              </div>
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
}
