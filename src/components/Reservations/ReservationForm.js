import React, { useState } from "react";
import "./styles.css";
import {ReservationDataContext} from "../../views/ExternalApi";
import moment from "moment";

import { getMachines } from '../../actions/machineActions';
import { compose } from 'redux';
import { connect } from "react-redux";

const ReservationForm = () => {
    const reservationDataObj = React.useContext(ReservationDataContext);
        const [startTime, setStartTime] = useState("");
        const [endTime, setEndTime] = useState("");
        const [machine, setMachine] = useState("");
        const [billingCode, setBillingCode] = useState("");
        const { setReservationData } = reservationDataObj;
        const submitReservationRequest=() => {
            setReservationData((oldValue) => {
                const newValue = { ...oldValue };
                newValue[machine] = newValue[machine]?.concat?.({
                    startTime: moment(`${moment().format("MM/DD/YYYY")} ${startTime}:00`).toISOString(),
                    endTime: moment(`${moment().format("MM/DD/YYYY")} ${endTime}:00`).toISOString()
                });
                return newValue;
            })
        }

        return (
            <div className="root">
                <div className="reservationrow">
                    <div>Billing Code:</div>
                    <input
                        type="text"
                        value={billingCode}
                        onChange={(e) => {
                            // setStartTime((oldValue) => {
                            //    return e.target.value;
                            // });
                         setBillingCode(e.target.value);
                        }}
                    />
                </div>
                <button type="button" onClick={ submitReservationRequest }>Submit</button>
                <p>
                    <br></br>
                    <h3>
                      {moment().format("dddd, MMMM Do YYYY")}
                    </h3>
                </p>
            </div>
        );
}

const mapStateToProps = state => ({
    machines: state.machines
});

export default compose(
  connect(mapStateToProps, { getMachines })
)(ReservationForm);

// export default ReservationForm;
