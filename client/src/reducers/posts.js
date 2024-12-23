

export default (posts=[],action)=>{
    switch (action.type) {
        case 'FETCH_ALL':
            
        return action.payload;
            
    
        case 'CREATE':
            return [action.payload,...posts];

        case 'UPDATE':
            return  posts.map(post=>post._id===action.payload._id ? action.payload :
                post
            )    // action.payloddan gelen id bizim id ye eşitse yeni gelen acitonu payload ediyoruz

        default:
            return posts;
    }
}