import { useState, FormEvent, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useMutation } from 'react-query';

import PwInput from './PwInput';

import { postUserSignup, postUserLogin } from '@/api/user/post';

interface InputFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const loginButtonCss = {
  m: '3rem 0 auto auto',
  width: '100%',
  height: '2.3rem',
};

function InputForm({ isLogin, setIsLogin }: InputFormProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const userSignupMutation = useMutation(postUserSignup);
  const userLoginMutation = useMutation(postUserLogin);

  const handleIdChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUserId(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId && password) {
      if (isLogin) userLoginMutation.mutate({ userId, password });
      else if (checked) userSignupMutation.mutate({ userId, password });
    }
  };

  const handleAgree = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setUserId('');
    setPassword('');
    setChecked(false);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      component="form"
      onSubmit={handleSubmit}
    >
      <FormControl sx={{ mt: '2rem' }}>
        <TextField
          variant="standard"
          label="Id"
          onChange={handleIdChange}
          value={userId}
        />
      </FormControl>

      <PwInput password={password} setPassword={setPassword} />

      {!isLogin && (
        <FormControlLabel
          sx={{ mt: '1rem' }}
          control={
            <Checkbox
              checked={checked}
              onChange={handleAgree}
              color="primary"
            />
          }
          label="I agree to the terms and conditions."
        />
      )}

      <Button sx={loginButtonCss} type="submit" variant="contained">
        {isLogin ? 'Login' : 'Sign In'}
      </Button>

      <Button
        sx={{ mt: '1rem' }}
        type="button"
        onClick={handleSwitch}
        variant="text"
      >
        {isLogin ? 'Create new account?' : 'Already have an account?'}
      </Button>
    </Box>
  );
}

export default InputForm;
