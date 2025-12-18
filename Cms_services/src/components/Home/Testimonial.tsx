import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaGoogle, FaStar, FaTimes } from "react-icons/fa";

// Import CSS & Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/HomeStyles.css";

const ReviewComponent: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [reviews, setReviews] = useState<any[]>([]);
	const [name, setName] = useState("");
	const [rating, setRating] = useState(5);
	const [reviewText, setReviewText] = useState("");

	// Fetch Reviews
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch("https://cmsservice23.com/api/reviews.php");
				const data = await response.json();
				// If data is array set it, otherwise empty
				setReviews(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error("Failed to fetch reviews:", error);
			}
		};
		fetchReviews();
	}, []);

	const handleSubmitReview = async (e: React.FormEvent) => {
		e.preventDefault();
		const newReview = { name, rating, text: reviewText };

		try {
			const response = await fetch("https://cmsservice23.com/api/reviews.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newReview),
			});

			if (response.ok) {
				alert("Review Submitted! Thank you.");
				// Re-fetch to show new review instantly
				const updatedReviews = await fetch("https://cmsservice23.com/api/reviews.php");
				const data = await updatedReviews.json();
				setReviews(Array.isArray(data) ? data : []);
			}
		} catch (error) {
			console.error("Error submitting review:", error);
		}
		// Reset Form
		setName("");
		setRating(5);
		setReviewText("");
		setIsModalOpen(false);
	};

	return (
		<section className="section-padding testimonial-section">
			<Container className="text-center">
				<div className="section-header mb-5">
					<h2>Client Success Stories</h2>
					<p className="text-muted">
						See what people from Brampton and across Canada say about us
					</p>
				</div>

				{/* Buttons Row */}
				<div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
					<button onClick={() => setIsModalOpen(true)} className="btn-service">
						<span style={{ color: "inherit" }}>Write a Review</span>
					</button>

					<a
						href="https://g.page/cms-services-brampton"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-hero d-flex align-items-center gap-2"
					>
						<FaGoogle /> Read Google Reviews
					</a>
				</div>

				{/* SWIPER CAROUSEL */}
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 4000, disableOnInteraction: false }}
					breakpoints={{
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					style={{ paddingBottom: "40px" }} // Space for pagination dots
				>
					{reviews.length > 0 ? (
						reviews.map((review, index) => (
							<SwiperSlide key={index}>
								<div className="testimonial-card">
									<div className="testimonial-header">
										<span className="client-name">{review.name || "Client"}</span>
										<div className="stars">
											{[...Array(5)].map((_, i) => (
												<FaStar
													key={i}
													color={i < review.rating ? "#ffc107" : "#e4e5e9"}
												/>
											))}
										</div>
									</div>
									<p className="review-text">"{review.text}"</p>
								</div>
							</SwiperSlide>
						))
					) : (
						<p>Loading reviews...</p>
					)}
				</Swiper>
			</Container>

			{/* MODAL */}
			{isModalOpen && (
				<div className="modal-overlay">
					<div className="modal-box">
						<button
							onClick={() => setIsModalOpen(false)}
							style={{
								position: "absolute",
								top: 10,
								right: 10,
								background: "none",
								border: "none",
								fontSize: "20px",
							}}
						>
							<FaTimes />
						</button>
						<h3 className="mb-3 text-center" style={{ color: "#852085" }}>
							Leave Your Feedback
						</h3>
						<form onSubmit={handleSubmitReview}>
							<label>Name</label>
							<input
								className="form-control-custom"
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>

							<label>Rating</label>
							<select
								className="form-control-custom"
								value={rating}
								onChange={e => setRating(Number(e.target.value))}
							>
								<option value="5">5 - Excellent</option>
								<option value="4">4 - Very Good</option>
								<option value="3">3 - Good</option>
								<option value="2">2 - Fair</option>
								<option value="1">1 - Poor</option>
							</select>

							<label>Review</label>
							<textarea
								className="form-control-custom"
								rows={4}
								value={reviewText}
								onChange={e => setReviewText(e.target.value)}
								required
							/>

							<button type="submit" className="btn-submit">
								Post Review
							</button>
						</form>
					</div>
				</div>
			)}
		</section>
	);
};

export default ReviewComponent;
