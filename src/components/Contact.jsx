import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    type: "question", // Default type
    content: "",
    name: "",
    email: "",
    authorTitle: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/message", formData);

      if (response.status === 201) {
        setSuccessMessage("Message sent successfully!");
        setErrorMessage("");
        setFormData({
          type: "question",
          content: "",
          name: "",
          email: "",
          authorTitle: "",
        });
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to send message."
      );
      setSuccessMessage("");
    }
  };

  return (
    <section className="min-h-screen" id="contact">
      <div>
        <h3>Message me! or write a Testimonial</h3>
        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Type:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="question">Question</option>
              <option value="testimonial">Testimonial</option>
              <option value="contact">Contact</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <div style={{ color: "red" }}>{formErrors.name}</div>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <div style={{ color: "red" }}>{formErrors.email}</div>
            )}
          </div>
          <div>
            <label>Author Title:</label>
            <input
              type="text"
              name="authorTitle"
              value={formData.authorTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            {formErrors.content && (
              <div style={{ color: "red" }}>{formErrors.content}</div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
