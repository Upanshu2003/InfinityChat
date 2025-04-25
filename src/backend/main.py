from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import logging

from ai.responder import get_response 

app = FastAPI()
logging.basicConfig(level=logging.INFO)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageInput(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(data: MessageInput):
    try:
        if not data.message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
            
        response = get_response(data.message)
        if not response or "error" in response:
            raise HTTPException(status_code=500, detail="Failed to get AI response")
            
        return {"response": response}
    except Exception as e:
        logging.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add a health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}