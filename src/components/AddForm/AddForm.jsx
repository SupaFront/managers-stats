import SaveIcon from '@mui/icons-material/Save';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { getManagersList } from '../../redux/selectors/ops-selectors';
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
import { getUserRole } from '../../redux/selectors/auth-selectors';

const validationSchema = yup.object().shape({
  additional: yup.string().required('Обязательное поле!'),
  result: yup.string().required('Выберите ответ!'),
  owner: yup.string().required('Выберите Менеджера!'),
});

export default function AddForm({ submitForm }) {
  const role = useSelector(getUserRole);
  const managers = useSelector(getManagersList);

  return (
    <Box
      sx={{
        padding: '10px 10px 20px 10px ',
        marginBottom: '40px',
        borderBottom: '2px solid #5cc465',
      }}
    >
      <Formik
        initialValues={{ additional: '', result: '', owner: '' }}
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
              {role === 'admin' && (
                <>
                  <FormControl sx={{ position: 'relative', mt: '15px' }}>
                    <InputLabel id="select-label">Имя</InputLabel>
                    <Select
                      labelId="select-label"
                      name="owner"
                      value={values.owner}
                      id="owner"
                      label="Имя"
                      sx={{ width: '150px', height: '40px' }}
                      onChange={handleChange}
                    >
                      {managers.length &&
                        managers.map(manager => (
                          <MenuItem key={manager._id} value={manager._id}>
                            {manager.login}
                          </MenuItem>
                        ))}
                    </Select>
                    {touched.owner && errors.owner && (
                      <Typography
                        sx={{
                          position: 'absolute',
                          left: 15,
                          top: 42,
                          fontSize: '11px',
                        }}
                        color="error"
                      >
                        {errors.owner}
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
