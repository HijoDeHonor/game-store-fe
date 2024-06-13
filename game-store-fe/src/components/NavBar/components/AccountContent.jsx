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
            localStorage.removeItem("userName");
            localStorage.removeItem("token");
            if (
              localStorage.getItem("userName") === null &&
              localStorage.getItem("token") === null
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
