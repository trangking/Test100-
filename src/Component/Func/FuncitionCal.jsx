import { useContext, useEffect, useRef, useState } from "react";
import { Select } from "antd";
import { MyContextCal } from "../../State/ContextStateCal";
import { MyContext } from "../../State/ContextState";
import { MyContextType } from "../../State/ContextTypeCode";
import { API } from "../../api/servicesApi";
import useFuncition from "./Fuunction";
import moment from "moment";
moment.locale("th");

const useFuncitionCal = () => {
  const { needMoney, setneedMoney } = useContext(MyContextCal);
  const { interestrate, setinterestrate } = useContext(MyContextCal);
  const { setprice } = useContext(MyContext);
  const { validateStatus, setValidateStatus } = useContext(MyContextCal);
  const { validateStatusSelerter, setvalidateStatusSelerter } =
    useContext(MyContextCal);
  const { helpForm, sethelpForm } = useContext(MyContextCal);
  const { helpFormSelecter, sethelpFormSelecter } = useContext(MyContextCal);
  const { checkhelpForm, setcheckhelpForm } = useContext(MyContextCal);
  const { checkhelpFormSelecter, setcheckhelpFormSelecter } =
    useContext(MyContextCal);
  const { installmentPayment, setinstallmentPayment } =
    useContext(MyContextCal);

  const { showdateDay, setshowdateDay } = useContext(MyContextCal);
  const { isFormCardVisible, setIsFormCardVisible } = useContext(MyContext);
  const { Listinstallmentandinterestrate, setListinstallmentandinterestrate } =
    useContext(MyContextCal);
  const { interestrateCode, setInterestrateCode } = useContext(MyContextCal);

  const { RegistrationCarYearID, setRegistrationCarYearID } =
    useContext(MyContextCal);

  const { helpFormSelecterinterestrate, sethelpFormSelecterinterestrate } =
    useContext(MyContextCal);
  const { cardShow, setcardShow } = useContext(MyContextCal);
  const { period, setperiod } = useContext(MyContextCal);

  const {
    validateStatusSelerterinstallment,
    setvalidateStatusSelerterinstallment,
  } = useContext(MyContextCal);
  const {
    checkhelpFormSelecterinstallment,
    setcheckhelpFormSelecterinstallment,
  } = useContext(MyContextCal);
  const { helpFormSelecterinstallment, sethelpFormSelecterinstallment } =
    useContext(MyContextCal);
  const {
    validateStatusSelerterinterestrate,
    setvalidateStatusSelerterinterestrate,
  } = useContext(MyContextCal);
  const {
    checkhelpFormSelecterinterestrate,
    setcheckhelpFormSelecterinterestrate,
  } = useContext(MyContextCal);

  const { canCalculate, setCanCalculate } = useContext(MyContextCal);
  const { sentInstallmentandinterestrate, setsentInstallmentandinterestrate } =
    useContext(MyContextCal);
  const { index, setindex } = useContext(MyContextCal);
  const { initialSlideIndex, setinitialSlideIndex } = useContext(MyContextCal);
  const { resetCounter, setResetCounter } = useContext(MyContextCal);
  const { canSelecterbrand, setcanSelecterbrand } = useContext(MyContext);
  const { canSelectermodel, setcanSelectermodel } = useContext(MyContext);
  const { canSelectercaryear, setcanSelectercaryear } = useContext(MyContext);
  const { canSelectermodeldetail, setcanSelectermodeldetail } =
    useContext(MyContext);
  const { typecar, BrandCode, price, caryearID } = useFuncition();
  const { isLinkDisabled, setIsLinkDisabled } = useContext(MyContext);
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  const { lockinstallmentPayment, setlockinstallmentPayment } =
    useContext(MyContextCal);
  const { lockinteresrate, setlockinteresrate } = useContext(MyContextCal);
  const { statusSpecialLTV, setstatusSpecialLTV } = useContext(MyContextCal);

  const onChangeneedmoney = (value) => {
    try {
      setneedMoney(value);
      if (statusSpecialLTV === false) {
        if (value > price.total) {
          setValidateStatus("warning");
          setcheckhelpForm("warning");
          setIsFormCardVisible(false);
          setCanCalculate(false);
          setneedMoney(0);
        } else if (value === 0) {
          setValidateStatus("error");
          setcheckhelpForm("error");
          setIsFormCardVisible(false);
          setCanCalculate(false);
        } else if (value === null) {
          setValidateStatus("error");
          setcheckhelpForm("error");
          setIsFormCardVisible(false);
          setCanCalculate(false);
        } else {
          setValidateStatus("success");
          setcheckhelpForm("success");
          sethelpForm("");
        }
      } else if (statusSpecialLTV === true) {
        if (value > price.totalforExtra) {
          setValidateStatus("warning");
          setcheckhelpForm("warning");
          setIsFormCardVisible(false);
          setCanCalculate(false);
          setneedMoney(0);
        } else if (value === 0) {
          setValidateStatus("error");
          setcheckhelpForm("error");
          setIsFormCardVisible(false);
          setCanCalculate(false);
        } else if (value === null) {
          setValidateStatus("error");
          setcheckhelpForm("error");
          setIsFormCardVisible(false);
          setCanCalculate(false);
        } else {
          setValidateStatus("success");
          setcheckhelpForm("success");
          sethelpForm("");
        }
      } else {
        setValidateStatus("error");
        setcheckhelpForm("error");
        setIsFormCardVisible(false);
        setCanCalculate(false);
        sethelpForm("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
    } catch (error) {
      console.error("An error occurred in onChangeneedmoney:", error);
    }
  };

  const formatDate = (year) => {
    const numericYear = parseInt(year, 10);

    if (!isNaN(numericYear)) {
      // ตรวจสอบว่า year เป็นปีทางทิศเหนือ (CE) หรือไม่
      // ถ้าไม่ใช่ ต้องปรับปีนั้นให้ถูกต้องก่อน
      const buddhistYear = numericYear + 543;
      return `${buddhistYear}`;
    } else {
      // กรณีที่ year ไม่สามารถแปลงเป็นเลขจำนวนเต็มได้
      return "Invalid Year";
    }
  };

  const generateOptions = (caryearID) => {
    const currentYearCE = new Date().getFullYear();
    const options = [];

    for (let year = caryearID; year <= currentYearCE; year++) {
      const formattedYear = formatDate(year);
      options.push(
        <Select.Option key={year} value={year}>
          {formattedYear}
        </Select.Option>
      );
    }

    return options;
  };

  const onChangeListinstallmentandinterestrate = async (value) => {
    try {
      if (value !== RegistrationCarYearID) {
        setInterestrateCode([]);
        setinstallmentPayment(0);
        setinterestrate(0);
        setIsFormCardVisible(false);
        setlockinteresrate(false);
      }
      if (value > 0) {
        setlockinstallmentPayment(true);
        setvalidateStatusSelerter("success");
        setcheckhelpFormSelecter("success");
        sethelpFormSelecter("");
      } else {
      }

      setRegistrationCarYearID(value);
      setListinstallmentandinterestrate(mookupinstallpayment);
    } catch (err) {
      console.log(err);
    }
  };
  const dataListinstallmentandinsterrest = () => {
    const updatedList = mookupinstallpayment.map((installmentItem) => {
      return {
        installmentPayment: installmentItem.qty,
        interestRate: interestrate,
      };
    });

    setListinstallmentandinterestrate(updatedList);
  };

  const onChangeinstallmentPayment = async (value) => {
    try {
      setperiod(value);
      // setInterestrateCode([data.data]);
      setinstallmentPayment(value);
      setindex(value);
      if (value > 0) {
        setlockinteresrate(true);
        setvalidateStatusSelerterinstallment("success");
        setcheckhelpFormSelecterinstallment("success");
        sethelpFormSelecterinstallment("");
      }
      if (value !== installmentPayment) {
        setIsFormCardVisible(false);
        setinterestrate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataAndConvert = async () => {
    for (let i = 0; i < sentInstallmentandinterestrate.length; i++) {
      const value = sentInstallmentandinterestrate[i].installmentPayment;

      try {
        const data = await API.requisition.getinterestrate(
          ContractTypeCode,
          typecar,
          BrandCode,
          RegistrationCarYearID,
          value,
          needMoney,
          price,
          statusSpecialLTV
        );

        sentInstallmentandinterestrate[i] = {
          installmentPayment: value,
          interestRate: data.data.interestRate,
        };
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onChangeinterestrate = (value) => {
    setinterestrate(value);
    if (value > 0) {
      setvalidateStatusSelerterinterestrate("success");
      setcheckhelpFormSelecterinterestrate("success");
      sethelpFormSelecterinterestrate("");
    }
    if (value !== interestrate) {
      setIsFormCardVisible(false);
    }
    dataListinstallmentandinsterrest();
  };
  const handleReset = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const checkcal = () => {
    if (
      needMoney !== 0 &&
      RegistrationCarYearID !== 0 &&
      installmentPayment !== 0 &&
      interestrate !== 0
    ) {
      setCanCalculate(true);
    }
  };
  const mookupinstallpayment = [
    { qty: 12, qtyname: "12" },
    { qty: 18, qtyname: "18" },
    { qty: 20, qtyname: "20" },
    { qty: 24, qtyname: "24" },
    { qty: 30, qtyname: "30" },
    { qty: 32, qtyname: "32" },
    { qty: 36, qtyname: "36" },
    { qty: 42, qtyname: "42" },
    { qty: 48, qtyname: "48" },
    { qty: 52, qtyname: "52" },
    { qty: 60, qtyname: "60" },
    { qty: 66, qtyname: "66" },
    { qty: 72, qtyname: "72" },
    { qty: 84, qtyname: "84" },
  ];
  const mookupinterestrate = [
    { value: 20, label: "20" },
    { value: 25, label: "25" },
  ];
  useEffect(() => {
    checkcal();
  }, [needMoney, RegistrationCarYearID, installmentPayment, interestrate]);
  useEffect(() => {
    dataListinstallmentandinsterrest();
  }, [interestrate]);

  return {
    needMoney,
    BrandCode,
    RegistrationCarYearID,
    Listinstallmentandinterestrate,
    interestrateCode,
    installmentPayment,
    interestrate,
    period,
    index,
    sentInstallmentandinterestrate,
    validateStatus,
    checkhelpForm,
    helpForm,
    validateStatusSelerter,
    checkhelpFormSelecter,
    helpFormSelecter,
    validateStatusSelerterinstallment,
    checkhelpFormSelecterinstallment,
    helpFormSelecterinstallment,
    validateStatusSelerterinterestrate,
    checkhelpFormSelecterinterestrate,
    helpFormSelecterinterestrate,
    cardShow,
    initialSlideIndex,
    showdateDay,
    canCalculate,
    isLinkDisabled,
    resetCounter,
    lockinstallmentPayment,
    setlockinstallmentPayment,
    lockinteresrate,
    setlockinteresrate,
    onChangeneedmoney,
    onChangeListinstallmentandinterestrate,
    onChangeinstallmentPayment,
    onChangeinterestrate,
    generateOptions,
    formatDate,
    dataListinstallmentandinsterrest,
    fetchDataAndConvert,
    handleReset,
    statusSpecialLTV,
    setstatusSpecialLTV,
    setcheckhelpForm,
    setValidateStatus,
    sethelpForm,
    mookupinstallpayment,
    mookupinterestrate,
  };
};

export default useFuncitionCal;
