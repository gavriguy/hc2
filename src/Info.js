import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import moment from 'moment';

const t = window.TrelloPowerUp.iframe();

const initialValues = {
  cycleEnds: '',
  cycleStarts: ''
};

class Info extends Component {
  state = {
    cycleEnds: null,
    cycleEnds: null,
    init: null
  };

  componentDidMount() {
    t.get('board', 'shared').then(data => {
      this.setState({
        cycleEnds: data.cycleEnds,
        cycleStarts: data.cycleStarts,
        init: true
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.init && (
          <div>
            <Formik
              initialValues={{
                cycleEnds: this.state.cycleEnds,
                cycleStarts: this.state.cycleStarts
              }}
              onSubmit={(values, { setSubmitting }) => {
                const cycleStarts = moment(values.cycleStarts, 'YYYYMMDD');
                const cycleEnds = moment(values.cycleEnds, 'YYYYMMDD');
                const now = moment();
                let infoLabel = 'Cycle dates are not set';
                if (cycleStarts > now) {
                  infoLabel = `Cycle begins in ${cycleStarts.diff(
                    now,
                    'days'
                  )} days`;
                }
                if (cycleEnds > now) {
                  infoLabel = `Cycle ends in ${cycleEnds.diff(
                    now,
                    'days'
                  )} days`;
                }
                if (cycleEnds < now) {
                  infoLabel = 'Cycle has ended'
                }

                t.set('board', 'shared', {
                  infoLabel,
                  cycleEnds: values.cycleEnds,
                  cycleStarts: values.cycleStarts
                });

                setSubmitting(false);
              }}
              render={({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label>Cycle start date</label>
                    <Field
                      className="form-control form-control-sm"
                      type="date"
                      name="cycleStarts"
                    />
                    <small className="form-text text-muted">
                      When is the cycle begining?
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Cycle end date</label>
                    <Field
                      className="form-control form-control-sm"
                      type="date"
                      name="cycleEnds"
                    />
                    <small className="form-text text-muted">
                      When in the cycle ending?
                    </small>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Info;
