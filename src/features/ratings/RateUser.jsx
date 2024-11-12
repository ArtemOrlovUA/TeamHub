/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiArrowDown, HiArrowUp } from "react-icons/hi2";

function RateUser({ user_email }) {
  return (
    <div>
      <button className="flex">
        <HiArrowUp /> <span>Upvote</span>
      </button>
      <button className="flex">
        <HiArrowDown /> <span>Downvote</span>
      </button>
    </div>
  );
}

export default RateUser;
