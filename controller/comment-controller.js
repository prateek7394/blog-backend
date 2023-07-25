
import Comment from "../model/comment.js"

export const addComment = async(request, response) => {
  try{
    const newComment = await new Comment(request.body);
    newComment.save();

    return response.status(200).json({msg: 'Comment posted successfully!'})

  }
  catch(error){
    return response.status(500).json({error: error.message})
  }
}

export const getAllComments = async(request, response) => {
  try{
    const Comments = await Comment.find({ postId: request.params.id});
    return response.status(200).json(Comments);
  }
  catch(error){
    return response.status(500).json({error: error.message});

  }
}

export const deleteComment = async(request, response) => {
  try{
    const comment = await Comment.findById(request.params.id);
    await comment.delete();

    return response.status(200).json({msg: 'Comment deleted successfully!'})
  }
  catch(error){
    
    return response.status(500).json({error: error.message});
  }
}