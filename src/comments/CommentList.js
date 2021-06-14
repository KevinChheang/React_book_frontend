import React from "react";
import { useParams } from "react-router-dom";

import CommentCard from "./CommentCard";

/** Show page with list of comments.
 *
 * On mount, loads comments from API.
 *
 * BookDetail -> CommentList
 *
 * This is routed to at /books/isbn
 */

function CommentList({ comments }) {
    const { isbn } = useParams();

    return (
        <div>
            {comments.length
            ? 
                <div style={{marginTop: "20px", marginLeft: "5%", marginRight: "5%", 
                padding: "20px"}}>
                    {comments.map(comment => (
                        comment.isbn === isbn ?
                        <CommentCard 
                            key={comment.id}
                            comment={comment.comment} 
                            username={comment.username} />
                            : ""
                        ))}
                </div>
                 : ""
            }
        </div>
    );
}

export default CommentList;