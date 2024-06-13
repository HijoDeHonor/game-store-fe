import CustomLink from "./CustomLink";
import { useNavigate } from "react-router-dom";
const AccountContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="content">
        <CustomLink
          to={"inventory"}
          tittle={"My Inventory"}
          className={"content"}
        />
      </div>
      <div>
        <p
          className="content"
          onClick={() => {
            localStorage.removeItem("GameStore-userName");
            localStorage.removeItem("GameStore-user-token");
            if (
              localStorage.getItem("GameStore-userName") === null &&
              localStorage.getItem("GameStore-user-token") === null
            ) {
              navigate("/");
              window.location.reload();
            }
          }}
        >
          Sign off
        </p>
      </div>
    </div>
  );
};

export default AccountContent;
