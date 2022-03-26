import { useState, Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const InputWrapper = styled.div`
  width: 30vw;
  margin-top: 3rem;
`;

const colorcss = {
  root: {
    "&$checked": {
      color: "#D9001D",
    },
    "&$focused": {
      color: "#D9001D",
    },
  },
};

interface InputdataProps {
  setData: Function;
}

export default function Inputdata({ setData }: InputdataProps) {
  const [forsale, setForsale] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForsale(event.target.checked);
  };

  return (
    <InputWrapper>
      <Typography>Title</Typography>
      <TextField
        required
        id="standard-required"
        variant="standard"
        size="small"
        onChange={() => {}}
        style={{ marginBottom: "1rem", width: "20vw" }}
      />
      <Typography>Description</Typography>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={7}
        placeholder="Describe your art work"
        margin="normal"
        fullWidth
      />
      <div css={{ display: "flex" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={forsale}
              onChange={handleChange}
              css={colorcss}
            />
          }
          label="For Sale"
          labelPlacement="start"
          sx={{ margin: "0" }}
        />
        <FormControl sx={{ m: 1, width: "10vw" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">♦️</InputAdornment>
            }
            label="Price"
            disabled={!forsale}
          />
        </FormControl>
      </div>
    </InputWrapper>
  );
}