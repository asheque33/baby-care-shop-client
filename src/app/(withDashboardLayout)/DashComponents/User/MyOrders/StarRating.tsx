// import { Rating } from "@smastrom/react-rating";
// import { useState } from "react";

// export const StarRating = ({ productId, onRate }) => {
//   const [rating, setRating] = useState(0);

//   const handleRating = (star: number) => {
//     setRating(star);
//     onRate(productId, star);
//   };

//   return (
//     <div className="flex space-x-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Rating value={star} onChange={setRating} />
//         // <Star
//         //   key={star}
//         //   className={`cursor-pointer ${
//         //     star <= rating ? "text-yellow-500" : "text-gray-300"
//         //   }`}
//         //   onClick={() => handleRating(star)}
//         // />
//       ))}
//     </div>
//   );
// };
