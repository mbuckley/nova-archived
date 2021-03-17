import React, { useState } from "react";
import { ClioInput, ClioButton, ClioRadio, ClioCheckbox } from "@clio/nova-core-react";

const FormValueDisplay = ({ value }) => (
  <div>
    <strong style={{ fontWeight: 600 }}>Value:</strong> {typeof value === "boolean" ? value.toString() : value}
  </div>
);

const Forms = () => {
  const [clioTextInputVal, setClioInputVal] = useState();
  const [clioDisabledTextInputVal, setClioDisabledTextInputVal] = useState();
  const [clioRadioInputVal, setClioRadioVal] = useState();
  const [clioCheckboxChecked, setClioCheckboxChecked] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    alert("SUBMIT THE DATA!!!");
  }

  function handleClioCheckboxClick() {
    setClioCheckboxChecked(!clioCheckboxChecked);
  }

  function handleClioTextInput({ target: { value } }) {
    setClioInputVal(value);
  }

  function handleClioDisabledTextInput({ target: { value } }) {
    setClioDisabledTextInputVal(value);
  }

  function handleClioRadioChange({ target: { value } }) {
    setClioRadioVal(value);
  }

  return (
    <>
      <h1>Forms</h1>
      <div style={{ margin: "0 auto", width: "70%" }}>
        <form style={{ width: "400px", textAlign: "left" }} onSubmit={handleSubmit}>
          {/* Clio Text Inputs */}
          <div>
            <ClioInput
              name="test"
              placeholder="Enter some text..."
              onInput={handleClioTextInput}
              required="true"
              label="With Required Indicator"
            />
            <FormValueDisplay value={clioTextInputVal} />
            <ClioInput
              disabled={clioCheckboxChecked}
              placeholder="Uncheck the Clio checkbox to enable me!"
              onInput={handleClioDisabledTextInput}
            />
            <FormValueDisplay value={clioDisabledTextInputVal} />
          </div>

          {/* Clio Radio Input Group */}
          <ClioRadio name="group1" value="111" onClick={handleClioRadioChange} label="Option 1" />
          <ClioRadio name="group1" value="222" onClick={handleClioRadioChange} label="Option 2" />
          <ClioRadio name="group1" disabled="true" value="333" onClick={handleClioRadioChange} label="Option 3" />

          <FormValueDisplay value={clioRadioInputVal} />

          {/* Clio Checkbox Input */}
          <div>
            <ClioCheckbox checked={clioCheckboxChecked} onClick={handleClioCheckboxClick} label="Toggle ClioCheckbox" />
            <FormValueDisplay value={clioCheckboxChecked} />
          </div>

          <ClioButton type="submit">Submit</ClioButton>
          <ClioButton type="reset">Reset</ClioButton>
        </form>
      </div>
    </>
  );
};

export default Forms;
