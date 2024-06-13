import CustomLink from "./CustomLink";
const AccountContent = () => {
  return (
    <div>
      <div className="content">
        <CustomLink to={"inventory"} tittle={"My Inventory"} className={"content"}/>
      </div>
      <div>
        <p
          className="content"
          onClick={() => {
            localStorage.removeItem("userName");
            checkUser();
          }}
        >
          Sign off
        </p>
      </div>
    </div>
  );
};

export default AccountContent;
