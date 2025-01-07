import React, { useState, useEffect, useRef } from 'react';
import '/Users/ak/Cms_services/Cms_services/src/styles/Home/Testimonial.css';

const ReviewComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const reviewsContainerRef = useRef<HTMLDivElement | null>(null);

  // Load reviews from local storage on component mount
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    setReviews(savedReviews);
  }, []);

  // Save reviews to local storage whenever reviews change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Handle the review form submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      name,
      rating,
      text: reviewText,
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);

    // Reset form
    setName('');
    setRating(5);
    setReviewText('');
    setIsModalOpen(false);
  };

  // Scroll the reviews container automatically
  const scrollReviewsAutomatically = () => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollBy({
        top: 50, // Amount of scrolling (increase for faster scroll)
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  // Add event listener for scroll to trigger automatic scroll
  useEffect(() => {
    const interval = setInterval(scrollReviewsAutomatically, 3000); // Scroll every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="testimonial-container">
      <h2 className="testimonial-heading">Testimonials</h2>
      
      <button onClick={() => setIsModalOpen(true)} className="testimonial-button">
        Leave a Review
      </button>

      {/* Modal for review form */}
      {isModalOpen && (
        <div className="review-modal">
          <div className="review-modal-content">
            <span className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h3>Write Your Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label htmlFor="name">Your Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="reviewText">Review:</label>
                <textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Display the reviews */}
      <div className="reviews-section" ref={reviewsContainerRef}>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          <div className="testimonial-cards">
            {reviews.map((review, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-card-header">
                  <span className="testimonial-name">{review.name}</span>
                  <div className="testimonial-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="testimonial-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Google Reviews Button */}
      <div className="google-reviews-section">
        <a
          href="https://www.google.com/search?q=cms+Services+Brampton&rlz=1C5CHFA_enCA1003CA1003&oq=cms+Services+Brampton&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigAdIBCDQ5NzZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x882b15c99c9fdd25:0x5b58d42a35669154,1,,,,"  // Replace with your actual Google review link
          target="_blank"
          rel="noopener noreferrer"
          className="google-reviews-button"
        >
          See Reviews on Google
        </a>
      </div>
    </div>
  );
};

export default ReviewComponent;
