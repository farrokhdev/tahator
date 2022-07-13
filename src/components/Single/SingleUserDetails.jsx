import { Button, Spin, Tag } from "antd";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router";
import UserImg from "../../assets/images/user-image.jpg";

export const SingleUserDetails = ({ data }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/financia-lmanagement");
  };
  return (
    <>
      <div className="single-wrapper p-20 gap-10">
        <div className="single-content gap-10">
          <div className="user-image">
            <img src={UserImg} alt="" />
          </div>
        </div>
        <div className="single-contents m-t-20">
          <div className="single-content gap-10">
            <span className="f-15">نام کامل :</span>
            <span className="f-15">{data?.fullName}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">نوع :</span>
            <span className="f-15">
              {data?.type === "Real" ? (
                <Tag color={"yellow"}>{"حقیقی"}</Tag>
              ) : (
                <Tag color={"green"}>{"حقیقی"}</Tag>
              )}
            </span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">شماره تماس :</span>
            <span className="f-15">{data?.phoneNumber}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">ایمیل :</span>
            <span className="f-15">{data?.email}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">آدرس :</span>
            <span className="f-15">{data?.address}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">profit :</span>
            <span className="f-15">{data?.profit}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">خدمات :</span>
            <span className="f-15">
              {data?.services?.name?.map((item) => item.value)}
            </span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">شماره حساب :</span>
            <span className="f-15">{data?.creditCardNO}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">کشور :</span>
            <span className="f-15">{data?.country}</span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">موجودی کیف پول نقدی :</span>
            <span className="f-15">
              <CurrencyFormat
                value={data?.cashWallet?.amount}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" ریال"}
              />
            </span>
          </div>
          <div className="single-content gap-10">
            <span className="f-15">موجودی کیف پول تهاتری :</span>
            <span className="f-15">
              <CurrencyFormat
                value={data?.barter?.amount}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" ریال"}
              />
            </span>
          </div>
        </div>
        <div className="single-content gap-10 m-t-20">
          <span className="f-15">درباره کاربر :</span>
          <span className="f-15">{data?.bio}</span>
        </div>
        <div className="single-content gap-10 m-t-40">
          <Button type="primary" onClick={() => navigateTo()}>
            مدیریت مالی
          </Button>
        </div>
      </div>
    </>
  );
};
