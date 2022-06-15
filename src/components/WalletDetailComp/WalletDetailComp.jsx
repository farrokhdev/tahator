import React, { useEffect, useState } from "react";
import { DetailsTopBox } from "../Globals/DetailsTopBox";
import { WalletTopBox } from "../Globals/WalletTopBox";
import { Card, Col, message, Row, Spin } from "antd";
import { useEditUser, useGetUser } from "../../hooks/useUsers";
import { useParams, useLocation } from "react-router-dom";
import IncreamentWalletModal from "../modals/IncreamentWalletModal";
import { IncreaseWalletForm } from "../Forms/IncreaseWalletForm";
import UserCallsComp from "../UesrCalls/UserCallsComp";
import DecreamentWalletModal from "../modals/DecreamentWalletModal";
import { DecreamentWalletForm } from "../Forms/DecreamentWalletForm";

export const WalletDetailComp = () => {
  const {
    getSingleUser,
    singleUserData,
    singleUserLoading,
    singleUserError,
    singleRefetch,
  } = useGetUser();

  const { updateUser, editData, editLoading, editError, editRefetch } =
    useEditUser();

  let { id } = useParams();

  useEffect(() => {
    getSingleUser({ variables: { id: id } });
  }, []);

  const edit = (value) => {
    try {
      updateUser({
        variables: {
          userId: singleUserData?.getUser?._id,
          fullName: singleUserData?.getUser?.fullName,
          phoneNumber: singleUserData?.getUser?.phoneNumber,
          wallet: value.wallet,
        },
      }).then(() => {
        message.success("کاربر با موفقیت بروزرسانی شد");
        closeModal();
        singleRefetch();
      });
    } catch (err) {
      console.log(err);
      message.error(
        editError?.message ? editError?.message : "بروزرسانی با خطا مواجه شد"
      );
    }
  };

  // modal handler
  const [walletModal, setWalletModal] = useState(false);
  const openModal = () => {
    setWalletModal(true);
  };
  const closeModal = () => {
    setWalletModal(false);
  };
  // modal handler end

  return (
    <>
      {/* INCREAMENT MODAL  */}
      <IncreamentWalletModal
        visible={walletModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        {singleUserLoading ? (
          <>
            <Spin spinning={singleUserLoading} />
          </>
        ) : (
          <IncreaseWalletForm
            wallet={singleUserData?.getUser?.wallet}
            onFinish={edit}
          />
        )}
      </IncreamentWalletModal>
      {/* INCREAMENT MODAL  */}
      {/* DECREAMENT MODAL  */}
      <DecreamentWalletModal
        visible={walletModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        {singleUserLoading ? (
          <>
            <Spin spinning={singleUserLoading} />
          </>
        ) : (
          <DecreamentWalletForm
            wallet={singleUserData?.getUser?.wallet}
            onFinish={edit}
          />
        )}
      </DecreamentWalletModal>
      {/* DECREAMENT MODAL  */}

      <DetailsTopBox />
      <WalletTopBox openModal={openModal} />
      <Row gutter={0}>
        <Col span={24}>
          <Card title="اطلاعات کاربر" bordered={false}>
            {singleUserLoading ? (
              <Row>
                <Col>
                  <Spin spinning={singleUserLoading} />
                </Col>
              </Row>
            ) : (
              <>
                <Row className="gap-10">
                  <Col>
                    <Card>
                      <div className="flex-row-center gap-10">
                        <div className="label">نام کاربری :</div>
                        <div className="text">
                          {singleUserData?.getUser?.username}
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className="flex-row-center gap-10">
                        <div className="label">نام کامل :</div>
                        <div className="text">
                          {singleUserData?.getUser?.fullName}
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className="flex-row-center gap-10">
                        <div className="label">شماره تماس :</div>
                        <div className="text">
                          {singleUserData?.getUser?.phoneNumber}
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <div className="flex-row-center gap-10">
                        <div className="label">موجودی کیف پول :</div>
                        <div className="text">
                          {singleUserData?.getUser?.wallet}
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row className="m-t-10" gutter={0}>
                  <Col span={24}>
                    <UserCallsComp />
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
