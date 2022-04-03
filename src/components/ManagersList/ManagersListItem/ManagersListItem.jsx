import { Card, CardActions, CardContent, IconButton, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { openModal, prepareForDelete, prepareForEdit } from '../../../redux/actions/opsActions';

export default function ManagersListItem({ note }) {
  const dispatch = useDispatch();

  return (
    <ListItem sx={{ padding: 0 }}>
      <Card key={note.id} sx={{ width: '100%' }}>
        <CardContent sx={{ padding: '5px' }}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'}>
            <Typography variant="h6" component="h6">
              {note && note.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Результат: </b> {note && note.result}
            </Typography>
            <Typography
              sx={{
                display: 'inline-block',
                width: 'inherit',
                wordWrap: 'break-word',
              }}
              variant="body2"
              color="text.secondary"
              component="span"
            >
              <b>Доп.инфо:</b>
              {note && note.additional}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            borderTop: 'solid 1px #5cc465',
            padding: '5px 5px 5px 5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box height={'34px'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            {note.date && (
              <Typography sx={{ fontSize: '12px', fontWeight: 700 }} color="text.secondary">
                Создана {note.date}
              </Typography>
            )}
            {note.editDate && (
              <Typography
                sx={{ fontSize: '12px', fontWeight: 700 }}
                variant="body2"
                color="text.secondary"
              >
                Последнее изменение {note.editDate && note.editDate}
              </Typography>
            )}
          </Box>
          <CardActions sx={{ padding: 0 }}>
            <IconButton
              color="secondary"
              sx={{
                backgroundColor: '#fff',
                color: '#fccf38',

                borderRadius: '25px',
                padding: '5px',
                '&:hover': {
                  backgroundColor: '#fccf38',
                  color: '#fff',
                },
              }}
              onClick={() => {
                dispatch(prepareForEdit({ ...note }));
                dispatch(openModal());
              }}
            >
              <EditIcon sx={{ height: '20px', width: '20px' }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#fff',
                color: '#d32f2f',

                borderRadius: '25px',
                padding: '5px',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                },
              }}
              onClick={() => {
                dispatch(prepareForDelete({ ...note }));
                dispatch(openModal());
              }}
            >
              <DeleteOutlineIcon sx={{ height: '20px', width: '20px' }} />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    </ListItem>
  );
}
