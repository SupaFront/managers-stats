import SaveIcon from '@mui/icons-material/Save';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { getAuthorized } from '../../redux/selectors/opsSelectors';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export default function AddForm({ submitForm }) {
  const authorized = useSelector(getAuthorized);

  const validationSchema = yup.object().shape({
    additional: yup.string().required('Обязательное поле!'),
    result: yup.string().required('Выберите ответ!'),
    name: yup.string().required('Выберите Менеджера!'),
  });
  return (
    <Box
      sx={{
        padding: '10px 10px 20px 10px ',
        marginBottom: '40px',
        borderBottom: '2px solid #5cc465',
      }}
    >
      <Formik
        initialValues={{ additional: '', result: '', name: '' }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, dirty, isValid }) => (
          <Box display={'flex'}>
            <Box display={'flex'} flexDirection={'column'}>
              <FormControl sx={{ position: 'relative' }}>
                <FormLabel id="result">Результат</FormLabel>
                <RadioGroup
                  aria-labelledby="result"
                  row
                  defaultValue=""
                  name="result"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel value="+" control={<Radio />} label="Плюс" />
                  <FormControlLabel value="-" control={<Radio />} label="Минус" />
                </RadioGroup>
                {touched.result && errors.result && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 58,
                      top: 19,
                      fontSize: '11px',
                    }}
                    color="error"
                  >
                    {errors.result}
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ position: 'relative' }}>
                <TextField
                  label="Дополнительная информация"
                  variant="outlined"
                  name="additional"
                  id="additional"
                  multiline
                  value={values.additional}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></TextField>
                {touched.additional && errors.additional && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 17,
                      top: 57,
                      fontSize: '11px',
                    }}
                    color="error"
                  >
                    {errors.additional}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <Box
              marginLeft={'10px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
            >
              {authorized && (
                <>
                  <FormControl sx={{ position: 'relative', mt: '15px' }}>
                    <InputLabel id="select-label">Имя</InputLabel>
                    <Select
                      labelId="select-label"
                      name="name"
                      value={values.name}
                      id="name"
                      label="Имя"
                      sx={{ width: '150px', height: '40px' }}
                      onChange={handleChange}
                    >
                      <MenuItem value="Яна">Яна</MenuItem>
                      <MenuItem value="Людмила">Людмила</MenuItem>
                      <MenuItem value="Карина 1">Карина 1</MenuItem>
                      <MenuItem value="Карина 2">Карина 2</MenuItem>
                    </Select>
                    {touched.name && errors.name && (
                      <Typography
                        sx={{
                          position: 'absolute',
                          left: 15,
                          top: 42,
                          fontSize: '11px',
                        }}
                        color="error"
                      >
                        {errors.name}
                      </Typography>
                    )}{' '}
                  </FormControl>
                </>
              )}
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                type="submit"
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
              >
                Добавить
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
