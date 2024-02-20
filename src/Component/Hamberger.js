// Hambergers.js
import React, { useEffect, useContext } from "react";
import { Button } from "antd";
import "../styles/Hamberger.css";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { MyContextType } from "../State/ContextTypeCode";
import useFuncitionCal from "./Func/FuncitionCal";

const Hambergers = ({ onClose }) => {
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  const { handleReset } = useFuncitionCal();
  let navigate = useNavigate();
  const handleOutsideClick = () => {
    onClose();
  };
  const handleMenuClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".pagehamberger")) {
        handleOutsideClick();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const SetStateMenu = async (value) => {
    setContractTyperCode(value);
    localStorage.setItem("contractTypeCode", value);
  };

  const CheckDataToSendPage = (ContractMenu) => {
    if (ContractMenu === "01" || ContractMenu === "10") {
      navigate("/CarLoans");
      window.location.reload();
    } else {
      navigate("/PU-NanoLoans");
      window.location.reload();
    }
    handleReset();
  };
  useEffect(() => {
    const storedContractTypeCode = localStorage.getItem("contractTypeCode");
    if (storedContractTypeCode) {
      setContractTyperCode(storedContractTypeCode);
    }
  }, []);

  return (
    <>
      <div className={`pagehamberger show`}>
        <div className="bodyHamberger">
          <div className="HeadbodyHamberger">
            {window.innerWidth <= 1200 && (
              <CloseOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                }}
                onClick={handleMenuClose}
              />
            )}
          </div>
          <div className="itemhamberger">
            <button
              onClick={() => {
                SetStateMenu("10");
                CheckDataToSendPage("10");
              }}
            >
              Personal Secured Loan(PL) <br />
              สินเชื่อส่วนบุคคล(มีหลักทรัพย์ค้ำประกัน)
            </button>
            <button
              onClick={() => {
                SetStateMenu("01");
                CheckDataToSendPage("01");
              }}
            >
              Hire Purchase (HP) <br />
              เช่าซื้อ/เงินกู้
            </button>
            <button
              onClick={() => {
                SetStateMenu("09");
                CheckDataToSendPage("09");
              }}
            >
              Personal Unsecured Loan (PU) <br />
              สินเชื่อส่วนบุคคล(ไม่มีหลักประกัน)
            </button>
            <button
              onClick={() => {
                SetStateMenu("08");
                CheckDataToSendPage("08");
              }}
            >
              Nano Finance <br /> สินเชื่อรายย่อยเพื่อการประกอบอาชีพ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hambergers;
