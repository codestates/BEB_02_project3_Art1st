import { FormEvent } from 'react';

import Box from '@mui/material/Box';

import Title from './fragment/Title';
import Description from './fragment/Description';
import Uploadimage from './fragment/UploadImage';
import InputTags from './fragment/InputTags';
import UploadButton from './fragment/UploadButton';
import ForSale from './fragment/ForSale';

const wrapperCss = {
  display: 'flex',
  flexDirection: 'column',
  m: '6rem 30vw 0 30vw',
};

function Form() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};
  return (
    <Box sx={wrapperCss} component="form" onSubmit={handleSubmit}>
      <Title />
      <Uploadimage />
      <Description />
      <InputTags />
      <ForSale />
      <UploadButton />
    </Box>
  );
}

export default Form;