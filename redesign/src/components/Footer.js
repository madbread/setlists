import api from "../api";

const Footer = () => {
  return  (
    <div className="page-footer">
      <button type="button" onClick={api.logout}>logout</button>
    </div>
  )
}

export default Footer;
