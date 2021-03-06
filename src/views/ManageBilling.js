import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { getCodes, createCode, deleteCode } from '../actions/billingActions';
import { compose } from 'redux';
import { connect } from "react-redux";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Alert } from "reactstrap";

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = theme => ({
    dropdown: {
        justifyContent: 'flex-start',
        padding: theme.spacing(4)
    },
});

class ManageBilling extends Component {

  constructor(props) {
      super(props);
      this.state = {
          columns: [
              { title: 'Billing Code', field: 'code' },
              { title: 'Description', field: 'desc' },
          ]
      };
  }

  componentDidMount() {
      this.props.getCodes();
  }

    render(){
      const { classes } = this.props;

      const { codes, getCodes } = this.props.codes;

    return (
      <MaterialTable
          icons={tableIcons}
          title="Valid Billing Codes"
          columns={this.state.columns}
          data={codes}
          editable={{
              onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          this.props.createCode(newData);
                          resolve()
                      }, 1000)
                  }),
              onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          this.props.deleteCode(oldData._id)
                          resolve()
                      }, 1000)
                  }),
          }}
          options={{
              exportButton: false,
              search: true
          }}
      />
    );
}
}

ManageBilling.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    codes: state.codes
});

// export default withAuthenticationRequired(AdminTools, {
//     onRedirecting: () => <Loading />,
// });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { getCodes, createCode, deleteCode })
)(ManageBilling);
