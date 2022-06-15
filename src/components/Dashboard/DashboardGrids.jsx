import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import {
  GetCallLogsStep,
  GetReservesCall,
  GetSettlementRequests,
  GetUsers,
  GetUsersAmountBlocked,
  GetUsersEnable,
  GetUsersPayments,
  GetUsersUsername,
  GetUsersWallet,
} from "../../hooks/useDashboard";
import { commaSeparateNumber } from "../../lib/commaSeprator";

export const DashboardGrids = () => {
  // ENABLE USERS
  const { errorUsersEnable, usersEnable, loadingUsersEnable } =
    GetUsersEnable();
  // ENABLE USERS

  // GET USERS
  const { errorUsers, users, loadingUsers } = GetUsers();
  // GET USERS

  // GET USER PAYMENTS
  const { errorUsersPayments, usersPayments, loadingUsersPayments } =
    GetUsersPayments();
  const [countDepositAmount, setCountDepositAmount] = useState(0);

  console.log(usersPayments);

  useEffect(() => {
    if (usersPayments) {
      let sum = 0;
      usersPayments?.getPayments?.forEach((item) => {
        sum += item.amount;
      });
      setCountDepositAmount(commaSeparateNumber(sum));
    }
  }, []);
  // GET USER PAYMENTS

  // GET CALL LOG STEPS
  const { errorCallLogsStep, callLogsStep, loadingCallLogsStep } =
    GetCallLogsStep();
  // GET CALL LOG STEPS
  // GetReservesCall
  const { errorReservesCall, reservesCall, loadingReservesCall } =
    GetReservesCall();
  // GetReservesCall

  // GetSettlementRequests
  const {
    errorSettlementRequests,
    settlementRequests,
    loadingSettlementRequests,
  } = GetSettlementRequests();
  const [countWithdrawalAmount, setCountWithdrawalAmount] = useState(0);

  useEffect(() => {
    if (settlementRequests) {
      let sum = 0;
      settlementRequests?.getSettlementRequests?.forEach((item) => {
        sum += parseInt(item.amount, 10);
      });
      setCountWithdrawalAmount(commaSeparateNumber(sum));
    }
  }, [settlementRequests]);
  // GetSettlementRequests

  // GetUsersAmountBlocked
  const {
    errorUsersAmountBlocked,
    usersAmountBlocked,
    loadingUsersAmountBlocked,
  } = GetUsersAmountBlocked();
  // GetUsersAmountBlocked

  // GetUsersUsername
  const { errorUsersUsername, usersUsername, loadingUsersUsersUsername } =
    GetUsersUsername();
  // GetUsersUsername

  // GetUsersWallet
  const { errorUsersWallet, usersWallet, loadingUsersWallet } =
    GetUsersWallet();
  const [countWalletAmount, setCountWalletAmount] = useState(0);

  useEffect(() => {
    if (usersWallet) {
      let sum = 0;
      usersWallet?.getUsers?.forEach((item) => {
        sum += item.wallet;
      });
      setCountWalletAmount(commaSeparateNumber(sum));
    }
  }, [usersWallet]);
  // GetUsersWallet

  console.log(users);
  return (
    <div className="dashboard-box">
      <div className="dashboard-item">
        <FaUsers className="icon icon-admin" />
        <div className="count-box">
          <p> تعداد مدیران</p>
          <p className="count-item"> 1200</p>
        </div>
      </div>
      <div className="dashboard-item">
        <TbUsers className="icon icon-user" />
        <div className="count-box">
          <p> تعداد کاربران</p>
          <p className="count-item">{users?.getUsers?.lenth || 0}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-active-user" />
        <div className="count-box">
          <p>تعداد کاربران فعال</p>
          <p className="count-item"> {usersEnable?.getUsers?.length || 0}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-deactiveuser" />
        <div className="count-box">
          <p> تعداد کاربران غیر فعال</p>
          <p className="count-item"> {usersEnable?.getUsers?.length || 0}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-payment" />
        <div className="count-box">
          <p> تعداد تراکنش واریزی</p>
          <p className="count-item">
            {usersPayments?.getPayments?.length || 0}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-count" />
        <div className="count-box">
          <p> جمع مبلغ واریز شده</p>
          <p className="count-item"> {countDepositAmount || 0}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-settlement" />
        <div className="count-box">
          <p> تعداد تراکنش برداشتی</p>
          <p className="count-item">
            {" "}
            {settlementRequests?.getSettlementRequests?.length || 0}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-count-amount" />
        <div className="count-box">
          <p>جمع مبلغ برداشت شده</p>
          <p className="count-item"> {countWithdrawalAmount || 0}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-count-wallet" />
        <div className="count-box">
          <p>مبالغ موجود در کیف پول کاربران</p>
          <p className="count-item"> {countWalletAmount || 0}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-calls" />
        <div className="count-box">
          <p>تعداد تماس های برقرار شده</p>
          <p className="count-item">
            {callLogsStep?.listCallLogs?.length || 0}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-reserved" />
        <div className="count-box">
          <p> تعداد تماس های رزرو شده</p>
          <p className="count-item">
            {" "}
            {reservesCall?.getReserves?.length || 0}
          </p>
        </div>
      </div>
      <div className="dashboard-item">
        <FaUsers className="icon icon-blocked" />
        <div className="count-box">
          <p>مبالغ بلاک شده</p>
          <p className="count-item">
            {usersAmountBlocked?.getUsers?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};
