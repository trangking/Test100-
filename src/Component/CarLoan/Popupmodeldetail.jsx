import { Image } from "antd";
import "../../styles/HengStyles.css";
import React, { useEffect, useState, useContext } from "react";
import { API } from "../../api/servicesApi";
import "photoswipe/dist/photoswipe.css";
import { Gallery } from "react-photoswipe-gallery";
import Grid from "@mui/material/Grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/swiper.css";
import { MyContext } from "../../State/ContextState";

export default function Popupmodeldeail({
  BrandName,
  model,
  caryear,
  modeldetail,
  price,
}) {
  const { arrImages, setarrImages } = useContext(MyContext);
  const [maxHeight, setMaxHeight] = useState("500px");
  const [headPrice, setheadPrice] = useState(
    "https://uat-hengcalimage.hengleasing.local/allaccess/CAR_MODEL/"
  );
  const fecthImages = async () => {
    try {
      const data = await API.requeslist.getImages(price);
      setarrImages(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const arr = [
    "https://mediacloud.carbuyer.co.uk/image/private/s--W8H-IrW1--/v1579657958/carbuyer/2019/10/01_41.jpg",
    "https://s3-ap-southeast-1.amazonaws.com/motoristprod/editors%2Fimages%2F1700043192638-1240_2023103016552698.jpg",
    "https://static.thairath.co.th/media/Dtbezn3nNUxytg04aiHv4eupH5vLsJcIQJAxMkDi75Qj57.webp",
    "https://ev.iphonemod.net/wp-content/uploads/2022/11/tesla-mode-x-img-2.png",
    "https://i0.wp.com/www.ridebuster.com/wp-content/uploads/2023/10/TESLA-Model-3-2024-3.jpg?resize=770%2C514&ssl=1",
    "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsbKFfS0V0e3iqCtZomhL4devuBswWvAaG3Ys3hmmU4Dm1AojpbhLV8.jpg",
  ];
  const thaiYear = parseInt(caryear) + 543;
  const formatCurrency = (value) => {
    const formattedValue = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return formattedValue.replace(/\.00$/, "");
  };

  useEffect(() => {
    function updateMaxHeight() {
      if (window.innerWidth < 600) {
        setMaxHeight("250px");
      } else {
        setMaxHeight("500px");
      }
    }
    window.addEventListener("load", updateMaxHeight);
    window.addEventListener("resize", updateMaxHeight);
    updateMaxHeight();
  }, []);
  return (
    <>
      <div className="popup">
        <div className="popupleft">
          <div className="HeadModeldetail">
            <h1>{BrandName}</h1>
            <h2>{model}</h2>
            <div className="popopswiper">
              <div className="popup">
                <Grid
                  container
                  spacing={2}
                  style={{ maxHeight: maxHeight, overflowY: "auto" }}
                >
                  {arr.map((src, index) => (
                    <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
                      <Image src={src} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div className="popupright">
          <h3>รายละเอียดสินค้า</h3>
          <hr color="#D1D1D1" />
          <div className="detail">
            <h5>รุ่น/โฉม</h5>
            <div>
              <p>{modeldetail}</p>
            </div>
            <div className="priceShow">
              <div className="carprice">
                <p>
                  ปี (พ.ศ.) <br />
                  <span> {thaiYear}</span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  ราคา <br />
                  <span> {formatCurrency(price.PRICE)}</span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  %LTV <br />
                  <span> {parseFloat(price.PERS_LEASING).toFixed(2)}%</span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  ยอดที่จัดได้ <br />
                  <span> {formatCurrency(price.total)}</span>
                </p>
              </div>
            </div>
            <div className="priceShow">
              <div className="carprice">
                <p>
                  %LTV(พิเศษ) <br />
                  <span> {parseFloat(price.PERS_EXTRA).toFixed(2)}%</span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  ยอดที่จัดได้(พิเศษ) <br />
                  <span>
                    {" "}
                    {formatCurrency(price.totalforExtra
)}
                  </span>
                </p>
              </div>
            </div>
            <h5>คำอธิบาย</h5>
            <p className="descriptiondetail">
              {/* {price[0].Description.split("\r\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))} */}
            </p>

            <h5>รายละเอียดรถ</h5>
            <p>-</p>
          </div>
        </div>
      </div>
    </>
  );
}
