import { Fragment } from "react";
import { sidebarToggle } from "../utils";
const SideBar = () => {
  return (
    <Fragment>
      <div className="form-back-drop" onClick={() => sidebarToggle()} />
      {/* Hidden Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon" onClick={() => sidebarToggle()}>
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>Order Request</h4>
          </div>
          {/*Appointment Form*/}
          <div className="appointment-form">
            <form onSubmit={(e) => e.preventDefault()} method="post">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  defaultValue=""
                  placeholder="Name"
                  required={true}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="mobile"
                  defaultValue=""
                  placeholder="Whatsapp Number"
                  required={true}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="location"
                  defaultValue=""
                  placeholder="Delivery Location"
                  required={true}
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="deliverydate"
                  defaultValue=""
                  placeholder="Delivery Date"
                  required={true}
                />
              </div>
              
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  Submit now
                </button>
              </div>
            </form>
          </div>
          {/*Social Icons*/}
          <div className="social-style-one">
            
            <a href="https://www.instagram.com/chennai_green_gifts/">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.facebook.com/chennaigreengifts/">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://www.linkedin.com/company/chennai-green-gifts/">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default SideBar;
