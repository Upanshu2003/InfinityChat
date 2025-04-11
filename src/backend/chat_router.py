from fastapi import APIRouter, Request
from utils.openrouter_client import call_openrouter

router = APIRouter()

@router.post("/chat")
async def chat_with_ai(req: Request):
    data = await req.json()
    user_message = data.get("message")
    response = await call_openrouter(user_message)
    return {"reply": response}