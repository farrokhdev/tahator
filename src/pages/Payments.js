import React from "react";
import PaymentsComp from "../components/Payments/PaymentsComp";
import DefaultTable from "../components/Table/DefaultTable";
import { Template } from "../components/Template/Template";

export const Payments = () => {
  return (
    <>
      <Template>
        <PaymentsComp />
      </Template>
    </>
  );
};
