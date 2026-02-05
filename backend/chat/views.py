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

        if not user_existing_tasks:
            return Response({"error": "No user message given."}, status=status.HTTP_400_BAD_REQUEST)

        message = f"""
            You are a professional psychologist and career manager. 
            Generate a JSON response containing three fields: 
            1. "tasks": a list of 2-4 realistic tasks for the user
            2. "restTip": one actionable tip for rest or recovery
            3. "notes": a short encouraging comment or advice

            User context to generate your response:
            - Personality and occupation: {user_personality}
            - Current mood: {user_day_mood}
            - Existing tasks: {user_existing_tasks}

            Return only JSON, do not include explanations or extra text.
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
