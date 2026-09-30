import './FeedbackMessage.css';

function FeedbackMessage({ message, kind, onRetry }) {
  if (!message) return null;

  return (
    <div className={`feedback-message feedback-message--${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <span>{message}</span>
      {kind === 'error' && onRetry && <button type="button" onClick={onRetry}>Try again</button>}
    </div>
  );
}

export default FeedbackMessage;