from .huggingface import query_huggingface
import base64

def detect_nsfw(image_bytes: bytes):
    base64_image = base64.b64encode(image_bytes).decode("utf-8")
    result = query_huggingface(
        "Falconsai/nsfw_image_detection",
        {"inputs": base64_image}
    )
    return result