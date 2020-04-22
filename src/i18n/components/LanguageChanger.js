import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { LanguageLists, I18nContext } from "../index";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const LanguageChanger = () => {
  const { langCode, dispatchAvetti } = useContext(I18nContext);

  const classes = useStyles();

  const handleChange = event => {
    dispatchAvetti({ type: "languageChange", payload: event.target.value });
  };

  console.error("LANGUAGE LIST", LanguageLists);
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={langCode}
          defaultValue={langCode}
          onChange={handleChange}
        >
          {LanguageLists.map((language, index) => {
            return (
              <MenuItem key={index} value={language.langCode}>
                {language.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageChanger;
