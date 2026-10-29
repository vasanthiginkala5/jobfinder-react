
import { useState } from "react";

function CareerAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function askQuestion() {
    if (question.trim() === "" || loading) {
      return;
    }

    const currentQuestion = question;

    setMessages(messages.concat({
      role: "user",
      text: currentQuestion
    }));

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8001/career-assistant?question=${encodeURIComponent(currentQuestion)}`
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setMessages(previousMessages => previousMessages.concat({
        role: "assistant",
        text: data.answer
      }));
    } catch (error) {
      setMessages(previousMessages => previousMessages.concat({
        role: "assistant",
        text: "Unable to connect to the Career Assistant. Please try again."
      }));
    }

    setLoading(false);
  }

  return (
    <div>
      <h2>AI Career Assistant</h2>
      <p>Ask questions about careers, skills, and interviews.</p>

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>
              {message.role === "user" ? "You: " : "Assistant: "}
            </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      {loading && <p>Assistant is thinking...</p>}

      <form onSubmit={(event) => {
        event.preventDefault();
        askQuestion();
      }}>
        <input
          type="text"
          placeholder="Ask a career question..."
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          Ask
        </button>
      </form>
    </div>
  );
}

export default CareerAssistant;
