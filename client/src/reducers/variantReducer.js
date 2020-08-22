import {
    GET_VARIANTS,
    VARIANT_ERROR,
    UPDATE_VARIANT_LIKES,
    DELETE_VARIANT,
    ADD_VARIANT,
    GET_VARIANT,
    ADD_VARIANT_COMMENT,
    REMOVE_VARIANT_COMMENT,
    SET_SORTED_VARIANTS,
    SET_MODAL_VARIANTS,
    HANDLE_VAR_TAGS,
    REMOVE_VAR_TAGS,
    ADD_TO_VARIANTS
} from '../actions/types';
  
const initialState = {
    variants: [],
    sortedVariants: null,
    modalVariants: null,
    variant: null,
    loading: true,
    tags: [],
    error: {}
};
  
export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_VARIANTS:
            return {
                ...state,
                variants: payload,
                sortedVariants: payload,
                loading: false
            };
        case GET_VARIANT:
            return {
                ...state,
                variant: payload,
                loading: false
            };
        case ADD_TO_VARIANTS: {
            const newVariants = [...state.variants, action.payload];

            return {
                ...state,
                variants: newVariants,
            };
        }
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
        case SET_SORTED_VARIANTS: {
            const variants = payload;
            console.log(variants);
    
            return {
                ...state,
                sortedVariants: variants,
            };
        }
        case SET_MODAL_VARIANTS: {
            const variants = action.payload;
            console.log(variants);

            return {
                ...state,
                modalVariants: variants,
                loading: false
            };
        }
        case HANDLE_VAR_TAGS: 
            let tempVar = [...state.variants];
            const tags = [...state.tags, payload];
            let res;
            for(var i = 0; i < tags.length; i++) {
                res = tempVar.filter(variant => variant.tags.includes(tags[i]));
            }
            return {
                ...state,
                tags: [...state.tags, payload],
                sortedVariants: res,
            }
        case REMOVE_VAR_TAGS: 
            return {
                ...state,
                tags: [...state.tags.filter(tag => tag !== payload)]
                }
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