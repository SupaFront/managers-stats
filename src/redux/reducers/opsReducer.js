const initialState = {
  name: '',
  result: '',
  additional: '',
  selected: false,
  authorized: false,
  isModalOpen: false,
  warningText: '',
  modalType: null,
  managers: [],
};

export const opsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'notes/add_SUCCESS':
      return { ...state };

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
        warningText: `Вы уверены, что хотите изменить запись менеджера ${payload.owner.login} за ${payload.createdAt}?`,
        modalType: 'edit',
        name: payload.name,
      };

    case 'prepareForDelete':
      return {
        ...state,
        warningText: `Вы уверены, что хотите удалить запись менеджера ${payload.owner.login} за ${payload.createdAt}?`,
        modalType: 'delete',
      };

    case 'users/getManagers_START':
      return { ...state, isLoading: true, error: null };

    case 'users/getManagers_SUCCESS':
      return { ...state, isLoading: false, error: null, managers: payload };
    case 'users/getManagers_FAILURE':
      return { ...state, isLoading: false, error: payload };

    default:
      return { ...state };
  }
};
