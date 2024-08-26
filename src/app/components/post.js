import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

const Post = ({ post, addComment, likePost }) => {
  const { post_id, first_name, last_name, content, comments, likes, created_at, category } = post;
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleAddComment = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (commentText.trim()) {
        addComment(post_id, commentText);
        setCommentText('');
        setShowCommentInput(false);
      }
    }
  };

  const handleShowMoreComments = () => {
    setShowMoreComments(!showMoreComments);
  };

  const handleLikePost = async () => {
    if (!liked) {
      try {
        const response = await likePost(post_id);
        const data = await response.json();
  
        if (data.success) {
          setLikeCount(likeCount + 1);
          setLiked(true);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Failed to like post:', error);
      }
    }
  };

  const displayedComments = showMoreComments ? comments : comments.slice(0, 2);

  return (
    <div className={`post-container ${comments.length > 0 ? 'has-comments' : ''} mb-8 p-6 bg-gray-800 text-light shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center mb-4">
        <div className="font-bold text-2xl">{`${first_name} ${last_name}`}</div>
      </div>
      <div className="mb-4 text-lg">{content}</div>
      <div className="text-sm mb-4">Category: {category}</div>
      <div className="text-sm mb-6">{new Date(created_at).toLocaleDateString()}</div>
      
      <div className="flex items-center mb-4 space-x-6">
        <button 
          className={`flex items-center space-x-2 text-black hover:text-red-500 transition-colors duration-300 ${liked ? 'text-red-500' : ''}`}
          onClick={handleLikePost}
        >
          <FaHeart className="text-2xl" />
          <span className="font-medium">{likeCount}</span>
        </button>
        <button 
          className="flex items-center space-x-2 text-black hover:text-blue-500 transition-colors duration-300"
          onClick={() => setShowCommentInput(!showCommentInput)}
        >
          <FaComment className="text-2xl" />
          <span className="font-medium">Comment</span>
        </button>
      </div>

      {showCommentInput && (
        <div className="mb-4">
          <textarea
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-light"
            rows="2"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>
      )}

      {comments.length > 0 && (
        <div>
          <div className="space-y-2">
            {displayedComments.map((comment) => (
              <div key={comment.comment_id} className="border-t border-gray-600 pt-2">
                <div className="text-light font-semibold">{`${comment.comment_first_name} ${comment.comment_last_name}`}</div>
                <div className="text-gray-400 text-sm">{comment.comment_text}</div>
              </div>
            ))}
          </div>
          {comments.length > 2 && (
            <button 
              className="mt-2 text-blue-400 hover:underline"
              onClick={handleShowMoreComments}
            >
              {showMoreComments ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
