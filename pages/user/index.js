import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useFetchApi from "../../utils/api/useFetchApi";
import HttpRequest from "../../utils/api/HttpRequest";
import { store } from "../../utils/context/store";
import ListUserComponent from "../../components/user";
import { user } from "../../utils/server-side/endpoint";
import { listUser } from "../../utils/client-side/endpoint-get";
import { routeUser } from "../../utils/router";

export default function ListUser({ users }) {
  const router = useRouter();
  const context = useContext(store);
  const { dispatch, state } = context;
  const { number } = state;
  const [res, fetch] = useFetchApi();
  const [count, setCount] = useState(number);
  const [data, setData] = useState(users);

  useEffect(apiHandler, [res]);
  function apiHandler() {
    let temp;
    switch (res.type) {
      case "get":
        temp = res?.data?.data || {};
        if (res.data) {
          console.log({ temp, res });
          setData(temp);
        }
        break;
      default:
        break;
    }
  }

  //GET client-side render
  const refresh = () => {
    fetch(listUser);
  };

  const onRowClick = (e) => {
    dispatch({ type: "SET", payload: { detailUser: e } });
    router.push(routeUser + `${e.id}`);
  };

  const counter = () => {
    let temp = count ? Number(count) + 1 : 0 + 1;
    setCount(temp);
    dispatch({ type: "SET", payload: { number: temp } });
  };

  return (
    <>
      <ListUserComponent
        users={data}
        onRowClick={onRowClick}
        counter={counter}
        refresh={refresh}
      />
    </>
  );
}

//GET server-side render
export async function getServerSideProps() {
  const response = await HttpRequest.get({ url: user });

  return {
    props: {
      users: response.data,
    },
  };
}
