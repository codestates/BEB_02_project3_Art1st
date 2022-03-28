import { useState, useEffect, ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { FormControl } from '@mui/material';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: '1rem',
  },
}));

function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (image) URL.revokeObjectURL(imageUrl);
    if (image) console.log(typeof image);

    const images = e.target.files;

    if (images) {
      const newImageUrl = URL.createObjectURL(images[0]);
      setImage(images[0]); //object
      setImageUrl(newImageUrl); //string
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setImageUrl('');
      setImage(null);
    };
  }, []);

  return (
    <FormControl sx={{ mt: '7vh' }}>
      <Card sx={{ minWidth: '100%', minHeight: '40vh' }} elevation={4}>
        <LightTooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 300 }}
          title="Click to Upload"
        >
          <CardActionArea>
            <label style={{ cursor: 'pointer' }} htmlFor="input-file">
              <input
                type="file"
                id="input-file"
                accept="img/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <Box sx={{ minWidth: '100%', height: '100%', minHeight: '40vh' }}>
                {imageUrl ? (
                  <CardMedia
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    component="img"
                    image={imageUrl}
                  />
                ) : (
                  <AddPhotoAlternateIcon
                    color="disabled"
                    sx={{ width: '100%', height: '12vh', mt: '13vh' }}
                  />
                )}
              </Box>
            </label>
          </CardActionArea>
        </LightTooltip>
      </Card>
    </FormControl>
  );
}

export default UploadImage;
