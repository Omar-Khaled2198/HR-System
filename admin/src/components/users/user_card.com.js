import React from "react";
import { Link } from "react-router-dom";

function UserCard(props) {
  const { data, token } = props;
  return (
    <div className="box box-primary ">
      <div className="box-body box-profile">
        <img
          className="profile-user-img img-responsive img-circle"
          src={
            data.profile.profile_picture
              ? `${process.env.REACT_APP_API_BASE_URL}/${data.profile.profile_picture}?token=${token}`
              : "../../../assets/dist/img/profile_pictures/default_profile_picture.png"
          }
          alt="User profile picture"
          style={{ height: "100px", width: "100px" }}
        />
        <h3 className="profile-username text-center">
          {data.profile.first_name + " " + data.profile.last_name}
        </h3>
        <p className="text-muted text-center">{data.profile.job_title}</p>
        <ul className="list-group list-group-unbordered">
          <li className="list-group-item text-muted text-center">
            <a>{data.email}</a>
          </li>
        </ul>
        <Link
          to={{
            pathname: `/admin/users/${data._id}/profile`,
            state: {
              data,
            },
          }}
        >
          <button href="#" className="btn btn-primary btn-block">
            <b>View Profile</b>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
