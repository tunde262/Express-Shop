import {
    GET_VARIANTS,
    VARIANT_ERROR,
    UPDATE_VARIANT_LIKES,
    DELETE_VARIANT,
    ADD_VARIANT,
    EDIT_VARIANT,
    UPDATE_VARIANT_LOCATIONS,
    ADD_VARIANT_LOCATIONS,
    GET_VARIANT,
    ADD_VARIANT_COMMENT,
    REMOVE_VARIANT_COMMENT,
    SET_SORTED_VARIANTS,
    SET_MODAL_VARIANTS,
    HANDLE_VAR_TAGS,
    REMOVE_VAR_TAGS,
    ADD_TO_VARIANTS,
    VARIANTS_LOADING
} from '../actions/types';
  
const initialState = {
    variants: [],
    sortedVariants: [],
    modalVariants: [],
    detailVariant: null,
    loading: true,
    tags: [],
    error: {}
};
  
export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case VARIANTS_LOADING:
            return {
                ...state,
                loading: true
            };
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
                detailVariant: payload,
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
        case EDIT_VARIANT:
            return {
                ...state,
                variants: state.variants.map(variant => 
                    variant._id.toString() === payload._id.toString() ? { ...variant, payload } : variant
                ),
                sortedVariants: state.sortedVariants.map(variant => 
                    variant._id.toString() === payload._id.toString() ? { ...variant, payload } : variant
                ),
                loading: false
            };
        case ADD_VARIANT_LOCATIONS:
            const tempVars2 = [...state.variants];
            const tempModalVars2 = [...state.modalVariants];

            let newLocations2 = [];
            let newModalLocations2 = [];

            tempVars2.map((tempVariant, index) => {
                if(tempVariant._id.toString() === payload.id.toString()) {
                    newLocations2.push(...tempVariant.locations);
                }
            })


            newLocations2.unshift(payload.location);

            tempModalVars2.map((tempModalVariant, index) => {
                if(tempModalVariant._id.toString() === payload.id.toString()) {
                    newModalLocations2.push(...tempModalVariant.locations)
                }
            })


            newModalLocations2.unshift(payload.location);

            return {
                ...state,
                variants: state.variants.map(variant =>
                    variant._id === payload.id ? { ...variant, locations: newLocations2 } : variant
                ),
                modalVariants: state.modalVariants.map(variant =>
                    variant._id === payload.id ? { ...variant, locations: newModalLocations2 } : variant
                ),
                // detailVariant: {...state.detailVariant, locations: newLocations},
                loading: false
            };
        case UPDATE_VARIANT_LOCATIONS:
            const tempVars = [...state.variants];
            const tempModalVars = [...state.modalVariants];

            let newLocations = [];
            let newModalLocations = [];

            tempVars.map((tempVariant, index) => {
                if(tempVariant._id.toString() === payload.id.toString()) {
                    tempVariant.locations.map((location, locIndex) => {
                        if(location.location.toString() === payload.location.location.toString()) {
                            tempVariant.locations.splice(locIndex, 1);
                            newLocations.push(...tempVariant.locations)
                        }
                    })
                }
            })


            newLocations.unshift(payload.location);

            tempModalVars.map((tempModalVariant, index) => {
                if(tempModalVariant._id.toString() === payload.id.toString()) {
                    tempModalVariant.locations.map((location, locIndex) => {
                        if(location.location.toString() === payload.location.location.toString()) {
                            tempModalVariant.locations.splice(locIndex, 1);
                            newModalLocations.push(...tempModalVariant.locations)
                        }
                    })
                }
            })


            newModalLocations.unshift(payload.location);

            return {
                ...state,
                variants: state.variants.map(variant =>
                    variant._id === payload.id ? { ...variant, locations: newLocations } : variant
                ),
                modalVariants: state.modalVariants.map(variant =>
                    variant._id === payload.id ? { ...variant, locations: newModalLocations } : variant
                ),
                // detailVariant: {...state.detailVariant, locations: newLocations},
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
                detailVariant: { ...state.detailVariant, comments: payload },
                loading: false
            };
        case REMOVE_VARIANT_COMMENT:
            return {
                ...state,
                detailVariant: {
                    ...state.detailVariant,
                    comments: state.detailVariant.comments.filter(
                    comment => comment._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state;
    }
}