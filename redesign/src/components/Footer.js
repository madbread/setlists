import api from "../api";

const Footer = () => {
  return  (
    <div className="page-footer noprint">
      <button type="button" onClick={api.logout}>Logout</button>
    </div>
  )
}

export default Footer;
