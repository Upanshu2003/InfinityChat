from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatbot = pipeline("text-generation", model="gpt2")

class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_ai(payload: Message):
    user_msg = payload.message
    response = chatbot(user_msg, max_length=100, num_return_sequences=1)
    reply = response[0]['generated_text']
    return {"reply": reply}