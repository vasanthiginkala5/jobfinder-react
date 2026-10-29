
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load the career knowledge
with open("knowledge.txt", "r", encoding="utf-8") as file:
    knowledge = file.read()

# Split knowledge into topic-based chunks
def split_into_chunks(text):
    sections = text.split("\n\n")
    chunks = []
    current_chunk = ""

    for section in sections:
        section = section.strip()

        if not section:
            continue

        if len(current_chunk) + len(section) < 1000:
            if current_chunk:
                current_chunk += "\n\n"
            current_chunk += section
        else:
            if current_chunk:
                chunks.append(current_chunk)

            current_chunk = section

    if current_chunk:
        chunks.append(current_chunk)

    return chunks


chunks = split_into_chunks(knowledge)

# Combine the Python collections section into one chunk
for i, chunk in enumerate(chunks):
    if "Python Collections: List, Tuple, Set, and Dictionary" in chunk:
        if i + 4 < len(chunks):
            chunks[i] = "\n\n".join(chunks[i:i + 5])
            del chunks[i + 1:i + 5]
        break

# Load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Convert chunks into vectors
embeddings = model.encode(chunks)

# Create a FAISS index
embeddings = np.array(embeddings, dtype="float32")
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)



def retrieve_context(question):
    print("RETRIEVE FUNCTION CALLED:", question)

    question_embedding = model.encode([question])
    question_embedding = np.array(
        question_embedding, dtype="float32"
    )

    distances, indices = index.search(question_embedding, k=4)

    results = []

    for distance, i in zip(distances[0], indices[0]):
        print("Distance:", distance, "Chunk index:", i)

        if i >= 0 and i < len(chunks) and distance < 1.2:
            results.append(chunks[i])

    print("RETRIEVED CONTEXT:", results)

    return "\n\n".join(results)





import os
from dotenv import load_dotenv
from google import genai

# Load the API key from .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=api_key,
    http_options={"timeout": 60000}
)


def generate_answer(question,context):

    if not context.strip():
        return "Sorry, I couldn't find relevant information in my knowledge base. Please try a related question."

    prompt = f"""
    You are a helpful Career Assistant.
    Answer the question using the context below.
    If the context does not contain enough information,
    clearly say that.

    Context:
    {context}

    Question:
    {question}

    Answer:
    """

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )
        return response.text

    except Exception as e:
        print("Gemini API error:", repr(e), flush=True)
        return f"AI service error: {str(e)}"