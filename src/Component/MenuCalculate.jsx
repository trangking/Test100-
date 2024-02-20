import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { MyContextType } from "../State/ContextTypeCode";

const MenuCalculate = () => {
  let navigate = useNavigate();
  const [pageIsLeaving, setPageIsLeaving] = useState(false);
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);

  const SetStateMenu = async (value) => {
    setPageIsLeaving(true);
    setContractTyperCode(value);
    localStorage.setItem("contractTypeCode", value);
    setTimeout(() => CheckDataToSendPage(value), 100);
  };

  const CheckDataToSendPage = (ContractMenu) => {
    if (ContractMenu === "01" || ContractMenu === "10") {
      setTimeout(() => {
        navigate("/CarLoans");
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/PU-NanoLoans");
      }, 1000);
    }
  };
  useEffect(() => {
    const storedContractTypeCode = localStorage.getItem("contractTypeCode");
    if (storedContractTypeCode) {
      setContractTyperCode(storedContractTypeCode);
    }
  }, []);

  return (
    <>
      <Form>
        <div className={pageIsLeaving ? "fade-out" : ""}>
          <div>
            <p className="headcal">คำนวณสินเชื่อ</p>
            <p className="headheng ">เฮงลิสซิ่ง</p>
            <p className="formloan">รูปแบบรายการคำขอสินเชื่อ</p>
          </div>
          <div className="boxformloan">
            <div className="boxform1">
              <button
                className="PL"
                size="large"
                onClick={() => {
                  SetStateMenu("10");
                  CheckDataToSendPage("10");
                }}
              >
                Personal Secured Loan(PL)
                <br />
                สินเชื่อส่วนบุคคล(มีหลักทรัพย์ค้ำประกัน)
              </button>
              <button
                className="HP"
                onClick={() => {
                  SetStateMenu("01");
                  CheckDataToSendPage("01");
                }}
              >
                Hire Purchase(HP)
                <br />
                เช่าซื้อ/เงินกู้
              </button>
            </div>
            <div className="boxform2">
              <button
                className="PU"
                onClick={() => {
                  SetStateMenu("09");
                  CheckDataToSendPage("09");
                }}
              >
                Personal Unsecured Loan(PU)
                <br />
                สินเชื่อส่วนบุคคล(ไม่มีหลักประกัน)
              </button>
              <button
                className="NANO"
                onClick={() => {
                  SetStateMenu("08");
                  CheckDataToSendPage("08");
                }}
              >
                Nano Finance
                <br />
                สินเชื่อรายย่อยเพื่อการประกอบอาชีพ
              </button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default MenuCalculate;
