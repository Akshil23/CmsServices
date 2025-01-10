import React, { useState, useEffect } from 'react';
import '/Users/ak/Cms_services/Cms_services/src/styles/Home/Testimonial.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const ReviewComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Fetch reviews from the server
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

  // Handle review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      name,
      rating,
      text: reviewText,
    };

    try {
      const response = await fetch('https://cmsservice23.com/api/reviews.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const updatedReviews = await fetch('https://cmsservice23.com/api/reviews.php');
        const data = await updatedReviews.json();
        setReviews(data);
      } else {
        console.error('Failed to save review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }

    setName('');
    setRating(5);
    setReviewText('');
    setIsModalOpen(false);
  };

  return (
    <div className="testimonial-container" data-aos="fade-down"
>
      <h2 className="testimonial-heading">Testimonials</h2>
      
      <button onClick={() => setIsModalOpen(true)} className="testimonial-button">
        Leave a Review
      </button>

      {/* Modal for submitting reviews */}
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

      {/* Swiper for displaying reviews */}
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to leave a review!</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="testimonial-swiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-card-header">
                  <span className="testimonial-name">{review.name}</span>
                  <div className="testimonial-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="testimonial-text">{review.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

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
