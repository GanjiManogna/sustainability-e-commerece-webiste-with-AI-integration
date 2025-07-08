from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io, base64
import torch, cv2
import numpy as np
from diffusers import StableDiffusionControlNetImg2ImgPipeline, ControlNetModel
from huggingface_hub import login
import os

# Login to Hugging Face
API_TOKEN = os.getenv("HF_API_TOKEN")
login(API_TOKEN)

app = Flask(__name__)
CORS(app)

# Load model
controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16
)
pipe = StableDiffusionControlNetImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16
).to("cuda")

def apply_canny(image):
    image = np.array(image)
    edges = cv2.Canny(image, 100, 200)
    edges = edges[:, :, None]
    edges = np.concatenate([edges] * 3, axis=2)
    return Image.fromarray(edges)

@app.route("/redesign", methods=["POST"])
def redesign():
    data = request.json
    image_data = data["image"]
    prompt = data["prompt"]

    # Decode base64 image
    image = Image.open(io.BytesIO(base64.b64decode(image_data.split(",")[1]))).convert("RGB")
    image = image.resize((512, 512))
    canny = apply_canny(image)

    enhanced_prompt = f"{prompt}, intricate detail, painted texture, vivid colors, symmetrical pattern, 4K product design"

    result = pipe(
        prompt=enhanced_prompt,
        image=image,
        control_image=canny,
        strength=0.7,
        guidance_scale=12.0,
        num_inference_steps=40
    )

    output_image = result.images[0]

    # Convert output image to base64
    buffered = io.BytesIO()
    output_image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    return jsonify({"image": "data:image/png;base64," + img_str})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
