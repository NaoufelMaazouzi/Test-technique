const initialeState = () => ({
  product: [
    {
      name: '',
      type: '',
      price: '',
      rating: '',
      warranty_years: '',
      available: '',
    },
  ],
});

const changeProductsReducers = (state = initialeState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'CHANGE_TYPE':
      return {
        ...state,
        type: action.payload,
      };
    case 'CHANGE_PRICE':
      return {
        ...state,
        price: action.payload,
      };
    case 'CHANGE_RATING':
      return {
        ...state,
        rating: action.payload,
      };
    case 'CHANGE_warranty_years':
      return {
        ...state,
        warranty_years: action.payload,
      };
    case 'CHANGE_AVAILABLE':
      return {
        ...state,
        available: action.payload,
      };
    default:
      return state;
  }
};

export default changeProductsReducers;
