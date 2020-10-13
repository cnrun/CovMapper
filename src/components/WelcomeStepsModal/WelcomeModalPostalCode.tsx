import React, { useEffect, useState } from "react";
import { useThunkDispatch } from "../../useThunkDispatch";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AppApi } from "../../state/app";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

export const WelcomeModalPostalCode: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();
  const dispatch = useThunkDispatch();
  const [postCode, setPostCode] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);

  function isValidPostalCode(text: string) {
    const postCodeAsNumber = parseInt(text, 10);
    return !isNaN(postCodeAsNumber) && postCodeAsNumber < 100000;
  }

  useEffect(
    () => {
      if (touched) {
        setError(!isValidPostalCode(postCode));
      }
    },
    [touched, postCode],
  );

  function onPostalCodeChange(event) {
    setPostCode(event.target.value);
    setTouched(true);
  }

  function onSkip() {
    return dispatch(AppApi.setUserPostalCode(0));
  }

  function submit() {
    if (isValidPostalCode(postCode)) {
      dispatch(AppApi.setUserPostalCode(parseInt(postCode, 10)));
    } else {
      setError(true);
    }
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      submit();
    }
  }

  return (
    <>
      <Typography className={classes.title}>
        Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes
      </Typography>

      <TextField
        autoFocus
        error={error}
        variant="outlined"
        type="number"
        onChange={onPostalCodeChange}
        onKeyPress={onKeyPress}
        onBlur={() => setTouched(true)}
        style={{ margin: "50px 0 30px 0", width: "150px" }}
      />

      <Button
        className={`${classes.primaryButton} ${classes.largeText}`}
        variant="contained"
        color="primary"
        onClick={submit}
      >
        Jetzt starten
      </Button>
      <Button className={`${classes.secondaryButton} ${classes.largeText}`} style={{ width: "240px" }}
        variant="contained" onClick={onSkip}>
        Ohne Postleitzahl weiter
      </Button>
      <img
        src={"/images/icon-security.svg"}
        alt="Security Icon"
        style={{ width: "24px", height: "24px", margin: "24px 0 12px 0" }}
      />
      <div style={{ marginBottom: "28px" }}>
        <Typography className={classes.smallText}>Siehe unsere Datenschutzrichtlinien.</Typography>
      </div>
    </>
  );
};
