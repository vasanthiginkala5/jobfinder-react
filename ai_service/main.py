from rag import generate_answer
from rag import retrieve_context
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from pypdf import PdfReader
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI(title="JobFinder Smart Resume Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Common skill variations
SKILL_ALIASES = {
    "python": ["python", "python3", "python 3"],
    "django": ["django"],
    "django rest framework": [
        "django rest framework", "drf", "django rest"
    ],
    "fastapi": ["fastapi", "fast api"],
    "javascript": ["javascript", "java script", "js"],
    "react": ["react", "react.js", "reactjs"],
    "sql": ["sql", "structured query language"],
    "mysql": ["mysql", "my sql"],
    "postgresql": ["postgresql", "postgres"],
    "machine learning": ["machine learning", "ml"],
    "deep learning": ["deep learning", "dl"],
    "artificial intelligence": ["artificial intelligence", "ai"],
    "generative ai": ["generative ai", "genai", "gen ai"],
    "large language models": ["large language models", "llm", "llms"],
    "rest api": ["rest api", "rest apis", "restful api", "restful apis"],
    "html": ["html", "html5"],
    "css": ["css", "css3"],
    "git": ["git"],
    "github": ["github"],
    "docker": ["docker"],
    "aws": ["aws", "amazon web services"],
    "azure": ["azure", "microsoft azure"],
}


class Resume(BaseModel):
    name: str
    skills: list[str]
    required_skills: list[str]


def normalize_text(text: str) -> str:
    text = text.lower()
    text = text.replace(".js", "js")
    return re.sub(r"[^a-z0-9+#.]+", " ", text).strip()


def skill_is_present(skill: str, text: str) -> bool:
    skill_key = skill.lower().strip()
    aliases = SKILL_ALIASES.get(skill_key, [skill_key])

    normalized_text = normalize_text(text)

    for alias in aliases:
        normalized_alias = normalize_text(alias)

        if not normalized_alias:
            continue

        pattern = (
            r"(?<![a-z0-9+#])"
            + re.escape(normalized_alias)
            + r"(?![a-z0-9+#])"
        )

        if re.search(pattern, normalized_text):
            return True

    return False


def analyze_skills(required_skills: list[str], resume_text: str):
    # Remove duplicate requirements without changing their order
    required_skills = list(dict.fromkeys(
        skill.strip()
        for skill in required_skills
        if skill.strip()
    ))

    matched_skills = [
        skill for skill in required_skills
        if skill_is_present(skill, resume_text)
    ]

    missing_skills = [
        skill for skill in required_skills
        if not skill_is_present(skill, resume_text)
    ]

    score = (
        round(len(matched_skills) / len(required_skills) * 100)
        if required_skills else 0
    )

    if missing_skills:
        suggestion = (
            "Consider learning or demonstrating these skills: "
            + ", ".join(missing_skills)
        )
    else:
        suggestion = "Your resume matches all listed skill requirements!"

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": score,
        "suggestion": suggestion
    }


@app.get("/")
def home():
    return {"message": "JobFinder Smart Resume Analyzer is running!"}


@app.post("/analyze-resume")
def analyze_resume(resume: Resume):
    resume_text = " ".join(resume.skills)

    result = analyze_skills(
        resume.required_skills,
        resume_text
    )

    return {
        "name": resume.name,
        "resume_skills": resume.skills,
        "required_skills": resume.required_skills,
        **result
    }


@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    required_skills: str = Form(...)
):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )

    if file.content_type not in (None, "application/pdf"):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file must be a PDF."
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    try:
        reader = PdfReader(BytesIO(contents))

        if reader.is_encrypted:
            raise HTTPException(
                status_code=400,
                detail="Password-protected PDFs are not supported."
            )

        resume_text = "\n".join(
            page.extract_text() or ""
            for page in reader.pages
        )

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read the PDF. Please upload another PDF."
        )

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found in the PDF."
        )

    skills_required = [
        skill.strip()
        for skill in required_skills.split(",")
        if skill.strip()
    ]

    result = analyze_skills(skills_required, resume_text)

    return {
        "filename": file.filename,
        "extracted_text_preview": resume_text[:1000],
        **result
    }

@app.get("/career-assistant")
def career_assistant(question: str):
    print("MAIN API CALLED:", question, flush=True)

    context = retrieve_context(question)
    print("CONTEXT RECEIVED:", context, flush=True)

    answer = generate_answer(question, context)

    return {
        "question": question,
        "answer": answer
    }

