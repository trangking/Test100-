import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useContext,
} from "react";
import "../../styles/HengStyles.css";
import {
  Form,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Modal,
  ConfigProvider,
  Image,
  Checkbox,
} from "antd";
import useFuncition from "../Func/Fuunction";
import useFuncitionCal from "../Func/FuncitionCal";
import useValidateStaus from "../Func/Validate";
import { SyncOutlined } from "@ant-design/icons";
import { API } from "../../api/servicesApi";
import moment from "moment";
import "moment/locale/th";
import "../../styles/tableLoan.css";
import "../../styles/ShowCard.css";
import dayjs from "dayjs";
import "dayjs/locale/th";
import locale from "antd/es/locale/th_TH";
import { MyContext } from "../../State/ContextState";
import { MyContextType } from "../../State/ContextTypeCode";
import hengloading from "../../img/HengWallpaper.png";
dayjs.locale("th");
moment.locale("th");

const Cardpricelist = React.lazy(() => import("./CardShowPrice"));
const Popupmodeldeail = React.lazy(() => import("./Popupmodeldetail"));

const HeadderHp = () => {
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  let TitleHead = "";

  if (ContractTypeCode === "10") {
    TitleHead = (
      <>
        Personal Secured Loan(PL)
        <br />
        สินเชื่อส่วนบุคคล(มีหลักทรัพย์ค้ำประกัน)
      </>
    );
  } else if (ContractTypeCode === "01") {
    TitleHead = "Hire Purchase(HP) เช่าซื้อ/เงินกู้";
  }
  return (
    <div>
      <h1>คำนวณสินเชื่อ</h1>
      <h2>{TitleHead}</h2>
    </div>
  );
};
const SelectorHP = () => {
  const [initialSlideIndex, setinitialSlideIndex] = useState(0);
  const [loadings, setLoadings] = useState([]);
  const [form] = Form.useForm();
  const [cardShow, setcardShow] = useState([]);
  const [nowDay, setnowDay] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [modal1Open, setModal1Open] = useState(false);
  const [lockedDate, setLockedDate] = useState("");
  const calculateButtonRef = useRef(null);
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  const { arrImages, setarrImages } = useContext(MyContext);
  const [resultdata, sentresultdata] = useState(0);
  const {
    typecar,
    brand,
    brandID,
    model,
    caryear,
    modeldetail,
    price,
    caryearID,
    lockRegistioncaryear,
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
    setCanCalculate,
    modelID,
    modeldetailID,
  } = useFuncition();
  const {
    needMoney,
    RegistrationCarYearID,
    Listinstallmentandinterestrate,
    interestrateCode,
    installmentPayment,
    interestrate,
    index,
    sentInstallmentandinterestrate,
    validateStatus,
    helpForm,
    validateStatusSelerter,
    helpFormSelecter,
    validateStatusSelerterinstallment,
    helpFormSelecterinstallment,
    validateStatusSelerterinterestrate,
    helpFormSelecterinterestrate,
    canCalculate,
    resetCounter,
    onChangeneedmoney,
    onChangeListinstallmentandinterestrate,
    onChangeinstallmentPayment,
    onChangeinterestrate,
    generateOptions,
    formatDate,
    dataListinstallmentandinsterrest,
    handleReset,
    lockinstallmentPayment,
    setlockinstallmentPayment,
    lockinteresrate,
    setlockinteresrate,
    statusSpecialLTV,
    setstatusSpecialLTV,
    setcheckhelpForm,
    sethelpForm,
    mookupinstallpayment,
    mookupinterestrate,
  } = useFuncitionCal();

  const { messageHelp, checkCal } = useValidateStaus();
  const changeDatatypecar = (value, brandID) => {
    if (value !== brandID) {
      form.setFieldValue("Car-brand", "กรุณาเลือกยี่ห้อรถ");
      form.setFieldValue("model-car", "กรุณาเลือกรุ่นรถ");
      form.setFieldValue("year", "กรุณาเลือกปีรถ");
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
      setIsFormCardVisible(false);
      setCanCalculate(false);
    }
  };
  const changeDatabrand = (value, brand) => {
    if (brand !== value) {
      form.setFieldValue("model-car", "กรุณาเลือกรุ่นรถ");
      form.setFieldValue("year", "กรุณาเลือกปีรถ");
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
      setIsFormCardVisible(false);
      setCanCalculate(false);
    }
  };
  const changeDatamodel = (value, model) => {
    if (model !== value) {
      form.setFieldValue("year", "กรุณาเลือกปีรถ");
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
      setIsFormCardVisible(false);
      setCanCalculate(false);
    }
  };
  const changeDataCarYear = (value, modeldetail) => {
    if (modeldetail !== value) {
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
      setIsFormCardVisible(false);
      setCanCalculate(false);
    }
  };
  const changemodeldetail = (value) => {
    if (price && price[0] && price[0].ModelDTID) {
      if (value !== price[0].ModelDTID) {
        form.setFieldValue("needmoney", "");
        form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
        form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
        form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        setIsFormCardVisible(false);
        setCanCalculate(false);
        setarrImages([]);
      }
    }
  };
  const showprice = () => {
    if (price && price.PRICE) {
      form.setFieldsValue({
        "exmple-price": price.PRICE,
        "manageable-amount": price.total,
      });
    }
  };
  const SetLTV = () => {
    if (price) {
      if (statusSpecialLTV === false) {
        form.setFieldsValue({
          "manageable-amount": price.totalforExtra,
        });
        setstatusSpecialLTV(true);
        form.setFieldValue("needmoney", "");
        form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
        form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
        form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        setlockinstallmentPayment(false);
        setlockinteresrate(false);
        setcheckhelpForm("success");
        sethelpForm("");
      } else if (statusSpecialLTV === true) {
        setstatusSpecialLTV(false);
        form.setFieldsValue({
          "manageable-amount": price.total,
        });
        form.setFieldValue("needmoney", "");
        form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
        form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
        form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        setlockinstallmentPayment(false);
        setlockinteresrate(false);
        setcheckhelpForm("success");
        sethelpForm("");
      }
    }
  };
  const checkDatainputNeedmoney = (value) => {
    if (statusSpecialLTV === false && price) {
      if (value > price.total) {
        setIsFormCardVisible(false);
        form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
        form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
        form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        if (value > price.total) {
          form.setFieldsValue({
            needmoney: 0,
          });
          form.setFieldValue(
            "RegistrationCarYear",
            "กรุณาเลือกปีที่จดทะเบียนรถ"
          );
          form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
          form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        }
        if (value < 0) {
          form.setFieldsValue({
            needmoney: 0,
          });
          console.log("suscess");
        }
      }
    } else if (statusSpecialLTV === true && price) {
      if (value > price.totalforExtra) {
        setIsFormCardVisible(false);
        form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
        form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
        form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        if (value > price.totalforExtra) {
          form.setFieldsValue({
            needmoney: 0,
          });
          form.setFieldValue(
            "RegistrationCarYear",
            "กรุณาเลือกปีที่จดทะเบียนรถ"
          );
          form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
          form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
        }
      }
    } else {
    }
  };

  const checkRegistrationCarYearID = (value) => {
    if (value !== RegistrationCarYearID) {
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const checkinstallmentPayment = async (value) => {
    if (value !== installmentPayment) {
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const clickToCal = () => {
    try {
      const allInstallments = Listinstallmentandinterestrate.map((item) => {
        const { installmentPayment, interestRate } = item;

        const monthlyInterestRate = interestRate / 12 / 100;
        const numberOfPayments = installmentPayment;

        const installmentAmount =
          (needMoney * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        return {
          installmentPayment,
          interestRate,
          installmentAmount,
        };
      });

      const initialSlideIndex = allInstallments.findIndex(
        (item) => item.installmentPayment === index
      );
      setinitialSlideIndex(initialSlideIndex);
      setcardShow(allInstallments);
      setIsFormCardVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        checkCal();
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 800);
  };
  const indexTocard = () => {
    setTimeout(() => {
      calculateButtonRef.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };
  const reestField = () => {
    form.resetFields();
  };

  useEffect(() => {
    fecthTypeproduct();
    dataListinstallmentandinsterrest();
  }, []);

  useEffect(() => {
    messageHelp();
  }, [messageHelp]);

  useEffect(() => {
    showprice();
  }, [price]);

  useEffect(() => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear() + 1;
    let lockedDay;
    let lockedMonth;
    let lockedYear;
    if (dayOfMonth >= 1 && dayOfMonth <= 5) {
      lockedDay = 5;
      lockedMonth = month + 1;
      lockedYear = year;
    } else if (dayOfMonth >= 6 && dayOfMonth <= 10) {
      lockedDay = 10;
      lockedMonth = month + 1;
      lockedYear = year;
    } else if (dayOfMonth >= 11 && dayOfMonth <= 15) {
      lockedDay = 15;
      lockedMonth = month + 1;
      lockedYear = year;
    } else if (dayOfMonth >= 16 && dayOfMonth <= 31) {
      lockedDay = 3;
      lockedMonth = month + 2;
      lockedYear = year;
    }
    const lockedDate = new Date(lockedYear, lockedMonth - 1, lockedDay);
    const convertedDate = moment(lockedDate, "YYYY-MM-DD").add(542, "years");

    setLockedDate(convertedDate);
  }, []);

  return (
    <>
      <div className="controlinputdata">
        <div className="inputdata">
          <Form form={form}>
            <h3>ข้อมูลสินค้า</h3>
            <label>ประเภทรถ</label>
            <Form.Item
              data-test="typecar-ID"
              name="typecar"
              rules={[{ required: true, message: "กรุณาเลือกประเภทรถ" }]}
            >
              <Select
                data-test="scroll-dropdown"
                placeholder="กรุณาเลือกประเภทรถ"
                onChange={(value) => {
                  onChangetypecar(value);
                  changeDatatypecar(value);
                }}
              >
                {typecar.map((item, index) => (
                  <Select.Option value={item.CAR_TYPE_CODE} key={index}>
                    {item.CAR_TYPE_NAME}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>ยี่ห้อรถ</label>
            <Form.Item data-test="brandcar-ID" name="Car-brand">
              <Select
                placeholder="กรุณาเลือกยี่ห้อรถ"
                onChange={(value) => {
                  onChangebrand(value);
                  changeDatabrand(value);
                }}
                disabled={!canSelecterbrand}
              >
                {brand.map((item, index) => (
                  <Select.Option value={item.BN_CODE} key={index}>
                    {item.BN_NAME}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>รุ่นรถ</label>
            <Form.Item data-test="modelcar-ID" name="model-car">
              <Select
                placeholder="กรุณาเลือกรุ่นรถ"
                onChange={(value) => {
                  onChangemodel(value);
                  changeDatamodel(value);
                }}
                disabled={!canSelectermodel}
              >
                {model.map((item, index) => (
                  <Select.Option value={item.MD_NAME} key={index}>
                    {item.MD_NAME}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>ปีรถ</label>
            <div className="Select-unit-CarYear">
              <div className="unit-round-cardoc">
                <span>ปี(พ.ศ)</span>
              </div>
              <Form.Item data-test="caryear-ID" name="year">
                <Select
                  placeholder="กรุณาเลือกปีรถ"
                  onChange={(value) => {
                    onChangecaryear(value);
                    changeDataCarYear(value);
                  }}
                  disabled={!canSelectercaryear}
                >
                  {caryear.map((item, index) => (
                    <Select.Option value={item.CAR_YEAR} key={index}>
                      {formatDate(item.CAR_YEAR)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <label>โฉม</label>
            <Form.Item data-test="detailcar-ID" name="model-detail">
              <Select
                placeholder="กรุณาเลือกโฉมรถ"
                onChange={(value) => {
                  onChangemodeldetail(value);
                  showprice();
                  changemodeldetail(value);
                }}
                disabled={!canSelectermodeldetail}
              >
                {modeldetail.map((item, index) => (
                  <Select.Option value={item.MDDT_CODE} key={index}>
                    {item.MDDT_NAME}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button
              data-test="รายละเอียดสินค้า-Button"
              type="link"
              onClick={() => {
                setModal1Open(true);
              }}
              disabled={!isLinkDisabled}
              className=""
            >
              รายละเอียดสินค้า
            </Button>

            <Modal
              open={modal1Open}
              onCancel={() => setModal1Open(false)}
              centered
              width={1000}
            >
              <Suspense
                fallback={
                  <div className="hengimg">
                    <Image src={hengloading} />
                  </div>
                }
              >
                <Popupmodeldeail
                  BrandName={
                    brand.find((item) => item.BN_CODE === brandID)?.BN_NAME
                  }
                  model={
                    model.find((item) => item.MD_NAME === modelID)?.MD_NAME
                  }
                  caryear={
                    caryear.find((item) => item.CAR_YEAR === caryearID)
                      ?.CAR_YEAR
                  }
                  modeldetail={
                    modeldetail.find((item) => item.MDDT_CODE === modeldetailID)
                      ?.MDDT_NAME
                  }
                  price={price}
                  onReset={handleReset}
                  resetCounter={resetCounter}
                />
              </Suspense>
            </Modal>
          </Form>
        </div>
        <hr></hr>
        <div className="inputdatamoney">
          <Form form={form}>
            <label>ราคากลาง</label>
            <Form.Item name="exmple-price">
              <InputNumber
                value={price.PRICE}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="บาท"
                disabled
              />
            </Form.Item>
            <label>ยอดที่จัดได้</label>
            <Form.Item name="manageable-amount">
              <InputNumber
                value={price.total}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="บาท"
                disabled
              />
            </Form.Item>
            <Checkbox
              className="checkbox"
              checked={statusSpecialLTV}
              onChange={SetLTV}
            >
              %LTV พิเศษ
            </Checkbox>
            <label>วงเงินที่ต้องการ</label>
            <Form.Item
              data-test="Needmoney-form"
              name="needmoney"
              className="controinputDisabled"
              validateStatus={validateStatus}
              help={helpForm}
              hasFeedback
            >
              <InputNumber
                placeholder="กรุณาระบุวงเงิน"
                value={needMoney}
                onChange={(value) => {
                  onChangeneedmoney(value);
                  checkDatainputNeedmoney(value);
                }}
                step="1"
                stringMode
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onKeyDown={(e) => {
                  if (
                    !/\d/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "-"
                  ) {
                    e.preventDefault();
                  }
                }}
                addonAfter="บาท"
                type="tel"
                pattern="[0-9]*"
                // onBlur={() => SetLTV(needMoney)}
              />
            </Form.Item>
            <label>ปีที่จดทะเบียนรถ</label>
            <div className="Select-unit-RegistionCarYear">
              <div className="unit-round-cardoc">
                <span>ปี(พ.ศ)</span>
              </div>
              <Form.Item
                data-test="CarYear-ID"
                className="RegistrationCarYear"
                name="RegistrationCarYear"
                validateStatus={validateStatusSelerter}
                help={helpFormSelecter}
                hasFeedback
              >
                <Select
                  placeholder="กรุณาเลือกปีที่จดทะเบียนรถ"
                  onChange={(value) => {
                    onChangeListinstallmentandinterestrate(value);
                    checkRegistrationCarYearID(value);
                  }}
                  disabled={!lockRegistioncaryear}
                >
                  {generateOptions(caryearID)}
                </Select>
              </Form.Item>
            </div>
            <label>ระยะเวลาการผ่อน</label>
            <div className="Select-unit-installpaymentandinterestRate">
              <Form.Item
                data-test="Payment-ID"
                name="installmentPayment"
                validateStatus={validateStatusSelerterinstallment}
                help={helpFormSelecterinstallment}
                hasFeedback
                className="controlheight"
              >
                <Select
                  placeholder="กรุณาเลือกงวด"
                  onChange={(value) => {
                    onChangeinstallmentPayment(value);
                    checkinstallmentPayment(value);
                  }}
                  disabled={!lockinstallmentPayment}
                >
                  {mookupinstallpayment.map((item, index) => (
                    <Select.Option value={item.qty} key={index}>
                      {item.nameqty}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="unit-round">
                <span>งวด</span>
              </div>
            </div>

            <label>อัตราดอกเบี้ย</label>
            <div className="Select-unit-installpaymentandinterestRate">
              <Form.Item
                data-test="interestRate-ID"
                name="startmoney"
                validateStatus={validateStatusSelerterinterestrate}
                help={helpFormSelecterinterestrate}
                hasFeedback
                className="controlheight"
              >
                <Select
                  placeholder="กรุณาเลือกดอกเบี้ย"
                  onChange={(value) => {
                    onChangeinterestrate(value);
                  }}
                  disabled={!lockinteresrate}
                  options={mookupinterestrate}
                ></Select>
              </Form.Item>
              <div className="unit-round-start">
                <span>%ต่อปี</span>
              </div>
            </div>
            <div>
              <label>ชำระงวดแรกวันที่</label>

              <Form.Item name="date">
                <ConfigProvider locale={locale}>
                  <DatePicker
                    value={lockedDate ? moment(lockedDate, "YYYY-MM-DD") : null}
                    placeholder="กรุณาเลือกวัน/เดือน/ปี"
                    className="iconcallender"
                    format="DD/MM/YYYY"
                    picker="year"
                    onFocus={(e) => e.target.blur()}
                    disabled
                  />
                </ConfigProvider>
              </Form.Item>
            </div>
          </Form>
          <Button
            data-test="reset-botton"
            type="link"
            className="reset"
            onClick={() => {
              handleReset();
              reestField();
            }}
          >
            <SyncOutlined
              style={{ fontSize: "22px", color: "#1F6734" }}
              className="iconspin"
            />
            รีเซ็ต
          </Button>
          <div>
            <Button
              data-test="submit-botton"
              loading={loadings[0]}
              onClick={() => {
                enterLoading(0);
                clickToCal();
                indexTocard();
              }}
              className="buttoncal"
              type="primary"
              htmlType="submit"
              disabled={!canCalculate}
              ref={calculateButtonRef}
            >
              คำนวณ
            </Button>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="hengimg">
            <Image src={hengloading} />
          </div>
        }
      >
        {isFormCardVisible && (
          <Cardpricelist
            cardShow={cardShow}
            needMoney={needMoney}
            initialSlideIndex={initialSlideIndex}
            ContractTypeCode={ContractTypeCode}
            index={index}
            dateDayAmount={lockedDate}
            nowDay={nowDay}
          />
        )}
      </Suspense>
    </>
  );
};

function FromPriceListCar() {
  return (
    <div>
      <HeadderHp />
      <div className="controlForm">
        <div className="FromHp">
          <div>
            <SelectorHP />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FromPriceListCar;
