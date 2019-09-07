import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

function AddWeeklyHoliday() {
  const [days, selectDays] = React.useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: true,
    Sunday: true
  });
  const handleHoliday = event => {
    selectDays(oldState => ({
      ...oldState,
      [event.target.name]: event.target.checked
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <Card>
        <CardHeader title="Add Weekly Holidays" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Monday}
                    value={days.Monday}
                    name="Monday"
                    onChange={handleHoliday}
                  />
                }
                label="Monday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Tuesday}
                    value={days.Monday}
                    name="Tuesday"
                    onChange={handleHoliday}
                  />
                }
                label="Tuesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Wednesday}
                    value={days.Wednesday}
                    name="Wednesday"
                    onChange={handleHoliday}
                  />
                }
                label="Wednesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Thursday}
                    value={days.Thursday}
                    name="Thrusday"
                    onChange={handleHoliday}
                  />
                }
                label="Thursday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Friday}
                    value={days.Friday}
                    name="Friday"
                    onChange={handleHoliday}
                  />
                }
                label="Friday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Saturday}
                    value={days.Saturday}
                    name="Saturday"
                    onChange={handleHoliday}
                  />
                }
                label="Saturday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={days.Sunday}
                    value={days.Sunday}
                    name="Sunday"
                    onChange={handleHoliday}
                  />
                }
                label="Sunday"
              />
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              style={{ marginTop: "2rem" }}
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddWeeklyHoliday;
