import { Spin } from "antd";

import React, { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { BiBarChartSquare } from "react-icons/bi";
import { useGetOrders } from "../../hooks/useOrder";
import { useGetUsers } from "../../hooks/useUsers";
import { getOrdersHandler } from "../CrudOprations/OrdersOpration";
import { getUsersHandler } from "../CrudOprations/UserOprations";
import { useTranslation } from "react-i18next";

export const DashboardGrids = () => {
  const { t } = useTranslation();

  // USERs
  const { getUsersList, usersLoading, usersError } = useGetUsers();
  const [users, setUsers] = useState([]);
  const [userAmount, setUserAmount] = useState("");

  useEffect(() => {
    getUsersHandler(getUsersList, setUsers);
  }, []);

  useEffect(() => {
    if (users) {
      let sum = 0;
      users?.forEach((item) => {
        sum += parseInt(item.cashWallet, 10);
      });
      setUserAmount(sum);
    }
  }, [users]);

  // ORDERS
  const [orderAmount, setOrderAmount] = useState("");
  const { getOrdersList, ordersData, ordersLoading } = useGetOrders();

  // getAccepted orders
  const [acceptOrder, setAcceptOrder] = useState([]);
  useEffect(() => {
    getOrdersHandler(getOrdersList, setAcceptOrder);
  }, []);

  // getAllOrders
  useEffect(() => {
    getOrdersList();
  }, []);

  useEffect(() => {
    if (ordersData) {
      let sum = 0;
      ordersData?.getOrders?.forEach((item) => {
        sum += item?.cash && parseInt(item?.cash, 10);
      });
      setOrderAmount(sum);
    }
  }, [ordersData]);
  console.log(orderAmount);

  return (
    <div className="dashboard-box">
      <div className="dashboard-item">
        <TbUsers className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.userCounts")}</p>
          <p className="count-item">
            {usersLoading ? (
              <Spin spinning={usersLoading} />
            ) : (
              users?.length + " " + "نفر"
            )}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <BsCurrencyDollar className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.userCashSome")}</p>
          <p className="count-item">
            {usersLoading ? <Spin spinning={usersLoading} /> : userAmount}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <BsCurrencyDollar className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.userBarterSome")}</p>
          <p className="count-item">
            {usersLoading ? <Spin spinning={usersLoading} /> : userAmount}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <BiBarChartSquare className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.acceptedOrders")}</p>
          <p className="count-item">
            {ordersLoading ? (
              <Spin spinning={ordersLoading} />
            ) : (
              acceptOrder?.length
            )}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <BiBarChartSquare className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.BuyOrdersCashSome")}</p>
          <p className="count-item">
            {ordersLoading ? (
              <Spin spinning={ordersLoading} />
            ) : (
              ordersData?.getOrders?.length
            )}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <BsCurrencyDollar className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.BuyOrdersBarterSome")}</p>
          <p className="count-item">
            {ordersLoading ? <Spin spinning={ordersLoading} /> : orderAmount}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <BsCurrencyDollar className="icon icon-bg" />
        <div className="count-box">
          <p>{t("dashboard.BuyOrdersBarterSome")}</p>
          <p className="count-item">
            {ordersLoading ? <Spin spinning={ordersLoading} /> : orderAmount}
          </p>
        </div>
      </div>
    </div>
  );
};
