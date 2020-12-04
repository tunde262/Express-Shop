import { 
    SET_PRODUCTS, 
    GET_PRODUCTS, 
    SET_SELECTED_ITEMS, 
    CLEAR_PRODUCTS, 
    SET_SORTED_PRODUCTS, 
    SET_MODAL_PRODUCTS, 
    ADD_TO_PRODUCTS, 
    ADD_PRODUCT, 
    EDIT_PRODUCT, 
    UPDATE_PRODUCT_LIKES, 
    UPDATE_PRODUCT_VIEWS,
    PRODUCTS_LOADING, 
    HANDLE_DETAIL, 
    ADD_TO_CART, 
    OPEN_OVERVIEW, 
    CLOSE_OVERVIEW, 
    OPEN_MODAL, 
    HANDLE_MAP, 
    CLOSE_MODAL, 
    CLEAR_CART,
    ADD_TOTALS, 
    GET_CART, 
    GET_ORDERS, 
    HANDLE_TAGS, 
    REMOVE_TAGS, 
    INC_IMG_GALLERY, 
    DEC_IMG_GALLERY 
} from '../actions/types';

const initialState = {
    products: [],
    sortedProducts: [],
    modalProducts: [],
    selectedItems: [],
    exploreTops: [],
    exploreBottoms: [],
    exploreHats: [],
    exploreSocks: [],
    featuredProducts: [],
    loading: true,
    location: 'all',
    category: 'all',
    tags: [],
    gender: 'all',
    switchMaps: false,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    detailProduct: null,
    cart: [],
    cartStores: [],
    cartOverview: false,
    modalOpen: false,
    modalProduct: null,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
    cartQty: 0
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: [],
                sortedProducts: [],
            };
        case SET_PRODUCTS: {
            const products = action.payload;
            let tempProd = products; 
            // let featuredProducts = tempProd.filter(product => product.featured === true);
            
            if(state.products.length > 0) {
                tempProd = [...state.products, ...tempProd ];
            }

            // let exploreTops = tempProd.filter(product => product.category === 'top');
            // let exploreBottoms = tempProd.filter(product => product.category === 'bottom');
            // let exploreHats = tempProd.filter(product => product.category === 'hat');
            // let exploreSocks = tempProd.filter(product => product.category === 'socks');
            // let maxPrice = Math.max(...products.map(product => product.price));

            return {
                ...state,
                products: tempProd,
                sortedProducts: tempProd,
                // featuredProducts,
                // price: maxPrice,
                // maxPrice,
                loading: false
            };
        }
        case GET_PRODUCTS: {
            const products = action.payload;
            let tempProd = products; 
            

            return {
                ...state,
                products: tempProd,
                sortedProducts: tempProd,
                loading: false
            };
        }
        case SET_SORTED_PRODUCTS: {
            const products = action.payload;
            console.log(products);
            // let featuredProducts = tempProd.filter(product => product.featured === true);
            // let maxPrice = Math.max(...products.map(product => product.price));

            return {
                ...state,
                sortedProducts: products,
                loading: false
                // featuredProducts,
                // price: maxPrice,
                // maxPrice
            };
        }
        case SET_MODAL_PRODUCTS: {
            const products = action.payload;
            console.log(products);
            // let featuredProducts = tempProd.filter(product => product.featured === true);
            // let maxPrice = Math.max(...products.map(product => product.price));

            return {
                ...state,
                modalProducts: products,
                loading: false
                // featuredProducts,
                // price: maxPrice,
                // maxPrice
            };
        }
        case SET_SELECTED_ITEMS: {
            const newItem = action.payload;
            let tempItems = [...state.selectedItems];
            const selectedArr = [];
            if(tempItems.filter(item => item === newItem).length > 0) {
                // Get remove index
                const removeIndex = tempItems.indexOf(newItem);
    
                const newList = tempItems.splice(removeIndex, 1);
                
                selectedArr.push(...newList);
            } else {
                selectedArr.push(...tempItems, newItem);
            }
            console.log('ITEM');
            console.log(newItem);
            console.log(selectedArr);
            return {
                ...state,
                selectedItems: selectedArr
            };
        }
        case ADD_TO_PRODUCTS: {
            const newProducts = [...state.products, action.payload];

            return {
                ...state,
                products: newProducts,
            };
        }
        case ADD_PRODUCT:
            return {
            ...state,
            products: [action.payload, ...state.products],
            detailProduct: action.payload,
            loading: false
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                detailProduct: action.payload,
                loading: false
            };
        case UPDATE_PRODUCT_LIKES:
            let tempDetailProd = state.detailProduct;

            if(tempDetailProd._id === action.payload.id) { 
                tempDetailProd = {...tempDetailProd, likes: action.payload.likes }
            }

            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload.id ? { ...product, likes: action.payload.likes } : product
                ),
                sortedProducts: state.products.map(product =>
                    product._id === action.payload.id ? { ...product, likes: action.payload.likes } : product
                ),
                detailProduct: tempDetailProd
            };
        case UPDATE_PRODUCT_VIEWS:
            let tempDetail = state.detailProduct;

            if(tempDetail._id === action.payload.id) { 
                tempDetail = {...tempDetail, prod_views: action.payload.prod_views }
            }

            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload.id ? { ...product, prod_views: action.payload.prod_views } : product
                ),
                sortedProducts: state.products.map(product =>
                    product._id === action.payload.id ? { ...product, prod_views: action.payload.prod_views } : product
                ),
                detailProduct: tempDetail
            };
        // case INC_IMG_GALLERY:
        //     let orderNum;
        //     let tempProduct = {...state.detailProduct};
        //     for(var i = 0; i < state.detailProduct.img_gallery.length; i++) {
        //         if(state.detailProduct.img_gallery[i]['_id'] === action.payload) {
        //             orderNum = state.detailProduct.img_gallery[i].img_order
        //             break;
        //         }
        //     }

        //     console.log('ORDER NUM');
        //     console.log(orderNum);

        //     if(orderNum < state.detailProduct.img_gallery.length) {
        //         const newOrderNum = orderNum + 1;
        //         console.log('NEW ORDER NUM');
        //         console.log(newOrderNum);

        //         for(var i = 0; i < state.detailProduct.img_gallery.length; i++) {
        //             if(state.detailProduct.img_gallery[i]['img_order'] === newOrderNum) {
        //                 tempProduct.img_gallery.map(image =>
        //                     image._id === state.detailProduct.img_gallery[i]._id ? { ...image, img_order: orderNum } : image
        //                 )
        //                 break;
        //             }
        //         }

        //         // Update
        //         tempProduct.img_gallery.map(image =>
        //             image._id === action.payload ? { ...image, img_order: newOrderNum } : image
        //         )
        //         console.log('TEMP PRODUCT');
        //         console.log(tempProduct);
        //     } else {
        //         console.log('Element order couldnt be changed');
        //     }

        //     return {
        //         ...state,
        //         detailProduct: tempProduct
        //     };
        // case DEC_IMG_GALLERY:
        //     let orderNumDec;
        //     let tempProductDec = {...state.detailProduct};
        //     for(var i = 0; i < state.detailProduct.img_gallery.length; i++) {
        //         if(state.detailProduct.img_gallery[i]['_id'] === action.payload) {
        //             orderNumDec = state.detailProduct.img_gallery[i].img_order
        //             break;
        //         }
        //     }

        //     console.log('ORDER NUM');
        //     console.log(orderNumDec);

        //     if(orderNumDec  > 1) {
        //         const newOrderNumDec = orderNumDec - 1;
        //         console.log('NEW ORDER NUM');
        //         console.log(newOrderNumDec);

        //         for(var i = 0; i < state.detailProduct.img_gallery.length; i++) {
        //             if(state.detailProduct.img_gallery[i]['img_order'] === newOrderNumDec) {
        //                 tempProductDec.img_gallery.map(image =>
        //                     image._id === state.detailProduct.img_gallery[i]._id ? { ...image, img_order: orderNumDec } : image
        //                 )
        //                 break;
        //             }
        //         }

        //         // Update
        //         tempProductDec.img_gallery.map(image =>
        //             image._id === action.payload ? { ...image, img_order: newOrderNumDec } : image
        //         )
        //         console.log('TEMP PRODUCT');
        //         console.log(tempProduct);
        //     } else {
        //         console.log('Element order couldnt be changed');
        //     }

        //     return {
        //         ...state,
        //         detailProduct: tempProductDec
        //     };
        case HANDLE_TAGS: 
            let tempProd = [...state.products];
            const tags = [...state.tags, action.payload];
            let res;
            if (action.payload === 'explore') {
                res = tempProd;
            } else {
                for(var i = 0; i < tags.length; i++) {
                    res = tempProd.filter(prod => prod.tags.includes(tags[i]));
                }
            }
            // let maxPrice = Math.max(...res.map(product => product.price));
            return {
                ...state,
                tags: [...state.tags, action.payload],
                sortedProducts: res,
                // price: maxPrice,
                // maxPrice
            }
        case REMOVE_TAGS: 
            return {
                ...state,
                tags: [...state.tags.filter(tag => tag !== action.payload)]
            }
        case HANDLE_DETAIL: 
            return {
                ...state,
                detailProduct: action.payload,
                modalProduct: action.payload,
                loading: false
            };
        case GET_CART: {
            const arr = [];
            const storeList = [];

            for (const id in action.payload.items) {
                arr.push(action.payload.items[id]);
            }

            arr.map(item => {
                if(!storeList.filter(itemStore => itemStore.store.toString() === item.item.store.toString()).length > 0) {
                    storeList.push({
                        store: item.item.store
                    })
                }
            });

            let subTotal = action.payload.totalPrice;
            // const tempTax = subTotal * 0.1;
            // const tax = parseFloat(tempTax.toFixed(2));
            const tax = 5;
            const total = subTotal + tax;
            const totalQty = action.payload.totalQty;
            return {
                ...state,
                cart: arr,
                cartStores: storeList,
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total,
                cartQty: totalQty,
                loading: false
            }
        }
        case ADD_TO_CART: {
            const arr = [];
            for (const id in action.payload.items) {
                arr.push(action.payload.items[id]);
            }

            let subTotal = action.payload.totalPrice;
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = subTotal + tax;
            const totalQty = action.payload.totalQty;
            return {
                ...state,
                cart: arr,
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total,
                cartQty: totalQty
            }
        }
        case OPEN_OVERVIEW: 
            return {
                ...state,
                cartOverview: true
            }
        case CLOSE_OVERVIEW: 
            return {
                ...state,
                cartOverview: false
            }
        case OPEN_MODAL: 
            return {
                ...state,
                modalProduct: action.payload,
                modalOpen: true
            }
        case HANDLE_MAP: 
            return {
                ...state,
                switchMaps: !state.switchMaps
            }
        case CLOSE_MODAL: 
            return {
                ...state,
                modalOpen: false
            }

        case CLEAR_CART: 
            return {
                ...state,
                cart: []
            }
        case ADD_TOTALS: {
            let subTotal = 0;
            state.cart.map(item => (subTotal += item.price));
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = subTotal + tax;
            return {
                ...state,
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        }
        default:
            return state;
    }
}