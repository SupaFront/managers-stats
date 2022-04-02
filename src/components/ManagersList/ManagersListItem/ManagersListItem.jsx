import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, prepareForDelete, prepareForEdit } from '../../../redux/actions/opsActions';
import { getAuthorized } from '../../../redux/selectors/opsSelectors';
export default function ManagersListItem({ note }) {
  const dispatch = useDispatch();
  const authorized = useSelector(getAuthorized);

  // return (
  //   <li key={note.id}>
  //     <p>{note && note.name}</p>
  //     <span>Результат: {note && note.result}</span>
  //     <p>{note && note.additional}</p>
  //     <span>{note.date && note.date}</span>
  //     {authorized && (
  //       <>
  //         <button
  //           onClick={() => {
  //             dispatch(prepareForEdit({ ...note }));
  //             dispatch(openModal());
  //           }}
  //         >
  //           Редактировать
  //         </button>
  //         <button
  //           onClick={() => {
  //             dispatch(prepareForDelete({ ...note }));
  //             dispatch(openModal());
  //           }}
  //         >
  //           Удалить
  //         </button>
  //       </>
  //     )}
  //   </li>
  // );

  return (
    <li>
      <Card key={note.id} sx={{ width: '600px' }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {note && note.name}
          </Typography>
          <Typography variant="body5" color="text.secondary">
            Результат: {note && note.result}
          </Typography>
          <Typography variant="body4" color="text.secondary">
            Информация:{note && note.additional}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {note && note.date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              dispatch(prepareForEdit({ ...note }));
              dispatch(openModal());
            }}
            size="small"
          >
            Изменить
          </Button>
          <Button
            onClick={() => {
              dispatch(prepareForDelete({ ...note }));
              dispatch(openModal());
            }}
            size="small"
          >
            Удалить
          </Button>
        </CardActions>
      </Card>
    </li>
  );
}
