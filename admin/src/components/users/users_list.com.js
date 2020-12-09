import React, { Component } from "react";
import UserCard from "./user_card.com";
import { Link } from "react-router-dom";
import ServiceProvider from "../../utils/service_provider.utils";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  accounts: [],
	  token:"",
      is_loading: true,
    };
  }

  async componentDidMount() {
	const STORED_ACCOUNT_INFO = await JSON.parse(localStorage.getItem("account"));
    const response = await ServiceProvider.GET(`accounts`);
    if (response.status == 200) {
      this.setState({
        accounts: response.data.filter((account) => account.profile),
		is_loading: false,
		token: STORED_ACCOUNT_INFO.token
      });
    }
  }

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            Users
            <Link to={"/admin/users/new"}>
              <span className="btn btn-primary pull-right text-bold">
                New User
              </span>
            </Link>
          </h1>
        </section>
        <section className="content">
          <div className="row">
            {!this.state.is_loading &&
              this.state.accounts.map((account) => {
                return (
                  <div className="col-md-3">
                    <UserCard data={account} token={this.state.token}/>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    );
  }
}

export default UsersList;
