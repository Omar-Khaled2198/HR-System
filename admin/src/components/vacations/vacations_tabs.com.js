import React, { Component } from "react";
import VacationsList from "./vacations_list.com";
import ServiceProvider from "../../utils/service_provider.utils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import TableMapper from "../../utils/table_mapper.utils";

class VacationsTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      requests: [],
      is_loading: true,
    };
  }

  async componentDidMount() {
    const response = await ServiceProvider.GET(`vacations`);
    const vacations = response.data;
    var history = [],
      requests = [];
    if (response.status == 200) {
      vacations.map((vacation) => {
        if (vacation.status == "Pending") {
          requests.push(vacation);
        } else {
          history.push(vacation);
        }
      });
      this.setState({ history, requests, is_loading: false });
    }
  }

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>Vacations</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div
                className="nav-tabs-custom"
                style={{
                  background: "white",
                  boxShadow: "none",
                }}
              >
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#tab_1" data-toggle="tab">
                      Requests
                    </a>
                  </li>
                  <li>
                    <a href="#tab_2" data-toggle="tab">
                      History
                    </a>
                  </li>
                </ul>
                <div className="tab-content" style={{ background: "white" }}>
                  <div className="tab-pane active" id="tab_1">
                    {!this.state.is_loading && (
                      <VacationsList requests={this.state.requests} />
                    )}
                  </div>
                  <div className="tab-pane" id="tab_2">
                    <div style={{ backgroundColor: "white" }}>
                      {!this.state.is_loading && (
                        <ReactTable
                          data={this.state.history}
                          columns={TableMapper("VACATIONS")}
                          minRows={0}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default VacationsTabs;
