import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "antd";
import { API } from "../../api/servicesApi";
import { MyContext } from "../../State/ContextState";
import { MyContextCal } from "../../State/ContextStateCal";
import axios from "axios";
const useFuncition = () => {
  const { typecar, settypercar } = useContext(MyContext);
  const { brand, setbrand } = useContext(MyContext);
  const { model, setmodel } = useContext(MyContext);
  const { caryear, setcaryear } = useContext(MyContext);
  const { modeldetail, setmodeldetail } = useContext(MyContext);
  const { price, setprice } = useContext(MyContext);
  const { isFormCardVisible, setIsFormCardVisible } = useContext(MyContext);
  const { typecarID, settypecarID } = useContext(MyContext);
  const { brandID, setbrandID } = useContext(MyContext);
  const { modelID, setmodelID } = useContext(MyContext);
  const { caryearID, setcaryearID } = useContext(MyContext);
  const { BrandCode, setBrandCode } = useContext(MyContext);
  const { canSelecterbrand, setcanSelecterbrand } = useContext(MyContext);
  const { canSelectermodel, setcanSelectermodel } = useContext(MyContext);
  const { canSelectercaryear, setcanSelectercaryear } = useContext(MyContext);
  const { canSelectermodeldetail, setcanSelectermodeldetail } =
    useContext(MyContext);
  const { isLinkDisabled, setIsLinkDisabled } = useContext(MyContext);
  const { canCalculate, setCanCalculate } = useContext(MyContextCal);
  const { lockRegistioncaryear, setlockRegistioncaryear } =
    useContext(MyContext);
  const { statusSpecialLTV, setstatusSpecialLTV } = useContext(MyContextCal);
  const [modeldetailID, setmodeldetailID] = useState("");
  const fecthTypeproduct = async () => {
    try {
      const res = await axios.get(` http://localhost:3001/typecar`);
      settypercar(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangetypecar = async (value) => {
    try {
      const data = await axios.get(
        ` http://localhost:3001/brand?CAR_TYPE_CODE=${value}`
      );
      await settypecarID(value);
      setbrand(data.data.resultElements);
      if (value !== brandID) {
        setmodel([]);
        setcaryear([]);
        setmodeldetail([]);
        setprice([]);
      }
      if (typecarID !== value) {
        setcanSelecterbrand(true);
        setcanSelectermodel(false);
        setcanSelectercaryear(false);
        setcanSelectermodeldetail(false);
        setIsLinkDisabled(false);
        setlockRegistioncaryear(false);
        setstatusSpecialLTV(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangebrand = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/brand?CAR_TYPE_CODE=${typecarID}&&BN_CODE=${value}`
      );
      setbrandID(value);
      await setmodel(data.data.resultElements2);
      if (brandID !== value) {
        setcanSelectermodel(true);
        setcanSelectercaryear(false);
        setcanSelectermodeldetail(false);
        setIsLinkDisabled(false);
        setlockRegistioncaryear(false);
        setcaryear([]);
        setmodeldetail([]);
        setprice([]);
        setstatusSpecialLTV(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangemodel = async (value) => {
    try {
      const data = await axios.get(
        ` http://localhost:3001/year?MD_NAME=${value} `
      );
      await setcaryear(data.data);
      setmodelID(value);
      setBrandCode(model[0].BnCode);
      if (modelID !== value) {
        setcanSelectercaryear(true);
        setcanSelectermodeldetail(false);
        setIsLinkDisabled(false);
        setlockRegistioncaryear(false);
        setmodeldetail([]);
        setprice([]);
        setstatusSpecialLTV(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangecaryear = async (value) => {
    try {
      const data = await axios.get(
        `     http://localhost:3001/Model_detail?MD_NAME=${modelID}&&CAR_YEAR=${value} `
      );
      await setmodeldetail(data.data);
      setcaryearID(value);
      if (caryearID !== undefined) {
        setcanSelectermodeldetail(true);
        setIsLinkDisabled(false);
        setprice([]);
        setlockRegistioncaryear(true);
        setstatusSpecialLTV(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangemodeldetail = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/price?MDDT_CODE=${value}&&CAR_YEAR=${caryearID}`
      );
      const { arrTotal } = response.data;
      await setmodeldetailID(value);
      await setprice(arrTotal);
      checkDisableLink();
      setstatusSpecialLTV(false);
    } catch (error) {
      console.log(error);
    }
    if (price !== null) {
      scrollToBottom();
    }
  };

  const checkDisableLink = () => {
    if (modeldetail == []) {
      setIsLinkDisabled(false);
    } else {
      setIsLinkDisabled(true);
    }
  };
  function scrollToBottom() {
    const scrollAmount = 500;
    const scrollDuration = 1000;
    let startTime;
    const startScrollY = window.scrollY;
    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const scrollY = easeInOutQuad(
        progress,
        startScrollY,
        scrollAmount,
        scrollDuration
      );

      window.scrollTo(0, scrollY);

      if (progress < scrollDuration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  return {
    typecar,
    brand,
    brandID,
    BrandCode,
    model,
    modelID,
    caryear,
    caryearID,
    lockRegistioncaryear,
    modeldetail,
    price,
    fecthTypeproduct,
    onChangetypecar,
    onChangebrand,
    onChangemodel,
    onChangecaryear,
    onChangemodeldetail,
    canSelecterbrand,
    canSelectermodel,
    canSelectercaryear,
    canSelectermodeldetail,
    isLinkDisabled,
    isFormCardVisible,
    setIsFormCardVisible,
    setcanSelecterbrand,
    setcanSelectermodel,
    setcanSelectercaryear,
    setcanSelectermodeldetail,
    settypecarID,
    setCanCalculate,
    setlockRegistioncaryear,
    modeldetailID,
  };
};

export default useFuncition;
