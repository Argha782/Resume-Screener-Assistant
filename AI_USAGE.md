# AI_USAGE.md

# AI Usage Documentation

## 1. AI Tools Used

The following AI tools were used during the development of the Resume Screener Assistant:

| Tool | Purpose |
|---|---|
| ChatGPT | Assistance with project architecture, React components, Express APIs, database integration, debugging, deployment guidance, and documentation. |
| Google Gemini API | Used within the application to analyze candidate resumes against job descriptions and generate match scores, skill comparisons, summaries, and interview questions. |
| Gemini (AI Assistant) | Assistance with understanding errors, exploring implementation approaches, and troubleshooting during development. |

AI-generated code and suggestions were reviewed, tested, and modified before being integrated into the project.

## 2. Three Key Prompts Used

### Prompt 1: Resume Analysis

"Analyze the candidate's resume against the provided job description. Generate a match score between 0 and 100, identify matching skills, highlight missing or weak skills, provide a concise candidate summary, and generate three relevant interview questions. Return the result in valid JSON following the required output structure. Do not invent skills or qualifications that are not supported by the resume."

**Purpose:** Used to develop the AI-powered resume screening functionality.

### Prompt 2: Backend and Database Integration

"Help me implement an Express.js backend that accepts candidate details, a job description, and a resume uploaded as PDF or DOCX. Extract the resume content, send the information to the Gemini API for analysis, validate the generated response, and store the result in a MySQL-compatible database using mysql2."

**Purpose:** Used to develop the backend API, file-processing workflow, AI integration, and database operations.

### Prompt 3: Frontend Development

"Help me build a React-based Resume Screener Assistant dashboard with candidate information fields, a job description input, resume upload support, a loading state, error handling, and a match report page. Follow the existing project structure and preserve the existing design and functionality when making changes."

**Purpose:** Used to develop and improve the frontend components and user experience.

## 3. Examples of Incorrect AI Output and Corrections

### Example 1: Database Table Name Inconsistency

**Problem:**

During database integration, the AI-generated code and earlier implementation used inconsistent table names. Some queries referenced `analyses`, while the actual database table was named `analysis`.

This resulted in the following MySQL error:

```text
Table 'resume_screener.analysis' doesn't exist
```

**Correction:**

I inspected the database structure using the TiDB SQL Editor and confirmed the actual table name. I then updated the backend SQL queries to consistently reference `analysis`.

I also verified that the table and its columns existed before testing the API again.

### Example 2: AI Losing Existing UI and Code Context

**Problem:**

While modifying existing React components, the AI sometimes failed to retain all the details of previously shared screenshots and source code. When asked to add a new feature or regenerate a component, it occasionally:

- Reintroduced elements that had previously been removed.
- Removed existing functionality while adding new elements.
- Changed the existing component structure or styling.
- Failed to follow the latest version of the code shared in earlier messages.

**Correction:**

I reviewed the generated code against the current implementation and provided the latest component source code and screenshots again when necessary.

I also gave more specific instructions about which elements should be added, retained, or removed. Instead of replacing entire components unnecessarily, I requested targeted modifications and manually checked the resulting code.

## 4. Limitations Observed While Using AI

During development, I observed the following limitations:

1. **Context retention:** AI tools do not always reliably retain previously shared screenshots, code versions, and design references throughout a long development conversation.

2. **Code regeneration:** Regenerating an entire component can unintentionally remove existing functionality or reintroduce previously removed elements.

3. **Inconsistent suggestions:** AI-generated code may sometimes use outdated implementation patterns, inconsistent variable names, or database table names that do not match the actual project.

4. **Debugging limitations:** AI suggestions are not guaranteed to resolve errors. Some issues require inspecting terminal logs, testing API responses, checking database structures, and manually verifying the application.

## 5. Verification and Responsible Use

AI was used as a development assistant rather than as a replacement for implementation and testing.

The following practices were followed:

- Reviewed generated code before integrating it into the project.
- Tested API endpoints and database queries.
- Checked application behaviour after modifying components.
- Verified Gemini API responses against the expected JSON schema.
- Used terminal logs and error messages to identify and resolve issues.
- Avoided exposing API keys and database credentials in frontend code or public repositories.

**Conclusion:** AI significantly assisted with development, debugging, and documentation. However, its outputs required review, testing, and occasional manual correction to ensure consistency, correctness, and compatibility with the existing application.