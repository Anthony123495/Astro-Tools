// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// project-imports
import useAuth from 'hooks/useAuth';

// assets
import Google from 'assets/images/icons/google.svg';
import Facebook from 'assets/images/icons/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // @ts-ignore
  const { firebaseFacebookSignIn, firebaseGoogleSignIn} = useAuth();
  const googleHandler = async () => {
    try {
      await firebaseGoogleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  const facebookHandler = async () => {
    try {
      await firebaseFacebookSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      >
        {!matchDownSM && 'Facebook'}
      </Button>
    </Stack>
  );
}
