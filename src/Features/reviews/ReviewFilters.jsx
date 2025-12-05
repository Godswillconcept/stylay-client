import { useState } from "react";
import ReviewGroup from "./ReviewGroup";
import ReviewCheckbox from "./ReviewCheckbox";
import StarIcon from "../../icons/StarIcon";

// Mock data, in a real application this would come from props or an API
const reviewTopics = [
  "Product Quality",
  "Seller Services",
  "Product Price",
  "Shipment",
  "Match with Description",
];
const ratings = [5, 4, 3, 2, 1];

const ReviewFilter = () => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
  };

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-dashed border-neutral-200 p-6 font-sans text-white">
      <h2 className="mb-2 text-xl font-semibold text-black">Reviews Filter</h2>
      <hr className="border-t-2 border-dashed border-neutral-200" />

      <ReviewGroup title="Rating">
        {ratings.map((rating) => (
          <ReviewCheckbox
            key={rating}
            id={`rating-${rating}`}
            checked={selectedRatings.includes(rating)}
            onChange={() => handleRatingChange(rating)}
            className="flex items-center space-x-2"
          >
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 shrink-0 text-orange-400" />
              <span className="ml-2 font-medium">{rating}</span>
            </div>
          </ReviewCheckbox>
        ))}
      </ReviewGroup>

      <hr className="border-t-2 border-dashed border-neutral-200" />

      <ReviewGroup title="Review Topics">
        {reviewTopics.map((topic) => (
          <ReviewCheckbox
            key={topic}
            id={`topic-${topic.replace(/\s+/g, "-")}`}
            label={topic}
            checked={selectedTopics.includes(topic)}
            onChange={() => handleTopicChange(topic)}
          />
        ))}
      </ReviewGroup>
    </div>
  );
};

export default ReviewFilter;
