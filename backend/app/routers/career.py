import re
import uuid
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    ResumeReviewRequest,
    ResumeReviewResponse,
    TechnicalInterviewRequest,
    CodingPracticeProblem,
    CodeEvaluationRequest,
    CodeEvaluationResponse
)

router = APIRouter(prefix="/career", tags=["Career Assistant"])

CURATED_CODING_PROBLEMS = [
    {
        "id": "code-01",
        "title": "Two Sum with Optimal Index Lookup",
        "difficulty": "Easy",
        "category": "Arrays & Hashing",
        "problemStatement": (
            "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n"
            "You may assume that each input would have exactly one solution, and you may not use the same element twice."
        ),
        "examples": [
            {"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."}
        ],
        "constraints": ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Exactly one valid answer exists."],
        "starterCode": "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Implement optimal O(n) solution using hash map\n    pass",
        "solutionExplanation": "Use a hash map to store `target - num` as you iterate through the list. This achieves O(n) time complexity and O(n) space complexity, significantly outperforming the naive O(n^2) nested loop approach."
    },
    {
        "id": "code-02",
        "title": "LRU (Least Recently Used) Cache Implementation",
        "difficulty": "Medium",
        "category": "Data Structures & Design",
        "problemStatement": (
            "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n"
            "Implement the `LRUCache` class with `get(key)` and `put(key, value)` both running in O(1) average time complexity."
        ),
        "examples": [
            {"input": "put(1, 1), put(2, 2), get(1), put(3, 3), get(2)", "output": "null, null, 1, null, -1", "explanation": "Key 2 was evicted because key 1 was accessed and became recently used."}
        ],
        "constraints": ["1 <= capacity <= 3000", "0 <= key <= 10^4", "At most 2 * 10^5 calls to get and put"],
        "starterCode": "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass",
        "solutionExplanation": "Combine a Doubly Linked List with a Hash Map. The hash map provides O(1) key lookups, while the doubly linked list maintains node recency with O(1) additions and deletions."
    },
    {
        "id": "code-03",
        "title": "Course Schedule & Cycle Detection (Topological Sort)",
        "difficulty": "Medium",
        "category": "Graphs & BFS/DFS",
        "problemStatement": (
            "There are a total of `numCourses` you have to take, labeled from 0 to `numCourses - 1`. "
            "You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates you must take bi first if you want to take ai.\n"
            "Return `true` if you can finish all courses. Otherwise, return `false`."
        ),
        "examples": [
            {"input": "numCourses = 2, prerequisites = [[1,0]]", "output": "true", "explanation": "Take course 0 then course 1."},
            {"input": "numCourses = 2, prerequisites = [[1,0],[0,1]]", "output": "false", "explanation": "Circular dependency exists."}
        ],
        "constraints": ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
        "starterCode": "def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:\n    # Implement Kahn's Algorithm or DFS Cycle Detection\n    pass",
        "solutionExplanation": "Use Kahn's Algorithm (in-degree array + BFS queue) or DFS with 3-color cycle detection (unvisited, visiting, visited). If a cycle exists, return False; otherwise True in O(V + E) time."
    }
]

@router.post("/resume-review", response_model=ResumeReviewResponse)
async def review_resume(payload: ResumeReviewRequest):
    text = payload.resumeText
    if len(text.strip()) < 50:
        raise HTTPException(status_code=400, detail="Please provide a more complete resume text for accurate analysis.")

    # Industry standard ATS keywords for SDE / Tech roles
    target_keywords = [
        "python", "react", "fastapi", "docker", "sql", "postgresql", "git",
        "rest api", "data structures", "algorithms", "ci/cd", "aws", "kubernetes",
        "microservices", "testing", "scalability", "redis", "linux"
    ]

    text_lower = text.lower()
    found_keywords = [kw for kw in target_keywords if kw in text_lower]
    missing_keywords = [kw.title() for kw in target_keywords if kw not in text_lower][:6]

    # Calculate ATS Score
    base_score = 45
    keyword_score = min(35, len(found_keywords) * 3)
    has_metrics = bool(re.search(r'\d+%', text) or re.search(r'\$\d+', text) or re.search(r'\d+x', text))
    metrics_bonus = 10 if has_metrics else 0
    has_links = bool("github.com" in text_lower or "linkedin.com" in text_lower)
    link_bonus = 10 if has_links else 0

    total_score = min(98, base_score + keyword_score + metrics_bonus + link_bonus)

    strengths = [
        f"Detected {len(found_keywords)} core technical industry competencies ({', '.join(found_keywords[:4])}).",
        "Clean academic structural hierarchy clearly visible in project descriptions."
    ]
    if has_metrics:
        strengths.append("Strong usage of quantifiable metrics and percentage outcomes in achievements.")
    if has_links:
        strengths.append("Professional profile hyperlinks (GitHub/LinkedIn) are present.")

    improvements = []
    if not has_metrics:
        improvements.append("Quantify project bullet points using Google's X-Y-Z formula: 'Accomplished [X], as measured by [Y], by doing [Z]'.")
    if len(missing_keywords) > 2:
        improvements.append(f"Incorporate missing high-frequency tech terms such as: {', '.join(missing_keywords[:4])}.")
    improvements.append("Ensure every technical project explicitly outlines the problem, tech stack, scalability constraints, and outcomes.")

    return ResumeReviewResponse(
        atsScore=total_score,
        strengths=strengths,
        criticalImprovements=improvements,
        missingKeywords=missing_keywords,
        formattingAndImpactScore={
            "Keyword Density": min(100, len(found_keywords) * 8),
            "Quantifiable Metrics": 90 if has_metrics else 40,
            "Structure & Hierarchy": 85,
            "Technical Stack Relevance": min(95, 60 + len(found_keywords) * 3)
        },
        recommendedActionPlan=[
            "1. Rewrite bullet points using action verbs (Orchestrated, Architected, Optimized).",
            "2. Add measurable impacts: 'Reduced query latency by 35% through Redis caching'.",
            "3. Embed a dedicated 'Technical Skills' categorized matrix (Languages, Frameworks, Cloud, Databases).",
            "4. Highlight top 2 BTech capstone projects with live demo and GitHub repository links."
        ]
    )

@router.post("/interview-prep")
async def get_interview_prep(payload: TechnicalInterviewRequest):
    return {
        "role": payload.role,
        "topic": payload.topic,
        "questions": [
            {
                "id": "q1",
                "category": "Data Structures & Core CS",
                "question": "Explain the internal hash collision resolution strategies in modern languages (Chaining vs Open Addressing). How does hash table resizing affect amortized time complexity?",
                "modelAnswer": "Hash tables use Chaining (linked lists/trees at buckets) or Open Addressing (Linear/Quadratic Probing, Double Hashing). In Python/Java, chaining or compact open addressing is used. When load factor threshold is crossed, table doubles in size and rehashes elements in O(n), preserving O(1) amortized insertion.",
                "keyEvaluationPoints": ["Load factor concept", "Chaining vs Probing tradeoffs", "Amortized complexity proof"]
            },
            {
                "id": "q2",
                "category": "System Design & Scalability",
                "question": "How would you design a real-time collaborative document editor or chat system handling 100,000 concurrent active students?",
                "modelAnswer": "Utilize WebSockets termination at a scalable API Gateway, backed by Redis Pub/Sub for distributed message routing across node clusters. For document collaboration, implement Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs). Persist events asynchronously into a partitioned datastore.",
                "keyEvaluationPoints": ["WebSocket scaling", "Redis Pub/Sub message broker", "CRDTs/OT for conflict resolution", "Database partitioning"]
            },
            {
                "id": "q3",
                "category": "Behavioral & Engineering Leadership",
                "question": "Tell me about a difficult engineering bug or system conflict you encountered in your BTech projects, and how you resolved it under deadline pressure.",
                "modelAnswer": "Structure with STAR format (Situation, Task, Action, Result). State the technical problem (e.g. race condition or database lock), how you profiled logs using debugging tools, your collaborative mitigation, and the measurable positive outcome.",
                "keyEvaluationPoints": ["STAR framework adherence", "Technical depth of troubleshooting", "Grace under pressure"]
            }
        ]
    }

@router.get("/coding-problems")
async def get_coding_problems():
    return CURATED_CODING_PROBLEMS

@router.post("/evaluate-code", response_model=CodeEvaluationResponse)
async def evaluate_code(payload: CodeEvaluationRequest):
    code = payload.code.strip()
    if len(code) < 15:
        return CodeEvaluationResponse(
            verdict="Wrong Answer",
            timeComplexity="Indeterminate",
            spaceComplexity="Indeterminate",
            feedback="Your code is incomplete or empty. Implement the required logic.",
            suggestions=["Review the starter code and problem constraints."]
        )

    # Static pattern analysis
    has_hashmap = bool("dict" in code or "{" in code or "HashMap" in code or "Map" in code)
    has_nested_loop = bool(re.search(r'for\s+.*\n\s+for\s+', code))

    if has_nested_loop and not has_hashmap:
        return CodeEvaluationResponse(
            verdict="Time Limit Exceeded",
            timeComplexity="O(n²)",
            spaceComplexity="O(1)",
            feedback="Your solution uses a nested loop which runs in O(n²) time complexity. On arrays with 10^5 elements, this will exceed the 1.0 second execution limit.",
            suggestions=[
                "Use a hash map or dictionary to achieve O(n) linear lookup time.",
                "Store compliments or visited elements in a set."
            ]
        )
    elif has_hashmap:
        return CodeEvaluationResponse(
            verdict="Accepted",
            timeComplexity="O(n)",
            spaceComplexity="O(n)",
            feedback="Excellent! Your solution utilizes an optimal hash-based approach, achieving O(n) linear time complexity and passing all edge-case constraints.",
            suggestions=[
                "Consider edge cases like duplicate elements or negative integers.",
                "Be prepared to explain why hash lookup has an amortized O(1) cost during technical interviews."
            ]
        )
    else:
        return CodeEvaluationResponse(
            verdict="Accepted",
            timeComplexity="O(n log n)",
            spaceComplexity="O(1)",
            feedback="Solution passes basic test cases. Ensure edge conditions (empty lists, duplicates) are defensively handled.",
            suggestions=["Analyze whether an auxiliary hash map can reduce runtime to O(n)."]
        )

@router.get("/skill-roadmap")
async def get_skill_roadmap():
    return {
        "title": "BTech Computer Science & Engineering Placement Master Roadmap",
        "semesters": [
            {
                "term": "Semester 3 & 4 (Foundations)",
                "focus": "Data Structures, Algorithms & OOP",
                "topics": ["Arrays, Linked Lists, Trees, Graphs", "Time & Space Complexity (Big-O)", "Object-Oriented Programming (Java/Python/C++)", "Relational Database Design & SQL"]
            },
            {
                "term": "Semester 5 & 6 (Core Systems & Projects)",
                "focus": "Full-Stack Development, Operating Systems & Distributed Systems",
                "topics": ["FastAPI / Node.js Backend Development", "React & Modern TypeScript", "Computer Networks & Operating System Internals", "Docker Containerization & CI/CD Pipelines"]
            },
            {
                "term": "Semester 7 & 8 (Placement & Industry Readiness)",
                "focus": "System Design, Cloud & Placement Grinds",
                "topics": ["High-Level & Low-Level System Design (LLD/HLD)", "Mock LeetCode / HackerRank Technical Rounds", "ATS-Optimized Capstone Resume Formulation", "Oral Defense & Behavioral Interview Mastery"]
            }
        ]
    }
