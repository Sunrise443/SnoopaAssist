from django.db import models
from pydantic import BaseModel
from typing import List


class OllamaResponse(BaseModel):
    tasks: List[str]
    restTip: str
    notes: str
