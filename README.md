# Resume Screener Assistant

An AI-powered resume screening application that evaluates candidates against job descriptions using Google's Gemini AI. It generates a match score, identifies relevant skills and skill gaps, and suggests interview questions to help recruiters make informed hiring decisions.

## Features

- **AI-Powered Resume Analysis:** Uses Google Gemini AI to evaluate resumes against job descriptions.
- **Candidate Information:** Enter candidate name and the position being evaluated.
- **Multiple Resume Formats:** Upload PDF and DOCX resumes or provide resume text.
- **Job Description Input:** Paste job descriptions directly into the application.
- **Match Score:** Generates a candidate-job compatibility score from 0 to 100.
- **Matching Skills:** Identifies skills and qualifications relevant to the job.
- **Skill Gap Analysis:** Highlights missing or insufficiently demonstrated skills.
- **Interview Questions:** Generates relevant interview questions based on the candidate's profile.
- **Analysis History:** Stores previous analyses in a MySQL-compatible database.
- **Responsive Interface:** Provides an accessible interface for managing candidate evaluations.

## Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Google Gemini API (`@google/genai`)
- Multer – File upload handling
- Mammoth – DOCX text extraction
- Zod – Request and response validation

### Database
- TiDB Cloud (MySQL-compatible)
- MySQL2 – Database connectivity

### Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- TiDB Cloud – Database hosting

## Application Architecture

The application follows a client-server architecture.

```text
                 USER
                   |
                   v
          React Frontend (Vercel)
                   |
                   | HTTP Requests
                   v
          Express Backend (Render)
                   |
          +--------+---------+
          |                  |
          v                  v
     Gemini API         TiDB Cloud
   Resume Analysis      MySQL Database
```

### Resume Analysis Workflow

1. Recruiter enters candidate information.
2. Recruiter pastes the job description.
3. Recruiter uploads a PDF/DOCX resume or provides resume text.
4. The frontend sends the information to the Express backend.
5. The backend extracts resume content when necessary.
6. Gemini AI evaluates the resume against the job description.
7. The generated response is validated.
8. The analysis is stored in TiDB Cloud.
9. The frontend displays the candidate's match report.

## Project Structure

```text
Resume-Screener-Assistant/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── analysis/
│   │   │   └── common/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── analysisController.js
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   └── analysisRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── validators/
│   │   └── analysisSchema.js
│   ├── index.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- Git
- A TiDB Cloud account or compatible MySQL database
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Argha782/Resume-Screener-Assistant.git

cd Resume-Screener-Assistant
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000

CLIENT_ORIGIN=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model

DB_HOST=your_tidb_host
DB_PORT=4000
DB_USER=your_tidb_username
DB_PASSWORD=your_tidb_password
DB_NAME=resume_screener
```

**Note:** TiDB Cloud connections require TLS. The database configuration should enable TLS as required by your TiDB connection settings.

Start the development server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## Database Configuration

The application uses TiDB Cloud with MySQL compatibility.

Create a database named `resume_screener` and execute the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS resume_screener
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE resume_screener;

CREATE TABLE IF NOT EXISTS analysis (
    id CHAR(36) PRIMARY KEY,
    candidateName VARCHAR(120) NOT NULL,
    role VARCHAR(160) NOT NULL,
    matchScore TINYINT UNSIGNED NOT NULL,
    summary TEXT NOT NULL,
    matchingSkills JSON NOT NULL,
    skillGaps JSON NOT NULL,
    interviewQuestions JSON NOT NULL,
    analyzedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_candidate_name (candidateName),
    INDEX idx_role (role),
    INDEX idx_match_score (matchScore),
    INDEX idx_analyzed_at (analyzedAt)
);
```

The database stores candidate information, match scores, AI-generated summaries, matching skills, skill gaps, interview questions, and analysis timestamps.

## API Configuration

The backend exposes its analysis routes under:

```text
/api/analysis
```

The frontend communicates with the backend through Axios.

Example API configuration:

```javascript
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api"
});
```

The API base URL can be changed through the frontend environment variables without modifying the application code.

## Deployment

The application is deployed using three separate services.

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | TiDB Cloud |

### Frontend Deployment – Vercel

1. Import the GitHub repository into Vercel.
2. Select the `client` directory as the Root Directory.
3. Configure the framework as Vite.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Add the following environment variable:

```env
VITE_API_URL=https://your-render-backend-url/api
```

7. Deploy the project.

### Backend Deployment – Render

1. Create a new Web Service in Render.
2. Connect the GitHub repository.
3. Set the Root Directory to `server`.
4. Configure the build command:

```bash
npm install
```

5. Configure the start command:

```bash
npm start
```

6. Add the required environment variables, including Gemini API credentials and TiDB connection details.
7. Deploy the service.

Update `CLIENT_ORIGIN` with your deployed Vercel frontend URL.

### Database Deployment – TiDB Cloud

1. Create a TiDB Cloud Starter instance.
2. Create the `resume_screener` database.
3. Execute the database schema.
4. Configure the public endpoint and authorized network rules.
5. Add the connection credentials to the Render environment variables.
6. Use TLS for secure database connectivity.

**Security:** Never commit database credentials, API keys, or environment files to GitHub.

## Security and Validation

- Environment variables are used to protect sensitive credentials.
- Zod validates incoming analysis data.
- Multer handles file uploads with configured file-size and file-type restrictions.
- Resume uploads are processed in memory.
- Gemini responses are validated before being stored.
- CORS is configured to allow the frontend origin.

## Future Enhancements

- Candidate comparison and ranking.
- Advanced filtering and search.
- Bulk resume processing.
- Exportable candidate evaluation reports.
- Authentication and recruiter-specific dashboards.
- Advanced analytics and recruitment insights.

## Author

**Argha Saha**

- GitHub: [Argha782](https://github.com/Argha782)
- LinkedIn: [Argha Saha](https://www.linkedin.com/in/argha-saha-80527a208/)

---

*Resume Screener Assistant – Simplifying candidate evaluation with AI.*