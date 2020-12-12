import React from "react";
function NavBar(props) {
  const STORED_ACCOUNT_INFO = JSON.parse(localStorage.getItem("account"));

  return (
    <div>
      <header className="main-header">
        {/* Logo */}
        <a href="index2.html" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>A</b>LT
          </span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg">
            <b>LINKAGE </b>
            Dashboard
          </span>
        </a>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* Messages: style can be found in dropdown.less*/}

              {/* User Account: style can be found in dropdown.less */}
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    className="profile-user-img img-responsive img-circle"
                    src={
                      STORED_ACCOUNT_INFO.profile.profile_picture
                        ? `${process.env.REACT_APP_API_BASE_URL}/${STORED_ACCOUNT_INFO.profile.profile_picture}?token=${STORED_ACCOUNT_INFO.token}`
                        : "../../../assets/dist/img/profile_pictures/default_profile_picture.png"
                    }
                    className="user-image"
                    style={{ height: "25px", width: "25px" }}
                  />
                  <span className="hidden-xs">
                    {STORED_ACCOUNT_INFO.profile.first_name +
                      " " +
                      STORED_ACCOUNT_INFO.profile.last_name}
                  </span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      className="profile-user-img img-responsive img-circle"
                      src={
                        STORED_ACCOUNT_INFO.profile.profile_picture
                          ? `${process.env.REACT_APP_API_BASE_URL}/${STORED_ACCOUNT_INFO.profile.profile_picture}?token=${STORED_ACCOUNT_INFO.token}`
                          : "../../../assets/dist/img/profile_pictures/default_profile_picture.png"
                      }
                      className="img-circle"
                      style={{ height: "80px", width: "80px" }}
                    />
                    <p>
                      {STORED_ACCOUNT_INFO.profile.first_name +
                        " " +
                        STORED_ACCOUNT_INFO.profile.last_name}{" "}
                      <br /> {STORED_ACCOUNT_INFO.profile.job_title}
                    </p>
                  </li>
                  {/* Menu Body */}
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    {/* <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">
                        Profile
                      </a>
                    </div> */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <a
                        href="#"
                        className="btn btn-default btn-flat"
                        onClick={props.logout}
                      >
                        Sign out
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
