from .huggingface import query_huggingface
import base64
from io import BytesIO

def analyze_image(image_bytes):
    try:
        
        image_b64 = base64.b64encode(image_bytes).decode('utf-8')
        
        result = query_huggingface(
            "microsoft/resnet-50",
            {"image": image_b64}
        )
        
        nsfw_result = query_huggingface(
            "microsoft/resnet-50-nsfw",
            {"image": image_b64}
        )

        if not result or not nsfw_result:
            return {"error": "Failed to analyze image"}

        return {
            "classification": result[0],
            "nsfw_status": nsfw_result[0],
        }
    except Exception as e:
        return {"error": str(e)}
