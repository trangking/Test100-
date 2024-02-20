import Navbar from "../Navbar";
import FromNANO from "./InputDatapersonel";
import MyProvider from "../../State/ContextState";
import MyProvidercal from "../../State/ContextStateCal";
import MyProviderType from "../../State/ContextTypeCode";
function PuNanoLoans() {
  return (
    <MyProvider>
      <MyProvidercal>
        <MyProviderType>
          <div>
            <Navbar />
            <FromNANO />
          </div>
        </MyProviderType>
      </MyProvidercal>
    </MyProvider>
  );
}
export default PuNanoLoans;
