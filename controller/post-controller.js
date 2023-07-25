
import Post from "../model/post.js"


export const createPost = async(request, response) => {
    try{
        const post = new Post(request.body);

        if(post.title == "" || post.description == ''){
            
        }
        else{
            post.save();
            return response.status(200).json({msg: 'Post saved successfully!'})
        }

    }
    catch(error){
        return response.status(500).json(error);
    }
}


export const getAllPosts = async(request, response) => {
    let category = request.query.category;
    let posts;
    try{
        if(category){
            // collecting posts of that specific category
            posts = await Post.find({categories: category})
        }
        else{
            // collecting all posts from mongoDB
             posts = await Post.find({});

        }


        return response.status(200).json(posts);
    }
    catch(error) {
        return response.status(500).json({msg: error.message})
    }

}

export const getPost = async(request, response) => {
    let id = request.params.id;
    try{
        const post = await Post.findById(id);

        return response.status(200).json(post);
    }
    catch(error){
        return response.status(500).json({msg: error.message});
    }
}

export const updatePost = async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post) {
            return response.status(404).json({msg: 'Post not found!'})
        }
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body})
        // $set replaces an object in an array
        // $addToSet appends an object in an array

        return response.status(200).json({msg: 'Post updated successfully!'})
    }
    catch(error){
        return response.status(500).json({msg: error.message});
    }
};


export const deletePost = async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post) {
            return response.status(404).json({msg: 'Post not found!'})
        }
        await post.delete();
        return response.status(200).json({msg: 'Post deleted successfully!'})
    }
    catch(error){
        return response.status(500).json({msg: error.message});
    }
}