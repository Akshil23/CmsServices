import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/HomeStyles.css";

interface Review {
  name: string;
  rating: number;
  text: string;
  photo?: string;
}

const ReviewComponent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/reviews.json");
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="section-padding testimonial-section">
      <Container className="text-center">
        <div className="section-header mb-5">
          <h2>Client Success Stories</h2>
          <p className="text-muted">
            Reviews shared directly by our clients
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          style={{ paddingBottom: "40px" }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="profile-wrap">
                    <img
                      src={review.photo || "/avatars/default.jpg"}
                      alt={review.name}
                      className="profile-photo"
                    />
                    <div>
                      <span className="client-name">{review.name}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="review-text">"{review.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default ReviewComponent;
