import React, { useState, useEffect, useRef } from 'react';
import '/Users/ak/Cms_services/Cms_services/src/styles/Home/Testimonial.css';

const ReviewComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const reviewsContainerRef = useRef<HTMLDivElement | null>(null);

  // Load reviews from the server on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://cmsservice23.com/api/reviews.php');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  // Handle the review form submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      name,
      rating,
      text: reviewText,
    };

    // Send review data to the server
    try {
      const response = await fetch('https://cmsservice23.com/api/reviews.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        // After successfully posting the review, fetch the updated list of reviews
        const fetchReviews = async () => {
          try {
            const res = await fetch('https://cmsservice23.com/api/reviews.php');
            const data = await res.json();
            setReviews(data); // Update the reviews state with the new list
          } catch (error) {
            console.error('Failed to fetch reviews:', error);
          }
        };

        fetchReviews(); // Fetch updated reviews after submission
      } else {
        console.error('Failed to save review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }

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
        top: 50,
        behavior: 'smooth',
      });
    }
  };

  // Add event listener for scroll to trigger automatic scroll
  useEffect(() => {
    const interval = setInterval(scrollReviewsAutomatically, 3000);
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
