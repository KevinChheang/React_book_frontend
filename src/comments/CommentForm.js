import React, { useState } from "react";
import "./CommentForm.css";

/** Comment form.
 *
 * Shows form for comment
 * On submission:
 * - calls API with form data
 * - re-render to display new comment
 *
 * Appears on BookDetail
 */

function CommentForm({ handleAddComment }) {
    const [formData, setFormData] = useState({
        comment: ""
      });

    /** Handle form submit:
    *   call handleAddComment(evt) prop
    */
     async function handleSubmit(evt) {
        handleAddComment(evt);
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="Comment text-center">
            <form onSubmit={handleSubmit}>
                <textarea 
                    className=" form-control my-2" id="Comment-box" 
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange} 
                    rows="4"
                    required />
                <button className="btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CommentForm;