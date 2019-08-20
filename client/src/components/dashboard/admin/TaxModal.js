import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTax, clearProp } from "../../../actions/taxActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import countries from "./countries";

function TaxModal(props) {
  const [values, setValues] = React.useState({
    create_tax_country_name: ""
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    if (!isEmpty(props.tax.add)) {
      Swal.fire({
        type: props.tax.add.success ? "success" : "error",
        text: props.tax.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleTaxSubmit() {
    let post_data = {
      country_name: document.getElementById("create_tax_country_name").value,
      country_code: document.getElementById("create_tax_country_code")
        .value,
      currency_code: document.getElementById(
        "create_tax_currency_code"
      ).value,
      tax_percentage: document.getElementById("create_tax_percentage")
        .value,
    };
    props.addTax(post_data);
  }

  return (
    <div>
      <DialogTitle id="tax">Add Tax</DialogTitle>
      <form>
        <DialogContent>
          <FormControl required variant="outlined" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="create_tax_country_name">
              Select Country Name
            </InputLabel>
            <Select
              value={values.create_tax_country_name}
              onChange={handleChange}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="create_tax_country_name"
                  id="create_tax_country_name"
                />
              }
            >
              {countries.map(c => {
                return <MenuItem value={c}>{c}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_tax_country_name
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_tax_country_code"
            label="Country Code"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_tax_country_code
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_tax_currency_code"
            label="Currency Code"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_tax_currency_code
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_tax_percentage"
            label="Tax Percentage"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_tax_percentage
              : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button tye="submit" variant="outlined" color="default" onClick={handleTaxSubmit}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

TaxModal.propTypes = {
  addTax: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  tax: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  tax: state.tax
});

export default connect(
  mapStateToProps,
  { addTax, clearProp }
)(TaxModal);
