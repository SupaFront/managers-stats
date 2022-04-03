const initialState = {
  name: '',
  result: '',
  additional: '',
  selected: false,
  authorized: false,
  isModalOpen: false,
  warningText: '',
  modalType: null,
};

export const opsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'notes/add_SUCCESS':
      return { ...state, name: payload.name };

    case 'chooseName':
      return { ...state, ...payload, selected: true };

    case 'logIn':
      return { ...state, authorized: true };

    case 'openModal':
      return {
        ...state,
        isModalOpen: true,
      };
    case 'closeModal':
      return {
        ...state,
        isModalOpen: false,
        warningText: '',
        modalType: '',
      };
    case 'prepareForEdit':
      return {
        ...state,
        warningText: `Вы уверены, что хотите изменить запись менеджера ${payload.name} за ${payload.date}?`,
        modalType: 'edit',
        name: payload.name,
      };

    case 'prepareForDelete':
      return {
        ...state,
        warningText: `Вы уверены, что хотите удалить запись менеджера ${payload.name} за ${payload.date}?`,
        modalType: 'delete',
      };
    // case 'notes/edit_SUCCESS':
    //   return { ...state, name: '' };

    default:
      return { ...state };
  }
};
