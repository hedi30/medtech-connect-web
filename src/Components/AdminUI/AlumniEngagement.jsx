import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import Chart from 'react-apexcharts';

// project imports
import ChartDataMonth from './chart-data/alumni-engagement-month';
import MainCard from './MainCard';
import SkeletonTotalOrderCard from './EarningCard';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from 'styled-components';

const blueColor = "#0083a9"; // Define the blue color

export default function Alumni({ isLoading }) {
  const theme = useTheme();
  const [timeValue, setTimeValue] = React.useState(false);

  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  const renderCard = (title, chartData) => {
    const currentMonthValue = 109; // Set to give 9% increase
    const previousMonthValue = 100;
    const percentageChange = ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;

    return (
      <MainCard
        border={false}
        content={false}
        sx={{
          bgcolor: 'primary.dark',
          color: '#fff',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: 500, // 👈 smaller width
          width: '100%',
          mx: 'auto',    // 👈 horizontal centering (margin left & right auto)
          '& > div': { position: 'relative', zIndex: 5 },
          '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: 'linear-gradient(744deg, #E0F7FA, #B3E5FC 60%, #0083a9)', // Use #0083a9 here
            borderRadius: '50%',
            top: { xs: -85 },
            right: { xs: -95 }
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: 'linear-gradient(744deg, #E0F7FA, #B3E5FC 60%, #0083a9)', // Use #0083a9 here
            borderRadius: '50%',
            top: { xs: -125 },
            right: { xs: -15 },
            opacity: 0.5
          }
        }}
      >
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid>
              <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: 'primary.800',
                      color: '#fff',
                      mt: 1
                    }}
                  >
                    <LocalMallOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </Grid>
                <Grid>
                  <Button
                    disableElevation
                    variant={timeValue ? 'contained' : 'text'}
                    size="small"
                    sx={{ color: 'inherit' }}
                    onClick={(e) => handleChangeTime(e, true)}
                  >
                    Month
                  </Button>
                  <Button
                    disableElevation
                    variant={!timeValue ? 'contained' : 'text'}
                    size="small"
                    sx={{ color: 'inherit' }}
                    onClick={(e) => handleChangeTime(e, false)}
                  >
                    Year
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ mb: 0.75 }}>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid size={6}>
                  <Grid container sx={{ alignItems: 'center' }}>
                    <Grid>
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        {percentageChange.toFixed(2)}%
                      </Typography>
                    </Grid>
                    <Grid>
                      <Avatar
                        sx={{
                          ...theme.typography.smallAvatar,
                          cursor: 'pointer',
                          bgcolor: percentageChange >= 0 ? '#ADD8E6' : 'error.main',
                          color: '#fff'
                        }}
                      >
                        {percentageChange >= 0 ? (
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        ) : (
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, -45deg)' }} />
                        )}
                      </Avatar>
                    </Grid>
                    <Grid size={12}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'primary.200'
                        }}
                      >
                        {title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={6}
                  sx={{
                    '.apexcharts-tooltip.apexcharts-theme-light': {
                      color: theme.palette.text.primary,
                      background: theme.palette.background.default,
                      ...theme.applyStyles('dark', { border: 'none' })
                    }
                  }}
                >
                  <Chart {...chartData} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <StyledWaveWrapper>
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
        </StyledWaveWrapper>
      </MainCard>
    );
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {renderCard('Alumni Engagement', ChartDataMonth)}
          </Grid>
        </Grid>
      )}
    </>
  );
}

Alumni.propTypes = { isLoading: PropTypes.bool };

const StyledWaveWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .wave {
    position: absolute;
    width: 200%;
    height: 300%;
    opacity: 0.1;
    left: -50%;
    top: -100%;
    background: linear-gradient(744deg, #E0F7FA, #B3E5FC 60%, #81D4FA);    
    border-radius: 40%;
    z-index: -1;
  }

  .wave:nth-child(2) {
    top: 20%;
    animation-duration: 50s;
  }

  .wave:nth-child(3) {
    top: 40%;
    animation-duration: 45s;
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
