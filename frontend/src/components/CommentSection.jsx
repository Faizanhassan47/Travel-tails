import React, { useState, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import './CommentSection.css';

const CommentSection = ({ photoId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await api.get(`/photos/${photoId}/comments`);
      setComments(data);
    } catch (error) {
      console.error('Fetch comments failed', error);
    }
  }, [photoId]);

  useEffect(() => {
    if (!photoId) return undefined;
    const timer = setTimeout(fetchComments, 0);
    return () => clearTimeout(timer);
  }, [photoId, fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await api.post(`/photos/${photoId}/comments`, { text });
      setText('');
      await fetchComments();
    } catch (error) {
      console.error('Post comment failed', error);
    }
    setLoading(false);
  };

  return (
    <div className="comment-section">
      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a journal entry..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="comment-submit" disabled={loading || !text.trim()}>
            <Send size={18} />
          </button>
        </form>
      ) : (
        <div className="comment-login-prompt">
          Please login to add a comment.
        </div>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-meta">
              <span className="comment-author">{comment.userId?.name || 'Unknown'}</span>
              <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="comment-empty">No journal entries yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
