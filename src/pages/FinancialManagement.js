import React from "react";
import { UsersComp } from "../components/PageComps";
import { FinancialManagementComp } from "../components/PageComps/FinancialManagementComp";
import { Template } from "../components/Template/Template";

export const FinancialManagement = () => {
  return (
    <>
      <Template>
        <FinancialManagementComp />
      </Template>
    </>
  );
};
