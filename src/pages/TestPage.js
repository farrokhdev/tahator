import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUList } from "../redux/users";
import { Template } from "../components/Template/Template";
import { useGetUsers } from "../hooks/useUsers";
import { getUsersHandler } from "../components/CrudOprations/UserOprations";

export const TestPage = () => {
  const users = useSelector((state) => state.users);
  const { getUsersList, usersData, usersLoading, usersError, refetch } =
    useGetUsers();

  //   getUsersHandler(getUsersList, users)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUList(getUsersHandler(getUsersList, users)));
  }, []);
  useDispatch();

  console.log(users);
  return <Template>TestPage</Template>;
};
