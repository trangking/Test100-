import React, { useState, useRef, Suspense } from "react";
import { Card, Form, Image, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "../../styles/navigation.css";
import "../../styles/swiper.css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../../styles/PuandNano.css";
import moment from "moment";
import hengloading from "../../img/HengWallpaper.png";

const TableListPeriods = React.lazy(() => import("../Table/TableLoan"));

function Cardpricelist({
  cardShow,
  needMoney,
  initialSlideIndex,
  ContractTypeCode,
  dateDayAmount,
  nowDay,
}) {
  const [showTableperiods, setShowTableperiod] = useState({});
  const [isFormTabledVisible, setIsFormTableVisible] = useState(false);
  const calculateButtonRef = useRef(null);
  const formattedDate = dateDayAmount.format("YYYY-MM-DD");
  const changeYears = moment(formattedDate).subtract(543, "years");
  const handleUpdateOption = async (period, interestRate) => {
    setShowTableperiod({
      needMoney: needMoney,
      period: period,
      interestRate: interestRate,
      dateDayAmount: changeYears.format("YYYY-MM-DD"),
      ContractTypeCode: ContractTypeCode,
      nowDay: nowDay,
    });
    setIsFormTableVisible(true);
    setTimeout(() => {
      calculateButtonRef.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };
  const formatComma = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  let TypeContractcss = "";
  let TypeContractcssSwiper = "";
  if (ContractTypeCode === "08") {
    TypeContractcss = "formCardNANO";
    TypeContractcssSwiper = "swiper";
  } else {
    TypeContractcss = "formCardPU";
    TypeContractcssSwiper = "swiperPu";
  }

  const isResponsive = window.innerWidth <= 1200;
  const spaceBetween = window.innerWidth >= 600 ? 700 : 1;
  const formatCurrency = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };
  return (
    <>
      <Form>
        <div className={TypeContractcss}>
          <Swiper
            effect={isResponsive ? "slide" : "coverflow"}
            grabCursor={true}
            centeredSlides={false}
            spaceBetween={spaceBetween}
            loop={"true"}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 220,
              depth: 100,
              modifier: 3.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Navigation]}
            className={TypeContractcssSwiper}
            initialSlide={initialSlideIndex}
            simulateTouch={true}
            shortSwipes={true}
          >
            <Form.Item>
              {cardShow.map((item, index) => (
                <SwiperSlide key={item.period}>
                  <Card
                    title="ผลการคำนวณ"
                    className="cardpricePUandNANO"
                    key={index}
                  >
                    <div className="HeadCard">
                      <div className="boxleft">
                        <p>วงเงินที่ต้องการ (บาท)</p>
                      </div>
                      <div className="boxright">
                        <span>{formatComma(Math.floor(needMoney))}</span>
                      </div>
                    </div>
                    <div className="bodycardinstallment">
                      <div className="HeadCard2">
                        <div className="boxleft">
                          <p>ยอดผ่อนชำระ/เดือน (บาท)</p>
                        </div>
                        <div className="boxright">
                          <span>{formatCurrency(item.installmentAmount)}</span>
                        </div>
                      </div>
                      <div className="bodyinstallmentPayment">
                        <div className="boxleft">
                          <p>ระยะเวลาการผ่อน (เดือน)</p>
                        </div>
                        <div className="boxright">
                          <span>{item.period}</span>
                        </div>
                      </div>
                      <div className="bodyinterestrate">
                        <div className="boxleft">
                          <p>อัตราดอกเบี้ย (ต่อปี)</p>
                        </div>
                        <div className="boxright">
                          <span>{item.interestRate}%</span>
                        </div>
                      </div>
                      {/* <Button
                        type="link"
                        className="buttonCalTable"
                        ref={calculateButtonRef}
                        onClick={() =>
                          handleUpdateOption(item.period, item.interestRate)
                        }
                      >
                        ตารางภาระหนี้
                      </Button> */}
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Form.Item>
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          </Swiper>
        </div>
      </Form>
      <Suspense
        fallback={
          <div className="hengimg">
            <Image src={hengloading} />
          </div>
        }
      >
        {isFormTabledVisible && <TableListPeriods Period={showTableperiods} />}
      </Suspense>
    </>
  );
}

export default Cardpricelist;
