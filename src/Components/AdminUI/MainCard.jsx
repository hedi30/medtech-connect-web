import React, { forwardRef } from 'react';
import { keyframes } from '@emotion/react'; // Import keyframes from @emotion/react

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from './useConfig';

// constant
const headerStyle = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// Define wave animation using keyframes from @emotion/react
const waveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MainCard = forwardRef(function MainCard(
  {
    border = false,
    boxShadow,
    children,
    content = true,
    contentClass = '',
    contentSX = {},
    headerSX = {},
    darkTitle,
    secondary,
    shadow,
    sx = {},
    title,
    waveEffect = false, // Add prop for wave effect
    ...others
  },
  ref
) {
  const { mode } = useConfig();
  const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: 'divider',
        ':hover': {
          boxShadow: boxShadow ? shadow || defaultShadow : 'inherit',
        },
        ...(waveEffect && {
          animation: `${waveAnimation} 2s infinite ease-in-out`, // Apply wave animation
        }),
        ...sx,
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ ...headerStyle, ...headerSX }} title={title} action={secondary} />}
      {darkTitle && title && (
        <CardHeader sx={{ ...headerStyle, ...headerSX }} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});

export default MainCard;
