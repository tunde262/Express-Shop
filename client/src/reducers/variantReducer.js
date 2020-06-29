import {
    GET_VARIANTS,
    VARIANT_ERROR,
    UPDATE_VARIANT_LIKES,
    DELETE_VARIANT,
    ADD_VARIANT,
    GET_VARIANT,
    ADD_VARIANT_COMMENT,
    REMOVE_VARIANT_COMMENT
} from '../actions/types';
  
const initialState = {
    variants: [],
    variant: null,
    loading: true,
    error: {}
};
  
export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_VARIANTS:
            return {
                ...state,
                variants: payload,
                loading: false
            };
        case GET_VARIANT:
            return {
                ...state,
                variant: payload,
                loading: false
            };
        case ADD_VARIANT:
            return {
                ...state,
                variants: [payload, ...state.variants],
                loading: false
            };
        case DELETE_VARIANT:
            return {
                ...state,
                variants: state.variants.filter(variant => variant._id !== payload),
                loading: false
            };
        case VARIANT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_VARIANT_LIKES:
            return {
                ...state,
                variants: state.variants.map(variant =>
                    variant._id === payload.id ? { ...variant, likes: payload.likes } : variant
                ),
                loading: false
            };
        case ADD_VARIANT_COMMENT:
            return {
                ...state,
                variant: { ...state.variant, comments: payload },
                loading: false
            };
        case REMOVE_VARIANT_COMMENT:
            return {
                ...state,
                variant: {
                    ...state.variant,
                    comments: state.variant.comments.filter(
                    comment => comment._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state;
    }
}