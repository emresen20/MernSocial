
import {CREATE,UPDATE,FETCH_ALL,LIKE,DELETE,FETCH_BY_SEARCH} from '../constants/actionTypes'


export default (state=[],action)=>{
    switch (action.type) {
        case FETCH_ALL:
            
        return {
            ...state,
            posts:action.payload.data,
            currentPage:action.payload.currentPage,//backenden gelen verilere göre yazdım
            numberOfPage:action.payload.numberOfPage
        };
            
    
        case CREATE:
            return [...state,action.payload];

        case UPDATE:
            return  state.map(post=>post._id===action.payload._id ? action.payload :
                post
            ); // action.payloddan gelen id bizim id ye eşitse yeni gelen acitonu payload ediyoruz

        case DELETE:
            return state.filter(p=>p._id!==action.payload);  //action.payload actions içinde yazarken dispatche verdiğimiz payload:id dir
                //actiındaki id ye eşit olamaynları çıkar anlamında 

        case LIKE:
            return state.map(post=>post._id===action.payload._id ? action.payload :
                post)

        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts:action.payload
            }
                
        default:
            return state;
    }
}