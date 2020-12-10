import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";

class UserUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      profile_picture: "",
      is_loading: true,
    };
  }

  async componentDidMount() {
    var account = {};
    if (this.props.history.location.state) {
      account = this.props.history.location.state.account;
    } else {
      const response = await ServiceProvider.GET(
        `accounts/${this.props.match.params.id}`
      );
      account = response.data;
    }
    this.setState({
      account,
      is_loading: false,
    });
  }

  async UpdateAccount() {
    const response = await ServiceProvider.PUT(
      `accounts/${this.state.account._id}`,
      this.state.account
    );
    console.log(response);
    if (response.status == 200 && this.state.profile_picture) {
      const data = new FormData();
      data.append("profile_picture", this.state.profile_picture);
      await ServiceProvider.POST(
        `accounts/${response.data._id}/profile_picture`,
        data,
        { "content-type": "multipart/form-data" }
      );
      this.props.history.push(`/admin/users/${response.data._id}/profile`);
    }

    this.props.history.push(`/admin/users/${response.data._id}/profile`);
  }

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            Update User:{" "}
            {!this.state.is_loading &&
              this.state.account.profile.first_name +
                " " +
                this.state.account.profile.last_name}
          </h1>
        </section>
        {!this.state.is_loading && (
          <section className="content">
            <div className="box box-primary">
              <div className="box-body">
                <div className="form-group">
                  <label>
                    First Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.state.account.profile.first_name}
                    onChange={(event) => {
                      const value = event.target.value;
                      this.setState((prevState) => {
                        let account_copy = Object.assign({}, prevState.account);
                        account_copy.profile.first_name = value;
                        return { account_copy };
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Last Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.state.account.profile.last_name}
                    onChange={(event) => {
                      const value = event.target.value;
                      this.setState((prevState) => {
                        let account_copy = Object.assign({}, prevState.account);
                        account_copy.profile.last_name = value;
                        return { account_copy };
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Job Title <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.state.account.profile.job_title}
                    onChange={(event) => {
                      const value = event.target.value;
                      this.setState((prevState) => {
                        let account_copy = Object.assign({}, prevState.account);
                        account_copy.profile.job_title = value;
                        return { account_copy };
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Profile Picture <span className="text-red">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => {
                      this.setState({
                        profile_picture: event.target.files[0],
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    defaultValue=""
                    className="form-control"
                    defaultValue={this.state.account.role}
                    onChange={(event) => {
                      const value = event.target.value;
                      this.setState((prevState) => ({
                        account: {
                          ...prevState.account,
                          role: value,
                        },
                      }));
                    }}
                  >
                    <option value="" selected hidden>
                      ...
                    </option>
                    <option value="employee">Employee</option>
                    <option value="hr">HR (Admin)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    Email <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={this.state.account.email}
                    onChange={(event) => {
                      const value = event.target.value;
                      this.setState((prevState) => ({
                        account: {
                          ...prevState.account,
                          email: value,
                        },
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) => {
                      const value = event.target.value;
                      this.setState((prevState) => ({
                        password: {
                          ...prevState.account,
                          password: value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="box-footer">
                <button
                  onClick={() => this.UpdateAccount()}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default UserUpdate;
