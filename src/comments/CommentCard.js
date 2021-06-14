import React from "react";

import "./CommentCard.css";

/** Show information about a comment
 *
 * Is rendered by CommentList to show a "card" for each comment.
 *
 * CommentList -> CommentCard
 */

 function CommentCard({ comment, username }) {
    return (
        <div className="CommentCard">
            <h6 className="CommentCard-title">{username}</h6>
            <p className="CommentCard-text">{comment}</p>
        </div>
    );
  }
  
  export default CommentCard;