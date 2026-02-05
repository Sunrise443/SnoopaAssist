from ollama import chat
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import OllamaResponse

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3"

class OllamaChatView(APIView):
    def post(self, request):
        user_day_mood = request.data.get("mood", "")
        user_existing_tasks = request.data.get("tasks", "")
        user_personality = request.data.get("personality", "")

        message = f"""
            You are a productivity assistant and psychologist
            Your task is to generate highly relevant, realistic, and actionable tasks tailored to a person’s occupation, current mood, and workload

            INPUT:
            - Mood: {user_day_mood}
            - Occupation: {user_personality}
            - Existing tasks: {user_existing_tasks}

            OBJECTIVE:
            Generate a small set of tasks and one recovery recommendation that helps the user stay productive without burnout

            RULES:
            1. Task relevance:
            - Tasks must align with the person's occupation and professional growth
            - Prefer tasks that move the person toward their long-term goal
            - Avoid generic tasks unless the mood clearly requires low cognitive effort

            2. Mood adaptation:
            - If mood is awful or bad:
            -- suggest fewer tasks
            -- reduce task complexity
            -- prioritize quick wins and low mental load

            - If mood is neutral:
            -- suggest balanced tasks with moderate effort

            - If mood is good or amazing:
            -- suggest 2–4 meaningful tasks that create progress

            3. Workload awareness:
            - Analyze existing tasks.
            - Do not duplicate or closely overlap with existing tasks
            - If there are many tasks (5+) or they appear large/complex suggest fewer additional tasks (1–2)
            - If workload is light suggest up to 4 tasks

            4. Task quality:
            Each task must be specific, actionable, realistically completable, professionally useful, not vague

            5. Recovery advice:
            Provide one short but valuable recommendation that considers mood, total workload, task intensity

            Examples:
            - "Take a 10-minute break after every 45 minutes of focused work"
            - "Go for a 20-minute walk to reset cognitive fatigue"
            - "Avoid starting deep work tonight — prioritize rest"

            6. Output constraints:
            - Generate between 1 and 4 tasks only
            - Do not explain reasoning
            - Do not include disclaimers
            - Keep language concise and practical

            OUTPUT FORMAT - STRICT JSON

            Generate a JSON response containing three fields: 
                1. "tasks": a list of 2-4 realistic tasks for the user
                2. "restTip": one actionable tip for rest or recovery
                3. "notes": a short encouraging comment or advice
        """
        try: 
            response = chat(
                model=MODEL_NAME,
                messages=[{"role": "user", "content": message}],
                format=OllamaResponse.model_json_schema(),
                options= {
                    "temperature":0.6,
                },
            )
            content = OllamaResponse.model_validate_json(response.message.content)
            return Response(content.model_dump(), status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
