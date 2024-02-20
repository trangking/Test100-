import axios from "../axiosRequisition";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getinterestrate(
    ContractTypeCode,
    typecar,
    BrandCode,
    RegistrationCarYearID,
    value,
    needMoney,
    price,
    statusSpecialLTV
  ) {
    if (statusSpecialLTV === true) {
      return axios.get(
        `/api/RequisitionCriterias/DigitalLoan?ContractTypeCode=${ContractTypeCode}&CarTypeCode=${price[0].CarTypeCode}&BrandCode=${BrandCode}&RegistrationCarYear=${RegistrationCarYearID}&PeriodQty=${value}&Principal=${needMoney}&PriceListAmount=${price[0].PriceAmnt}&PriceListPercent=${price[0].PercentForExtra}`
      );
    } else if (statusSpecialLTV === false) {
      return axios.get(
        `/api/RequisitionCriterias/DigitalLoan?ContractTypeCode=${ContractTypeCode}&CarTypeCode=${price[0].CarTypeCode}&BrandCode=${BrandCode}&RegistrationCarYear=${RegistrationCarYearID}&PeriodQty=${value}&Principal=${needMoney}&PriceListAmount=${price[0].PriceAmnt}&PriceListPercent=${price[0].PercentForLoan}`
      );
    }
  },

  getinterestratePUandNANO(ContractTypeCode, value, needMoney) {
    return axios.get(
      `/api/RequisitionCriterias/DigitalLoan?ContractTypeCode=${ContractTypeCode}&PeriodQty=${value}&Principal=${needMoney}`
    );
  },
};
